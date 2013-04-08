var fs = require('fs'),
    path = require('path'),
    uglify = require('./tools/UglifyJS2/tools/node'),
    util = {
        rImport: /\/\/\/import\s(.*);/g,
        
        pack2URL: function(pack){
            pack = pack.split(/\./g);
            return path.join.apply(null, pack);
        },
        
        URL2Pack: function(path){
            return path.replace(/\.js$/i, '')
                    .replace(/[\/\\]/g, '.');
        }
    };



function Import(basePath){
    basePath = path.normalize(basePath);
    this._basePath = fs.existsSync(basePath) ? basePath
        : path.join('..', 'src');
}
/**
 * 根据包名取得完整文件
 * 支持第二参数，第二参数用于记录已经导入过的包
 */
Import.prototype.getCode = function(pack){
    var me = this,
        imports = arguments[1] || {},
        basePath = me._basePath,
        filePath = path.join(basePath, util.pack2URL(pack) + '.js');
    
    //pack不存在 throw
    //pack已经存在于imports中
    if(!fs.existsSync(filePath)){
//        throw Error('file: ' + filePath + ' is not found');
        throw 'file: ' + filePath + ' is not found';
    }
    if(imports[pack]){
        return '';
    }
    imports[pack] = true;//在这里先处理掉imports计数
    return fs.readFileSync(filePath, 'utf-8').replace(util.rImport, function(txt, mc){
//        console.log('from: ' + pack); //调试用
        return me.getCode(mc, imports);
    }) + '\n';
}

/**
 * 将给出的包名称转化为实际的包列表，参数支持：baidu.array.dom, baidu.string.format 或是 baidu.dom.*
 */
Import.prototype.getPackList = function(packs){
    var me = this,
        basePath = me._basePath,
        ret = [],
        filePath,
        dir;
    
    packs.split(',').forEach(function(item){
        item = item.trim();
        filePath = util.pack2URL(item);
        if(path.basename(filePath) === '*'){
            dir = path.dirname(filePath);
            fs.readdirSync(path.join(basePath, dir)).forEach(function(fileName){
                fileName = path.join(dir, fileName);
                if(fs.statSync(path.join(basePath, fileName)).isDirectory()){
                    ret = ret.concat(me.getPackList(util.URL2Pack(path.join(fileName, '*'))));
                }else{
                    ret.push(util.URL2Pack(fileName));
                }
            });
        }else{
            ret.push(item);
        }
    });
    return ret;
}

/**
 * 清除注释
 */
Import.clear = function(code){
    code = code.replace(/\/\*(\s|\S)+?\*\//g, '')// 段注释
        .replace(/\/\/\/import .*?;\n/g, '')// dron: 去掉源码中的 import 注释
        .replace(/(\r?\n){2,}/g, '\n\n')// 多空行到一行
        .replace(/\n/g, '\n')
        .replace(/\/\/\/\sTangram\s1\.x\sCode\s(Start|End)/g, '');// 去掉Tangram 1.x Code Start|End (内容会被保留)
    return code;
//    return 'var T, baidu = T = function(){\n\t'+ code +'\n return baidu;\n}();';
}

/**
 * 清除1.x code中的代码
 */
Import.clear1_x = function(code){
    var content = arguments[1] || [];
    return code.replace(/\/\/\/\sTangram\s1\.x\sCode\sStart[\s\S]*?Code\sEnd/g, function(txt){
        content.push(txt, '\n');
        return '';
    });
}

/**
 * 压缩代码 input是一个路径
 */
Import.uglifyjsCompress = function(input){
    var ret = uglify.minify(input);
    return ret.code;
}




module.exports = Import;
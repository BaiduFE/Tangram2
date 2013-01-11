var fs = require("fs"),
    path = require("path"),
    exec = require('child_process').exec,
    util = require('./build_util').util,
    uglify = require('./tools/UglifyJS2/tools/node');
//    uglify = require('./tools/UglifyJS/uglify-js');
    
    
    
//tangram源代码目录
var tangramSrcPath = '../src';
//需要排除的api
var excludeFiles = ['baidu.check', 'baidu.short', 'baidu.i18n', 'baidu.i18n.cultures.en-US', 'baidu.i18n.currency', 'baidu.i18n.number', 'baidu.i18n.string'];

//已经导入的文件
var imported = [];
excludeFiles.forEach(function(file){
    imported.push(util.api2File(file, tangramSrcPath));
});

//function getFileContent(file){
//    var _content = '';
//
//    if(util.arrayContains(imported, file)){
//        return '';
//    }
//
//    //较旧版本Node没有existsSync方法
//    if(!fs.existsSync(file)){
//        return '';
//    }
//
//    imported.push(file);
//
//    var content = fs.readFileSync(file, 'utf8');
//    var dependAPIs = util.getDependApis(content);
//    
//    dependAPIs.forEach(function(dependAPI){
//        console.log(file);
////        _content += getFileContent(util.api2File(dependAPI, tangramSrcPath));
//        
//        
//    });
//    
//    
//    
//    throw new Error('hello world');
//    _content += content.replace(new RegExp('(\/\/\/import\\s.*;\r)',"gm"), '') + "\r\n";
//    return _content;
//}
function getFileContent(file){
    //较旧版本Node没有existsSync方法
    if(!fs.existsSync(file)
        || util.arrayContains(imported, file)){return '';}
    var code = fs.readFileSync(file, 'utf8'),
        dependAPIs = util.getDependApis(code),
        rImport = /\/\/\/import\s(baidu.*);/g,
        importMap = {};
    imported.push(file);
    dependAPIs.forEach(function(item){
        if(!importMap[item]){
            importMap[item] = getFileContent(util.api2File(item, tangramSrcPath));
        }
    });
    return code.replace(rImport, function(txt, mc){
        var ret = importMap[mc];
        ret && (delete importMap[mc]);
        return ret || '';
    });
}

function pack( content ){
    // content = content.replace( /\/\/.*?\r?\n/g, "\r\n" ); // 行注释
    content = content.replace( /\/\*(\s|\S)+?\*\//g, "" ); // 段注释
    content = content.replace(/\/\/\/import .*?;\n/g, ""); // dron: 去掉源码中的 import 注释
    content = content.replace( /(\r?\n){2,}/g, "\r\n\r\n" ); // 多空行到一行
    content = content.replace( /\n/g, "\n\t" );
    content = content.replace(/\/\/\/\sTangram\s1\.x\sCode\s(Start|End)/g, '');//去掉Tangram 1.x Code Start|End
    return "var T, baidu = T = function(){\r\n\t" + content + "\r\n return baidu;\r\n}();";
}


// Task:delete release files
    // try{
    //     fs.unlinkSync('./tangram_compatible_src.js');
    //     fs.unlinkSync('./tangram_compatible_fis.js');
    //     fs.unlinkSync('./tangram_compatible.js');
    //     fs.unlinkSync('./tangram_base_src.js');
    //     fs.unlinkSync('./tangram_base_fis.js');
    //     fs.unlinkSync('./tangram_base.js');
    // }catch(e){}

// Task:build release files
    var tangramSrcFiles = util.listFiles(path.join(tangramSrcPath, 'baidu'));
    var tangramCompatibleContent = [], tangramBaseContent;

    tangramSrcFiles.forEach(function(file){
        tangramCompatibleContent.push(getFileContent(file));
    });
    
    //short.js需要添加到文件最后
    tangramCompatibleContent.push(fs.readFileSync('../src/baidu/short.js', 'utf8'));
    tangramCompatibleContent = tangramCompatibleContent.join('');
    tangramBaseContent = tangramCompatibleContent.replace(/\/\/\/\sTangram\s1\.x\sCode\sStart[\s\S]*?Code\sEnd/g, '');

    tangramCompatibleContent = pack( tangramCompatibleContent );
    tangramBaseContent = pack( tangramBaseContent );
    
    fs.writeFileSync('tangram_compatible_src.js', tangramCompatibleContent, 'utf-8');
    fs.writeFileSync('tangram_base_src.js', tangramBaseContent, 'utf-8');
//    exec('node tools/UglifyJS2/bin/uglifyjs tangram_compatible_src.js -o tangram_compatible.js', {}, function(error, stdout, stderr){
//        console.log(error);
//    });
//    exec('node tools/Uglify2/bin/uglifyjs tangram_base_src.js -o tangram_base.js');
    
    
    //打包fis
    fs.writeFileSync('tangram_compatible_fis.js',
        tangramCompatibleContent + '\r\nexports = baidu;\r\n',
        'utf-8');
    //打包fis
    fs.writeFileSync('tangram_base_fis.js',
        tangramBaseContent + '\r\nexports = baidu;\r\n',
        'utf-8');

//    function uglifyCompress( content, outputFile ){
//        var jsp = uglify.parser;
//        var pro = uglify.uglify;
//        var ast = jsp.parse( content ); // parse code and get the initial AST
//        ast = pro.ast_mangle( ast ); // get a new AST with mangled names
//        ast = pro.ast_squeeze( ast ); // get an AST with compression optimizations
//        content = pro.gen_code(ast); // compressed code here
//        fs.writeFileSync(outputFile, content, 'utf-8');
//    }
//    uglifyCompress( tangramCompatibleContent, "tangram_compatible.js" );
//    uglifyCompress( tangramBaseContent, "tangram_base.js" );
    function uglifyjsCompress(input, output){
        var ret = uglify.minify(input);
        fs.writeFileSync(output, ret.code, 'utf-8');
    }
    uglifyjsCompress('tangram_compatible_src.js', 'tangram_compatible.js');
    uglifyjsCompress('tangram_base_src.js', 'tangram_base.js');


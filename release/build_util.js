var fs = require("fs"),
    path = require("path");

/**
 *    列出某个目录下的所有文件
 */
function listFiles(folder){
    var items = fs.readdirSync(folder),
        _files = [];

    items.forEach(function(item){
        var pathname = path.join(folder, item),
            stats = fs.lstatSync(pathname);

        if(stats.isDirectory()){
            _files = _files.concat(listFiles(pathname));
        }else{
            /js$/.test(pathname) && _files.push(pathname);
        }
    });

    return _files;
}

/**
 *    列出某个文件内的所有import
 */
function getDependApis(content){
    var depends = [],
        reg = new RegExp('(import\\s(.*);)', 'ig');

    while(arr = reg.exec(content)){
        depends.push(RegExp.$2);
    }

    return depends;
}

/**
 *    将api名转换成某个文件夹下的文件名
 */
function api2File(api, baseSrc){

    if(!baseSrc){
        var baseSrc = '';
    }
    return path.join(baseSrc, api.replace(/\./g, '/') + '.js');
}

/**
 *    判断数组是否包含某项
 */
function arrayContains(source, item){
    return source.indexOf(item) > -1;
}

var util = {
    'listFiles': listFiles,
    'getDependApis': getDependApis,
    'api2File': api2File,
    'arrayContains': arrayContains
};

exports.util = util;
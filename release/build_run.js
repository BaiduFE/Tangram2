var fs = require("fs"),
    path = require("path"),
    exec = require('child_process').exec,
    util = require('./build_util').util;

//tangram源代码目录
var tangramSrcPath = '../src';
//需要排除的api
var excludeFiles = ['baidu.check','baidu.short'];

//已经导入的文件
var imported = [];

excludeFiles.forEach(function(file){
    imported.push(util.api2File(file, tangramSrcPath));
});

function getFileContent(file){
    var _content = '';

    if(util.arrayContains(imported, file)){
        return '';
    }

    //较旧版本Node没有existsSync方法
    if(!fs.existsSync(file)){
        return '';
    }

    imported.push(file);

    var content = fs.readFileSync(file, 'utf8');
    var dependApis = util.getDependApis(content);

    dependApis.forEach(function(dependApi){
        _content += getFileContent(util.api2File(dependApi, tangramSrcPath));
    });

    _content += content.replace(new RegExp('(\/\/\/import\\s.*;\r)',"gm"), '') + "\r\n";

    return _content;
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
    var tangramCompatibleContent = '';
    var tangramBaseContent = '';

    tangramSrcFiles.forEach(function(file){
        tangramCompatibleContent += getFileContent(file);
    });
    //short.js需要添加到文件最后
    tangramCompatibleContent += fs.readFileSync('../src/baidu/short.js', 'utf8');

    tangramBaseContent = tangramCompatibleContent.replace(/\/\/\/\sTangram\s1\.x\sCode\sStart[\s\S]*?Code\sEnd/g, '');

    fs.open("tangram_compatible_src.js", "w", 0666, function(e, fd){
        fs.writeSync(fd, tangramCompatibleContent, 0, 'utf8');
        fs.closeSync(fd);
    });
    // fs.open("tangram_compatible_fis.js", "w", 0666, function(e, fd){
    //     var fisContent = tangramCompatibleContent + "\r\nexports = baidu;\r\n";
    //     fs.writeSync(fd, fisContent, 0, 'utf8');
    //     fs.closeSync(fd);
    // });
    fs.open("tangram_base_src.js", "w", 0666, function(e, fd){        
        fs.writeSync(fd, tangramBaseContent, 0, 'utf8');
        fs.closeSync(fd);
    });
    // fs.open("tangram_base_fis.js", "w", 0666, function(e, fd){
    //     var fisContent = tangramBaseContent + "\r\nexports = baidu;\r\n";
    //     fs.writeSync(fd, fisContent, 0, 'utf8');
    //     fs.closeSync(fd);
    // });

// Task:compress release files
    exec('java -jar ../test/tools/lib/yuicompressor-2.4.2.jar --type js --charset UTF-8 tangram_compatible_src.js -o tangram_compatible.js', function(error, stdout, stderr){
        // console.log(stdout);
    });
    exec('java -jar ../test/tools/lib/yuicompressor-2.4.2.jar --type js --charset UTF-8 tangram_base_src.js -o tangram_base.js', function(error, stdout, stderr){
        // console.log(stdout);
    });
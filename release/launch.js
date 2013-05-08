void function(){
    var Import = require('./Import'),
    fs = require('fs'),
    impt = new Import(),
    blackList = ['baidu.check', 'baidu.short', 'baidu.i18n.cultures.en-US', 'baidu.i18n.currency', 'baidu.i18n.number', 'baidu.i18n.string'],
    code = [],
    imports = {};

    //
    function codeHook(code){
        return 'var T, baidu = T = function(){\n\t'+ code +'\n return baidu;\n}();';
    }
    function fisHook(code){
        return 'var baidu = require(\'tangram:base\');\n' + code + '\n exports = baidu;\n';
    }
    
    function extend(ext){
        var source = arguments[1] || {};
        Object.keys(ext).forEach(function(item){
            source[item] = ext[item];
        });
        return source;
    }
    
    blackList.forEach(function(item){
        imports[item] = 1;
    });
    impt.getPackList('baidu.*').forEach(function(item){
        code.push(impt.getCode(item, imports));
    });
    //code.push(fs.readFileSync('../src/baidu/short.js', 'utf8'));
    // ---end code是所有完整的代码
    
    
    
    var tangExt = [],
        source = Import.clear1_x(code.join(''), tangExt),// 分离成为1.x和2.x源码
        tangBase = Import.clear(codeHook(source)),//
        tangComp;
        
    tangExt.push(fs.readFileSync('../src/baidu/short.js', 'utf8'));
    tangExt = tangExt.join('');
    tangComp = Import.clear(codeHook(source + '\n' + tangExt));
    
    fs.writeFileSync('tangram_base_src.js', tangBase, 'utf-8'); // create tangram_base_src
    fs.writeFileSync('tangram_base.js', Import.uglifyjsCompress('tangram_base_src.js'), 'utf-8'); // create tangram_base_src
    fs.writeFileSync('tangram_base_fis.js', tangBase + '\n exports = baidu;\n', 'utf-8');// fis
    
    fs.writeFileSync('tangram_compatible_src.js', tangComp, 'utf-8'); // create tangram_compatible_src
    fs.writeFileSync('tangram_compatible.js', Import.uglifyjsCompress('tangram_compatible_src.js'), 'utf-8'); // create tangram_base_src
    fs.writeFileSync('tangram_compatible_fis.js', fisHook(Import.clear(tangExt)), 'utf-8');// fis


    var draggableCode = impt.getCode('plugin.draggable', extend(imports)),
        sortableCode = impt.getCode('plugin.sortable', extend(imports)),
        selectableCode = impt.getCode('plugin.selectable', extend(imports)),
        fxImpts = extend(imports);
        fxCode = [];// = impt.getCode('plugin.fx.*', extend(imports));
    
    impt.getPackList('plugin.fx.*').forEach(function(item){
        fxCode.push(impt.getCode(item, fxImpts));
    });

    draggableCode = fisHook(Import.clear(draggableCode));
    sortableCode = fisHook(Import.clear(sortableCode));
    selectableCode = fisHook(Import.clear(selectableCode));
    fxCode = fisHook(Import.clear(fxCode.join('')));

    fs.writeFileSync('draggable_fis.js', draggableCode, 'utf-8');
    fs.writeFileSync('sortable_fis.js', sortableCode, 'utf-8');
    fs.writeFileSync('selectable_fis.js', selectableCode, 'utf-8');
    fs.writeFileSync('fx_fis.js', fxCode, 'utf-8');
}();
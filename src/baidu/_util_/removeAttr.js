///import baidu._util_.propFixer;
///import baidu._util_.support.getSetAttribute;

baidu._util_.removeAttr = function(){
    var propFixer = baidu._util_.propFixer,
        core_rspace = /\s+/,
        getSetAttribute = baidu._util_.support.getSetAttribute;
    return function(ele, key){
        if(!key || ele.nodeType !==1){return;}
        var array = key.split(core_rspace),
            propName, isBool;
        for(var i = 0, attrName; attrName = array[i]; i++){
            propName = propFixer[attrName] || attrName;
            isBool = propFixer.rboolean.test(attrName);
            !isBool && baidu._util_.attr(ele, attrName, '');
            ele.removeAttribute(getSetAttribute ? attrName : propName);
            isBool && (propName in ele) && (ele[propName] = false);
        }
    }
}();
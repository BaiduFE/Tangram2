///import baidu.dom._propFixer;
///import baidu.support.getSetAttribute;

baidu.dom._removeAttr = function(){
    var propFixer = baidu.dom._propFixer,
        core_rspace = /\s+/,
        getSetAttribute = baidu.dom._support.getSetAttribute;
    return function(ele, key){
        if(!key || ele.nodeType !==1){return;}
        var array = key.split(core_rspace),
            propName, isBool;
        for(var i = 0, attrName; attrName = array[i]; i++){
            propName = propFixer[attrName] || attrName;
            isBool = propFixer.rboolean.test(attrName);
            !isBool && baidu.dom._attr(ele, attrName, '');
            ele.removeAttribute(getSetAttribute ? attrName : propName);
            isBool && (propName in ele) && (ele[propName] = false);
        }
    }
}();
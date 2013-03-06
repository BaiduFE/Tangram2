///import baidu.support.getSetAttribute;
baidu.dom._nodeHook = function(){
    if(baidu.dom._support.getSetAttribute){return;}
    var fixSpecified = {};
    fixSpecified.name = fixSpecified.id = fixSpecified.coords = true;
    return {
        get: function(ele, key){
            var ret = ele.getAttributeNode(key);
            return ret && (fixSpecified[key] ? ret.value !== '' : ret.specified) ?
                 ret.value : undefined;
        },
        set: function(ele, key, val){
            // Set the existing or create a new attribute node
            var ret = ele.getAttributeNode(key);
            if(!ret){
                ret = document.createAttribute(key);
                ele.setAttributeNode(ret);
            }
            return (ret.value = val + '');
        }
    };
}();
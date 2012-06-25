/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.makeArray;

baidu.dom.extend({
    contents: function(){
        var array = Array.prototype.slice.call(this),
            ret = [],
            nodeName;
        for(var i = 0, ele; ele = array[i]; i++){
            nodeName = ele.nodeName;
            ret.push.apply(ret, baidu.makeArray(nodeName && nodeName.toLowerCase() === 'iframe' ?
                ele.contentDocument || ele.contentWindow.document
                    : ele.childNodes));
        }
        this.length = 0;
        return baidu.merge(this, ret);
    }
});
/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom.pushStack;
///import baidu.makeArray;
/**
 * @description 取得匹配元素内部第一级的子节点，包括文本节点等，如果匹配元素是一个iframe，并且同域，则可以返回iframe的文档
 * @function 
 * @name baidu.dom().contents()
 * @grammar baidu.dom(args).contents()
 * @return {TangramDom} 接口最终返回一个匹配元素的内部所有内容的TangramDom对象
 */
baidu.dom.extend({
    contents: function(){
        var ret = [], nodeName;
        for(var i = 0, ele; ele = this[i]; i++){
            nodeName = ele.nodeName;
            ret.push.apply(ret, baidu.makeArray(nodeName && nodeName.toLowerCase() === 'iframe' ?
                ele.contentDocument || ele.contentWindow.document
                    : ele.childNodes));
        }
        return this.pushStack(ret);
    }
});
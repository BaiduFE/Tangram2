/**
 * @author linlingyu
 */
///import baidu.dom;
/**
 * @description 取得匹配元素所属的document对象
 * @function 
 * @name baidu.dom().getDocument()
 * @grammar baidu.dom(args).getDocument()
 * @return {document} 返回一个document对象
 */
/**
 * @description 获取目标元素所属的document对象
 * @function 
 * @name baidu.dom.getDocument
 * @grammar baidu.dom.getDocument(element)
 * @param {String|Element} element 目标元素或目标元素的id
 * @return {document} 返回一个document对象
 */
baidu.dom.extend({
    getDocument: function(){
        var ele = this[0];
        return ele.nodeType == 9 ? ele : ele.ownerDocument || ele.document;
    }
});
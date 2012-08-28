/**
 * @author linlingyu
 */
///import baidu.dom._smartInsert;
///import baidu.dom.getDocument;
///import baidu.merge;
/**
 * @description 在匹配的每个DOM元素前面插入新的内容
 * @function 
 * @name baidu.dom().before()
 * @grammar baidu.dom(args).before(content[, content])
 * @param {HTMLString|Element|TangramDom} content 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 在匹配的每个DOM元素前面插入新的内容
 * @function 
 * @name baidu.dom().before()
 * @grammar baidu.dom(args).before(fn)
 * @param {function} fn 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").before(function(index,html));
 */
baidu.dom.extend({
    before: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.before');
        var parentNode = this[0] && this[0].parentNode,
            array = !parentNode && [], set;
        
        baidu.dom._smartInsert(this, arguments, function(node){
            parentNode ? parentNode.insertBefore(node, this)
                : baidu.merge(array, node.childNodes);
        });
        if(array){
            array = baidu.merge(array, this);
            this.length = 0;
            baidu.merge(this, array);
        }
        return this;
    }
});
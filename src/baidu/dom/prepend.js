/**
 * @author linlingyu
 */
///import baidu.dom._smartInsert;
/**
 * @description 在匹配的每个DOM元素内部的前端插入内容
 * @function 
 * @name baidu.dom().prepend()
 * @grammar baidu.dom(args).prepend(content[, content])
 * @param {HTMLString|Element|TangramDom} content 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 在匹配的每个DOM元素内部的前端插入内容
 * @function 
 * @name baidu.dom().prepend()
 * @grammar baidu.dom(args).prepend(function(index,html))
 * @param {function} fn 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.dom.extend({
    prepend: function(){
        baidu.paramCheck('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.prepend');
        baidu.dom._smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.insertBefore(child, this.firstChild);
        });
        return this;
    }
});
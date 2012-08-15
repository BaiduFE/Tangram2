/**
 * @author linlingyu
 */
///import baidu.dom._smartInsert;

/**
 * @description 在匹配的每个DOM元素内部的末端插入内容
 * @function 
 * @name baidu.dom().append()
 * @grammar baidu.dom(args).append(content1[,content2])
 * @param {HTMLString|Element|TangramDom} content1 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content2 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description 在匹配的每个DOM元素内部的末端插入内容
 * @function 
 * @name baidu.dom().append()
 * @grammar baidu.dom(args).append(fun)
 * @param {Function} fun 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom(args).append(function(index,html){})
 */

baidu.dom.extend({
    append: function(){
        baidu.paramCheck('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.append');
        baidu.dom._smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.appendChild(child);
        });
        return this;
    }
});
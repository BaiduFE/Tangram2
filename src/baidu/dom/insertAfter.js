/**
 * @author linlingyu
 */

///import baidu.dom._smartInsertTo;
///import baidu.dom._g;
/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素的后面
 * @function 
 * @name baidu.dom().insertAfter()
 * @grammar baidu.dom(args).insertAfter(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.dom.extend({
    insertAfter: function(target){
        baidu.paramCheck('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.insertAfter');
        baidu.dom._smartInsertTo(this, target, function(node){
            this.parentNode.insertBefore(node, this.nextSibling);
        }, 'after');
        return this;
    }
});


/**
 * @description 将目标元素添加到基准元素之后
 * @function 
 * @name baidu.dom.insertAfter
 * @grammar baidu.dom.insertAfter(newElement, existElement)
 * @param {String|Element} newElement 目标元素或是元素的id字符串
 * @param {String|Element} existElement 基准元素或是元素的id字符串
 * @return {Element} 被插入的目标元素
 */
baidu.dom.insertAfter = function(newElement, existElement){
    var get = baidu.dom._g;
    return baidu.dom(get(newElement)).insertAfter(get(existElement))[0];
};
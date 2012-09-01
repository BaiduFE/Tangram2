/**
 * @author linlingyu
 */
///import baidu.dom._smartInsertTo;

/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素内部的末端
 * @function 
 * @name baidu.dom().appendTo()
 * @grammar baidu.dom(args).appendTo(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.dom.extend({
    appendTo: function(target){
        baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.appendTo');
        baidu.dom._smartInsertTo(this, target, function(child){
            this.appendChild(child);
        });
        return this;
    }
});
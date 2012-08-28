/**
 * @author linlingyu
 */
///import baidu.dom._smartInsertTo;


/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素的前面
 * @function 
 * @name baidu.dom().insertBefore()
 * @grammar baidu.dom(args).insertBefore(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.dom.extend({
    insertBefore: function(target){
        baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.insertBefore');
        baidu.dom._smartInsertTo(this, target, function(node){
            this.parentNode.insertBefore(node, this);
        }, 'before');
        return this;
    }
});

/// Tangram 1.x Code Start
///import baidu.dom._g;
/**
 * @description 将目标元素添加到基准元素之前
 * @function 
 * @name baidu.dom.insertBefore
 * @grammar baidu.dom.insertBefore(newElement, existElement)
 * @param {String|Element} newElement 目标元素或是元素的id字符串
 * @param {String|Element} existElement 基准元素或是元素的id字符串
 * @return {Element} 被插入的目标元素
 */
baidu.dom.insertBefore = function(newElement, existElement){
    var get = baidu.dom._g;
    return baidu.dom(get(newElement)).insertBefore(get(existElement))[0];
};
/// Tangram 1.x Code End

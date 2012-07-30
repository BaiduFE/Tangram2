/**
 * @author linlingyu
 */
///import baidu.dom.remove;
/**
 * @description 将匹配到的DOM元素从文档中移除，并不移除对应的DOM元素的事件
 * @function 
 * @name baidu.dom().detach()
 * @grammar baidu.dom(args).detach([selector])
 * @param {String} selector 一个字符串的选择器，对前面匹配到的DOM元素再做进一步的过滤
 * @return {TangramDom} TangramDom 接口最终返回之前匹配元素的TangramDom对象
 */
baidu.dom.extend({
    detach: function(selector){
        selector && baidu.paramCheck('^string$', 'baidu.dom.detach');
        return this.remove(selector, true);
    }
});
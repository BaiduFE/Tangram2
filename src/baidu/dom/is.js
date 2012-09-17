///import baidu.dom.match;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 根据 selector 检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true
 *
 * @function
 * @name baidu.dom().is()
 * @grammar baidu.dom(args).is(selector)
 * @param   {Object}            selector    选择器
 * @return  {Boolean}       是否符合条件
 */
baidu.dom.extend({
    is : function (selector) {
        return baidu.dom.match(this, selector).length > 0;
    }
});

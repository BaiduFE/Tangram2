///import baidu.dom.match;

/**
 * @fileoverview
 * @name baidu.dom.is
 * @author meizz
 * @create 2012-06-07
 * @modify
 */

/**
 * 根据 selector 检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true
 * @param   {$DOM|selector|function|HTMLElement}    selector
 * @return  {Boolean}
 */
baidu.dom.extend({
    is : function (selector) {
        return baidu.dom.match(this, selector).length > 0;
    }
});

///import baidu.dom;
///import baidu.each;
///import baidu.match;

/**
 * @fileoverview
 * @name baidu.dom.parent
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * 取得一个包含着所有匹配元素的唯一父元素的元素集合
 * @param   {Selector}      selector
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    parent : function (filter) {
        var array = [];

        baidu.each(this, function(dom) {
            (dom = dom.parentNode) && dom.nodeType == 1 && array.push(dom);
        });

        return baidu.dom(typeof filter == "string" ? baidu.match(array, filter) : array);
    }
});

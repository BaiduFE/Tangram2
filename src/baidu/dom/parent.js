///import baidu.dom;
///import baidu.each;
///import baidu.dom.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 取得一个包含着所有匹配元素的唯一父元素的元素集合
 *
 * @function
 * @name baidu.dom.parent
 * @grammar $DOM.parent([filter])
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    parent : function (filter) {
        var array = [];

        baidu.each(this, function(dom) {
            (dom = dom.parentNode) && dom.nodeType == 1 && array.push(dom);
        });

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});

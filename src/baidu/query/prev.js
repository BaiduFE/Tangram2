///import baidu.dom;
///import baidu.forEach;
///import baidu.query.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合
 *
 * @function
 * @name baidu.dom().prev()
 * @grammar baidu.dom(args).prev(filter)
 * @param   {Object}        filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.query.extend({
    prev : function (filter) {
        var array = [];

        baidu.forEach(this, function(dom) {
            while (dom = dom.previousSibling) {
                if (dom.nodeType == 1) {
                    array.push(dom);
                    break;
                }
            }
        });

        return baidu.dom( baidu.query.match(array, filter) );
    }
});

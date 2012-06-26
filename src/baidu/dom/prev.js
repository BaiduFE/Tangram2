///import baidu.dom;
///import baidu.each;
///import baidu.match;

/**
 * @fileoverview
 * @name baidu.dom.prev
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 *
 * @param
 * @return
 */
baidu.dom.extend({
    prev : function (filter) {
        var array = [];

        baidu.each(this, function(dom) {
            while (dom = dom.previousSibling) {
                if (dom.nodeType == 1) {
                    array.push(dom);
                    break;
                }
            }
        });

        return baidu.dom(typeof filter == "string" ? baidu.match(array, filter) : array);
    }
});

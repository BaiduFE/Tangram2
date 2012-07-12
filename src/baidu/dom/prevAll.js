///import baidu.dom;
///import baidu.each;
///import baidu.merge;
///import baidu.dom.match;
///import baidu.array.unique;

/**
 * @fileoverview
 * @name baidu.dom.prevAll
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
    prevAll : function (filter) {
        var array = [];

        baidu.each(this, function(dom) {
            var a = [];
            while (dom = dom.previousSibling) dom.nodeType == 1 && a.push(dom);

            baidu.merge(array, a.reverse());
        });
        array = baidu.array( array ).unique();

        return baidu.dom(typeof filter == "string" ? baidu.dom.match(array, filter) : array);
    }
});

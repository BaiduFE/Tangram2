///import baidu.dom;
///import baidu.each;
///import baidu.dom.match;
///import baidu.array.indexOf;

/**
 * @fileoverview
 * @name baidu.dom.prevUntil
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
    prevUntil : function (selector, filter) {
        var array = [];

        baidu.each(this, function(dom) {
            var a = baidu.array();

            while(dom = dom.previousSibling) {
                dom && (dom.nodeType == 1) && a.push(dom);
            };

            if (selector && a.length) {
                var b = baidu.dom.match(a, selector);
                // 有符合 selector 的目标存在
                if (b.length) {
                    a = a.slice(0, a.indexOf(b[0]));
                }
            }

            baidu.merge(array, a);
        });

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});

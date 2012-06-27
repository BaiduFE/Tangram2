///import baidu.dom;
///import baidu.each;
///import baidu.match;
///import baidu.unique;
///import baidu.array.indexOf;


/**
 * @fileoverview
 * @name baidu.dom.parentsUntil
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
    parentsUntil : function (selector, filter) {
        var array = [];

        baidu.each(this, function(dom){
            var a = [];

            while ((dom = dom.parentNode) && dom.nodeType == 1) a.push(dom);

            if (selector && a.length) {
                var b = baidu.match(a, selector);
                // 有符合 selector 的目标存在
                if (b.length) {
                    a = a.slice(0, a.indexOf(b[0]));
                }
            }
            baidu.merge(array, a);
        });

        array = baidu.unique(array);

        return baidu.dom(filter ? baidu.match(array, filter) : array);
    }
});

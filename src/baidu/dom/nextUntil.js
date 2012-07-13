///import baidu.dom;
///import baidu.each;
///import baidu.dom.match;
///import baidu.array.indexOf;

/**
 * @fileoverview
 * @name baidu.dom.nextUntil
 * @create 2012-06-21
 * @author meizz
 * @modify
 */

/**
 * 查找当前元素之后所有的同辈元素，直到遇到匹配的那个元素为止
 * @param
 * @return
 */
baidu.dom.extend({
    nextUntil : function (selector, filter) {
        var array = baidu.array();

        baidu.each(this, function(dom){
            var a = baidu.array();

            while(dom = dom.nextSibling) {
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

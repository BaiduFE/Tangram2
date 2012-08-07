///import baidu.dom;
///import baidu.each;
///import baidu.dom.match;
///import baidu.array.indexOf;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之前所有的同辈元素，直到遇到匹配的那个元素为止
 * @function
 * @name baidu.dom().prevUntil()
 * @grammar $DOM.prevUntil(selector[, filter])
 * @param   {Object}            selector    选择器
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    prevUntil : function (selector, filter) {
        baidu.paramCheck("(string|HTMLElement)(,.+)?", "baidu.dom.prevUntil");
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

///import baidu.dom;
///import baidu.forEach;
///import baidu.query.match;
///import baidu.array.indexOf;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素的所有的父辈元素，直到遇到匹配的那个元素为止
 *
 * @function
 * @name baidu.dom().parentsUntil()
 * @grammar baidu.dom(args).parentsUntil(selector[, filter])
 * @param   {Object}            selector    选择器
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.query.extend({
    parentsUntil : function (selector, filter) {
        baidu.check("(string|HTMLElement)(,.+)?","baidu.query.parentsUntil");
        var array = [];

        baidu.forEach(this, function(dom){
            var a = baidu.array();

            while ((dom = dom.parentNode) && dom.nodeType == 1) a.push(dom);

            if (selector && a.length) {
                var b = baidu.query.match(a, selector);
                // 有符合 selector 的目标存在
                if (b.length) {
                    a = a.slice(0, a.indexOf(b[0]));
                }
            }
            baidu.merge(array, a);
        });

        return baidu.dom( baidu.query.match(array, filter) );
    }
});

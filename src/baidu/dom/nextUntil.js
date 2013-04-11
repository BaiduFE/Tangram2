///import baidu.dom;
///import baidu.forEach;
///import baidu.dom.match;
///import baidu.dom.pushStack;
///import baidu.array.indexOf;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之后所有的同辈元素，直到遇到匹配的那个元素为止
 * @function
 * @name baidu.dom().nextUntil()
 * @grammar baidu.dom(args).nextUntil(selector[, filter])
 * @param   {Object}            selector    选择器
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    nextUntil : function (selector, filter) {
        var array = baidu.array();

        baidu.forEach(this, function(dom){
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

        return this.pushStack( baidu.dom.match(array, filter) );
    }
});

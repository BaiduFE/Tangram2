///import baidu.dom;
///import baidu.each;
///import baidu.merge;
///import baidu.dom.match;
///import baidu.array.unique;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之前所有的同辈元素
 *
 * @function
 * @name baidu.dom().prevAll()
 * @grammar $DOM.prevAll(filter)
 * @param   {Object}        filter      [可选]过滤函数
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    prevAll : function (filter) {
        var array = baidu.array();

        baidu.each(this, function(dom) {
            var a = [];
            while (dom = dom.previousSibling) dom.nodeType == 1 && a.push(dom);

            baidu.merge(array, a.reverse());
        });

        return baidu.dom(typeof filter == "string" ? baidu.dom.match(array, filter) : array.unique());
    }
});

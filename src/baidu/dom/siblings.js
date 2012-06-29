///import baidu.dom;
///import baidu.each;
///import baidu.dom.match;

/**
 * @fileoverview
 * @name baidu.dom.siblings
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * 取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选
 * @param
 * @return
 */
baidu.dom.extend({
    siblings : function (filter) {
        var array = [];

        baidu.each(this, function(dom){
            var p = [], n = [], t = dom;

            while(t = t.previousSibling) t.nodeType == 1 && p.push(t);
            while(dom = dom.nextSibling) dom.nodeType==1 && n.push(dom);

            baidu.merge(array, p.reverse().concat(n));
        });

        return baidu.dom(typeof filter == "string" ? baidu.dom.match(array, filter) : array);
    }
});

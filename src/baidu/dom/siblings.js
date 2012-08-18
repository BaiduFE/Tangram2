///import baidu.dom;
///import baidu.each;
///import baidu.dom.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选
 * @function
 * @name baidu.dom().siblings()
 * @grammar baidu.dom(args).siblings(filter)
 * @param   {Function}      fn(a, b)    [可选]
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
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

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});

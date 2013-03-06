///import baidu.dom;
///import baidu.forEach;
///import baidu.query.filter;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-11
 * @modify
 */

/**
 * @description 取得一个包含匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合
 * @function
 * @name baidu.dom().next()
 * @grammar baidu.dom(args).next([filter])
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.query.extend({
    next : function (filter) {
        var td = baidu.dom();

        baidu.forEach(this, function(dom){
            while((dom = dom.nextSibling) && dom && dom.nodeType != 1);
            dom && (td[td.length ++] = dom);
        });

        return filter ? td.filter(filter) : td;
    }
});

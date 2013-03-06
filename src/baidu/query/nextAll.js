///import baidu.dom;
///import baidu.forEach;
///import baidu.query.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-11
 * @modify
 */

/**
 * @description 查找当前元素之后所有的同辈元素
 * @function
 * @name baidu.dom().nextAll()
 * @grammar baidu.dom(args).nextAll([filter])
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.query.extend({
    nextAll : function (selector) {
        var array = [];

        baidu.forEach(this, function(dom){
            while(dom = dom.nextSibling) {
                dom && (dom.nodeType == 1) && array.push(dom);
            };
        });

        return baidu.dom( baidu.query.match(array, selector) );
    }
});

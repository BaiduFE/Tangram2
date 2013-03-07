///import baidu.dom;
///import baidu.forEach;
///import baidu.type;
///import baidu.query.each;
///import baidu.query.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-12
 * @modify
 */

/**
 * @description 所有子元素的集合
 * @function
 * @name baidu.dom().children()
 * @grammar baidu.dom(args).children(selector)
 * @param   {Object}            selector    选择器
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.query.extend({
    children : function (selector) {
        var result, a = [];

        this.each(function(index){
            baidu.forEach(this.children || this.childNodes, function(dom){
                dom.nodeType == 1 && a.push(dom);
            });
        });

        return baidu.dom( baidu.query.match(a, selector) );
    }
});


///import baidu.dom;
///import baidu.each;
///import baidu.dom.find;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前集合匹配条件的元素
 *
 * @function
 * @name baidu.dom().has()
 * @grammar baidu.dom(args).has(selector)
 * @param   {Object}            selector    选择器
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    has : function (selector) {
        var a = []
            ,td = baidu.dom(document.body);

        baidu.each(this, function(dom){
            td[0] = dom;
            td.find(selector).length && a.push(dom);
        });

        return baidu.dom(a);
    }
});

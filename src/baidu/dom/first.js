///import baidu.dom;
///import baidu.dom.children;
///import baidu.type;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 当前集合第一个元素
 *
 * @function
 * @name baidu.dom().first()
 * @grammar baidu.dom(args).first()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    first : function () {
        return baidu.dom(this[0]);
    }
});
/// Tangram 1.x Code Start
baidu.dom.first = function(e) {
    baidu.isString(e) && (e = "#"+ e);

    return baidu.dom(e).children()[0];
};
/// Tangram 1.x Code End
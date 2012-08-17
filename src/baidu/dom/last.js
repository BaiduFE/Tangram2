///import baidu.dom;
///import baidu.dom.g;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 当前集合最后一个对象
 *
 * @function
 * @name baidu.dom().last()
 * @grammar baidu.dom(args).last()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    last : function () {
        return baidu.dom(this.get(-1));
    }
});

baidu.dom.last = function(element) {
    element = baidu.dom.g(element);

    for (var node = element.lastChild; node; node = node.previousSibling) {
        if (node.nodeType == 1) {
            return node;
        }
    }

    return null;
};
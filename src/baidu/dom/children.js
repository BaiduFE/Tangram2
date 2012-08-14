///import baidu.dom;
///import baidu.each;
///import baidu.type;
///import baidu.dom.each;
///import baidu.dom.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-12
 * @modify
 */

/**
 * @description 所有了元素的集合
 *
 * @function
 * @name baidu.dom.children
 * @grammar $DOM.children(selector)
 * @param   {Object}            selector    选择器
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    children : function (selector) {
        var result, a = [];

        this.each(function(index){
            baidu.each(this.children || this.childNodes, function(dom){
                dom.nodeType == 1 && a.push(dom);
            });
        });

        return baidu.dom( baidu.dom.match(a, selector) );
    }
});

// TODO: delete it in feature
baidu.dom.children = function(dom) {
    baidu.paramCheck("string|HTMLElement","baidu.dom.children");
    return baidu.dom( baidu.isString(dom) ? "#"+ dom : dom ).children().toArray();
};

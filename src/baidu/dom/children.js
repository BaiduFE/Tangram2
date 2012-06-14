///import baidu.dom;
///import baidu.each;
///import baidu.dom.each;
///import baidu.dom.filter;

/**
 * @fileoverview
 * @name baidu.dom.children
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 *
 * @param
 * @return
 */
baidu.dom.extend({
    children : function (selector) {
        var result, a = [];

        this.each(function(index){
            baidu.each(this.children || this.childNodes, function(dom){
                dom.nodeType == 1 && a.push(dom);
            });
        });

        result = baidu.dom(a);

        return selector ? result.filter(selector) : result;
    }
});

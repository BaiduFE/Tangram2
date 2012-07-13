///import baidu.dom;
///import baidu.each;
///import baidu.dom.match;

/**
 * @fileoverview
 * @name baidu.dom.nextAll
 * @create 2012-06-21
 * @author meizz
 * @modify
 */

/**
 *
 * @param
 * @return
 */
baidu.dom.extend({
    nextAll : function (selector) {
        var array = [];

        baidu.each(this, function(dom){
            while(dom = dom.nextSibling) {
                dom && (dom.nodeType == 1) && array.push(dom);
            };
        });

        return baidu.dom( baidu.dom.match(array, selector) );
    }
});

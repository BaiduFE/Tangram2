///import baidu.dom;
///import baidu.each;
///import baidu.dom.find;

/**
 * @fileoverview
 * @name baidu.dom.has
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

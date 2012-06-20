///import baidu.dom;
///import baidu.each;
///import baidu.dom.filter;

/**
 * @fileoverview
 * @name baidu.dom.next
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
    next : function (selector) {
        var td = baidu.dom();

        baidu.each(this, function(dom){
            while((dom = dom.nextSibling) && dom && dom.nodeType != 1);
            td[td.length ++] = dom
        });

        return selector ? td.filter(selector) : td;
    }
});

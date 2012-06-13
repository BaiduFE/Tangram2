/// import baidu.dom;
/// import baidu.each;

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
    next : function () {
        var td = baidu.dom();

        baidu.each(this, function(dom){
            while((dom = dom.nextSibling) && dom && dom.nodeType != 1);
            td[td.length ++] = dom
        });

        return td;
    }
});

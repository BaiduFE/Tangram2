///import baidu.dom;
///import baidu.type;
///import baidu.dom.match;

/**
 * @fileoverview
 * @name baidu.dom.not
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
    not : function (selector) {
        var i, j, n
            ,all= this.get()
            ,a  = baidu.type(selector) == "array" ? selector
                : baidu.dom.match(this, selector);

        for (i=all.length - 1; i>-1; i--) {
            for (j=0, n=a.length; j<n; j++) {
                a[j] === all[i] && all.splice(i, 1);
            }
        }

        return baidu.dom(all);
    }
});

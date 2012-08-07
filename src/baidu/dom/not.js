///import baidu.dom;
///import baidu.type;
///import baidu.dom.match;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 去除当前集合中符合选择器的项
 *
 * @function
 * @name baidu.dom().not()
 * @grammar $DOM.not(selector[, filter])
 * @param   {Object}            selector    选择器
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    not : function (selector) {
        var i, j, n
            ,all= this.get()
            ,a  = baidu.isArray(selector) ? selector
                : baidu.dom.match(this, selector);

        for (i=all.length - 1; i>-1; i--) {
            for (j=0, n=a.length; j<n; j++) {
                a[j] === all[i] && all.splice(i, 1);
            }
        }

        return baidu.dom(all);
    }
});

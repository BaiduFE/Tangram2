///import baidu.dom;
///import baidu.array.unique;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 去重
 *
 * @function
 * @name baidu.unique
 * @grammar $DOM.unique([fn])
 * @param   {Function}      fn(a, b)    [可选]
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    unique : function (fn) {
        return baidu.dom(baidu.array(this.toArray()).unique(fn));
    }
});

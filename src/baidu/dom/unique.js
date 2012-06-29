///import baidu.dom;
///import baidu.array.unique;

/**
 * @fileoverview
 * @name baidu.dom.unique
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * 去重
 * @param   {Function}      fn(a, b)    [可选]
 * @return  {TangramDom}    new TangramDom
 */
baidu.dom.extend({
    unique : function (fn) {
        return baidu.dom(baidu.array(this.toArray()).unique(fn));
    }
});

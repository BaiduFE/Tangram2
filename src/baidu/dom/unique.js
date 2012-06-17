///import baidu.dom;
///import baidu.unique;

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
        return baidu.dom(baidu.unique(this.get(), fn));
    }
});

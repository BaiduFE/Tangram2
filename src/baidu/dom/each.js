/// import baidu.dom;

/**
 * @fileoverview
 * @name baidu.dom.each
 * @author meizz
 * @create 2012-06-05
 * @modify
 */

/**
 * 枚举当前 TangramDom 对象里的所有 DOM 元素，并执行指定的函数
 * 指定的函数参数（index[, dom]），函数里的 this 指向 DOM 元素
 * @param   {Function}      fn  迭代器
 * @return  {TangramDom}        tangramDom(this)
 */
baidu.dom.extend({
    each : function (fn) {
        var i,
            n = this.length;

        for (i=0; i<n; i++) {
            fn.call(this[i], i, this[i]);
        }

        return this;
    }
});

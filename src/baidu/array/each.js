///import baidu.array;

///import baidu.each;

/**
 * 枚举数组的每一项，作为指定函数执行的参数
 * 
 * @author: meizz
 * @namespace: baidu.array.each;
 * @create: 2010-01-23
 * @version: 2012-04-24
 *
 */
(function (fn) {
    baidu.array.extend({
        each : fn,
        forEach : fn
    });
})(
    function(iterator, context) {
        return baidu.each(this, iterator, context);
    }
);
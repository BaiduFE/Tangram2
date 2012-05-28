/// include baidu;

/**
 * @fileoverview
 * @name baidu.each
 * @author meizz
 * @create 2012-05-20
 * @modify 
 */

/**
 * 对 ArrayLike 中的每一个元素都进行指定函数操作
 * 
 * @param   {Object}        object
 * @param   {Function}      fn
 * @param   {object}       context
 */
baidu.each = function( object, fn, context ) {
    var i = 0,
        result,
        n = object.length;

    if (typeof fn == "function") {

        for (; i<n; i++) { /* array*/
            //被循环执行的函数，默认会传入三个参数(array[i], i, array)
            result = fn.call(context||null, object[i], i, object);

            //被循环执行的函数的返回值若为"continue"和"break"时可以影响each方法的流程
            if (result === false || result == "break") {break;}
        }
    }
    return object;
};
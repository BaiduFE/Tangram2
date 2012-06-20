///import baidu;
/**
 * @fileoverview
 * @name baidu.each
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * 对 ArrayLike 中的每一个元素都进行指定函数操作
 * @grammer baidu.each(ArrayLike, fn[, context])
 * @grammer baidu.each(JSON, fn[, context])
 * @param   {Object}        object      Array or ArrayLike or JSON
 * @param   {Function}      fn          function(array[i], i, array)
 * @param   {Object}        context     context.fn()
 * @param   {Object}        object
 */
baidu.each = function( object, fn, context ) {
    if (typeof fn != "function") {return object;}

    var i, n, result;

    // Array or ArrayLike
    if (typeof object.length == "number") {

        for (i=0, n=object.length; i<n; i++) { /* array*/
            //被循环执行的函数，默认会传入三个参数(array[i], i, array)
            result = fn.call(context || null, object[i], i, object);

            //被循环执行的函数的返回值若为"continue"和"break"时可以影响each方法的流程
            if (result === false || result == "break") {return object;}
        }
    
    // JSON
    } else {
        for (i in object) {
            result = fn.call(context||null, object[i], i, object);
            if (result === false || result == "break") {return object;}
        }
    }
    return object;
};
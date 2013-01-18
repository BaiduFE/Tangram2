///import baidu.array;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 遍历数组每一项，判断是否全部符合指定的条件
 *
 * @name baidu.array.every
 * @function
 * @grammar array.every(iterator[, context])
 * @param   {Function}      iterator  用于做对比的函数
 * @param   {Object}        context   方法作用域
 * @return  {Boolean}           是否全部满足条件
 */
/**
 * @description 遍历数组每一项，判断是否全部符合指定的条件
 *
 * @name baidu.array().every()
 * @function
 * @grammar array.every(iterator[, context])
 * @param   {Function}      iterator  用于做对比的函数
 * @param   {Object}        context   方法作用域
 * @return  {Boolean}           是否全部满足条件
 */
/// Tangram 1.x Code Start
// TODO: delete in tangram 3.0
baidu.array.every = function(source, iterator, thisObject) {
    var i = 0,
        len = source.length;
    for (; i < len; i++) {
        if (i in source && !iterator.call(thisObject || source, source[i], i)) {
            return false;
        }
    }
    return true;
};
/// Tangram 1.x Code End

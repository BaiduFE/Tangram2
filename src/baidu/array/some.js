///import baidu.array;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 遍历当前数组是否拥有指定的条件
 *
 * @name baidu.array.some
 * @function
 * @grammar array.some(fn[, context])
 * @param   {Function}      fn      用于做判断的函数
 * @param   {Object}        context 指定方法作用域
 * @return  {Boolean}               是否含有指定条件
 */
/// Tangram 1.x Code Start
// TODO: delete in tangram 3.0
baidu.array.some = function(source, iterator, thisObject) {
    var i = 0,
        len = source.length;
    for (; i < len; i++) {
        if (i in source && iterator.call(thisObject || source, source[i], i)) {
            return true;
        }
    }
    return false;
};
/// Tangram 1.x Code End

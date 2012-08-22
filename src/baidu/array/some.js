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
 * @grammar array.some(iterator[, context])
 * @param   {Function}      fn      用于做判断的函数
 * @param   {Object}        context 指定方法作用域
 * @return  {Boolean}               是否含有指定条件
 */

/**
 * @description 遍历当前数组是否拥有指定的条件
 *
 * @name baidu.array().some()
 * @function
 * @grammar array.some(iterator[, context])
 * @param   {Function}      fn      用于做判断的函数
 * @param   {Object}        context 指定方法作用域
 * @return  {Boolean}               是否含有指定条件
 */
Array.prototype.some = function(iterator, context){
    baidu.paramCheck("function(,.+)?", "baidu.array.some");
    var i, n;

    for (i=0, n=this.length; i<n; i++) {
        if (iterator.call(context || this, this[i], i, this)) {
            return true;
        }
    }
    return false;
};
/// Tangram 1.x Code Start
// TODO: delete in tangram 3.0
baidu.array.some = function(array, iterator, context) {
    return array.some(iterator, context);
};
/// Tangram 1.x Code End

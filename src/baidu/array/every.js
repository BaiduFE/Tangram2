///import baidu.array;
///import baidu.type;
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
Array.prototype.every = function(iterator, context) {
    baidu.paramCheck("function(,.+)?", "baidu.array.every");
    var i, n;

    for (i=0, n=this.length; i<n; i++) {
        if (!iterator.call(context || this, this[i], i, this)) {
            return false;
        }
    }
    return true;
};
/// Tangram 1.x Code Start
// TODO: delete in tangram 3.0
baidu.array.every = function(array, iterator, context) {
    return baidu.isArray(array) ? array.every(iterator, context) : array;
};
/// Tangram 1.x Code End
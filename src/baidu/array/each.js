///import baidu.array;
///import baidu.each;

/**
 * @fileoverview
 * @name baidu.array.each
 * @author meizz
 * @create 2012-06-18
 * @modify
 */

/**
 * 枚举数组的每一项，作为指定函数执行的参数
 * 
 * @param   {Function}      iterator(item, index, array)    枚举器，函数
 * @param   {Object}        context                         方法作用域
 * @return  {TangramArray}
 */
void function () {
    var fn = function(iterator, context) {
        return baidu.each(this, iterator, context);
    };

    Array.prototype.each = fn
    Array.prototype.forEach = fn

    // TODO: delete in tangram 3.0
    baidu.array.each = baidu.array.forEach = function(array, iterator, context) {
        return array.each(iterator, context);
    };
}();
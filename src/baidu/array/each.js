///import baidu.type;
///import baidu.array;
///import baidu.each;
///import baidu.forEach;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 遍历数组里的每一项进行指定操作
 *
 * @name baidu.array.each
 * @function
 * @grammar array.each(iterator[, context])
 * @param   {Function}      iterator(item, index, array)    枚举器，函数
 * @param   {Object}        context                         方法作用域
 * @return  {Array}         数组
 */
/**
 * @description 遍历数组里的每一项进行指定操作
 *
 * @name baidu.array().each()
 * @function
 * @grammar array.each(iterator[, context])
 * @param   {Function}      iterator(item, index, array)    枚举器，函数
 * @param   {Object}        context                         方法作用域
 * @return  {Array}         数组
 */
void function () {

    Array.prototype.each = function(iterator, context){
        return baidu.each(this, iterator, context);
    };
    
    Array.prototype.forEach = function(iterator, context){
        return baidu.forEach(this, iterator, context);
    };

    // TODO: delete in tangram 3.0
    baidu.array.each = baidu.array.forEach = function(array, iterator, context) {
        var fn = function(index, item, array){
            return iterator.call(context || array, item, index, array);
        };
        return baidu.isEnumerable(array) ? baidu.each(array, typeof iterator == "function" ? fn : "", context) : array;
    };
}();
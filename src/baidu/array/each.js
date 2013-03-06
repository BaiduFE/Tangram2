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
 * @grammar array.each(iterator[,context])
 * @param   {Function}      iterator(item,index,array)    枚举器，函数
 * @param   {Object}        context                         方法作用域
 * @return  {Array}         数组
 */
/**
 * @description 遍历数组里的每一项进行指定操作
 *
 * @name baidu.array().each()
 * @function
 * @grammar array.each(iterator[,context])
 * @param   {Function}      iterator(item,index,array)    枚举器，函数
 * @param   {Object}        context                         方法作用域
 * @return  {Array}         数组
 */
baidu.array.extend({
    each: function(iterator, context){
        return baidu.each(this, iterator, context);
    },
    
    forEach: function(iterator, context){
        return baidu.forEach(this, iterator, context);
    }
});
///import baidu.array;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 过滤数组
 *
 * @name baidu.array.filter
 * @function
 * @grammar array.filter(iterator[, context])
 * @param   {Function}      iterator 用于做过滤的函数
 * @param   {context}       context  方法作用域
 * @return  {Array}             已经过滤后的数组
 */
/**
 * @description 过滤数组
 *
 * @name baidu.array().filter()
 * @function
 * @grammar array.filter(iterator[, context])
 * @param   {Function}      iterator 用于做过滤的函数
 * @param   {context}       context  方法作用域
 * @return  {Array}             已经过滤后的数组
 */
/// Tangram 1.x Code Start
// TODO: delete in tangram 3.0
baidu.array.filter = function (source, iterator, thisObject) {
    var result = [],
        resultIndex = 0,
        len = source.length,
        item,
        i;
    
    if ('function' == typeof iterator) {
        for (i = 0; i < len; i++) {
            item = source[i];
            //TODO
            //和标准不符，see array.each
            if (true === iterator.call(thisObject || source, item, i)) {
                // resultIndex用于优化对result.length的多次读取
                result[resultIndex++] = item;
            }
        }
    }
    
    return result;
};
/// Tangram 1.x Code End

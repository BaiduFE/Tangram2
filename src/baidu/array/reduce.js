///import baidu.array;
///import baidu.type;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 遍历数组中所有元素，将每一个元素应用方法进行合并，并返回合并后的结果。
 *
 * @name baidu.array.reduce
 * @function
 * @grammar array.reduce(iterator[, initializer])
 * @param   {Function}      iterator    指定项的索引位置
 * @param   {Function}      initializer 指定项的索引位置
 * @return  {Object}                    iterator计算后的结果
 */

/**
 * @description 遍历数组中所有元素，将每一个元素应用方法进行合并，并返回合并后的结果。
 *
 * @name baidu.array().reduce()
 * @function
 * @grammar array.reduce(iterator[, initializer])
 * @param   {Function}      iterator    指定项的索引位置
 * @param   {Function}      initializer 指定项的索引位置
 * @return  {Object}                    iterator计算后的结果
 */
Array.prototype.reduce = function (iterator, initializer) {
    baidu.check("function(,.+)?","baidu.array.reduce");
    var i = 0, 
        n = this.length,
        found = false;

    if (typeof initializer == "undefined") {
        initializer = this[i++];

        if (typeof initializer == "undefined") {
            return ;
        }
    }

    for (; i < n; i++) {
        initializer = iterator(initializer, this[i] , i , this);
    }
    return initializer;
};
/// Tangram 1.x Code Start
// TODO: delete in tangram 3.0
baidu.array.reduce = function(array, iterator, initializer) {
    return baidu.isArray(array) ? array.reduce(iterator, initializer) : array;
};
/// Tangram 1.x Code End

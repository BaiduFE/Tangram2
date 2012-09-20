///import baidu.array;
///import baidu.type;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 数组映射
 *
 * @name baidu.array.map
 * @function
 * @grammar baidu.array(array).map(iterator,context)
 * @param   {Function}      iterator    指定的执行方法
 * @param   {Object}        context     方法作用域
 * @return  {Array}                     映射操作后的数组
 */

Array.prototype.map = function (iterator, context) {
    baidu.check("function(,.+)?","baidu.array.map");
    var i, n,
        array = baidu.array([]);

    for (i=0, n=this.length; i < n; i++) {
        array[i] = iterator.call(context || this, this[i], i, this);
    }
    return array;
};
/// Tangram 1.x Code Start
baidu.array.map = function(array, iterator, context){
    return baidu.isArray(array) ? array.map(iterator, context) : array;
};
/// Tangram 1.x Code End

///import baidu.type;

/**
 * @fileoverview
 * @name baidu.type.isArray
 * @author meizz
 * @create 2012-06-28
 * @modify
 */

/**
 * 判断对象是不是数组
 *
 * @param   {Object}    any     被判断的对象
 * @return  {String}            对象类型名
 */
baidu.type.isArray = function(any) {
    return baidu.type(any) === "array";
};
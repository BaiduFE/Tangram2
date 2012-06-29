///import baidu.type;

/**
 * @fileoverview
 * @name baidu.type.isBoolean
 * @author meizz
 * @create 2012-06-28
 * @modify
 */

/**
 * 判断对象是不是 Boolean
 *
 * @param   {Object}    unknow     被判断的对象
 * @return  {Boolean}
 */
baidu.type.isBoolean = function(unknow) {
    return baidu.type(unknow) === "boolean";
};
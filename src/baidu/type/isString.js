///import baidu.type;

/**
 * @fileoverview
 * @name baidu.type.isString
 * @author meizz
 * @create 2012-06-28
 * @modify
 */

/**
 * 判断对象是不是 String
 *
 * @param   {Object}    unknow     被判断的对象
 * @return  {Boolean}
 */
baidu.type.isString = function(unknow) {
    return baidu.type(unknow) === "string";
};
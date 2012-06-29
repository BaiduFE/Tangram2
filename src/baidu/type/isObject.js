///import baidu.type;

/**
 * @fileoverview
 * @name baidu.type.isObject
 * @author meizz
 * @create 2012-06-28
 * @modify
 */

/**
 * 判断对象是不是 Object
 *
 * @param   {Object}    unknow     被判断的对象
 * @return  {Boolean}
 */
baidu.type.isObject = function(unknow) {
    return typeof unknow === "object" && unknow != null;
};
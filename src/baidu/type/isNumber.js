///import baidu.type;

/**
 * @fileoverview
 * @name baidu.type.isNumber
 * @author meizz
 * @create 2012-06-28
 * @modify
 */

/**
 * 判断对象是不是 Number
 *
 * @param   {Object}    unknow  被判断的对象
 * @return  {Boolean}
 */
baidu.type.isNumber = function(unknow) {
    return baidu.type(unknow) === "number";
};
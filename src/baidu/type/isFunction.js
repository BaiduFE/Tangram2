///import baidu.type;

/**
 * @fileoverview
 * @name baidu.type.isFunction
 * @author meizz
 * @create 2012-06-28
 * @modify
 */

/**
 * 判断对象是不是 Function
 *
 * @param   {Object}    unknow     被判断的对象
 * @return  {Boolean}
 */
baidu.type.isFunction = function(unknow) {
    return baidu.type(unknow) === "function";
};
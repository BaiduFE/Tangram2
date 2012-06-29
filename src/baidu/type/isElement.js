///import baidu.type;

/**
 * @fileoverview
 * @name baidu.type.isElement
 * @author meizz
 * @create 2012-06-28
 * @modify
 */

/**
 * 判断对象是不是 HTMLElement
 *
 * @param   {Object}    unknow     被判断的对象
 * @return  {Boolean}
 */
baidu.type.isElement = function(unknow) {
    return baidu.type(unknow) === "HTMLElement";
};
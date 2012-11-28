/// support magic - Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description  获取目标元素的属性值
 * @function 
 * @name baidu.dom.getAttr
 * @grammar baidu.dom(args).getAttr(attributeName)
 * @param {String} attributeName  要获取的attribute键名
 * @return {string|null} 目标元素的attribute值，获取不到时返回null
 */
 /**
 * @description  获取目标元素的属性值
 * @function 
 * @name baidu.dom.getAttr
 * @grammar baidu.dom.getAttr(element,attributeName)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {String} attributeName  要获取的attribute键名
 * @return {string|null} 目标元素的attribute值，获取不到时返回null
 */

///import baidu.dom.g;
///import baidu.dom.attr;
baidu.dom.getAttr = function(element, key){
    return baidu.dom(baidu.dom.g(element)).attr(key);
}
/// support magic - Tangram 1.x Code End

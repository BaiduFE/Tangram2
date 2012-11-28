///import baidu.dom.g;
///import baidu.dom.attr;

/// Tangram 1.x Code Start
/**
 * @description 设置目标元素的attribute值
 * @function 
 * @name baidu.dom.setAttr
 * @grammar baidu.dom(args).setAttr(attributeName,value)
 * @param {String} attributeName  要设置的attribute键名
 * @param {String} value 要设置的attribute值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
 /**
 * @description 设置目标元素的attribute值
 * @function 
 * @name baidu.dom.setAttr
 * @grammar baidu.dom.setAttr(element,attributeName,value)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {String} attributeName  要设置的attribute键名
 * @param {String} value 要设置的attribute值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.dom.setAttr = function (element, key, value) {
    return baidu.dom(baidu.dom.g(element)).attr(key, value).get(0);
};
/// Tangram 1.x Code End

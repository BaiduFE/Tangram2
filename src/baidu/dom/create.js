///import baidu.dom.setAttr;
/**
 * 创建 Element 对象。
 * @author berg
 * @name baidu.dom.create
 * @function
 * @grammar baidu.dom.create(tagName[, options])
 * @param {string} tagName 标签名称.
 * @param {Object} opt_attributes 元素创建时拥有的属性，如style和className.
 * @version 1.3
 * @meta standard
 * @returns {HTMLElement} 创建的 Element 对象
 */
baidu.dom.create = function(tagName, opt_attributes) {
    var el = document.createElement(tagName),
        attributes = opt_attributes || {};
    for(var i in attributes){
        baidu.dom.setAttr(el, i, attributes[i]);
    }
    return el;
};

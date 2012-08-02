/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.dom.setAttr;

/**
 * 批量设置目标元素的attribute值
 * @name baidu.dom.setAttrs
 * @function
 * @grammar baidu.dom.setAttrs(element, attributes)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {Object} attributes 要设置的attribute集合
 * @shortcut setAttrs
 * @meta standard
 * @see baidu.dom.setAttr,baidu.dom.getAttr
 *             
 * @returns {HTMLElement} 目标元素
 */

baidu.dom.extend({
setAttrs : function (attributes) {
    element = this[0];

    for (var key in attributes) {
        baidu.dom.setAttr(element, key, attributes[key]);
    }

    return element;
}	
});

// 声明快捷方法
baidu.setAttrs = baidu.dom.setAttrs;
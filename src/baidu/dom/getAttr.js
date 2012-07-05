/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.dom._NAME_ATTRS;

/**
 * 获取目标元素的属性值
 * @name baidu.dom.getAttr
 * @function
 * @grammar baidu.dom.getAttr(element, key)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} key 要获取的attribute键名
 * @shortcut getAttr
 * @meta standard
 * @see baidu.dom.setAttr,baidu.dom.setAttrs
 *             
 * @returns {string|null} 目标元素的attribute值，获取不到时返回null
 */
baidu.dom.extend({
getAttr : function (key) {
    element = this[0];

    if ('style' == key){
        return element.style.cssText;
    };

    key = baidu.dom._NAME_ATTRS[key] || key;
    return element.getAttribute(key);
}
});

// 声明快捷方法
baidu.getAttr = baidu.dom.getAttr;

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu
///import baidu.dom._NAME_ATTRS;

/**
 * 设置目标元素的attribute值
 * @name baidu.dom.setAttr
 * @function
 * @grammar baidu.dom.setAttr(element, key, value)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} key 要设置的attribute键名
 * @param {string} value 要设置的attribute值
 * @remark
 * 
            设置object的自定义属性时，由于浏览器限制，无法设置。
        
 * @shortcut setAttr
 * @meta standard
 * @see baidu.dom.getAttr,baidu.dom.setAttrs
 *             
 * @returns {HTMLElement} 目标元素
 */
 
baidu.dom.extend({
setAttr : function (key, value) {
	var element = this[0];
    if ('style' == key){
        element.style.cssText = value;
    } else {
        key = baidu.dom._NAME_ATTRS[key] || key;
        element.setAttribute(key, value);
    }

    return element;
}	
});

// 声明快捷方法
baidu.setAttr = baidu.dom.setAttr;
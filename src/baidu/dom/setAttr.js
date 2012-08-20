/// Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
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
///import baidu;
///import baidu.dom._NAME_ATTRS;

 
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
/// Tangram 1.x Code End
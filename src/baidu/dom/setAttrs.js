/// Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 批量设置目标元素的attribute值
 * @function 
 * @name baidu.dom.setAttrs
 * @grammar baidu.dom.setAttrs(element,object)
 * @param {DOMElement|string} element DOM元素或元素的id
 * @param {Object} object 要设置的attribute属性的键值对
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

///import baidu;
///import baidu.dom;
///import baidu.dom.setAttr;

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
/// Tangram 1.x Code End
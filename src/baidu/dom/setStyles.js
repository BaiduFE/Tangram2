/// Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.dom.setStyle;

/**
 * 批量设置目标元素的style样式值
 * @name baidu.dom.setStyles
 * @function
 * @grammar baidu.dom.setStyles(element, styles)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {Object} styles 要设置的样式集合
 * @shortcut setStyles
 * @meta standard
 * @see baidu.dom.setStyle,baidu.dom.getStyle
 *             
 * @return {HTMLElement} 目标元素
 */
baidu.dom.extend({
setStyles : function ( styles) {
    element = this[0];

    for (var key in styles) {
        baidu.dom.setStyle(element, key, styles[key]);
    }

    return element;
}	
});


// 声明快捷方法
baidu.setStyles = baidu.dom.setStyles;
/// Tangram 1.x Code End

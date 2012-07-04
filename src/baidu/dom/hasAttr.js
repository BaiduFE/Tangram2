/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;

/**
 * 查询一个元素是否包含指定的属性
 * @name baidu.dom.hasAttr
 * @function
 * @grammar baidu.dom.hasAttr(element, name)
 * @param {DOMElement|string} element DOM元素或元素的id
 * @param {string} name 要查找的属性名
 * @version 1.3
 *             
 * @returns {Boolean} 是否包含此属性        
 */
baidu.dom.extend({
hasAttr : function (name){
    element = this[0];
    var attr = element.attributes.getNamedItem(name);
    return !!( attr && attr.specified );
}
});

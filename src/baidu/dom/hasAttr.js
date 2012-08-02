/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 查询一个元素是否包含指定的属性
 * @function 
 * @name baidu.dom.hasAttr
 * @grammar baidu.dom(args).hasAttr(attributeName)
 * @param {String} attributeName 要查找的属性名
 * @return {Boolean} 是否包含此属性
 */
/**
 * @description 查询一个元素是否包含指定的属性
 * @function 
 * @name baidu.dom.hasAttr
 * @grammar baidu.dom.hasAttr(element,attributeName)
 * @param {DOMElement|string} element DOM元素或元素的id
 * @param {String} attributeName 要查找的属性名
 * @return {Boolean} 是否包含此属性
 */


///import baidu;
///import baidu.dom;

baidu.dom.extend({
hasAttr : function (name){
    element = this[0];
    var attr = element.attributes.getNamedItem(name);
    return !!( attr && attr.specified );
}
});

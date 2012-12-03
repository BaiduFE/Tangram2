///import baidu.dom;

/// Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 获得元素中的文本内容
 * @function 
 * @name baidu.dom.getText
 * @grammar baidu.dom(args).getText()
 * @param {Null} null 不传入任何函数
 * @return {String} 元素中文本的内容。
 */
/**
 * @description 获得元素中的文本内容
 * @function 
 * @name baidu.dom.getText
 * @grammar baidu.dom.getText(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {Null} null 不传入任何函数
 * @return {String} 元素中文本的内容。
 */
baidu.dom.extend({
    getText : function () {
        var ret = "", childs, i=0, l,
        element = this[0];
        //  text 和 CDATA 节点，取nodeValue
        if ( element.nodeType === 3 || element.nodeType === 4 ) {
            ret += element.nodeValue;
        } else if ( element.nodeType !== 8 ) {// 8 是 comment Node
            childs = element.childNodes;
            for(l = childs.length; i < l; i++){
                ret += baidu.dom.getText(childs[i]);
            }
        }
        return ret;
    }
}); 
/// Tangram 1.x Code End

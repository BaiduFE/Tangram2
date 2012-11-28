///import baidu.dom.offset;
///import baidu.dom.g;

/// Tangram 1.x Code Start
/**
 * 设置目标元素的top和left值到用户指定的位置
 * 
 * @name baidu.dom.setPosition
 * @function
 * @grammar baidu.dom.setPosition(element, position)
 * 
 * @param {HTMLElement|string}  element     目标元素或目标元素的id
 * @param {object}              position    位置对象 {top: {number}, left : {number}}
 *
 * @return {HTMLElement}  进行设置的元素
 */
baidu.dom.setPosition = function(element, coordinate){
    element = baidu.dom.g(element);
    baidu.dom(element).offset(coordinate);
    return element;
}
/// Tangram 1.x Code End
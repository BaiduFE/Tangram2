///import baidu.dom.offset;
///import baidu.dom.g;

/// Tangram 1.x Code Start
/**
 * 获取目标元素相对于整个文档左上角的位置
 * @name baidu.dom.getPosition
 * @function
 * @grammar baidu.dom.getPosition(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @meta standard
 *             
 * @return {Object} 目标元素的位置，键值为top和left的Object。
 */
baidu.dom.getPosition = function(element){
    return baidu.dom(baidu.dom.g(element)).offset();
}
/// Tangram 1.x Code End
/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._cleanData;
/**
 * @description 将匹配到的DOM元素的内部内容全部清空
 * @function 
 * @name baidu.dom().empty()
 * @grammar baidu.dom(args).empty()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 删除一个节点下面的所有子节点
 * @function 
 * @name baidu.dom.empty
 * @grammar baidu.dom.empty(element)
 * @param {String|Element} element 目标元素或目标元素的id
 * @return {Element} 目标元素
 */
baidu.dom.extend({
    empty: function(){
        for(var i = 0, item; item = this[i]; i++){
            item.nodeType === 1 && baidu.dom._cleanData(item.getElementsByTagName('*'));
            while(item.firstChild){
                item.removeChild(item.firstChild);
            }
        }
        return this;
    }
});
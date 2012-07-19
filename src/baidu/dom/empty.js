/**
 * @author linlingyu
 */
///import baidu.dom;
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
        var len = this.length,
            item;
        for(var i = 0; i < len; i++){
            //TODO clean data
            item = this[i];
            while(item.firstChild){
                item.removeChild(item.firstChild);
            }
        }
        return this;
    }
});
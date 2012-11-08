/**
 * @author linlingyu
 */
 
///import baidu.dom.filter;
///import baidu._util_.cleanData;
/**
 * @description 将匹配到的DOM元素从文档中移除，并移除对应的DOM元素的事件
 * @function 
 * @name baidu.dom().remove()
 * @grammar baidu.dom(args).remove([selector])
 * @param {String} selector 一个字符串的选择器，对前面匹配到的DOM元素再做进一步的过滤
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example
 该方法会移除掉匹配元素及其子元素，并且移除已经绑定在元素上面的事件。

 示例代码：
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>

 //清除div中的内容
 baidu('div').remove('h1');

 //结果：
 <div>
    <h2>test2</h2>
 </div>

 */

/**
 * @description 从DOM树上移除目标元素
 * @function 
 * @name baidu.dom.remove
 * @grammar baidu.dom.remove(element)
 * @param {String|Element} element 需要移除的元素或元素的id
 * @return {Element} 被移除的DOM元素
 */
baidu.dom.extend({
    remove: function(selector, keepData){
        arguments.length > 0
            && baidu.check('^string(?:,boolean)?$', 'baidu.dom.remove');
        var array = selector ? this.filter(selector) : this;
        for(var i = 0, ele; ele = array[i]; i++){
           if(!keepData && ele.nodeType === 1){
               baidu._util_.cleanData(ele.getElementsByTagName('*'));
               baidu._util_.cleanData([ele]);
            }
            ele.parentNode && ele.parentNode.removeChild(ele);
        }
        return this;
    }
});
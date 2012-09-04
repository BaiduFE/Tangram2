/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu._util_.cleanData;

/**
 * @description 将匹配到的DOM元素的内部内容全部清空
 * @function 
 * @name baidu.dom().empty()
 * @grammar baidu.dom(args).empty()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该方法会移除掉匹配元素中的元素，但是该方法不会去移除已经绑定在元素上面的事件，
 如果要移除已经绑定的事件，使用.remove()方法。

 示例代码：
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>

 //清除div中的内容
 baidu('div').empty();

 //结果：
 <div>
 </div>

 */


baidu.dom.extend({
    empty: function(){
        for(var i = 0, item; item = this[i]; i++){
            item.nodeType === 1 && baidu._util_.cleanData(item.getElementsByTagName('*'));
            while(item.firstChild){
                item.removeChild(item.firstChild);
            }
        }
        return this;
    }
});

/// Tangram 1.x Code Start

/**
 * @description 删除一个节点下面的所有子节点
 * @function 
 * @name baidu.dom.empty
 * @grammar baidu.dom.empty(element)
 * @param {String|Element} element 目标元素或目标元素的id
 * @return {Element} 目标元素
 */

/// Tangram 1.x Code End
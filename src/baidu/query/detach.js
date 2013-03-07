/**
 * @author linlingyu
 */
///import baidu.query.remove;
/**
 * @description 将匹配到的DOM元素从文档中移除，并不移除对应的DOM元素的事件
 * @function 
 * @name baidu.dom().detach()
 * @grammar baidu.dom(args).detach([selector])
 * @param {String} selector 一个字符串的选择器，对前面匹配到的DOM元素再做进一步的过滤
 * @return {TangramDom} TangramDom 接口最终返回之前匹配元素的TangramDom对象
 * @example
 .detach()和.remove()都会移除匹配到的dom元素，但是.detach()不会移除dom上面匹配到的事件，
 当需要移走一个元素，不久又将该元素插入DOM时，这种方法很有用。

 注意：如果移除元素后，并不会再次插入，建议使用.remove()方法，以防止可能存在的内存泄露。

 示例代码：
 //HTML代码片段
 <div id="body">
   <h1>test</h1>
 </div>

 //移除<h1>，如果有绑定事件，此时事件并没有移除。
 //如果立刻还会添加该元素，则效率较高；
 //如果不会再次添加该元素，遗留的事件绑定可能会造成内存泄露，实现移除元素和事件使用.remove()；
 baidu('#body').detach('h1');

 */

baidu.query.extend({
    detach: function(selector){
        selector && baidu.check('^string$', 'baidu.query.detach');
        return this.remove(selector, true);
    }
});
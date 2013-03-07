/**
 * @author linlingyu
 */
///import baidu.dom._smartInsert;
/**
 * @description 在匹配的每个DOM元素内部的前端插入内容
 * @function 
 * @name baidu.dom().prepend()
 * @grammar baidu.dom(args).prepend(content1[, content2])
 * @param {HTMLString|Element|TangramDom} content1 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content2 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 .prepend()方法将指定元素插入到匹配元素里面作为它的第一个子元素，如果要作为最后一个子元素插入用.append()。
 .prepend()和.prependTo()实现同样的功能，主要的不同时语法，插入的内容和目标的位置不同。 
 对于.prepend()，函数前面的是插入的容器，参数是内容；而.prependTo()函数前面的是内容，参数是容器。

 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素后面
 baidu('#body').prepend('<h1>test1</h1>');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素的里面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('#body').append(baidu('h1'));  //结果同上
 */
/**
 * @description 在匹配的每个DOM元素内部的前端插入内容
 * @function 
 * @name baidu.dom().prepend()
 * @grammar baidu.dom(args).prepend(fn)
 * @param {function} fn 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").prepend(function(index,html))
 */
baidu.query.extend({
    prepend: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.query.prepend');
        baidu.dom._smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.insertBefore(child, this.firstChild);
        });
        return this;
    }
});
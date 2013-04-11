/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom.pushStack;
///import baidu._util_.smartInsertTo;
/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素内部的开始
 * @function 
 * @name baidu.dom().prependTo()
 * @grammar baidu.dom(args).prependTo(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 .prependTo()方法将指定元素插入到匹配元素里面作为它的第一个子元素，如果要作为最后一个子元素插入用.append()。
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
 baidu('<h1>test1</h1>').prependTo('#body');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素的里面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('h1').appendTo('#body');  //结果同上
 */
baidu.dom.extend({
    prependTo: function(target){
        var ret = [];
        baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.prependTo');
        baidu._util_.smartInsertTo(this, target, function(child){
            this.insertBefore(child, this.firstChild);
            ret.push( child );
        });
        return this.pushStack( ret );
    }
});
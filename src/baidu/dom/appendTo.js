/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu._util_.smartInsertTo;

/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素内部的末端
 * @function 
 * @name baidu.dom().appendTo()
 * @grammar baidu.dom(args).appendTo(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 .appendTo()函数将特定内容插入到每个匹配元素里面的最后面，作为它的最后一个子元素（last child）, 
 如果要作为第一个子元素 （first child），用.prepend()或.prependTo()
 
 .append() 和.appendTo()实现同样的功能，主要的不同是语法——内容和目标的位置不同。
 对于.append()，选择表达式在函数的前面，参数是将要插入的内容。
 对于.appendTo()刚好相反，内容在方法前面，它将被放在参数里元素的末尾。

 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素后面
 baidu('<h2>footer</h2>').appendTo(baidu('#body'));

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素后面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('h2').after(baidu('#body'));  //结果同上

 */
baidu.dom.extend({
    appendTo: function(target){
        baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.appendTo');
        baidu._util_.smartInsertTo(this, target, function(child){
            this.appendChild(child);
        });
        return this;
    }
});
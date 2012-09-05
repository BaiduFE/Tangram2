/**
 * @author linlingyu
 */

///import baidu.dom;
///import baidu._util_.smartInsert;

/**
 * @description 在匹配的每个DOM元素内部的末端插入内容
 * @function 
 * @name baidu.dom().append()
 * @grammar baidu.dom(args).append(content1[,content2])
 * @param {HTMLString|Element|TangramDom} content1 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content2 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 .append()函数将特定内容插入到每个匹配元素里面的最后面，作为它的最后一个子元素（last child）, 
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
 baidu('#body').append('<h2>footer</h2>');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素后面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('#body').append(baidu('h2'));  //结果同上

 */

/**
 * @description 在匹配的每个DOM元素内部的末端插入内容
 * @function 
 * @name baidu.dom().append()
 * @grammar baidu.dom(args).append(fn)
 * @param {Function} fn 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom(args).append(function(index,html){})
 */

baidu.dom.extend({
    append: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.append');
        baidu._util_.smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.appendChild(child);
        });
        return this;
    }
});
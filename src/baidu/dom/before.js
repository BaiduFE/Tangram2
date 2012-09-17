/**
 * @author linlingyu
 */
///import baidu._util_.smartInsert;
///import baidu.dom.getDocument;
///import baidu.merge;
/**
 * @description 在匹配的每个DOM元素前面插入新的内容
 * @function 
 * @name baidu.dom().before()
 * @grammar baidu.dom(args).before(content[, content])
 * @param {HTMLString|Element|TangramDom} content 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口是在匹配的每个DOM元素前面插入新的内容。
 
 其实.before()和.insertBefore()实现同样的功能，主要的不同是语法——特别是内容和目标的位置。 
 对于 .before()，选择表达式在函数的前面，参数是将要插入的内容，
 对于.insertBefore()，刚好相反，内容在方法前面，它将被放在参数里元素的前面。

 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素前面
 baidu('.content').before('<h2>test2</h2>');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <h2>test2</h2>
   <div class='content'></div>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素前面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('.content').before(baidu('h2'));  //结果同上
 */
/**
 * @description 在匹配的每个DOM元素前面插入新的内容
 * @function 
 * @name baidu.dom().before()
 * @grammar baidu.dom(args).before(fn)
 * @param {function} fn 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").before(function(index,html));
 */
baidu.dom.extend({
    before: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.before');
        var parentNode = this[0] && this[0].parentNode,
            array = !parentNode && [], set;
        
        baidu._util_.smartInsert(this, arguments, function(node){
            parentNode ? parentNode.insertBefore(node, this)
                : baidu.merge(array, node.childNodes);
        });
        if(array){
            array = baidu.merge(array, this);
            this.length = 0;
            baidu.merge(this, array);
        }
        return this;
    }
});
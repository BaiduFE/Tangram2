/**
 * @author linlingyu
 */

///import baidu.dom;
///import baidu._util_.smartInsertTo;


/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素的前面
 * @function 
 * @name baidu.dom().insertBefore()
 * @grammar baidu.dom(args).insertBefore(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口是将匹配到的DOM元素插入到参数指定的DOM元素的前面。
 
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
 baidu('<h2>test2</h2>').insertBefore('.content');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <h2>test2</h2>
   <div class='content'></div>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素前面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('h2').insertBefore('.content');  //结果同上 
*/

baidu.dom.extend({
    insertBefore: function(target){
        baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.insertBefore');
        baidu._util_.smartInsertTo(this, target, function(node){
            this.parentNode.insertBefore(node, this);
        }, 'before');
        return this;
    }
});


///import baidu.dom._g;

/// Tangram 1.x Code Start
/**
 * @description 将目标元素添加到基准元素之前
 * @function 
 * @name baidu.dom.insertBefore
 * @grammar baidu.dom.insertBefore(newElement, existElement)
 * @param {String|Element} newElement 目标元素或是元素的id字符串
 * @param {String|Element} existElement 基准元素或是元素的id字符串
 * @return {Element} 被插入的目标元素
 */
baidu.dom.insertBefore = function(newElement, existElement){
    var get = baidu.dom._g;
    return baidu.dom(get(newElement)).insertBefore(get(existElement))[0];
};
/// Tangram 1.x Code End

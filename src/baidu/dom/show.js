/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.dom;
///import baidu._util_.showHide;

/**
 * @description 显示匹配的元素
 * @function 
 * @name baidu.dom().show()
 * @grammar baidu.dom(args).show()
 * @return {TangramDom} 之前匹配的TangramDom对象
 * @example 
 show和hide方法是最简单的显示或者隐藏一个元素的方法

 示例代码：
 //HTML片段
 <div>元素</div>

 //显示一个元素
 baidu("div").show();

 */

baidu.dom.extend({
    show : function() {
        baidu._util_.showHide( this, true );
        return this;
    }
});
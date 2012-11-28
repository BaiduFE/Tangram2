/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.dom.each;

/**
 * @description 隐藏匹配的元素
 * @function 
 * @name baidu.dom().hide()
 * @grammar baidu.dom(args).hide()
 * @return {TangramDom} 之前匹配的TangramDom对象
 * @example 
 show和hide方法是最简单的显示或者隐藏一个元素的方法

 示例代码：
 //HTML片段
 <div>元素</div>

 //隐藏一个元素
 baidu("div").hide();
 */
baidu.dom.extend({
    hide: function(){
        return this.each(function(index, ele){
            if(!ele.style){return;}
            ele.style.display = 'none';
        });
    }
});
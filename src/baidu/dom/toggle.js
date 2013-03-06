/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.dom.eq;
///import baidu.dom.css;
///import baidu.dom.show;
///import baidu.dom.hide;

/**
 * @description 显示或隐藏匹配的元素
 * @function 
 * @name baidu.dom().toggle()
 * @grammar baidu.dom(args).toggle()
 * @return {TangramDom} 之前匹配的TangramDom对象
 * @example 
 toggle方法是最简单的显示或者隐藏一个元素的方法，
 如果当前元素显示状态，则就会被隐藏；当前元素隐藏状态，则会被显示。

 示例代码：
 //HTML片段
 <div>元素</div>

 var div = baidu("div");

 //隐藏一个元素
 div.toggle();

 //再次显示这个元素
 div.toggle();

 //再次隐藏这个元素
 div.toggle();

 */

baidu.dom.extend({
    toggle: function(){
        for(var i = 0 , num = this.size(); i < num ; i++ ){
            var ele = this.eq(i);
            if(ele.css('display') != 'none'){
                ele.hide();
            }else{
                ele.show();
            };
        };
    }
});



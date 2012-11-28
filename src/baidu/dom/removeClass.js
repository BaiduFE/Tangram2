/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 移除每个匹配元素的一个，多个或全部样式。
 * @function 
 * @name baidu.dom().removeClass()
 * @grammar baidu.dom(args).removeClass([className])
 * @param {String}  className 所要移除的一个或多个class属性名(多个用空格分隔)，不填全部删除。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example 
 该接口支持传入多个className，并且可以打乱顺序，多个用空格分隔。
 示例代码：
 //HTML片段
 <div id='test-div' class="class1 class2"></div>

 //单个className
 baidu('#test-div').removeClass('class1');
 
 //多个className
 baidu('#test-div').addClass('class1 class2');

 //这个方法通常和.removeClass()一起使用用来切换元素的样式, 像这样：
 baidu('#test-div').removeClass("class1").addClass('class2 class3'); 

 */

/**
 * @description 移除每个匹配元素的一个，多个或全部样式。
 * @function 
 * @name baidu.dom().removeClass()
 * @grammar baidu.dom(args).removeClass(fn)
 * @param {Function}  fn(index,className)  这个函数返回一个或更多用空格隔开的要增加的样式名。接收元素的索引index和元素旧的样式名className作为参数。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的className和index（索引值），并且删除将函数返回值为对应的className；
 通过使用一个函数来删除className，我们可以根据元素的className来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <div class='test-div1'></div>
 <div class='test-div2'></div>

 //迭代器方法
 //通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu('div').removeClass(function(index,className){
    alert(index);
    alert(className);
    if(index==1){
       return className;
    }
 });

 */

///import baidu;
///import baidu.dom;
///import baidu.forEach;
///import baidu.string.trim;

baidu.dom.extend({
    removeClass: function(value){

        var type = typeof value, b = " ";

        if( !arguments.length )
            baidu.forEach(this, function(item){
                item.className = "";
            });

        if( type == "string" ){
            value = baidu.string.trim(value);
            var arr = value.split(" ");

            baidu.forEach(this, function(item){
                var str = item.className ;
                for(var i = 0; i < arr.length; i ++)
                    while(~(b + str + b).indexOf(b + arr[i] + b))
                       str = (b + str + b).replace(b + arr[i] + b, b);
                item.className = baidu.string.trim(str);
            });

        }else if(type == "function"){
            baidu.forEach(this, function(item, index ,className){
                baidu.dom(item).removeClass(value.call(item, index, item.className));
            }); 
        }

        return this;
    }
});
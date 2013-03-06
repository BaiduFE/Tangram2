/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 为每个匹配的元素添加指定的className
 * @function 
 * @name baidu.dom().addClass()
 * @grammar baidu.dom(args).addClass(className)
 * @param {String} className 为每个匹配元素所要增加的一个或多个class属性名(多个用空格分隔)。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example 
 该接口支持传入多个className，并且可以打乱顺序，会自动除重。
 示例代码：
 //HTML片段
 <div id='test-div' class="class3"></div>

 //单个className
 baidu('#test-div').addClass('class1');
 
 //多个className
 baidu('#test-div').addClass('class1 class2');

 //这个方法通常和.removeClass()一起使用用来切换元素的样式, 像这样：
 baidu('#test-div').removeClass("class3").addClass('class1 class2'); 

 */

/**
 * @description 为每个匹配的元素添加指定的className
 * @function 
 * @name baidu.dom().addClass()
 * @grammar baidu.dom(args).addClass(fn)
 * @param {Function} fn 这个函数返回一个或更多用空格隔开的要增加的样式名，接收元素的索引index和元素旧的样式名className作为参数。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的className和index（索引值），并且将函数返回值设置为对应的className；
 通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <div id='test-div1'></div>
 <div id='test-div2'></div>

 //迭代器方法
 //通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu('div').addClass(function(index,className){
    alert(index);
    alert(className);
    if(index==1){
       return "test-class"+index;
    }
 });

 */

///import baidu;
///import baidu.dom;
///import baidu.forEach;
///import baidu.string.trim;

baidu.query.extend({
    addClass: function( value ){

        if( !arguments.length )
            return this;

        var t = typeof value, b = " ";

        if( t == "string" ){
            value = baidu.string.trim(value);
            
            var arr = value.split(" ");

            baidu.forEach( this, function(item, index){
                var str = item.className;
                
                for(var i = 0; i < arr.length; i ++)
                    if(!~(b + str + b).indexOf(b + arr[i] + b))
                        str += " " + arr[i];
                
                item.className = str.replace(/^\s+/g, "");
            } );
        }else if( t == "function" )
            baidu.forEach(this, function(item, index){
                baidu.dom(item).addClass(value.call(item, index, item.className));
            });

        return this;
    }
});
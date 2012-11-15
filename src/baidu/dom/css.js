/**
 * @author linlingyu
 */
///import baidu._util_.access;
///import baidu.dom.getCurrentStyle;
///import baidu.dom.styleFixer;

/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(key)
 * @param {String} key 一个css的属性名称
 * @return {String} 返回取得的值的字符串
 * @example 
 .css()方法是为匹配的元素集合中获取第一个元素的样式属性值简单方法，
 特别是针对不同的浏览器能访问大多数的性质和不同类型的浏览器某几个属性，
 .css()方法解决了浏览器差异。

 示例代码：
 //HTML代码片段
 <div style="background-color:blue;"></div>

 //取得背景色
 baidu("div").css("background-color");  //blue

 */

/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(key, value)
 * @param {String} key 一个css的属性名称
 * @param {Number|String} value 一个对应key的css的属性值，通过key与value的键和值来设置匹配元素的css属性，当value是一个空字符串时，表示要删除当前属性
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 .css()方法使得设置元素的CSS属性快速而又简单。
 这个方法可以使用任何一个CSS属性名和用空格隔开的值，或者一个“名/值对”对象(JavaScript Object)作为参数。
 示例代码： //HTML代码片段
 <div style="background-color:blue;"></div>

 //取得背景色
 baidu("div").css("background-color","red");  //blue
 
 */

/**
 * @description 设置第一个匹配元素或是设置多个匹配元素的多个css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(map)
 * @param {Object} map 一个具有key-value键值对的json数据，通过该map可以一次设置匹配元素的多个css属性的值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 .css()方法使得设置元素的CSS属性快速而又简单。
 这个方法可以使用任何一个CSS属性名和用空格隔开的值，或者一个“名/值对”对象(JavaScript Object)作为参数。
 示例代码： //HTML代码片段
 <div style="position:absolute;left:20px;right:20px;background-color:blue;"></div>

 //设置css
 baidu("div").css({
     "background-color":"red",
     "left":"30px",
     "right":"40px"
 });
 
 */

/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(key, fn)
 * @param {String} key 一个css的属性名称
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，value表示当前key的css属性对应的值，fn最终需要返回一个对应key的css属性值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的对应css属性和index（索引值），并且将函数返回值设置为对应的css属性；
 通过使用一个函数来设置css属性，我们可以根据元素的css属性来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML代码片段
 <div style="background-color:blue;"></div>
 <div style="background-color:blue;"></div>

 //迭代器方法
 //通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu('div').css("background-color",function(index,css){
    alert(index);
    alert(css);
    if(index==1){
       return "red";
    }
 });

 */

baidu.dom.extend({
    css: function(key, value){
        baidu.check('^(?:(?:string(?:,(?:number|string|function))?)|object)$', 'baidu.dom.css');
        return baidu._util_.access.call(this, key, value, function(ele, key, val){
            var styleFixer = baidu.dom.styleFixer;
            return styleFixer ? styleFixer(ele, key, val)
                : (val === undefined ? this.getCurrentStyle(key) : ele.style[key] = val);
        });
    }
});
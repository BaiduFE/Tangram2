/*
 * @author wangxiao, linlingyu
 */

/**
 * @description 取得第一个匹配元素对应的属性值。
 * @function 
 * @name baidu.dom().attr()
 * @grammar baidu.dom(args).attr(attributeName)
 * @param {String} attributeName 要获取的值的对应属性名
 * @return {String|undefined} 只获取第一个匹配元素的属性值，当属性没有被设置时候，.attr()方法将返回undefined。
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 当属性没有被设置时候，.attr()方法将返回undefined；
 另外，.attr()不应该用在普通的对象，数组，窗口（window）或文件（document）上。若要检索和更改DOM属性请使用.prop()方法。

 示例代码：
 //HTML片段
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="这是百度logo" />

 //取得src属性
 baidu("img").attr("src");

 */

/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().attr()
 * @grammar baidu.dom(args).attr(attributeName,value)
 * @param {String} attributeName 要设置值的属性名;
 * @param {String} value 这个属性设置的值;
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 另外，.attr()不应该用在普通的对象，数组，窗口（window）或文件（document）上。若要检索和更改DOM属性请使用.prop()方法。
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。

 示例代码：
 //HTML片段
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="这是百度logo" />

 //改变alt属性
 baidu("img").attr("alt","猜猜这是神马图片");

 */

/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().attr();
 * @grammar baidu.dom(args).attr(object);
 * @param {Object} object 一个配对的属性值的object对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 支持传入一个Object类型，来设置多个值。
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 当属性没有被设置时候，.attr()方法将返回undefined；
 另外，.attr()不应该用在普通的对象，数组，窗口（window）或文件（document）上。若要检索和更改DOM属性请使用.prop()方法。
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。
 示例代码：
 //HTML片段
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="这是百度logo" />

 //改变alt属性
 baidu("img").attr({
    "alt":"猜猜这是神马图片",
    "src":"http://img.baidu.com/img/image/ilogob.gif"
 });

 */

 /**
 * @description 设置指定元素属性的迭代器方法。
 * @function 
 * @name baidu.dom().attr();
 * @grammar baidu.dom(args).attr(attributeName,fn);
 * @param {String} attributeName 要设置值的属性名.
 * @param {Function} fn 这个函数返回用来设置的值，this 是当前的元素，接收元素的索引位置index和元素旧的样属性值attr为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的属性和index（索引值），并且将函数返回值设置为对应的属性；
 通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="图片1" />
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="图片2" />

 //迭代器方法
 //通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu("img").attr("alt",function(index,attr){
    alert(index);
    alert(attr);
    if(index==1){
      return "test";
    }
 });
 */
///import baidu.dom;
///import baidu._util_.access;
///import baidu._util_.attr;
baidu.dom.extend({
    attr: function(key, value){
        return baidu._util_.access(this, key, value, function(ele, key, val, pass){
            return baidu._util_.attr(ele, key, val, pass);
        });
    }
});
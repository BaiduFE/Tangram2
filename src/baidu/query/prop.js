/**
 * @author wangxiao, linlingyu
 */
/**
 * @description 取得第一个匹配元素对应的属性值。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(Property)
 * @param {String} Property 要获取的值的对应属性名
 * @return {String|undefined} 只获取第一个匹配元素的属性值，当属性没有被设置时候，.prop()方法将返回undefined。
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 当属性没有被设置时候，.prop()方法将返回undefined；
 可以用在普通的对象，数组，窗口（window）或文件（document）上，可以检索和更改DOM属性。

 attributes和properties之间的差异在特定情况下是很重要。
 .prop方法无法取出自定义属性的值，都会返回undefined，这时要使用attr()接口。
 
 例如，考虑一个DOM元素的HTML标记中定义的<input type="checkbox" checked="checked" /> ，并假设它是一个JavaScript变量命名的elem ：
 
 elem.checked    返回 true (Boolean)
 baidu(elem).prop("checked")  返回 true (Boolean)
 elem.getAttribute("checked")  返回 "checked" (String)
 baidu(elem).attr("checked")  返回 "checked" (String)
 baidu(elem).attr("checked")  返回  true (Boolean)

 示例代码：
 //HTML片段
 <input type="checkbox" checked="checked" />

 //取得checked属性
 baidu("input").prop("checked");  //true

 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(property,value)
 * @param {String} property 要设置值的属性名
 * @param {String} value 这个属性设置的值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。

 示例代码：
 //HTML片段
 <input type="checkbox"/>

 //设置checked属性
 baidu("input").prop("checked"，true);

 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(object)
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
 <input type="checkbox"/>

 //设置checked属性
 baidu("input").prop("checked"，true);

 */
 /**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(Property,fn)
 * @param {String} Property 要设置值的属性名.
 * @param {Function} fn 这个函数返回用来设置的值，this 是当前的元素，接收元素的索引位置index和元素旧的样属性值prop为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的属性和index（索引值），并且将函数返回值设置为对应的属性；
 通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <input type="checkbox"/>
 <input type="checkbox"/>

 //迭代器方法
 //通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu("input").prop("checked",function(index,prop){
    alert(index);
    alert(prop);
    if(index==1){
      return "checked";
    }
 });
 */
///import baidu.dom;
///import baidu.dom._access;
///import baidu.dom._prop;
baidu.query.extend({
    prop: function(propName, value){
        return baidu.dom._access(this, propName, value, function(ele, key, val){
            return baidu.dom._prop(ele, key, val);
        });
    }
});
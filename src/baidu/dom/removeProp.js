/**
 * @author wangxiao, linlingyu
 */

/**
 * @description 为匹配的元素删除设置的属性。
 * @function 
 * @name baidu.dom().removeProp()
 * @grammar baidu.dom(args).removeProp(property)
 * @param {String} property 要删除的属性名称（不支持多个）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
  * @example 
 .removeProp()返回TangramDom对象，可以链式的继续调用下去，
 而且具有良好的浏览器兼容性。不支持自定义属性，不支持一次删除多个。
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。

 示例代码：
 //HTML代码片段
 <input type='text' value='123'/>

 //清除一个属性
 baidu("input").removeProp("value");

 //清除个属性，可以使用链式。注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。
 baidu("input").removeProp("value").removeProp("type");

*/

///import baidu.dom;
///import baidu._util_.propFixer;
baidu.dom.extend({
    removeProp: function(key){
        key = baidu._util_.propFixer[key] || key;
        this.each(function(index, item){
            // try/catch handles cases where IE balks (such as removing a property on window)
            try{
                item[key] = undefined;
                delete item[key];
            }catch(e){}
        });
        return this;
    }
});
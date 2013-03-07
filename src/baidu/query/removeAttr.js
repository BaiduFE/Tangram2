/**
 * @author wangxiao, linlingyu
 */
 
/**
 * @description 为匹配的元素删除设置的属性。
 * @function 
 * @name baidu.dom().removeAttr()
 * @grammar baidu.dom(args).removeAttr(attributeName);
 * @param {String} attributeName 要设置属性的名称，它可以是一个空格分隔的属性列表;
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 .removeAttr() 方法使用原生的 JavaScript removeAttribute() 函数,
 但是它的优点是能够直接被TangramDom对象访问调用，可以链式的继续调用下去，
 而且具有良好的浏览器兼容性。

 示例代码： 
 //HTML代码片段
 <input type='text' value='123' data1='baidu' data2='google'/>

 //清除一个属性
 baidu("input").removeAttr("value");

 //清除个属性
 baidu("input").removeAttr("value data1 google");

 */
///import baidu.query.each;
///import baidu.dom._removeAttr;
baidu.query.extend({
    removeAttr: function(key){
        this.each(function(index, item){
            baidu.dom._removeAttr(item, key);
        });
        return this;
    }
});
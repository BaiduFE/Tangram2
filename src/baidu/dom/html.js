/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 从匹配的第一个元素中获取HTML内容。
 * @function 
 * @name baidu.dom().html()
 * @grammar baidu.dom(args).html()
 * @param   {Null} null 不传入参数
 * @return {String|Undefined} HTML内容
 */
 /**
 * @description 设置每一个匹配元素的html内容。
 * @function 
 * @name baidu.dom().html()
 * @grammar baidu.dom(args).html(htmlString)
 * @param {String} htmlString 用来设置每个匹配元素的一个HTML 字符串。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
 /**
 * @description 设置每一个匹配元素的html内容。
 * @function 
 * @name baidu.dom().html()
 * @grammar baidu.dom(args).html(function(index, html))
 * @param {Function} function(index, html) 用来返回设置HTML内容的一个函数。接收元素的索引位置和元素旧的HTML作为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

///import baidu;
///import baidu.support;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    html: function(value){
        baidu.each(this,function(){
            switch(typeof value){
                case 'undefined':

                break;

                case 'string':

                break;

                case 'function':
                    baidu.each(this, function(item,index){
                        baidu.dom(item).html(value.call(item, index, html(item)));
                    });
                break;

                default:
                break;
            };
        });
        
        return this;
    }
});
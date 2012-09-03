/**
 * @author linlingyu
 */
///import baidu.dom._access;
///import baidu.dom._getWidthOrHeight;
///import baidu.dom._getWindowOrDocumentWidthOrHeight;
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的高度，该高度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().height()
 * @grammar baidu.dom(args).height()
 * @return {Number} 返回一个高度数值
 * @example 
 .height()和.css('height')之间的区别是.height()返回一个没有单位的数值（例如，400），
 .css('height')是返回带有完整单位的字符串（例如，400px）。

 当一个元素的高度需要数学计算的时候推荐使用.height()方法 。

 注意.height()总是返回内容宽度,不管CSS box-sizing属性值，
 也就是说，返回的是高度不会包括padding，border，margin的宽度值。

 这个方法可以计算window（浏览器可视高度）和document（HTML文档）的高度。
 $(window).height(); 
 $(document).height();

 示例代码：
 //HTML代码片段
 <div style='height:250px;width:250px;'>
 <div>

 //获取高度
 baidu('div').height(); //250
 */ 

/**
 * @description 设置匹配元素或是设置多个匹配元素的高度，该高度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().height()
 * @grammar baidu.dom(args).height(value)
 * @param {Number|String} value （参数支持整型数据，字符串数据，带单位的字符串数值），接口设置所有匹配元素的高度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 当调用.height(value)方法的时候，这个“value”参数可以是一个字符串（数字加单位）或者是一个数字。
 如果这个“value”参数只提供一个数字，会被自动加上单位px；
 如果只提供一个字符串，任何有效的CSS尺寸都可以为高度赋值（如：100px，50%，或者 auto）。
 如果没有给定明确的单位（像'em' 或者 '%'），那么默认情况下"px"会被直接添加上去（也理解为"px"是默认单位）。

 注意在现代浏览器中，CSS高度属性不包含padding，border，margin的宽度。

 示例代码：
 //HTML代码片段
 <div style='height:250px;width:250px;'>
 <div>

 //获取高度
 baidu('div').height('300px');

 //结果
 <div style='height:300px;width:250px;'>
 <div>

 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的高度，该高度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().height()
 * @grammar baidu.dom(args).height(fn)
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，height表示匹配元素的高度，fn最终需要返回合法的数值来设置高度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").height(function(index, height){})
 */
baidu.dom.extend({
    height: function(value){
        return baidu.dom._access.call(this, 'height', value, function(ele, key, val){
            var hasValue = val !== undefined,
                parseValue = hasValue && parseFloat(val),
                type = ele != null && ele == ele.window ? 'window'
                    : (ele.nodeType === 9 ? 'document' : false);
            if(hasValue && parseValue < 0 || isNaN(parseValue)){return;}
            hasValue && /^\d+$/.test(val += '') && (val += 'px');
            return type ? baidu.dom._getWindowOrDocumentWidthOrHeight(ele, type, key)
                : (hasValue ? ele.style.height = val : baidu.dom._getWidthOrHeight(ele, key));
        });
    }
});
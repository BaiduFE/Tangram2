/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.type;
///import baidu._util_.access;
///import baidu._util_.getWidthOrHeight;
///import baidu._util_.getWindowOrDocumentWidthOrHeight;
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的宽度，该宽度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().width()
 * @grammar baidu.dom(args).width()
 * @return {Number} 返回一个宽度数值
 * @example 
 .width()和.css('width')之间的区别是.width()返回一个没有单位的数值（例如，400），
 .css('width')是返回带有完整单位的字符串（例如，400px）。

 当一个元素的宽度需要数学计算的时候推荐使用.width()方法 。

 注意.width()总是返回内容宽度,不管CSS box-sizing属性值，
 也就是说，返回的是宽度不会包括padding，border，margin的宽度值。

 这个方法可以计算window（浏览器可视宽度）和document（HTML文档）的宽度。
 baidu.(window).width();
 baidu.(document).width();

 示例代码：
 //HTML代码片段
 <div style='width:250px;width:250px;'>
 <div>

 //获取宽度
 baidu('div').height(); //250
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的宽度，该宽度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().width()
 * @grammar baidu.dom(args).width(value)
 * @param {Number|String} value （参数支持整型数据，字符串数据，带单位的字符串数值），接口设置所有匹配元素的宽度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 当调用.width(value)方法的时候，这个“value”参数可以是一个字符串（数字加单位）或者是一个数字。
 如果这个“value”参数只提供一个数字，会被自动加上单位px；
 如果只提供一个字符串，任何有效的CSS尺寸都可以为宽度赋值（如：100px，50%，或者 auto）。
 如果没有给定明确的单位（像'em' 或者 '%'），那么默认情况下"px"会被直接添加上去（也理解为"px"是默认单位）。

 注意在现代浏览器中，CSS宽度属性不包含padding，border，margin的宽度。

 示例代码：
 //HTML代码片段
 <div style='height:250px;width:250px;'>
 <div>

 //获取宽度
 baidu('div').width('300px');

 //结果
 <div style='height:300px;width:250px;'>
 <div>
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的宽度，该宽度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().width()
 * @grammar baidu.dom(args).width(fn)
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，width表示匹配元素的宽度，fn最终需要返回合法的数值来设置宽度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").width(function(index, width){});
 */
baidu.dom.extend({
    width: function(value){
        return baidu._util_.access(this, 'width', value, function(ele, key, val){
            var hasValue = val !== undefined,
                parseValue = hasValue && parseFloat(val),
                type = ele != null && ele == ele.window ? 'window'
                    : (ele.nodeType === 9 ? 'document' : false);
            if(hasValue && parseValue < 0 || isNaN(parseValue)){return;}
            hasValue && /^(?:\d*\.)?\d+$/.test(val += '') && (val += 'px');
            return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, key)
                : (hasValue ? ele.style.width = val : baidu._util_.getWidthOrHeight(ele, key));
        });
    }
});
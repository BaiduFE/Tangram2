/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu._util_.access;
///import baidu._util_.getWidthOrHeight;
///import baidu._util_.getWindowOrDocumentWidthOrHeight;
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的宽度，该宽度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().width()
 * @grammar baidu.dom(args).width()
 * @return {Number} 返回一个宽度数值
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的宽度，该宽度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().width()
 * @grammar baidu.dom(args).width(value)
 * @param {Number|String} value （参数支持整型数据，字符串数据，带单位的字符串数值），接口设置所有匹配元素的宽度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
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
        return baidu._util_.access.call(this, 'width', value, function(ele, key, val){
            var hasValue = val !== undefined,
                parseValue = hasValue && parseFloat(val),
                type = ele != null && ele == ele.window ? 'window'
                    : (ele.nodeType === 9 ? 'document' : false);
            if(hasValue && parseValue < 0 || isNaN(parseValue)){return;}
            hasValue && /^\d+$/.test(val += '') && (val += 'px');
            return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, key)
                : (hasValue ? ele.style.width = val : baidu._util_.getWidthOrHeight(ele, key));
        });
    }
});
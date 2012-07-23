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
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的高度，该高度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().height()
 * @grammar baidu.dom(args).height(value)
 * @param {Number|String} value （参数支持整型数据，字符串数据，带单位的字符串数值），接口设置所有匹配元素的高度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的高度，该高度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().height()
 * @grammar baidu.dom(args).height(function(index, height))
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，height表示匹配元素的高度，fn最终需要返回合法的数值来设置高度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
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
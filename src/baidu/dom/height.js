/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu._util_.access;
///import baidu._util_.getWidthOrHeight;
///import baidu._util_.getWindowOrDocumentWidthOrHeight;
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
 * @grammar baidu.dom(args).height(fn)
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，height表示匹配元素的高度，fn最终需要返回合法的数值来设置高度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").height(function(index, height){})
 */
baidu.dom.extend({
    height: function(value){
        return baidu._util_.access.call(this, 'height', value, function(ele, key, val){
            var hasValue = val !== undefined,
                parseValue = hasValue && parseFloat(val),
                type = ele != null && ele == ele.window ? 'window'
                    : (ele.nodeType === 9 ? 'document' : false);
            if(hasValue && parseValue < 0 || isNaN(parseValue)){return;}
            hasValue && /^\d+$/.test(val += '') && (val += 'px');
            return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, key)
                : (hasValue ? ele.style.height = val : baidu._util_.getWidthOrHeight(ele, key));
        });
    }
});
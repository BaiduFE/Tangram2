/**
 * @author linlingyu
 */
///import baidu.dom._getWindowOrDocumentWidthOrHeight;
///import baidu.dom._getWidthOrHeight;
/**
 * @description 取得第一个匹配元素的宽度，该宽度忽略margin, border的计算，但包含padding的计算
 * @function 
 * @name baidu.dom().innerWidth()
 * @grammar baidu.dom(args).innerWidth()
 * @return {Number} 返回一个整型的宽度值
 */
baidu.dom.extend({
    innerWidth: function(){
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu.dom._getWindowOrDocumentWidthOrHeight(ele, type, 'width')
            : baidu.dom._getWidthOrHeight(ele, 'width', 'padding');
    }
});
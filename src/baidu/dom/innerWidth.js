/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu._util_._getWindowOrDocumentWidthOrHeight;
///import baidu._util_.getWidthOrHeight;
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
        return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'width')
            : baidu._util_.getWidthOrHeight(ele, 'width', 'padding');
    }
});
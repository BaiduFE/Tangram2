/**
 * @author linlingyu
 */

///import baidu.dom;
///import baidu._util_.getWindowOrDocumentWidthOrHeight;
///import baidu._util_.getWidthOrHeight;
/**
 * @description 取得第一个匹配元素的高度，该高度忽略margin, border的计算，但包含padding的计算
 * @function 
 * @name baidu.dom().innerHeight()
 * @grammar baidu.dom(args).innerHeight()
 * @return {Number} 返回一个整型的高度值
 */
baidu.dom.extend({
    innerHeight: function(){
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'height')
            : baidu._util_.getWidthOrHeight(ele, 'height', 'padding');
    }
});
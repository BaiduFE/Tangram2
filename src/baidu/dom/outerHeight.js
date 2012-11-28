/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu._util_.getWindowOrDocumentWidthOrHeight;
///import baidu._util_.getWidthOrHeight;
/**
 * @description 取得第一个匹配元素的高度，该高度包含border, padding的计算并通过参数来加入对margin的计算
 * @function 
 * @name baidu.dom().outerHeight()
 * @grammar baidu.dom(args).outerHeight([margin])
 * @param {Boolean} margin 参数传递一个布尔值为true时，该接口取得第一个匹配元素相的高度值，该高度值包含对margin, border, padding的计算
 * @return {Number} 返回一个整型的高度值
 */
baidu.dom.extend({
    outerHeight: function(margin){
    	if(this.size()<=0){return 0;}
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'height')
            : baidu._util_.getWidthOrHeight(ele, 'height', 'padding|border' + (margin ? '|margin' : ''));
    }
});
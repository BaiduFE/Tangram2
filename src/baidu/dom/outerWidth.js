/**
 * @author linlingyu
 */
///import baidu.dom._getWindowOrDocumentWidthOrHeight;
///import baidu.dom._getWidthOrHeight;
baidu.dom.extend({
    outerWidth: function(margin){
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu.dom._getWindowOrDocumentWidthOrHeight(ele, type, 'width')
            : baidu.dom._getWidthOrHeight(ele, 'width', 'padding|border' + (margin ? '|margin' : ''));
    }
});
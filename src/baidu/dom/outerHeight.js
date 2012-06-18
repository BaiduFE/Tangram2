/**
 * @author linlingyu
 */
///import baidu.dom._getWindowOrDocumentWidthOrHeight;
///import baidu.dom._getWidthOrHeight;
baidu.dom.extend({
    outerHeight: function(margin){
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu.dom._getWindowOrDocumentWidthOrHeight(ele, type, 'height')
            : baidu.dom._getWidthOrHeight(ele, 'height', 'padding|border' + (margin ? '|margin' : ''));
    }
});
/**
 * @author linlingyu
 */
///import baidu.dom._access;
///import baidu.dom._getWidthOrHeight;
///import baidu.dom._getWindowOrDocumentWidthOrHeight;
baidu.dom.extend({
    width: function(value){
        return baidu.dom._access.call(this, 'width', value, function(ele, key, val){
            var hasValue = val !== undefined,
                parseValue = hasValue && parseFloat(val),
                type = ele != null && ele == ele.window ? 'window'
                    : (ele.nodeType === 9 ? 'document' : false);
            if(hasValue && parseValue < 0 || isNaN(parseValue)){return;}
            hasValue && /^\d+$/.test(val += '') && (val += 'px');
            return type ? baidu.dom._getWindowOrDocumentWidthOrHeight(ele, type, key)
                : (hasValue ? ele.style.width = val : baidu.dom._getWidthOrHeight(ele, key));
        });
    }
});
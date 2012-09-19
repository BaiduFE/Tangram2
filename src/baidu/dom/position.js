/**
 * @author linlingyu
 */

///import baidu.dom.offset;
///import baidu.dom.offsetParent;
///import baidu.dom.getCurrentStyle;
/**
 * @description 取得第一个匹配元素相对于父元素的偏移量
 * @function 
 * @name baidu.dom().position()
 * @grammar baidu.dom(args).position()
 * @return {Object} 返回一个包含left和top键名的json来标示元素相对于父元素的偏移量
 */
baidu.dom.extend({
    position: function(){
        if(this.size()<=0){return 0;}        
        var patrn = /^(?:body|html)$/i,
            coordinate = this.offset(),
            offsetParent = this.offsetParent(),
            parentCoor = patrn.test(offsetParent[0].nodeName) ? {left: 0, top: 0}
                : offsetParent.offset();
        coordinate.left -= parseFloat(this.getCurrentStyle('marginLeft')) || 0;
        coordinate.top -= parseFloat(this.getCurrentStyle('marginTop')) || 0;
        parentCoor.left += parseFloat(offsetParent.getCurrentStyle('borderLeftWidth')) || 0;
        parentCoor.top += parseFloat(offsetParent.getCurrentStyle('borderTopWidth')) || 0;
        return {
            left: coordinate.left - parentCoor.left,
            top: coordinate.top - parentCoor.top
        }
    }
});
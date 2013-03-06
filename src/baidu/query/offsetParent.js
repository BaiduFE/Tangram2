/**
 * @author linlingyu
 */

///import baidu.query.map;
///import baidu.query.getCurrentStyle;

/**
 * @description 取得元素的父元素
 * @function 
 * @name baidu.dom().offsetParent()
 * @grammar baidu.dom(args).offsetParent()
 * @return {TangramDom} 返回之前匹配的TangramDom对象
 */
baidu.query.extend({
    offsetParent: function(){
        return this.map(function(){
            var offsetParent = this.offsetParent || document.body,
                exclude = /^(?:body|html)$/i;
            while(offsetParent && baidu.dom(offsetParent).getCurrentStyle('position') === 'static'
                && !exclude.test(offsetParent.nodeName)){
                    offsetParent = offsetParent.offsetParent;
            }
            return offsetParent;
        });
    }
});

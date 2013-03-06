/**
 * @author linlingyu
 */
///import baidu.dom;
/**
 * @description 取得第一个匹配元素的computed style值。如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
 * @function 
 * @name baidu.dom().getComputedStyle()
 * @grammar baidu.dom(args).getComputedStyle(key)
 * @param {String} key 参数是一个css的属性名称，通过该属性名称取得第一个匹配元素的computed style值
 * @return {String} 返回一个字符串的computed style值
 */
/**
 * @description 取得第一个匹配元素的computed style值。如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
 * @function 
 * @name baidu.query.getComputedStyle
 * @grammar baidu.query.getComputedStyle(element, key)
 * @param {String|Element} element 目标元素或目标元素的id
 * @param {String} key 参数是一个css的属性名称，通过该属性名称取得第一个匹配元素的computed style值
 * @return {String} 返回一个字符串的computed style值
 */
baidu.query.extend({
    getComputedStyle: function(key){
        if(!this[0].ownerDocument){return;}// document can not get style;
        var defaultView = this[0].ownerDocument.defaultView,
            computedStyle = defaultView && defaultView.getComputedStyle
                && defaultView.getComputedStyle(this[0], null),
            val = computedStyle ? (computedStyle.getPropertyValue(key) || computedStyle[key]) : '';
        return val || this[0].style[key];
    }
});
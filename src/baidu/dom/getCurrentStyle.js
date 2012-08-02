/**
 * @author linlingyu
 */
///import baidu.dom.getComputedStyle;
/**
 * @description 取得第一个匹配元素的 currentStyle 值，兼容非IE浏览器某些样式名称或者值需要hack的话，需要别外处理
 * @function 
 * @name baidu.dom.getCurrentStyle
 * @grammar baidu.dom(args).getCurrentStyle(key)
 * @param {String} key 参数是一个css的属性名称，通过该属性名称取得第一个匹配元素的 currentStyle 值
 * @return {String} 返回一个字符串的 currentStyle 值
 */
/**
 * @description 取得第一个匹配元素的 currentStyle 值，兼容非IE浏览器某些样式名称或者值需要hack的话，需要别外处理
 * @function 
 * @name baidu.dom.getCurrentStyle
 * @grammar baidu.dom.getCurrentStyle(element, key)
 * @param {String|Element} element 目标元素或目标元素的id
 * @param {String} key 参数是一个css的属性名称，通过该属性名称取得第一个匹配元素的 currentStyle 值
 * @return {String} 返回一个字符串的 currentStyle 值
 */
baidu.dom.extend({
    getCurrentStyle: function(){
        var css = document.documentElement.currentStyle ?
            function(key){return this[0].currentStyle ? this[0].currentStyle[key] : this[0].style[key];}
                : function(key){return this.getComputedStyle(key);}
        return function(key){
            return css.call(this, key);
        }
    }()
});
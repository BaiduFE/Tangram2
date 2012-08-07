/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.dom._access;
///import baidu.dom.getCurrentStyle;

/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(key)
 * @param {String} key 一个css的属性名称
 * @return {String} 返回取得的值的字符串
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(key, value)
 * @param {String} key 一个css的属性名称
 * @param {Number|String} value 一个对应key的css的属性值，通过key与value的键和值来设置匹配元素的css属性，当value是一个空字符串时，表示要删除当前属性
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(key, fn)
 * @param {String} key 一个css的属性名称
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，value表示当前key的css属性对应的值，fn最终需要返回一个对应key的css属性值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").css(key, function(index, value))
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(map)
 * @param {Object} map 一个具有key-value键值对的json数据，通过该map可以一次设置匹配元素的多个css属性的值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.dom.extend({
    css: function(key, value){
        baidu.paramCheck('^(?:(?:string(?:,(?:number|string|function))?)|object)$', 'baidu.dom.css');
        return baidu.dom._access.call(this, key, value, function(ele, key, val){
            var styleFixer = baidu.dom.styleFixer;
            return styleFixer ? styleFixer(ele, key, val)
                : (val === undefined ? this.getCurrentStyle(key) : ele.style[key] = val);
        });
    }
});
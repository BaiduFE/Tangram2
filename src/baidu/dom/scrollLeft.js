/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu._util_.smartScroll;
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的横向滚动条的滚动位置
 * @function 
 * @name baidu.dom().scrollLeft()
 * @grammar baidu.dom(args).scrollLeft()
 * @return {Number} 返回一个整型的位置数值
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的横向滚动条的滚动位置
 * @function 
 * @name baidu.dom().scrollLeft()
 * @grammar baidu.dom(args).scrollLeft(value)
 * @param {Number|String} value 参数传递一个整型数据或是字符串数值时，接口设置所有匹配元素的横向滚动条的滚动位置
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.dom.extend({
    scrollLeft: function(){
        var ret = baidu._util_.smartScroll('scrollLeft');
        return function(value){
            value && baidu.check('^(?:number|string)$', 'baidu.dom.scrollLeft');
            return value === undefined ? ret.get(this[0])
                : ret.set(this[0], value) || this;
        }
    }()
});
/**
 * @author dron
 */

///import baidu.dom.on;
///import baidu.dom.off;
///import baidu.forEach;
///import baidu.id;

/**
 * @description 对当前 TangramDom 集合添加一次性事件监听
 * @function 
 * @name baidu.dom().one()
 * @grammar baidu.dom(args).one(type[,data][,fn])
 * @param {String} type 事件名称，如果是多个事件，以空格或半角逗号隔开
 * @param {Object} data 事件触发时携带的数据，JSON 格式，此参数可选。
 * @param {Function} fn 事件触发函数，fn 接受一个参数 e，为 baidu.event() 事件对象实例
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    one: function( types, selector, data, fn  ){
        return this.on( types, selector, data, fn, 1 );
    }
});
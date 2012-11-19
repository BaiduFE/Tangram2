/**
 * @author dron
 */

///import baidu.dom.on;

/**
 * @description 对指定的TangramDom集合添加事件代理
 * @function 
 * @name baidu.dom().delegate()
 * @grammar baidu.dom(args).delegate(selector,type[,data],fn)
 * @param {String} selector 选择器表达式，用于约定响应事件的标签类型
 * @param {String} type 事件名称，如果是多个事件名称，可用半角逗号或空格隔开
 * @param {Object} data 事件函数触发时，附带在 event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

baidu.dom.extend({
    delegate: function( selector, type, data, fn ){
        if( typeof data == "function" )
            fn = data,
            data = null;
        return this.on( type, selector, data, fn );
    }
});
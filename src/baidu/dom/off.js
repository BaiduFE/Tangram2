/**
 * @fileOverview 对当前 TangramDom 集合解除事件监听
 * @author dron
 */
///import baidu._util_.eventBase.core;
///import baidu.event;
///import baidu.forEach;

/**
 * @description 对当前 TangramDom 集合解除事件监听
 * @function 
 * @name baidu.dom().off()
 * @grammar baidu.dom(args).off(events[,selector],fn)
 * @param {String} events 事件名称，如果是多个事件，可用空格或半角逗号隔开
 * @param {String} selector 用于限制事件源的选择器表达式，此参数可选。
 * @param {Function} fn 事件触发函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

/**
 * @description 对当前 TangramDom 集合解除事件监听
 * @function 
 * @name baidu.dom().off()
 * @grammar baidu.dom(args).off(eventMap[,selector],fn)
 * @param {Object} eventMap 一个以 eventName:eventFn 键值对表示的 JSON 格式对象
 * @param {String} selector 用于限制事件源的选择器表达式，此参数可选。
 * @param {Function} fn 事件触发函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    off: function( events, selector, fn ){
        var eb = baidu._util_.eventBase.core, me = this;
        if( !events )
            baidu.forEach( this, function( item ){
                eb.remove( item );
            } );
        else if( typeof events == "string" ){
            if( typeof selector == "function" )
                fn = selector,
                selector = null;
            events = events.split(/[ ,]/);
            baidu.forEach( this, function( item ){
                baidu.forEach( events, function( event ){
                    eb.remove( item, event, fn, selector );
                });
            });
        }else if( typeof events == "object" )
            baidu.forEach( events, function(fn, event){
                me.off( event, selector, fn );
            } );

        return this;
    }
});

/// support - magic Tangram 1.x Code Start
///import baidu.dom.g;
baidu.event.un = baidu.un = function(element, evtName, handler){
    element = baidu.dom.g(element);
    baidu.dom(element).off(evtName.replace(/^\s*on/, ''), handler);
    return element;
 };
 /// support - magic Tangram 1.x Code End
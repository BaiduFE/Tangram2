/**
 * @fileOverview 对当前 TangramDom 集合添加事件监听
 * @author dron
 */

///import baidu.event;
///import baidu.query.each;
///import baidu.forEach;
///import baidu.event._core;

/**
 * @description 对当前 TangramDom 集合添加事件监听
 * @function 
 * @name baidu.dom().on()
 * @grammar baidu.dom(args).on(events[,selector][,data][,fn])
 * @param {String} events 事件名称，如果是多个事件，以空格或半角逗号隔开
 * @param {String} selector 选择器表达式，用限制事件源对象范围，当符合表达式，才触发事件，此参数可选。
 * @param {Object} data 事件触发时携带的数据，JSON 格式，此参数可选。
 * @param {Function} fn 事件触发函数，fn 接受一个参数 e，为 baidu.event() 事件对象实例
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 * @example
 如果你想阻止当前事件的冒泡，或者屏蔽默认事件的触发，可以使用stopPropagation和preventDefault方法：

 示例代码：
 baidu('#div-test').on('click',function(e){
  e.stopPropagation();  //阻止冒泡
  e.preventDefault();   //阻止默认事件
  alert(123);
});
 */

/**
 * @description 对当前 TangramDom 集合添加事件监听
 * @function 
 * @name baidu.dom().on()
 * @grammar baidu.dom(args).on(eventsMap[,selector][,data])
 * @param {Object} eventsMap 一个用 eventName: eventFn 键值对表示的 JSON 格式对象
 * @param {String} selector 选择器表达式，用限制事件源对象范围，当符合表达式，才触发事件，此参数可选。
 * @param {Object} data 事件触发时携带的数据，JSON 格式，此参数可选。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 * @example
 如果你想阻止当前事件的冒泡，或者屏蔽默认事件的触发，可以使用stopPropagation和preventDefault方法：

 示例代码：
 baidu('#div-test').on('click',function(e){
  e.stopPropagation();  //阻止冒泡
  e.preventDefault();   //阻止默认事件
  alert(123);
});
 */


baidu.query.extend({
    on: function( events, selector, data, fn, _one ){
        var eb = baidu.dom._eventBase.core;
        // var specials = { mouseenter: 1, mouseleave: 1, focusin: 1, focusout: 1 };

        if( typeof selector == "object" && selector )
            fn = data,
            data = selector,
            selector = null;
        else if( typeof data == "function" )
            fn = data,
            data = null;
        else if( typeof selector == "function" )
            fn = selector,
            selector = data = null;

        if( typeof events == "string" ){
            events = events.split(/[ ,]+/);
            this.each(function(){
                baidu.forEach(events, function( event ){
                    // if( specials[ event ] )
                    //     baidu( this )[ event ]( data, fn );
                    // else
                    eb.add( this, event, fn, selector, data, _one );
                }, this);
            });
        }else if( typeof events == "object" ){
            if( fn )
                fn = null;
            baidu.forEach(events, function( fn, eventName ){
                this.on( eventName, selector, data, fn, _one );
            }, this);
        }

        return this;
    }

    // _on: function( name, data, fn ){
    //     var eb = baidu.dom._eventBase;
    //     this.each(function(){
    //         eb.add( this, name, fn, undefined, data );
    //     });
    //     return this;
    // }
});


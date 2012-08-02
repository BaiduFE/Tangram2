/**
 * @fileOverview 对当前 TangramDom 集合添加事件监听
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.event;
///import baidu.dom.each;
///import baidu.dom._eventBase;


/**
 * @description 对当前 TangramDom 集合添加事件监听
 * @function 
 * @name baidu.dom().on()
 * @grammar baidu.dom(args).on(events,[selector],[data],fn)
 * @param String events 事件名称，如果是多个事件，以空格或半角逗号隔开
 * @param String selector 选择器表达式，用限制事件源对象范围，当符合表达式，才触发事件，此参数可选。
 * @param Object data 事件触发时携带的数据，JSON 格式，此参数可选。
 * @param Function fn 事件触发函数，fn 接受一个参数 e，为 baidu.event() 事件对象实例
 * @return TangramDom 
 */

/**
 * @description 对当前 TangramDom 集合添加事件监听
 * @function 
 * @name baidu.dom().on()
 * @grammar baidu.dom(args).on(eventsMap,[selector],[data])
 * @param Object eventsMap 一个用 eventName: eventFn 键值对表示的 JSON 格式对象
 * @param String selector 选择器表达式，用限制事件源对象范围，当符合表达式，才触发事件，此参数可选。
 * @param Object data 事件触发时携带的数据，JSON 格式，此参数可选。
 * @return TangramDom 
 */

baidu.dom.extend({
	on: function( events, selector, data, fn ){
    	var eb = baidu.dom._eventBase;

	    if( typeof selector == "function" ){
	        fn = selector;
	        selector = null;
	    }else if( typeof data == "function" ){
	    	fn = data;
	    	data = null;
	    }

	    if( typeof selector == "object" ){
	        data = selector;
	        selector = null;
	    }

		if( typeof events == "string" ){
		    events = events.split(/[ ,]+/);
		    this.each(function(){
		    	var me = this;
		        baidu.each(events, function( event ){
		            eb.add( me, event, fn, selector, data );
		        });
		    });
		}else if( typeof events == "object" ){
			var me = this;
			if( fn )
				fn = null;
			baidu.each(events, function( fn, events ){
			    me.on( events, selector, data, fn );
			});
		}

		return this;
	}
});
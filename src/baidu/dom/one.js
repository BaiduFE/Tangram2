/**
 * @author dron
 */

///import baidu.dom.on;
///import baidu.dom.off;

/**
 * @description 对当前 TangramDom 集合添加一次性事件监听
 * @function 
 * @name baidu.dom().one()
 * @grammar baidu.dom(args).one(type[,data][,fn])
 * @param {String} type 事件名称，如果是多个事件，以空格或半角逗号隔开
 * @param {Object} data 事件触发时携带的数据，JSON 格式，此参数可选。
 * @param {Function} fn 事件触发函数，fn 接受一个参数 e，为 baidu.event() 事件对象实例
 * @return TangramDom 
 */

baidu.dom.extend({
	one: function( type, data, fn ){
		var me = this;

		if( typeof data == "function" ){
			fn = data;
			data = undefined;
		}

		if( typeof type == "object" && type ){
		    baidu.each( type, function( fn, type ){
		        this.one( type, data, fn );
		    }, this );
		    return this;
		}

		var newfn = function(){
			me.off( type, newfn );
		    return fn.apply( me, arguments );
		};

		return this.on( type, data, newfn );
	}
});
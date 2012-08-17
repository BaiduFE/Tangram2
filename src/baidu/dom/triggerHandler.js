/**
 * @author dron
 */

///import baidu.dom._eventBase;

/**
 * @description 对指定的 TangramDom 集合派发指定的事件函数，不触发事件默认行为
 * @function 
 * @name baidu.dom().triggerHandler()
 * @grammar baidu.dom(args).triggerHandler(type[,data])
 * @param {String} type 事件类型
 * @param {Array} data 触发事件函数时携带的参数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
	triggerHandler: function(type, triggerData){
		var eb = baidu.dom._eventBase;

		baidu.each(this, function(item){
		    eb.fireHandler(item, type, triggerData);
		});

		return this;
	}
});
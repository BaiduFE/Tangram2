/**
 * @author dron
 */

///import baidu.dom.on;

/**
 * @description 对指定的 TangramDom 集合绑定一个自定义事件
 * @function 
 * @name baidu.dom().bind()
 * @grammar baidu.dom(args).bind(type[,data],fn)
 * @param {String type 事件名称
 * @param Object data 触发事件时在 event.data 对象上携带的数据
 * @param Function fn 事件函数
 * @return TangramDom 
} */

baidu.dom.extend({
	bind: function(type, data, fn){
		return this.on(type, undefined, data, fn);
	}
});
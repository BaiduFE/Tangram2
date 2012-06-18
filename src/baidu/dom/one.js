/**
 * @author dron
 */

///import baidu.dom.on;

baidu.dom.extend({
	one: function(type, data, fn){
		var me = this;
		var newfn = function(){
			me.off(type, newfn);
		    return fn.apply(me, arguments);
		};

		this.on(type, data, newfn);
	}
});
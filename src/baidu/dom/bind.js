/**
 * @author dron
 */

///import baidu.dom.on;

baidu.dom.extend({
	bind: function(type, data, fn){
		return this.on(type, undefined, data, fn);
	}
});
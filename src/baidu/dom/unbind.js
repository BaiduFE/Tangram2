/**
 * @author dron
 */

///import baidu.dom.on;

baidu.dom.extend({
	unbind: function(type, fn){
		return this.off(type, fn);
	}
});
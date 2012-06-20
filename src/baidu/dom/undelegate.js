/**
 * @author dron
 */

///import baidu.dom.on;

baidu.dom.extend({
	undelegate: function(selector, type, fn){
    	return this.off(type, selector, fn);
	}
});
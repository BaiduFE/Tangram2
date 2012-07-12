/**
 * @author dron
 */

///import baidu.dom.on;
///import baidu.dom.off;

baidu.dom.extend({
	undelegate: function(selector, type, fn){
    	return this.off(type, selector, fn);
	}
});
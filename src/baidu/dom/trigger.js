/**
 * @author dron
 */

///import baidu.dom._eventBase;

baidu.dom.extend({
	trigger: function(){
		var eb = baidu.dom._eventBase;
	    return function(type, data){
			baidu.each(this, function(item){
			    eb.fire(item, type, data);
			});
		}
	}()
});
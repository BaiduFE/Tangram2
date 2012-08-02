/**
 * @author dron
 */

///import baidu.dom._eventBase;

baidu.dom.extend({
	triggerHandler: function(){
		var eb = baidu.dom._eventBase;
	    return function(type, triggerData){
			baidu.each(this, function(item){
			    eb.fireHandler(item, type, triggerData);
			});

			return this;
		}
	}()
});
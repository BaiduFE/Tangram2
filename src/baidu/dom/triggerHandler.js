/**
 * @author dron
 */

///import baidu.dom._eventBase;

baidu.dom.extend({
	triggerHandler: function(type, triggerData){
		var eb = baidu.dom._eventBase;

		baidu.each(this, function(item){
		    eb.fireHandler(item, type, triggerData);
		});

		return this;
	}
});
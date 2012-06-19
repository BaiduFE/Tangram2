/**
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.event;
///import baidu.each;
///import baidu.dom._eventBase;

baidu.dom.extend({
	off: function(){
		var eb = baidu.dom._eventBase;
	    return function(events, selector, fn){

			if(typeof events == "string"){

			    if(typeof selector == "function"){
			        fn = selector;
			        selector = null;
			    }

			    events = events.split(/[ ,]/);

			    baidu.each(this, function(item){
			        baidu.each(events, function(event){
			            eb.remove(item, event, fn, selector);
			        });
			    });
			}else if(typeof events == "object"){
				var me = this;
				
				baidu.each(events, function(fn, events){
				    me.off(events, selector);
				});
			}

			return this;
		}
	}()
});
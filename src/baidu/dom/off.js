/**
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.event;
///import baidu.each;
///import baidu.dom._eventBase;

baidu.dom.extend({
	off: function(events, selector, fn){
    	var eb = baidu.dom._eventBase;
    	
    	if(!events){
    	 
    		baidu.each(this, function(item){
    		    eb.removeAll(item);
    		});

    	}else if(typeof events == "string"){

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
			
			baidu.each(events, function(fn, event){
			    me.off(event, selector, fn);
			});

		}

		return this;
	}
});
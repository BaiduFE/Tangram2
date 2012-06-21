/**
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.event;
///import baidu.dom.each;
///import baidu.dom._eventBase;

baidu.dom.extend({
	on: function(events, selector, data, fn){
    	var eb = baidu.dom._eventBase;

		if(typeof events == "string"){

		    if(typeof selector == "function"){
		        fn = selector;
		        selector = null;
		    }else if(typeof data == "function"){
		    	fn = data;
		    	data = null;
		    }

		    if(typeof selector == "object"){
		        data = selector;
		        selector = null;
		    }

		    events = events.split(/[ ,]/);

		    this.each(function(){
		    	var me = this;
		        baidu.each(events, function(event){
		            eb.add(me, event, fn, selector, data);
		        });
		    });

		}else if(typeof events == "object"){

			var me = this;
			
			baidu.each(events, function(fn, events){
			    me.on(events, selector, data, fn);
			});

		}

		return this;
	}
});
/**
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.event;
///import baidu.each;
///import baidu.dom._eventBase;

baidu.dom.extend({
	on: function(){
		var eb = baidu._eventBase;
	    return function(events, selector, data, fn){

			if(typeof events == "string"){

			    if(typeof selector == "function"){
			        fn = selector;
			    }else if(typeof data == "function"){
			    	fn = data;
			    }

			    if(typeof selector == "object"){
			        data = selector;
			    }

			    events = events.split(/[ ,]/);

			    baidu.each(this, function(item){
			        baidu.each(events, function(event){
			            eb.add(item, event, fn);
			        });
			    });
			}else if(typeof events == "object"){
				var me = this;
				
				baidu.each(events, function(fn, events){
				    me.on(events, selector, data, fn);
				});
			}
		}
	}()
});
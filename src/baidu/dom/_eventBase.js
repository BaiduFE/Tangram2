/**
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.id;
///import baidu.event;

baidu._eventBase = function(){

	var fnKey = "tangram-event-id";
	var eventsCache = {
		/*
			tangram-id: {
				eventName: [fn, fn...],
				eventName: [fn, fn...],
				...
			},
			tangram-id: {
				eventName: [fn, fn...],
				eventName: [fn, fn...],
				...
			},
			...
		*/
	};

	var addEvent = function(target, name, fn){
	    var call = function(e){
	    	var args = [].slice.call(arguments, 1);
	    	args.unshift(baidu.event(e));
			fn.apply(target, args);
		};
		if(window.attachEvent){
			target.attachEvent("on" + name, call);
		}else if(window.addEventListener){
			target.addEventListener(name, call, false);
		}else{
			target["on" + name] = call;
		}

		var tangId = baidu.id(target);
		var c = eventsCache[tangId] || (eventsCache[tangId] = {});
		var eventArray = c[name] || (c[name] = []);

		eventArray.push(fn, call);

		return call;
	};

	var removeEvent = function(target, name, fn){

		var tangId = baidu.id(target);
		var c = eventsCache[tangId] || (eventsCache[tangId] = {});
		var eventArray = c[name] || (c[name] = []);

		

		if(window.detachEvent){
			target.detachEvent("on" + name, fn);
		}else if(window.removeEventListener){
			target.removeEventListener(name, fn, false);
		}else if(target["on" + name] == fn){
			target["on" + name] = null;
		}
	};

    return {
    	add: function(dom, event, fn){
    		addEvent(dom, event, fn);
    	},

    	remove: function(dom, event, fn){
    	    removeEvent(dom, event, fn);
    	}
    }
}();
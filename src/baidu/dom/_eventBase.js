/**
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.id;
///import baidu.event;

baidu._eventBase = function(){

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

		eventArray.push(call, fn);

		return call;
	};

	var removeEvent = function(target, name, fn){

		var tangId = baidu.id(target);
		var c = eventsCache[tangId] || (eventsCache[tangId] = {});
		var eventArray = c[name] || (c[name] = []);

		var realf;
		for(var i = eventArray.length - 1, f; i >= 0; i --){
			f = eventArray[i];
			if(f == fn){
			    realf = eventArray[i - 1];
			    eventArray.splice(i - 1, 2);
			    break;
			}
		}

		if(!realf)
		    return;

		if(window.detachEvent){
			target.detachEvent("on" + name, realf);
		}else if(window.removeEventListener){
			target.removeEventListener(name, realf, false);
		}else if(target["on" + name] == realf){
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
/**
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.id;
///import baidu.event;
///import baidu.dom.is;

baidu.dom._eventBase = function(){

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

	var addEvent = function(target, name, fn, selector, data){
	    var call = function(e){
	    	var args = [].slice.call(arguments, 1);
	    	args.unshift(e = baidu.event(e));
	    	if(data && !e.data)
	    	    e.data = data;
	    	if( !selector )
	    	    return fn.apply(target, args);
	    	if( baidu(e.target).is(selector) )
				return fn.apply(target, args);
		};
		if(window.attachEvent)
			target.attachEvent("on" + name, call);
		else if(window.addEventListener)
			target.addEventListener(name, call, false);
		else
			target["on" + name] = call;

		var tangId = baidu.id(target);
		var c = eventsCache[tangId] || (eventsCache[tangId] = {});
		var eventArray = c[name] || (c[name] = []);

		eventArray.push(call, fn);

		return call;
	};

	var removeEvent = function(target, name, fn, selector){

		var tangId = baidu.id(target);
		var c = eventsCache[tangId] || (eventsCache[tangId] = {});
		var eventArray = c[name] || (c[name] = []);

		var realf;
		for(var i = eventArray.length - 1, f; i >= 0; i --)
			if(f = eventArray[i], f == fn){
			    realf = eventArray[i - 1];
			    eventArray.splice(i - 1, 2);
			    break;
			}

		if(!realf)
		    return;

		if(window.detachEvent)
			target.detachEvent("on" + name, realf);
		else if(window.removeEventListener)
			target.removeEventListener(name, realf, false);
		else if(target["on" + name] == realf)
			target["on" + name] = null;
	};

	var fire = function(target, name, data){
		var tangId = baidu.id(target);
		var c = eventsCache[tangId] || (eventsCache[tangId] = {});
		var eventArray = c[name] || (c[name] = []);

		var event = baidu.event({ type: name });
		if(data)
		    event.data = data;
		for(var i = 0, l = eventArray.length; i < l; i += 2)
			eventArray[i](event);
	};

    return {
    	add: function(dom, event, fn, selector, data){
    		addEvent(dom, event, fn, selector, data);
    	},

    	remove: function(dom, event, fn, selector){
    	    removeEvent(dom, event, fn, selector);
    	},

    	fire: function(dom, event, data){
    	    fire(dom, event, data);
    	}
    }
}();
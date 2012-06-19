/**
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.id;
///import baidu.event;
///import baidu.dom.is;
///import baidu.extend;

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

	    	if(e.triggerData)
	    		args.push.apply(args, e.triggerData);

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

	var fireHandler = function(target, name, triggerData){
		var tangId = baidu.id(target);
		var c = eventsCache[tangId] || (eventsCache[tangId] = {});
		var eventArray = c[name] || (c[name] = []);
		var event = baidu.event({ type: name });

		var args = [event];

		if(triggerData){
			event.triggerData = triggerData;
			args.push.apply(args, triggerData);
		};

		for(var i = 0, l = eventArray.length; i < l; i += 2)
			eventArray[i].apply(this, args);
	};

    return {
    	add: function(dom, event, fn, selector, data){
    		return addEvent(dom, event, fn, selector, data);
    	},

    	remove: function(dom, event, fn, selector){
    	    return removeEvent(dom, event, fn, selector);
    	},

    	fireHandler: function(dom, event, triggerData){
    	    return fireHandler(dom, event, triggerData);
    	},

    	method: function(name){
    	    if(arguments.length > 1){
    	        for(var i = 0, l = arguments.length; i < l; i ++)
    	        	this.method(arguments[i]);
    	        return this;
    	    }

    	    var object = {};
    	    object[name] = function(data, fn){
    	    	if(arguments.length == 0){
    	    	    return this.trigger(name);
    	    	}else{
    	    	    if(typeof data == "function"){
    	    	        fn = data;
    	    	        data = null;
    	    	    }
    	    	    return this.on(name, data, fn);
    	    	}
    	    };
    	    baidu.dom.extend(object);
    	}
    }
}();

baidu.dom._eventBase.method(
	"blur", "change", "click", "dblclick", "error",
	"focus", "focusin", "focusout",
	"keydown", "keypress", "keyup",
	"mousedown", "mouseenter", "mouseleave", "mousemove", "mouseout", "mouseover", "mouseup",
	"resize", "scroll", "select", "submit", "unload");
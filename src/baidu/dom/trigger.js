/**
 * @author dron
 */

///import baidu.dom.on;
///import baidu.dom.each;
///import baidu.extend;
///import baidu.dom.triggerHandler;

/**
 * @description 对指定的 TangramDom 集合派发指定的事件，并触发事件默认形为
 * @function 
 * @name baidu.dom().trigger()
 * @grammar baidu.dom(args).trigger(type[,data])
 * @param {String} type 事件类型
 * @param {Array} data 触发事件函数时携带的参数
 * @return TangramDom 
 */

baidu.dom.extend({
	trigger: function(){

		var eb = baidu.dom._eventBase;

		var ie = /msie/i.test(navigator.userAgent);

		var keys = { keydown: 1, keyup: 1, keypress: 1 };
		var mouses = { click: 1, dblclick: 1, mousedown: 1, mousemove: 1, mouseup: 1, mouseover: 1, mouseout: 1, mouseenter: 1, mouseleave: 1, contextmenu: 1 };
		var htmls = { abort: 1, blur: 1, change: 1, error: 1, focus: 1, focusin: 1, focusout: 1, load: 1, unload: 1, reset: 1, resize: 1, scroll: 1, select: 1, submit: 1 };
		
		var bubblesEvents = { scroll : 1, resize : 1, reset : 1, submit : 1, change : 1, select : 1, error : 1, abort : 1 };

		var parameters = {
			"KeyEvents": ["bubbles", "cancelable", "view", "ctrlKey", "altKey", "shiftKey", "metaKey", "keyCode", "charCode"],
			"MouseEvents": ["bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget"],
			"HTMLEvents": ["bubbles", "cancelable"],
			"UIEvents": ["bubbles", "cancelable", "view", "detail"],
			"Events": ["bubbles", "cancelable"]
		};

		baidu.extend(bubblesEvents, keys);
		baidu.extend(bubblesEvents, mouses);

		var values = function(source) {
			var result = [], resultLen = 0, k;
			for (k in source) {
				if (source.hasOwnProperty(k)) {
					result[resultLen++] = source[k];
				}
			}
			return result;
		};

		var parse = function(array, source) {
			var i = 0, size = array.length, obj = {};
			for (; i < size; i++) {
				obj[array[i]] = source[array[i]];
				delete source[array[i]];
			}
			return obj;
		};

		var eventsHelper = function(type, eventType, options) {
			options = baidu.extend({}, options);

			var param = values(parse(parameters[eventType], options)),
				evnt = document.createEvent(eventType);

			param.unshift(type);

			switch(eventType){
			    case "KeyEvents":
			    	evnt.initKeyEvent.apply(evnt, param);	
			    	break;
			    case "MouseEvents":
			    	evnt.initMouseEvent.apply(evnt, param);
			    	break;
			    case "UIEvents":
			    	evnt.initUIEvent.apply(evnt, param);
			    	break;
			    default:
			    	evnt.initEvent.apply(evnt, param);	
			    	break;
			}

			if(options.triggerData)
			    evnt.triggerData = options.triggerData;

			baidu.extend(evnt, options);
			return evnt;
		};

		var eventObject = function(options){
			var evnt;
			if(document.createEventObject){
				evnt = document.createEventObject();
				baidu.extend(evnt, options);
			}
			return evnt;
		};

		var keyEvents = function(type, options){
			options = parse(parameters["KeyEvents"], options);
			var evnt;
			if(document.createEvent){
				try{
					evnt = eventsHelper(type, "KeyEvents", options);
				}catch(e){
					try{
						evnt = eventsHelper(type, "Events", options);
					}catch(e){
						evnt = eventsHelper(type, "UIEvents", options);
					}
				}
			}else{
				options.keyCode = options.charCode > 0 ? options.charCode : options.keyCode;
				evnt = eventObject(options);
			}
			return evnt;
		};

		var mouseEvents = function(type, options){
			options = parse(parameters["MouseEvents"], options);
			var evnt;
			if(document.createEvent){
				evnt = eventsHelper(type, "MouseEvents", options);
				if( options.relatedTarget && !evnt.relatedTarget ){
					if("mouseout" == type.toLowerCase()){
						evnt.toElement = options.relatedTarget;
					}else if("mouseover" == type.toLowerCase()){
						evnt.fromElement = options.relatedTarget;
					}
				}
			}else{
				options.button = options.button == 0 ? 1 : options.button == 1 ? 4 : baidu.lang.isNumber(options.button) ? options.button : 0;
				evnt = eventObject(options);
			}
			return evnt;
		};

		var htmlEvents = function(type, options){
			options.bubbles = bubblesEvents.hasOwnProperty(type);
			options = parse(parameters["HTMLEvents"], options);
			var evnt;
			if(document.createEvent){
				try{
					evnt = eventsHelper(type, "HTMLEvents", options);
				}catch(e){
					try{
						evnt = eventsHelper(type, "UIEvents", options);
					}catch(e){
						evnt = eventsHelper(type, "Events", options);
					}
				}
			}else{
				evnt = eventObject(options);
			}
			return evnt;
		};

		var fire = function(element, type, triggerData){
			var evnt;

			var evnt = {
				bubbles: true, cancelable: true,
				view: window,
				detail: 1,
				screenX: 0, screenY: 0,
				clientX: 0, clientY: 0,
				ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
				keyCode: 0, charCode: 0,
				button: 0,
				relatedTarget: null
			};

			if( keys[type] )
				evnt = keyEvents( type, evnt );
			else if( mouses[type] )
				evnt = mouseEvents( type, evnt );
			else if( htmls[type] )
				evnt = htmlEvents( type, evnt );
			else
			    baidu( element ).triggerHandler( type, triggerData );

			if(triggerData)
			    evnt.triggerData = triggerData;

			if(evnt){
				if(element.dispatchEvent){
					element.dispatchEvent(evnt);
				}else if(element.fireEvent){
					element.fireEvent("on" + type, evnt);
				}
			}
		};

	    return function( type, triggerData ){
			this.each(function(){
				fire( this, type, triggerData );
			});
			return this;
		}
	}()
});
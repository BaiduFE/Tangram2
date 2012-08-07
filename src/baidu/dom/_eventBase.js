/**
 * @author dron
 */

///import baidu;
///import baidu.dom;
///import baidu.id;
///import baidu.event;
///import baidu.dom.is;
///import baidu.extend;
///import baidu.dom.triggerHandler;
///import baidu.dom.contains;

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

	var proxyCache = {
		/*
			tangram-id: { eventName: 1, eventName: 1, ... },
			tangram-id: { eventName: 1, eventName: 1, ... },
			...
		 */
	};

	var ae = 

	window.addEventListener ? 
	function( target, name, fn ){
	    target.addEventListener( name, fn, false );
	} : 

	window.attachEvent ?
	function( target, name, fn ){
	    target.attachEvent( "on" + name, fn );
	} :

	function(){};

	var proxy = function( target, name, fnAry ){
	    var id = baidu.id( target );
	    var c = proxyCache[ id ] = proxyCache[ id ] || {};
	    if( c[ name ] )
	    	return;
	    c[ name ] = 1;

	    var call = function( e ){
			var args = Array.prototype.slice.call( arguments, 1 );
				args.unshift( e = baidu.event( e )  );	    	
	    	
	    	if( !e.currentTarget )
	    	    e.currentTarget = target;

	    	for(var i = 0, l = fnAry.length; i < l; i += 2)
	    		fnAry[i].apply( this, args );
	    };

	    ae( target, name, call );
	};

	var addEvent = function( target, name, fn, selector, data ){
		var call = function( e ){
		    var t = baidu.dom( e.target );
			if( data && !e.data ) 
				e.data = data;
			if( e.triggerData ) 
				[].push.apply( arguments, e.triggerData );
			if( !selector )
				return e.result = fn.apply( target, arguments );
			if( t.is( selector ) || t.is( selector + " *" ) )
				return e.result = fn.apply( target, arguments );
		};

		var tangId = baidu.id( target );
		var c = eventsCache[ tangId ] || ( eventsCache[ tangId ] = {});
		var eventArray = c[ name ] || ( c[ name ] = [] );

		eventArray.push( call, fn );
		proxy( target, name, eventArray );

		return call;
	};

	var removeEvent = function( target, name, fn, selector ){
		var tangId;
		if( !( tangId = baidu.id( target, "get" ) ) ) 
		    return ;
		
		var c = eventsCache[ tangId ] || ( eventsCache[tangId] = {});
		var eventArray = c[ name ] || ( c[ name ] = [] );

		for( var i = eventArray.length - 1, f; i >= 0; i-- )
			if( f = eventArray[i], f === fn )
				eventArray.splice( i - 1, 2 );
	};

	var removeAllEvent = function( target, name ){
		var tangId;
		if( !( tangId = baidu.id( target, "get" ) ) )
		    return ;

		var c = eventsCache[tangId] || ( eventsCache[tangId] = {});

		var remove = function( name ){
			var eventArray = c[ name ] || ( c[ name ] = [] );
			for ( var i = eventArray.length - 1, fn; i >= 0; i -= 2 ) 
				fn = eventArray[i],
				removeEvent( target, name, fn );
		};

		if( name )
			remove( name );
		else for( var name in c ) 
			remove( name );
	};

	var fireHandler = function( target, name, triggerData ){
		var tangId;
		if( !( tangId = baidu.id( target, "get" ) ) )
		    return ;

		var c = eventsCache[tangId] || ( eventsCache[tangId] = {} );
		var eventArray = c[name] || ( c[name] = [] );
		var event = baidu.event({ type: name });
		var args = [ event ];

		if( triggerData )
			event.triggerData = triggerData,
			args.push.apply( args, triggerData );

		for( var i = 0, l = eventArray.length; i < l; i += 2 ) 
			eventArray[i].apply( this, args );
	};

	var getHandler = function( target ){
		var tangId;
		if( !( tangId = baidu.id( target, "get" ) ) ) 
		    return ;
		
	    var c = eventsCache[tangId] || ( eventsCache[tangId] = {} );
	    var ret = {}, arr;

	    for( var event in c ){
	        arr = ret[ event ] = [];
	        ce = c[ event ];
	        for( var i = 1, l = ce.length; i < l; i += 2 ) 
	        	arr.push( ce[i] );
	    }

	    return ret;
	};

	var special = function( name )  {
		switch ( name )  {
			case "focusin":
			case "focusout":
				if ( !/firefox/i.test( navigator.userAgent ) ) 
					return false;

				var object = {},
					fixName = name == "focusin" ? "focus" : "blur";

				object[name] = function( data, fn ){
					if( typeof data == "function" )
						fn = data, 
						data = null;

					var me = this;

					if( !fn ){
					    return this.triggerHandler( name, data );
					}else{
						var call = function(){
							me.triggerHandler( name );
						};

						baidu.each( this, function( item ){
							baidu( "textarea,select,input,button,a", item ).on( fixName, call );
						});

						return this._on( name, data, fn ), this;
					}
				};

				return baidu.dom.extend( object ), true;

			case "mouseenter":
			case "mouseleave":
				if( /msie/i.test( navigator.userAgent ) )
					return false;

				var object = {},
					fixName = name == "mouseenter" ? "mouseover" : "mouseout";

				var contains = baidu.dom.contains;

				object[name] = function( data, fn ){

					if( arguments.length == 0 )
						return this.trigger( name );

					if( typeof data == "function" )
						fn = data,
						data = null;

					var me = this;
					var call = function( event ){
						related = event.relatedTarget;
						if( !related || (related !== this && !contains( this, related )) )
						    me.triggerHandler( name );
					};

					baidu.each( this, function( item ){
					    this.on( fixName, call );
					}, this );

					return this._on( name, data, fn ), this;
				};

				return baidu.dom.extend( object ), true;
		}
		
		return false;
	};

	return {
		add: function( dom, event, fn, selector, data ){
			return addEvent( dom, event, fn, selector, data );
		},

		get: function( dom ){
			return getHandler( dom );
		},

		remove: function( dom, event, fn, selector ){
			if( typeof fn == "function" )
				return removeAllEvent( dom, event, fn, selector );
			else
				return removeAllEvent( dom, event, selector );
		},

		removeAll: function( dom ){
			return removeAllEvent( dom );
		},

		fireHandler: function( dom, event, triggerData ){
			return fireHandler( dom, event, triggerData );
		},

		method: function( name ){
			if( arguments.length > 1 ){
				for( var i = 0, l = arguments.length; i < l; i ++ ) 
					this.method( arguments[i] );
				return this;
			}

			if( !special( name ) ){
				var object = {};

				object[ name ] = function( data, fn ){

					if( arguments.length == 0 )
						return this.trigger( name );
					else{
						if( typeof data == "function" )
							fn = data,
							data = null;
						return this._on( name, data, fn );
					}
				};

				baidu.dom.extend( object );
			}
		}
	}
}();

baidu.dom._eventBase.method(

/**
 * @description �?TangramDom 集合触发 blur 事件
 * @function
 * @name baidu.dom().blur()
 * @grammar baidu.dom(args).blur()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 blur 事件监听
 * @function
 * @name baidu.dom().blur()
 * @grammar baidu.dom(args).blur([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"blur",

/**
 * @description �?TangramDom 集合触发 change 事件
 * @function
 * @name baidu.dom().change()
 * @grammar baidu.dom(args).change()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 change 事件监听
 * @function
 * @name baidu.dom().change()
 * @grammar baidu.dom(args).change([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"change",

/**
 * @description �?TangramDom 集合触发 click 事件
 * @function
 * @name baidu.dom().click()
 * @grammar baidu.dom(args).click()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 click 事件监听
 * @function
 * @name baidu.dom().click()
 * @grammar baidu.dom(args).click([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

 "click",

/**
 * @description �?TangramDom 集合触发 dblclick 事件
 * @function
 * @name baidu.dom().dblclick()
 * @grammar baidu.dom(args).dblclick()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 dblclick 事件监听
 * @function
 * @name baidu.dom().dblclick()
 * @grammar baidu.dom(args).dblclick([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"dblclick",

/**
 * @description �?TangramDom 集合触发 error 事件
 * @function
 * @name baidu.dom().error()
 * @grammar baidu.dom(args).error()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 error 事件监听
 * @function
 * @name baidu.dom().error()
 * @grammar baidu.dom(args).error([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"error",

/**
 * @description �?TangramDom 集合触发 focus 事件
 * @function
 * @name baidu.dom().focus()
 * @grammar baidu.dom(args).focus()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 focus 事件监听
 * @function
 * @name baidu.dom().focus()
 * @grammar baidu.dom(args).focus([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"focus", 

/**
 * @description �?TangramDom 集合触发 focusin 事件
 * @function
 * @name baidu.dom().focusin()
 * @grammar baidu.dom(args).focusin()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 focusin 事件监听
 * @function
 * @name baidu.dom().focusin()
 * @grammar baidu.dom(args).focusin([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"focusin",

/**
 * @description �?TangramDom 集合触发 focusout 事件
 * @function
 * @name baidu.dom().focusout()
 * @grammar baidu.dom(args).focusout()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 focusout 事件监听
 * @function
 * @name baidu.dom().focusout()
 * @grammar baidu.dom(args).focusout([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"focusout",

/**
 * @description �?TangramDom 集合触发 keydown 事件
 * @function
 * @name baidu.dom().keydown()
 * @grammar baidu.dom(args).keydown()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 keydown 事件监听
 * @function
 * @name baidu.dom().keydown()
 * @grammar baidu.dom(args).keydown([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"keydown", 

/**
 * @description �?TangramDom 集合触发 keypress 事件
 * @function
 * @name baidu.dom().keypress()
 * @grammar baidu.dom(args).keypress()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 keypress 事件监听
 * @function
 * @name baidu.dom().keypress()
 * @grammar baidu.dom(args).keypress([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"keypress", 

/**
 * @description �?TangramDom 集合触发 keyup 事件
 * @function
 * @name baidu.dom().keyup()
 * @grammar baidu.dom(args).keyup()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 keyup 事件监听
 * @function
 * @name baidu.dom().keyup()
 * @grammar baidu.dom(args).keyup([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"keyup",

/**
 * @description �?TangramDom 集合触发 mousedown 事件
 * @function
 * @name baidu.dom().mousedown()
 * @grammar baidu.dom(args).mousedown()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 mousedown 事件监听
 * @function
 * @name baidu.dom().mousedown()
 * @grammar baidu.dom(args).mousedown([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

 "mousedown",

/**
 * @description �?TangramDom 集合触发 mouseenter 事件
 * @function
 * @name baidu.dom().mouseenter()
 * @grammar baidu.dom(args).mouseenter()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 mouseenter 事件监听
 * @function
 * @name baidu.dom().mouseenter()
 * @grammar baidu.dom(args).mouseenter([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"mouseenter", 

/**
 * @description �?TangramDom 集合触发 mouseleave 事件
 * @function
 * @name baidu.dom().mouseleave()
 * @grammar baidu.dom(args).mouseleave()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 mouseleave 事件监听
 * @function
 * @name baidu.dom().mouseleave()
 * @grammar baidu.dom(args).mouseleave([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"mouseleave", 

/**
 * @description �?TangramDom 集合触发 mousemove 事件
 * @function
 * @name baidu.dom().mousemove()
 * @grammar baidu.dom(args).mousemove()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 mousemove 事件监听
 * @function
 * @name baidu.dom().mousemove()
 * @grammar baidu.dom(args).mousemove([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"mousemove", 

/**
 * @description �?TangramDom 集合触发 mouseout 事件
 * @function
 * @name baidu.dom().mouseout()
 * @grammar baidu.dom(args).mouseout()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 mouseout 事件监听
 * @function
 * @name baidu.dom().mouseout()
 * @grammar baidu.dom(args).mouseout([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"mouseout",

/**
 * @description �?TangramDom 集合触发 mouseover 事件
 * @function
 * @name baidu.dom().mouseover()
 * @grammar baidu.dom(args).mouseover()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 mouseover 事件监听
 * @function
 * @name baidu.dom().mouseover()
 * @grammar baidu.dom(args).mouseover([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"mouseover",

/**
 * @description �?TangramDom 集合触发 mouseup 事件
 * @function
 * @name baidu.dom().mouseup()
 * @grammar baidu.dom(args).mouseup()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 mouseup 事件监听
 * @function
 * @name baidu.dom().mouseup()
 * @grammar baidu.dom(args).mouseup([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"mouseup", 

/**
 * @description �?TangramDom 集合触发 resize 事件
 * @function
 * @name baidu.dom().resize()
 * @grammar baidu.dom(args).resize()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 resize 事件监听
 * @function
 * @name baidu.dom().resize()
 * @grammar baidu.dom(args).resize([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"resize",

/**
 * @description �?TangramDom 集合触发 scroll 事件
 * @function
 * @name baidu.dom().scroll()
 * @grammar baidu.dom(args).scroll()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 scroll 事件监听
 * @function
 * @name baidu.dom().scroll()
 * @grammar baidu.dom(args).scroll([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

 "scroll", 

/**
 * @description �?TangramDom 集合触发 select 事件
 * @function
 * @name baidu.dom().select()
 * @grammar baidu.dom(args).select()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 select 事件监听
 * @function
 * @name baidu.dom().select()
 * @grammar baidu.dom(args).select([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"select", 

/**
 * @description �?TangramDom 集合触发 submit 事件
 * @function
 * @name baidu.dom().submit()
 * @grammar baidu.dom(args).submit()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 submit 事件监听
 * @function
 * @name baidu.dom().submit()
 * @grammar baidu.dom(args).submit([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"submit", 

/**
 * @description �?TangramDom 集合触发 load 事件
 * @function
 * @name baidu.dom().load()
 * @grammar baidu.dom(args).load()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 load 事件监听
 * @function
 * @name baidu.dom().load()
 * @grammar baidu.dom(args).load([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"load",

/**
 * @description �?TangramDom 集合触发 unload 事件
 * @function
 * @name baidu.dom().unload()
 * @grammar baidu.dom(args).unload()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 unload 事件监听
 * @function
 * @name baidu.dom().unload()
 * @grammar baidu.dom(args).unload([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"unload",

/**
 * @description �?TangramDom 集合触发 contextmenu 事件
 * @function
 * @name baidu.dom().contextmenu()
 * @grammar baidu.dom(args).contextmenu()
 * @return TangramDom
 */

/**
 * @description �?TangramDom 集合添加 contextmenu 事件监听
 * @function
 * @name baidu.dom().contextmenu()
 * @grammar baidu.dom(args).contextmenu([data,]fn)
 * @param {Object} data 触发事件函数时，携带�?event.data 上的数据
 * @param {Function} fn 事件函数
 * @return TangramDom
 */

"contextmenu" );
/**
 * @author dron
 */

///import baidu.dom;
///import baidu.query.each;
///import baidu.event;
///import baidu.dom._eventBase;
///import baidu.event._queue;
///import baidu.event.simulate;
///import baidu.query.triggerHandler;

/**
 * @description 对指定的 TangramDom 集合派发指定的事件，并触发事件默认行为
 * @function 
 * @name baidu.dom().trigger()
 * @grammar baidu.dom(args).trigger(type[,data])
 * @param {String} type 事件类型
 * @param {Array} data 触发事件函数时携带的参数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

void function( base, be ){
    var special = be.special;
    var queue = base.queue;
    var dom = baidu.dom;

    var ie = !window.addEventListener, firefox = /firefox/i.test(navigator.userAgent);

    var abnormals = { submit: 3, focus: ie ? 3 : 2, blur: ie ? 3 : firefox ? 1 : 2 };

    var createEvent = function( type, opts ){
        var evnt;

        if( document.createEvent )
            evnt = document.createEvent( "HTMLEvents" ),
            evnt.initEvent( type, true, true );
        else if( document.createEventObject )
            evnt = document.createEventObject(),
            evnt.type = type;

        var extraData = {};

           if( opts )for( var name in opts )
               try{
                   evnt[ name ] = opts[ name ];
               }catch(e){
                   if( !evnt.extraData )
                       evnt.extraData = extraData;
                   extraData[ name ] = opts[ name ];
               }

        return evnt;
    };

    var dispatchEvent = function( element, type, event ){
       if( element.dispatchEvent )
           return element.dispatchEvent( event );
       else if( element.fireEvent )
           return element.fireEvent( "on" + type, event );
    };

//    var upp = function( str ){
//        return str.toLowerCase().replace( /^\w/, function( s ){
//            return s.toUpperCase();
//        } );
//    };

    var fire = function( element, type, triggerData, _eventOptions, special ){
        var evnt, eventReturn;

        if( evnt = createEvent( type, _eventOptions ) ){
            if( triggerData )
                evnt.triggerData = triggerData;
            
            if( special )
                queue.call( element, type, null, evnt );
            else{
                var abnormalsType = element.window === window ? 3 : abnormals[ type ];

                try{
                    if( abnormalsType & 1 || !( type in abnormals ) )
                        eventReturn = dispatchEvent( element, type, evnt );
                }catch(e){
                    dom( element ).triggerHandler( type, triggerData, evnt );
                }

                if( eventReturn !== false && abnormalsType & 2 ){
                    try{
                        if( element[ type ] )
                            element[ type ]();
                    }catch(e){
                    }
                }
            }
        }
    };

    baidu.query.extend({
        trigger: function( type, triggerData, _eventOptions ){
            var sp;

            if( type in special )
                sp = special[type];

            this.each(function(){
                fire( this, type, triggerData, _eventOptions, sp );
            });

            return this;
        }
    });
}( baidu.dom._eventBase, baidu.event );
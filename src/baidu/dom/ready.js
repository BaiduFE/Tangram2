/**
 * @author dron,wangxiao
 */

///import baidu;
///import baidu.dom;
///import baidu._util_;
///import baidu.deferred;

/**
 * @description 监听 documentDomReady 事件
 * @function 
 * @name baidu.dom().ready()
 * @grammar baidu.dom(args).ready(fn)
 * @param {Function} fn 事件回调函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

/**
 * @description 监听 documentDomReady 事件
 * @function 
 * @name baidu.dom.ready
 * @grammar baidu.dom.ready(fn)
 * @param {Function} fn 事件回调函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    ready: function(){

        var me = this,

            // The deferred used on DOM ready
            readyList,

            // Use the correct document accordingly with window argument (sandbox)
            document = window.document;

        // Is the DOM ready to be used? Set to true once it occurs.
        baidu._util_.isDomReady = false;

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        baidu._util_._readyWait = 1;

        // Hold (or release) the ready event
        baidu.dom.holdReady = function( hold ) {
            if ( hold ) {
                baidu._util_.readyWait++;
            } else {
                _ready( true );
            }
        };

        // Handle when the DOM is ready
        var _ready = function( wait ) {

            // Abort if there are pending holds or we're already ready
            if ( wait === true ? --baidu._util_.readyWait : baidu._util_.isDomReady ) {
                return;
            }

            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if ( !document.body ) {
                return setTimeout( _ready, 1 );
            }

            // Remember that the DOM is ready
            baidu._util_.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if ( wait !== true && --baidu._util_.readyWait > 0 ) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith( document );

            // Trigger any bound ready events
            if ( baidu.dom.trigger ) {
                baidu.dom( document ).trigger("ready").off("ready");
            }
        };

        var DOMContentLoaded = function() {
            if ( document.addEventListener ) {
                document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
                _ready();
            } else if ( document.readyState === "complete" ) {
                // we're here because readyState === "complete" in oldIE
                // which is good enough for us to call the dom ready!
                document.detachEvent( "onreadystatechange", DOMContentLoaded );
                _ready();
            }
        };

        var readyPromise = function( obj ) {
            if ( !readyList ) {

                readyList = baidu.Deferred();

                // Catch cases where $(document).ready() is called after the browser event has already occurred.
                // we once tried to use readyState "interactive" here, but it caused issues like the one
                // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
                if ( document.readyState === "complete" ) {
                    // Handle it asynchronously to allow scripts the opportunity to delay ready
                    setTimeout( _ready, 1 );

                // Standards-based browsers support DOMContentLoaded
                } else if ( document.addEventListener ) {
                    // Use the handy event callback
                    document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

                    // A fallback to window.onload, that will always work
                    window.addEventListener( "load", _ready, false );

                // If IE event model is used
                } else {
                    // Ensure firing before onload, maybe late but safe also for iframes
                    document.attachEvent( "onreadystatechange", DOMContentLoaded );

                    // A fallback to window.onload, that will always work
                    window.attachEvent( "onload", _ready );

                    // If IE and not a frame
                    // continually check to see if the document is ready
                    var top = false;

                    try {
                        top = window.frameElement == null && document.documentElement;
                    } catch(e) {}

                    if ( top && top.doScroll ) {
                        (function doScrollCheck() {
                            if ( !baidu._util_.isDomReady ) {

                                try {
                                    // Use the trick by Diego Perini
                                    // http://javascript.nwbox.com/IEContentLoaded/
                                    top.doScroll("left");
                                } catch(e) {
                                    return setTimeout( doScrollCheck, 50 );
                                }

                                // and execute any waiting functions
                                _ready();
                            }
                        })();
                    }
                }
            }
            return readyList.promise( obj );
        };

        return function( fn ) {

            // Add the callback
            readyPromise().done( fn );

            return me;
        }

    }()
});

/// Tangram 1.x Code Start
baidu.dom.ready = baidu.dom.fn.ready;
/// Tangram 1.x Code End
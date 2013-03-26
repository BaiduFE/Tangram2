///import plugin.fx;
///import baidu.extend;
void function( ns, undefined ){
    var interval = 13,//当animation frame不支持时有用
        //方法池子
        timers = [],
        //timer ID
        timerId,
        fxNow,
        nextFrame = (function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) { return setTimeout(callback, interval); };
        })(),
        cancelFrame = (function () {
            return window.cancelRequestAnimationFrame ||
                window.webkitCancelAnimationFrame ||
                window.webkitCancelRequestAnimationFrame ||
                window.mozCancelRequestAnimationFrame ||
                window.oCancelRequestAnimationFrame ||
                window.msCancelRequestAnimationFrame ||
                clearTimeout;
        })(),
        //取得当前时间
        now = function(){
            return ( new Date() ).getTime();
        },
        //
        createFxNow = function(){
            setTimeout(function(){
                fxNow = undefined;
            }, 0);
            return fxNow = now();
        },
        //统一调配
        tick = function(){
            var timer,
                i = 0;

            fxNow = now();//cache 当前时间
            for ( ; i < timers.length; i++ ) {
                timer = timers[ i ];
                // Checks the timer has not already been removed
                if ( !timer() && timers[ i ] === timer ) {
                    timers.splice( i--, 1 );
                }
            }
            if ( !timers.length ) {
                stop();
            } else {
                start( true );
            }
            fxNow = undefined;
        },
        //开始定期执行
        start = function( force ){
            timerId = ( force ? false : timerId ) || nextFrame(tick);
        },
        //结束定期执行
        stop = function(){
            cancelFrame(timerId);
            timerId = null;
        };

    baidu.extend(ns, {
        //添加方法到池子，如果fn有返回值，此方法将在下个tick再次执行。
        //获取池子
        timer: function( fn ){
            if( fn === undefined ){
                return timers;
            }
            fn() && timers.push( fn ) && start();
        },

        //获取当前时间，有缓存机制
        now: function(){
            return fxNow || createFxNow();
        }
    });
}( baidu.fx );
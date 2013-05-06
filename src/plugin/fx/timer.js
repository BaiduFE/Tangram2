///import plugin.fx;
///import baidu.extend;

/**
 * @name baidu.fx.useAnimationFrame
 * @function
 * @grammar baidu.fx.useAnimationFrame
 * @description 设置成true表示采用animation frame来间隔执行动画, 否则采用setTimeout来来执行。默认为true。
   如果浏览器本身不支持requestAnimationFrame，此处设置成true亦无效，仍然还是setTimeout来间隔执行。
 */

(function( undefined ){
    var fx = baidu.fx,

        //当animation frame不支持时有用
        interval = 13,

        //方法池子
        timers = [],

        getStrategy = (function(){
            var strategies = {
                    _default: {
                        next: function( cb ){
                            return setTimeout( cb, interval );
                        },

                        cancel: function( id ){ //不包一层，在id里面报错
                            return clearTimeout( id );
                        }
                    }
                },

                nextFrame = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame,

                cancelFrame = window.cancelRequestAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    window.webkitCancelRequestAnimationFrame ||
                    window.mozCancelRequestAnimationFrame ||
                    window.oCancelRequestAnimationFrame ||
                    window.msCancelRequestAnimationFrame;

            nextFrame && cancelFrame && (strategies.frame = {
                next: nextFrame,
                cancel: cancelFrame
            });

            return function( stra ){
                return strategies[stra] || strategies._default;
            };
        })(),

        now = function(){
            return ( new Date() ).getTime();
        },

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

            //暴露到fx给测试用例用
            strategy = strategy || ( fx.strategy = getStrategy( fx.useAnimationFrame ? 'frame' : '_default' ) );

            timerId = ( force ? false : timerId ) || strategy.next.call( null, tick );//必须使用call，否则会报错
        },

        //结束定期执行
        stop = function(){
            strategy && strategy.cancel.call( null, timerId );//必须使用call，否则会报错
            timerId = strategy = null;
        },

        //timer ID
        timerId,
        fxNow,
        strategy;


    baidu.extend(fx, {

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
        },

        tick: tick,

        useAnimationFrame: true
    });
})();
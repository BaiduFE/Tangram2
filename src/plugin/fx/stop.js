///import baidu.plugin;
///import baidu.global;
///import plugin.fx;
///import plugin.fx.queue;
///import plugin._util_.fx;

/**
 * @description 停止所选元素正在执行的动画
 * @function
 * @name baidu.dom().stop()
 * @grammar baidu.dom().stop( [clearQueue ] [, jumpToEnd ] )
 * @param    {Boolean}    clearQueue    是否清楚队列
 * @param    {Boolean}    jumpToEnd    是否让当前动画直接设置目标值
 * @return self
 */

 /**
 * @description 停止所选元素正在执行的动画
 * @function
 * @name baidu.dom().stop()
 * @grammar baidu.dom().stop( [queue ] [, clearQueue ] [, jumpToEnd ] )
 * @param    {String}    queue    队列名称，默认为fx
 * @param    {Boolean}    clearQueue    是否清楚队列
 * @param    {Boolean}    jumpToEnd    是否让当前动画直接设置目标值
 * @return self
 */
(function(){
    var fx = baidu.fx,
        helper = baidu.plugin._util_.fx,
        rrun = /queueHooks$/,
        getAllData = helper.getAllData;

    baidu.plugin( "dom", {
        stop: function( type, clearQueue, gotoEnd ) {
            var stopQueue = function( hooks ) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop( gotoEnd );
            };

            if ( typeof type !== "string" ) {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if ( clearQueue && type !== false ) {
                this.queue( type || "fx", [] );
            }

            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = fx.timer(),
                    data = getAllData( this );

                if ( index ) {
                    if ( data[ index ] && data[ index ].stop ) {
                        stopQueue( data[ index ] );
                    }
                } else {
                    for ( index in data ) {
                        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                            stopQueue( data[ index ] );
                        }
                    }
                }

                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
                        timers[ index ].anim.stop( gotoEnd );
                        dequeue = false;
                        timers.splice( index, 1 );
                    }
                }

                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                if ( dequeue || !gotoEnd ) {
                    baidu.dequeue( this, type );
                }
            });
        }
    });
})();
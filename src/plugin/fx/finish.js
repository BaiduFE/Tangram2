///import baidu.plugin;
///import baidu.global;
///import plugin.fx;
///import plugin.fx.queue;
///import plugin._util_.fx;
/**
 * @description 停止所选元素当前正在运行的动画，让它直接设置成目标值，同时清除所选元素所有在队列中的动画, 所有在队列中动画，也会立即被设置成目标值
 * @function
 * @name baidu.dom().finish()
 * @grammar baidu.dom().finish([queue])
 * @param    {String}    queue    队列名称，默认为fx
 * @return self
 */

(function(){
    var fx = baidu.fx,
        helper = baidu.plugin._util_.fx,
        getAllData = helper.getAllData;


    baidu.plugin( "dom", {
        finish: function( type ) {
            if ( type !== false ) {
                type = type || "fx";
            }
            return this.each( function() {
                var index,
                    data = getAllData( this ),
                    queue = data[ type + "queue" ],
                    hooks = data[ type + "queueHooks" ],
                    timers = fx.timer(),
                    item,
                    length = queue ? queue.length : 0;

                // enable finishing flag on private data
                data.finish = true;

                // empty the queue first
                baidu.queue( this, type, [], true );

                if ( hooks && hooks.cur && hooks.cur.finish ) {
                    hooks.cur.finish.call( this );
                }

                // look for any active animations, and finish them
                for ( index = timers.length; index--; ) {
                    item = timers[ index ];
                    if ( item.elem === this && item.queue === type ) {
                        item.anim.stop( true );
                        timers.splice( index, 1 );
                    }
                }

                // look for any animations in the old queue and finish them
                for ( index = 0; index < length; index++ ) {
                    item = queue[ index ];
                    if ( item && item.finish ) {
                        item.finish.call( this );
                    }
                }

                // turn off finishing flag
                delete data.finish;
            } );
        }
    } );
})();
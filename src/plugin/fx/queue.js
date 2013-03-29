///import baidu;
///import baidu.dom
///import baidu.dom.each
///import baidu.dom.data
///import baidu.makearray
///import baidu.callbacks
///import baidu.deferred

/*
 * @description 添加队列方法。
 * @author lxz
 * @create 2013-03-25
 */

void function( undefined ){
    var data = baidu.dom.data,

        //baidu._util_.access中value不能是fn,所以这里重写一个
        wrapper = function(tang, value, fn, setter){
            var tmp;

            if( !tang.size() ) {
                return tang;
            }

            return setter || value ? ( tang.each(fn), tang ): fn.call( tmp = tang[0], 0, tmp );
        };

    baidu._queueHooks = function(elem, type){
        var key = type + "queueHooks",
            ret;

        return data(elem, key) || (data(elem, key, ret = {
            empty: baidu.Callbacks("once memory").add(function(){
                //清理
                data(elem, type + "queue", null);
                data(elem, key, null);
            })
        }), ret);
    }


    baidu.dom.extend({
        queue: function( type, value, dontstart ){
            var key;

            if ( typeof type !== "string" ) {
                value = type;
                type = undefined;
            }

            type = type || "fx";
            key = type + "queue";

            return wrapper(this, value, function(){
                var queue = data(this, key);
                if(value){
                    if(!queue || baidu.isArray(value)){
                        data( this, key, queue = baidu.makeArray( value ) );
                    } else {
                        queue.push( value );
                    }

                    // 确保queue有hooks, 在promise调用之前必须要有hooks
                    baidu._queueHooks( this, type );

                    if ( !dontstart && type === "fx" && queue[0] !== "inprogress" ) {
                        baidu.dequeue( this, type );
                    }
                }
                return queue || [];
            }, arguments.length > 1 || value);
        },

        dequeue: function( type ){
            type = type || "fx";

            return wrapper(this, true, function(){
                var elem = this,
                    queue = baidu.queue(elem, type),
                    remaining = queue.length,
                    fn = queue.shift(),
                    hooks = baidu._queueHooks(elem, type),
                    next = function(){
                        baidu.dequeue(elem, type);
                    };

                if( fn === "inprogress" ) {
                    fn = queue.shift();
                    remaining--;
                }

                hooks.cur = fn;

                if( fn ) {
                    if( type === "fx" ) {
                        queue.unshift("inprogress");
                    }

                    delete hooks.stop;
                    fn.call(elem, next, hooks);
                }

                !remaining && hooks && hooks.empty.fire();
            });
        },

        delay: function( duration, type ){
            type = type || "fx";
            return this.queue(type, function( next, hooks ){
                var timer = setTimeout(next, duration || 0);
                hooks.stop = function(){
                    clearTimeout( timer );
                }
            });
        },

        clearQueue: function( type ) {
            return this.queue( type || "fx", [] );
        },

        promise: function( type, obj ) {
            var tmp,
                count = 1,
                defer = baidu.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if ( !( --count ) ) {
                        defer.resolveWith( elements, [ elements ] );
                    }
                };

            if ( typeof type !== "string" ) {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while( i-- ) {
                tmp = data( elements[ i ], type + "queueHooks" );
                if ( tmp && tmp.empty ) {
                    count++;
                    tmp.empty.add( resolve );
                }
            }
            resolve();
            return defer.promise( obj );
        }
    });

    //copy queue and dequeue to baidu namespace.
    baidu.queue = baidu.dom.queue;
    baidu.dequeue = baidu.dom.dequeue;

}();
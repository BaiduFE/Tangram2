///import baidu.plugin;
///import baidu.dom.each;
///import baidu.dom.data;
///import baidu.makeArray;
///import baidu.callbacks;
/**
 * @description 获取所选元素的队列
 * @function
 * @name baidu().queue()
 * @grammar baidu().queue( [queueName ] )
 * @param    {String}    queueName    队列名称，默认为fx
 * @return {Object} Queue数组
 */
 /**
 * @description 替换所选元素队列数组
 * @function
 * @name baidu().queue()
 * @grammar baidu().queue( [queueName ], newQueue )
 * @param    {String}    queueName    队列名称，默认为fx
 * @param    {Array}    newQueue    队列数组，成员为fn
 * @return self
 */
 /**
 * @description 添加fn到所选元素的队列中
 * @function
 * @name baidu().queue()
 * @grammar baidu().queue( [queueName ], callback(next, hook) )
 * @param    {String}    queueName    队列名称，默认为fx
 * @param    {Function}    callback    插入一个方法到队列中，执行next方法可以开始队列中的下一个方法
 * @return self
 */
 /**
 * @description 开始执行所选元素队列中的下一个成员
 * @function
 * @name baidu().dequeue()
 * @grammar baidu().dequeue( [queueName ] )
 * @param    {String}    queueName    队列名称，默认为fx
 * @return self
 */

(function( undefined ){
    var data = baidu.dom.data,

        //baidu._util_.access中value不能是fn,所以这里重写一个
        wrapper = function(tang, value, fn, setter){
            var tmp;

            if( !tang.size() ) {
                return tang;
            }
//            return setter || value ? ( tang.each(fn), tang ): fn.call( tmp = tang[0], 0, tmp );
            return setter || value ? tang.each(fn) : fn.call( tmp = tang[0], 0, tmp );
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


    baidu.plugin( "dom", {
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
        }
    });

    //copy queue and dequeue to baidu namespace.
    baidu.queue = baidu.dom.queue;
    baidu.dequeue = baidu.dom.dequeue;

})();
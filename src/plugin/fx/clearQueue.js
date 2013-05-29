///import baidu.plugin;
///import plugin.fx.queue;

 /**
 * @description 清空队列。
 * @function
 * @name baidu().clearQueue()
 * @grammar baidu().clearQueue( [queueName ] )
 * @param    {String}    queueName    队列名称，默认为fx
 * @return {Object} self
 * @example 默认清空名称为fx的队列，可以清空其他名称的队列。
 */
baidu.plugin( "dom", {

    clearQueue: function( type ) {
        return this.queue( type || "fx", [] );
    }
});
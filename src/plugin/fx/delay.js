///import baidu.plugin;
///import plugin.fx.queue;
/**
 * @description 插入一个指定延时的方法到队列中。
 * @function
 * @name baidu.dom().delay()
 * @grammar baidu.dom().delay(duration[, queueName])
 * @param    {Number}    duration    设置延时时间
 * @param    {String}    queueName    队列名称，默认为fx
 * @return {Object} self
 * @example 在队列中插入一个延时。

 示例代码：
 // div在渐隐后将停留1秒种，然后再开始渐显
 baidu('div').fadeOut(200).delay(1000).fadeIn(200);
 */
baidu.plugin( "dom", {

    delay: function( duration, type ){
        type = type || "fx";
        return this.queue(type, function( next, hooks ){
            var timer = setTimeout(next, duration || 0);
            hooks.stop = function(){
                clearTimeout( timer );
            }
        });
    }
});
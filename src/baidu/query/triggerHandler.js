/**
 * @author dron
 */

///import baidu.event._queue;

/**
 * @description 对指定的 TangramDom 集合派发指定的事件函数，不触发事件默认行为
 * @function 
 * @name baidu.dom().triggerHandler()
 * @grammar baidu.dom(args).triggerHandler(type[,data])
 * @param {String} type 事件类型
 * @param {Array} data 触发事件函数时携带的参数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

void function( base ){
    var queue = base.queue;

    baidu.query.extend({
        triggerHandler: function( type, triggerData, _e ){
            if( _e && !_e.triggerData )
                _e.triggerData = triggerData;

            baidu.forEach(this, function(item){
                queue.call( item, type, undefined, _e );
            });
            return this;
        }
    });

}( baidu.dom._eventBase );
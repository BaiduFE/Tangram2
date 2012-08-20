/**
 * @fileOverview 对当前 TangramDom 集合解除事件监听
 * @author dron
 */
///import baidu.dom._eventBase;
///import baidu.event;
///import baidu.each;

/**
 * @description 对当前 TangramDom 集合解除事件监听
 * @function 
 * @name baidu.dom().off()
 * @grammar baidu.dom(args).off(events[,selector],fn)
 * @param {String} events 事件名称，如果是多个事件，可用空格或半角逗号隔开
 * @param {String} selector 用于限制事件源的选择器表达式，此参数可选。
 * @param {Function} fn 事件触发函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

/**
 * @description 对当前 TangramDom 集合解除事件监听
 * @function 
 * @name baidu.dom().off()
 * @grammar baidu.dom(args).off(events[,selector],fn)
 * @param {Object} eventMap 一个以 eventName:eventFn 键值对表示的 JSON 格式对象
 * @param {String} selector 用于限制事件源的选择器表达式，此参数可选。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    off: function(events, selector, fn){
        var eb = baidu.dom._eventBase;
        
        if(!events){
         
            baidu.each(this, function(item){
                eb.removeAll(item);
            });

        }else if(typeof events == "string"){

            if(typeof selector == "function"){
                fn = selector;
                selector = null;
            }

            events = events.split(/[ ,]/);

            baidu.each(this, function(item){
                baidu.each(events, function(event){
                    eb.remove(item, event, fn, selector);
                });
            });

        }else if(typeof events == "object"){

            var me = this;
            
            baidu.each(events, function(fn, event){
                me.off(event, selector, fn);
            });

        }

        return this;
    }
});

/// Tangram 1.x Code Start
///improt baidu.dom.g;
baidu.event.un = baidu.un = function(element, evtName, handler){
    element = baidu.dom.g(element);
    baidu.dom(element).off(evtName.replace(/^\s*on/, ''), handler);
    return element;
 };
 /// Tangram 1.x Code End
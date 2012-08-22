/**
 * @author dron
 */

///import baidu;
///import baidu.dom;

/**
 * @description 监听 documentDomReady 事件
 * @function 
 * @name baidu.dom().ready()
 * @grammar baidu.dom(args).ready(fn)
 * @param {Function} fn 事件回调函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

/**
 * @description 监听 documentDomReady 事件
 * @function 
 * @name baidu.dom.ready
 * @grammar baidu.dom.ready(fn)
 * @param {Function} fn 事件回调函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    ready: function(){

        var readyBound = false,
            readyList = [],
            DOMContentLoaded;

        if (document.addEventListener) {
            DOMContentLoaded = function() {
                document.removeEventListener('DOMContentLoaded', DOMContentLoaded, false);
                ready();
            };

        } else if (document.attachEvent) {
            DOMContentLoaded = function() {
                if (document.readyState === 'complete') {
                    document.detachEvent('onreadystatechange', DOMContentLoaded);
                    ready();
                }
            };
        }

        /**
         * @private
         */
        function ready() {
            if (!ready.isReady) {
                ready.isReady = true;
                for (var i = 0, j = readyList.length; i < j; i++) {
                    readyList[i]();
                }
            }
        }
        /**
         * @private
         */
        function doScrollCheck(){
            try{
                document.documentElement.doScroll("left");
            }catch(e){
                setTimeout( doScrollCheck, 1 );
                return;
            }
            ready();
        }
        
        /**
         * @private
         */
        function bindReady() {
            if (readyBound) {
                return;
            }
            readyBound = true;

            if (document.readyState === "complete") {
                // TODO: 改进异步加载 tangram 时不触发 DOMContentLoaded 的问题
                ready.isReady = true;
            } else {
                if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', DOMContentLoaded, false);
                    window.addEventListener('load', ready, false);
                } else if (document.attachEvent) {
                    document.attachEvent('onreadystatechange', DOMContentLoaded);
                    window.attachEvent('onload', ready);

                    var toplevel = false;

                    try {
                        toplevel = window.frameElement == null;
                    } catch (e) {}

                    if (document.documentElement.doScroll && toplevel) {
                        doScrollCheck();
                    }
                }
            }
        }
        bindReady();

        return function(fn){
            if(fn){
                ready.isReady ? fn() : readyList.push(fn);   
            }

            return this;
        }
    }()
});
/// Tangram 1.x Code Start
baidu.dom.ready = baidu.dom.fn.ready;
/// Tangram 1.x Code End

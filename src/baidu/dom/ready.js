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

   var doc = document,
        branch = document.addEventListener ? 'w3c' : 'ie678'; //branching flag @2011-03-24
    var _domReady = {
        // When _domReady.done is true，all 'fn' will be invoked immediately.
        done: false,
        // The stack which all functions will be pushed into
        fn: [],
        // push callback functions
        push: function (fn) {
            if (!_domReady.done) {
                // only bind once
                if (_domReady.fn.length === 0) {
                    _domReady.bind();
                }
                _domReady.fn.push(fn);
            } else {
                fn();
            }
        },
        // The Real DOMContentLoaded Callback Function
        ready: function () {
            // Flag DOMContentLoaded Event was Done over
            _domReady.done = true;

            var fn = _domReady.fn;
            for (var i = 0, l = fn.length; i < l; i++) {
                fn[i]();
            }

            _domReady.unbind();
            _domReady.fn = null;
        },
        bind: {
            w3c: function () {
                doc.addEventListener('DOMContentLoaded', _domReady.ready, false);
            },
            //IE的监听方法参考了这篇文章：http://javascript.nwbox.com/IEContentLoaded/
            ie678: function () {
                var done = false,
                    // only fire once
                    init = function () {
                        if (!done) {
                            done = true;
                            _domReady.ready();
                        }
                    };
                // polling for no errors
                (function () {
                    try {
                        // throws errors until after ondocumentready
                        doc.documentElement.doScroll('left');
                    } catch (e) {
                        setTimeout(arguments.callee, 20);
                        return;
                    }
                    // no errors, fire
                    init();
                })();
                // trying to always fire before onload
                doc.onreadystatechange = function () {
                    if (doc.readyState == 'complete') {
                        doc.onreadystatechange = null;
                        init();
                    }
                };
            }
        }[branch],
        unbind: {
            w3c: function () {
                doc.removeEventListener('DOMContentLoaded', _domReady.ready, false);
            },
            ie678: function () { /* Nothing to do */
            }
        }[branch]
    };

    return _domReady.push;

    }()
});
/// Tangram 1.x Code Start
baidu.dom.ready = baidu.dom.fn.ready;
/// Tangram 1.x Code End

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.sio._createScriptTag;
///import baidu.sio._removeScriptTag;


/**
 * @description 通过script标签加载数据，加载完成由浏览器端触发回调
 * @function 
 * @name baidu.sio().callByBrowser()
 * @grammar baidu.sio(url).callByBrowser(callback[, options])
 * @param {function} callback 数据加载结束时调用的函数或函数名
 * @param {Object} options 其他可选项
 * @param {String} options.charset [可选]script的字符集
 * @param {Number} options.timeOut [可选]超时时间，超过这个时间将不再响应本请求，并触发onfailure函数
 * @param {function} options.onfailure [可选]timeOut设定后才生效，到达超时时间时触发本函数
 */

/**
 * @description 通过script标签加载数据，加载完成由浏览器端触发回调
 * @function 
 * @name baidu.sio.callByBrowser
 * @grammar baidu.sio.callByBrowser(url, callback[, options])
 * @param {function} callback 元素的ID名称或者直接传入元素本身
 * @param {String} url 一个能够访问javascript的字符串路径地址
 * @param {Object} options 元素的ID名称或者直接传入元素本身
 * @param {String} options.charset [可选]script的字符集
 * @param {Number} options.timeOut [可选]超时时间，超过这个时间将不再响应本请求，并触发onfailure函数
 * @param {function} options.onfailure [可选]timeOut设定后才生效，到达超时时间时触发本函数
 */


/*
 * 1、与callByServer不同，callback参数只支持Function类型，不支持string。
 * 2、如果请求了一个不存在的页面，callback函数在IE/opera下也会被调用，因此使用者需要在onsuccess函数中判断数据是否正确加载。
 */
 
baidu.sio.extend({
    callByBrowser : function (opt_callback, opt_options) {
        var url = this.url ;
        var scr = document.createElement("SCRIPT"),
            scriptLoaded = 0,
            options = opt_options || {},
            charset = options['charset'],
            callback = opt_callback || function(){},
            timeOut = options['timeOut'] || 0,
            timer;
        
        // IE和opera支持onreadystatechange
        // safari、chrome、opera支持onload
        scr.onload = scr.onreadystatechange = function () {
            // 避免opera下的多次调用
            if (scriptLoaded) {
                return;
            };
            
            var readyState = scr.readyState;
            if ('undefined' == typeof readyState
                || readyState == "loaded"
                || readyState == "complete") {
                scriptLoaded = 1;
                try {
                    callback();
                    clearTimeout(timer);
                } finally {
                    scr.onload = scr.onreadystatechange = null;
                    baidu.sio._removeScriptTag(scr);
                }
            }
        };

        if( timeOut ){
            timer = setTimeout(function(){
                scr.onload = scr.onreadystatechange = null;
                baidu.sio._removeScriptTag(scr);
                options.onfailure && options.onfailure();
            }, timeOut);
        };
        baidu.sio._createScriptTag(scr, url, charset);
    } 
});


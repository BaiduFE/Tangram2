/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.sio;
///import baidu.lang.isFunction;
///import baidu.lang.isString;
///import baidu.sio._createScriptTag;
///import baidu.sio._removeScriptTag;


/**
 * @description 通过script标签加载数据，加载完成由服务器端触发回调
 * @function 
 * @name baidu.sio().callByServer()
 * @grammar baidu.sio(url).callByServer(callback[, options])
 * @param {function} callback 服务器端调用的函数或函数名。如果没有指定本参数，将在URL中寻找options['queryField']做为callback的方法名
 * @param {Object} options [可选]加载数据时的选项
 * @param {String} options.charset [可选]script的字符集
 * @param {String} options.queryField [可选]服务器端callback请求字段名，默认为callback
 * @param {Number} options.timeOut [可选]超时时间(单位：ms)，超过这个时间将不再响应本请求，并触发onfailure函数
 * @param {function} options.onfailure [可选]timeOut设定后才生效，到达超时时间时触发本函数
 */

/**
 * @description 通过script标签加载数据，加载完成由服务器端触发回调
 * @function 
 * @name baidu.sio.callByServer
 * @grammar baidu.sio.callByServer(url, callback[, options])
 * @param {String} url 一个能够访问javascript的字符串路径地址
 * @param {function} callback 服务器端调用的函数或函数名。如果没有指定本参数，将在URL中寻找options['queryField']做为callback的方法名
 * @param {Object} options [可选]加载数据时的选项
 * @param {String} options.charset [可选]script的字符集
 * @param {String} options.queryField [可选]服务器端callback请求字段名，默认为callback
 * @param {Number} options.timeOut [可选]超时时间(单位：ms)，超过这个时间将不再响应本请求，并触发onfailure函数
 * @param {function} options.onfailure [可选]timeOut设定后才生效，到达超时时间时触发本函数
 */
 
baidu.sio.extend({
    callByServer : function( callback, opt_options) {
        var url = this.url ;
        var scr = document.createElement('SCRIPT'),
            prefix = 'bd__cbs__',
            callbackName,
            callbackImpl,
            options = opt_options || {},
            charset = options['charset'],
            queryField = options['queryField'] || 'callback',
            timeOut = options['timeOut'] || 0,
            timer,
            reg = new RegExp('(\\?|&)' + queryField + '=([^&]*)'),
            matches;

        if (baidu.lang.isFunction(callback)) {
            callbackName = prefix + Math.floor(Math.random() * 2147483648).toString(36);
            window[callbackName] = getCallBack(0);
        } else if(baidu.lang.isString(callback)){
            // 如果callback是一个字符串的话，就需要保证url是唯一的，不要去改变它
            // TODO 当调用了callback之后，无法删除动态创建的script标签
            callbackName = callback;
        } else {
            if (matches = reg.exec(url)) {
                callbackName = matches[2];
            }
        }

        if( timeOut ){
            timer = setTimeout(getCallBack(1), timeOut);
        }

        //如果用户在URL中已有callback，用参数传入的callback替换之
        url = url.replace(reg, '\x241' + queryField + '=' + callbackName);
        
        if (url.search(reg) < 0) {
            url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;
        }
        baidu.sio._createScriptTag(scr, url, charset);

        /*
         * 返回一个函数，用于立即（挂在window上）或者超时（挂在setTimeout中）时执行
         */
        function getCallBack(onTimeOut){
            /*global callbackName, callback, scr, options;*/
            return function(){
                try {
                    if( onTimeOut ){
                        options.onfailure && options.onfailure();
                    }else{
                        callback.apply(window, arguments);
                        clearTimeout(timer);
                    }
                    window[callbackName] = null;
                    delete window[callbackName];
                } catch (exception) {
                    // ignore the exception
                } finally {
                    baidu.sio._removeScriptTag(scr);
                }
            }
        }
    }

});

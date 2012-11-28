///import baidu.ajax;

/// Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 发送一个ajax请求
 * @function 
 * @name baidu.ajax.request
 * @grammar baidu.ajax.request(url[, options])
 * @param {Object} options 发送请求的选项参数
 * @param {String} options.method 请求发送的类型。默认为GET
 * @param {Boolean} options.async 是否异步请求。默认为true（异步）
 * @param {String} options.data 需要发送的数据。如果是GET请求的话，不需要这个属性
 * @param {Object} options.headers 要设置的http request header
 * @param {Number} options.timeout 超时时间，单位ms
 * @param {String} options.username 用户名
 * @param {String} options.password 密码
 * @param {function} options.onsuccess 请求成功时触发，格式：function(XMLHttpRequest xhr, String responseText)
 * @param {function} options.onfailure 请求失败时触发，格式：function(XMLHttpRequest xhr)
 * @param {function} options.onbeforerequest 发送请求之前触发，格式：function(XMLHttpRequest xhr)
 * @param {function} options.on{STATUS_CODE} 当请求为相应状态码时触发的事件，如on302、on404、on500，function(XMLHttpRequest xhr)。3XX的状态码浏览器无法获取，4xx的，可能因为未知问题导致获取失败
 * @param {Boolean} options.noCache 是否需要缓存，默认为false（缓存）
 * @return {XMLHttpRequest} 返回发送请求的XMLHttpRequest对象
 */
 
baidu.ajax.request = function( url, opt ) {
    var bf = true, sc = {};

    opt.onbeforerequest = opt.onbeforerequest || baidu.ajax.onbeforerequest;
    opt.onfailure = opt.onfailure || baidu.ajax.onfailure;

    if( opt.onbeforerequest )
        bf = opt.onbeforerequest();
    
    for(var name in opt)
        if( /^on(\d{3})$/.test( name ) )
            sc[ RegExp.$1 ] = opt[ name ];

    if( bf !== false )
        return baidu.ajax(url, {
            async: opt.async,
            type: opt.method,
            data: opt.data,
            headers: opt.headers,
            timeout: opt.timeout,
            username: opt.username,
            password: opt.password,
            success: function( text, status, xhr ){
                if( opt.onsuccess )
                    opt.onsuccess( xhr, text );
            },
            error: function( text, status, xhr ){
                if( xhr == "Not Found" )
                    xhr = { status: 404 };
                if( opt.onfailure )
                    opt.onfailure( xhr, text );
                if( status == "timeout" && opt.ontimeout )
                    opt.ontimeout();
            },
            cache: typeof opt.noCache == "boolean" ? !opt.noCache : true,
            statusCode: sc
        });
};
/// Tangram 1.x Code End
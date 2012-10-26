///import baidu.createChain;
///import baidu.object.isPlain;
///import baidu.extend;
///import baidu.string.trim;
///import baidu.type;
///import baidu.deferred;
///import baidu.callbacks;
///import baidu.id;
///import baidu.support;
///import baidu.dom.on;

/**
 * @description 执行一个异步的ajax请求
 * @function 
 * @name baidu.ajax()
 * @grammar baidu.ajax(url[, options])
 * @param {String} url 用来发送请求的url字符串
 * @param {Object} options options参数
 * @param {Boolean} options.async 设置该次请求是一个异步请求或是同步，默认是异步请求
 * @param {function} options.beforeSend 发送请求之前的触发事件，事件函数第一参数接收tangramAjax对象，第二参数接收setting，即当次的ajax设置
 * @param {Boolean} options.cache 是否开启ajax缓存，默认true，当dataType为"script"和"jsonp"时默认为false，即不缓存
 * @param {function} options.complete 请求完成后的回调函数（请求成功与失败都回调），函数接收两个参数，tangramAjax对象和一个描述成功请求类型的字符串("success", "notmodified", "error","timeout", or "parsererror")
 * @param {Object} options.contents 一个以"{字符串:正则表达式}"配对的对象，用来确定ajax将如何解析响应，给定其内容类型
 * @param {String} options.contentType 发送信息至服务器时内容编码类型。默认值是"application/x-www-form-urlencoded"，适合大多数情况。如果你明确地传递了一个content-type给 baidu.ajax() 那么他必定会发送给服务器（即使没有数据要发送）。数据将总是使用UTF-8字符集传递给服务器；你必须译码这适当的在服务器端。
 * @param {Object} options.context 这个对象用于设置Ajax相关回调函数的上下文。也就是说，让回调函数内this指向这个对象（如果不设定这个参数，那么this就指向调用本次AJAX请求时传递的options参数）。比如指定一个DOM元素作为context参数，这样就设置了success回调函数的上下文为这个DOM元素。
 * @param {Object} options.converters 一个数据类型对数据类型转换器的对象。每个转换器的值是一个函数，返回响应的转化值，默认值是： {"* text": window.String, "text html": true, "text json": parseJSON, "text xml": parseXML}
 * @param {Boolean} options.crossDomain 同域请求为false， 跨域请求为true，如果你想强制跨域请求（如JSONP形式）同一域，设置crossDomain为true。这使得例如，服务器端重定向到另一个域
 * @param {Object|String} options.data 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
 * @param {function} options.dataFilter 一个函数被用来处理XMLHttpRequest的原始响应数据。这是一个预过滤功能，净化响应。您应该返回安全数据。函数接收data和type两个参数：data是Ajax返回的原始数据，type是调用jQuery.ajax时提供的dataType参数
 * @param {String} options.dataType 预期服务器返回的数据类型。如果不指定，将自动根据 HTTP 包 MIME 信息来智能判断，可用值：xml, html, script, json, jsonp, text
 * @param {function} options.error 请求失败时调用此函数，函数接收三个参数：tangramAjax, textStatus, errorThrown。textStatus是描述发生的错误类型的一个字符串，取值除了得到null之外，还可能是"timeout", "error", "abort" 和 "parsererror"。errorThrown是捕获的异常对象。注意：此处理程序不被跨域脚本和JSONP形式的请求调用。
 * @param {Object} options.headers 一个额外的"{键:值}"对映射到请求一起发送。此设置被设置之前beforeSend函数被调用;因此，消息头中的值设置可以在覆盖beforeSend函数范围内的任何设置。
 * @param {Boolean} options.ifModified 仅在服务器数据改变时获取新数据。使用 HTTP 包 Last-Modified 头信息判断。默认值false
 * @param {Boolean} options.isLocal 允许当前环境被认定为“本地”，（如文件系统），即使jQuery默认情况下不会承认它。以下协议目前公认为本地：file, *-extension, and widget。
 * @param {String} options.jsonp 在一个jsonp请求中重写回调函数的名字。这个值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分，比如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器。设置jsonp选项为false阻止了ajax从加入"?callback"字符串的URL或试图使用"=?"转换。在这种情况下，你也应该明确设置jsonpCallback设置。例如, { jsonp: false, jsonpCallback: "callbackName" }
 * @param {String|function} options.jsonpCallback 为jsonp请求指定一个回调函数名。这个值将用来取代ajax自动生成的随机函数名。这主要用来让ajax生成度独特的函数名，这样管理请求更容易，也能方便地提供回调函数和错误处理。你也可以在想让浏览器缓存GET请求的时候，指定这个回调函数名。
 * @param {String} options.mimeType 一个mime类型用来覆盖XHR的 MIME类型
 * @param {String} options.password 用于响应HTTP访问认证请求的密码
 * @param {Boolean} options.processData 默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
 * @param {String} options.scriptCharset 只有当请求时dataType为"jsonp"或"script"，并且type是"GET"才会用于强制修改charset。通常只在本地和远程的内容编码不同时使用。
 * @param {Object} options.statusCode 一组数值的HTTP代码和函数对象，当响应时调用了相应的代码。例如，如果响应状态是404，将触发以下警报：baidu.ajax(statusCode: {404: function(){}});
 * @param {function} options.success 请求成功后的回调函数。这个函数传递3个参数data, textStatus, tangramAjax：data从服务器返回的数据，并根据dataType参数进行处理后的数据，一个描述状态的字符串。
 * @param {Number} options.timeout 置请求超时时间（毫秒）。
 * @param {Boolean} options.traditional 如果你想要用传统的方式来序列化数据，那么就设置为true。
 * @param {String} options.type 请求方式 ("POST" 或 "GET")， 默认为 "GET"。
 * @param {Number} options.username 于响应HTTP访问认证请求的用户名
 * @param {function} options.xhr 回调创建XMLHttpRequest对象。当可用时默认为ActiveXObject（IE）中，否则为XMLHttpRequest。提供覆盖你自己的执行的XMLHttpRequest或增强工厂。
 * @param {Number} options.xhrFields 一对“文件名-文件值”在本机设置XHR对象。例如，如果需要的话，你可以用它来设置withCredentials为true的跨域请求。
 * @return {tangramAjax} 一个tangramAjax对象
 */
 
/**
 * @description 设置全局的AJAX请求默认选项
 * @function 
 * @name baidu.ajax.setup
 * @grammar baiud.ajax.setup(options)
 * @param {Object} options 用于设置AJAX的全局参数, 参见baidu.ajax()
 * @return {Object} 最终的options结果
 */
 
/**
 * @description 创建一个序列化的数组或对象，适用于一个URL 地址查询字符串或Ajax请求
 * @function 
 * @name baidu.ajax.param
 * @grammar baidu.ajax.param(obj[, traditional ])
 * @param {Object} obj 一个数组或序列化的对象
 * @param {Boolean} traditional 一个布尔值，指示是否执行了传统的“shallow”的序列化
 * @return {String} 序列化的结果
 */


void function(){
    var ajaxLocation = location.href,
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rprotocol = /^\/\//,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        rhash = /#.*$/,
        rbracket = /\[\]$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
        
        // JSON RegExp
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        
        
        
        allTypes = ['*/'] + ['*'],
        
        prefilters = {},
        transports = {},
        
        lastModified = {},
        etag = {},
        
        
        
        ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
        
    function parseXML(data){
        var xml, tmp;
        if (!data || baidu.type(data) !== 'string') {
            return null;
        }
        try {
            if ( window.DOMParser ) { // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString( data , "text/xml" );
            } else { // IE
                xml = new ActiveXObject( "Microsoft.XMLDOM" );
                xml.async = "false";
                xml.loadXML( data );
            }
        } catch( e ) {
            xml = undefined;
        }
        if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
            throw new Error( "Invalid XML: " + data );
        }
        return xml;
    }
    
    function parseJSON(data){
        if(!data || baidu.type(data) !== 'string'){return null;}
        data = baidu.string(data).trim();
        if ( window.JSON && window.JSON.parse ) {
            return window.JSON.parse( data );
        }
        if ( rvalidchars.test( data.replace( rvalidescape, "@" )
            .replace( rvalidtokens, ']')
            .replace( rvalidbraces, ''))) {

            return ( new Function( 'return ' + data ) )();

        }
        throw new Error( "Invalid JSON: " + data );
    }
    
    function globalEval( data ) {
        if ( data && /\S/.test( data ) ) {
            ( window.execScript || function( data ) {
                window[ "eval" ].call( window, data );
            } )( data );
        }
    }
    
    function toPrefiltersOrTransports(structure){
        return function(expression, func){
            if(baidu.type(expression) !== 'string'){
                func = expression;
                expression = '*';
            }
            var dataTypes = expression.toLowerCase().split(/\s+/),
                placeBefore, array;
            
            if(baidu.type(func) === 'function'){
                for(var i = 0, item; item = dataTypes[i]; i++){
                    placeBefore = /^\+/.test(item);
                    placeBefore && (item = item.substr(1) || '*');
                    array = structure[item] = structure[item] || [];
                    array[placeBefore ? 'unshift' : 'push'](func);
                }
            }
        };
    }
    
    
    function ajaxHandleResponses(opts, tangXHR, responses){
        var ct, type, finalDataType, firstDataType,
            contents = opts.contents,
            dataTypes = opts.dataTypes,
            responseFields = opts.responseFields;
        
        for ( type in responseFields ) {
            if ( type in responses ) {
                tangXHR[responseFields[type]] = responses[ type ];
            }
        }
        while(dataTypes[0] === '*'){
            dataTypes.shift();
            if (ct === undefined){
                ct = opts.mimeType || tangXHR.getResponseHeader('content-type');
            }
        }
        if(ct){
            for(type in contents ){
                if(contents[type] && contents[type].test(ct)){
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses){
            finalDataType = dataTypes[0];
        } else {
            for (type in responses){
                if (!dataTypes[0] || opts.converters[type + ' ' + dataTypes[0]]){
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if(finalDataType){
            if(finalDataType !== dataTypes[0]){
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    
    function ajaxConvert(opts, response){
        var dataTypes = opts.dataTypes.slice(),
            prev = dataTypes[0],
            converters = {},
            conv, array;
            
            
            
        opts.dataFilter && (response = opts.dataFilter(response, opts.dataType));
        if(dataTypes[1]){
            for(var i in opts.converters){
                converters[i.toLowerCase()] = opts.converters[i];
            }
        }
        for(var i = 0, curr; curr = dataTypes[++i];){
            if(curr !== '*'){
                if(prev !== '*' && prev !== curr){
                    conv = converters[prev + ' ' + curr] || converters['* ' + curr];
                    if(!conv){
                        for(var key in converters){
                            array = key.split(' ');
                            if(array[1] === curr){
                                conv = converters[prev + ' ' + array[0]]
                                    || converters['* ' + array[0]];
                                if(conv){
                                    if(conv === true){
                                        conv = converters[key];
                                    }else if(converters[key] !== true){
                                        curr = array[0];
                                        dataTypes.splice(i--, 0, curr);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    
                    if(conv !== true){
                        if(conv && opts['throws']){
                            response = conv(response);
                        }else{
                            try{
                                response = conv(response);
                            }catch(e){
                                return { state: 'parsererror', error: conv ? e : 'No conversion from ' + prev + ' to ' + curr };
                            }
                        }
                    }
                }
                prev = curr;
            }
        }
        return { state: 'success', data: response };
    }
    
    
    function inspectPrefiltersOrTransports(structure, options, originalOptions, tangXHR, dataType, inspected){
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        
        var selection,
        list = structure[ dataType ],
        length = list ? list.length : 0,
        executeOnly = ( structure === prefilters );
        
        for (var i = 0; i < length && ( executeOnly || !selection ); i++ ) {
            selection = list[ i ]( options, originalOptions, tangXHR );
            if ( typeof selection === "string" ) {
                if ( !executeOnly || inspected[selection]){
                    selection = undefined;
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(
                            structure, options, originalOptions, tangXHR, selection, inspected );
                }
            }
        }
        if ( ( executeOnly || !selection ) && !inspected['*'] ) {
            selection = inspectPrefiltersOrTransports(
                    structure, options, originalOptions, tangXHR, '*', inspected );
        }
        return selection;
    }
    
    baidu.createChain('ajax', function(url, options){
        if(baidu.object.isPlain(url)){
            options = url;
            url = undefined;
        }
        options = options || {};
        
        var opts = baidu.ajax.setup({}, options),
            callbackContext = opts.context || opts,
            fireGlobals,
            ifModifiedKey,
            parts,
            
            //tangXHR
            
            deferred = baidu.Deferred(),
            completeDeferred = baidu.Callbacks('once memory'),
            statusCode = opts.statusCode || {},
            
            state = 0,
            requestHeadersNames = {},
            requestHeaders = {},
            strAbort = 'canceled',
            responseHeadersString,
            responseHeaders,
            transport,
            //tangXHR
            //done
            
            //done
            tangXHR = baidu.extend(new baidu.ajax.$Ajax(url, opts), {
                readyState: 0,
                setRequestHeader: function(name, value){
                    if(!state){
                        var lname = name.toLowerCase();
                        name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                        requestHeaders[ name ] = value;
                    }
                },
                getAllResponseHeaders: function(){
                    return state === 2 ? responseHeadersString : null;
                },
                
                getResponseHeader: function(key){
                    var match;
                    if(state === 2){
                        if(!responseHeaders){
                            responseHeaders = {};
                            while(match = rheaders.exec(responseHeadersString)){
                                responseHeaders[match[1].toLowerCase()] = match[2];
                            }
                        }
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return match === undefined ? null : match;
                },
                
                overrideMimeType: function(type){
                    !state && (opts.mimeType = type);
                    return this;
                },
                
                abort: function(statusText){
                    statusText = statusText || strAbort;
                    transport && transport.abort(statusText);
                    done(0, statusText);
                    return this;
                }
            });
        var timeoutTimer;
        
        
        function done(status, nativeStatusText, responses, headers){
            var statusText = nativeStatusText,
                isSuccess, success, error, response, modified;
            if(state === 2){return;}
            state = 2;
            timeoutTimer && clearTimeout(timeoutTimer);
            transport = undefined;
            responseHeadersString = headers || '';
            tangXHR.readyState = status > 0 ? 4 : 0;
            responses && (response = ajaxHandleResponses(opts, tangXHR, responses));
            
            if(status >= 200 && status < 300 || status === 304){
                if(opts.ifModified){
                    modified = tangXHR.getResponseHeader('Last-Modified');
                    modified && (lastModified[ifModifiedKey] = modified);
                    modified = tangXHR.getResponseHeader('Etag');
                    modified && (etag[ifModifiedKey] = modified);
                }
                if(status === 304){
                    statusText = 'notmodified';
                    isSuccess = true;
                }else{
                    isSuccess = ajaxConvert(opts, response);
                    statusText = isSuccess.state;
                    success = isSuccess.data;
                    error = isSuccess.error;
                    isSuccess = !error;
                }
            }else{
                error = statusText;
                if(!statusText || status){
                    statusText = 'error';
                    status < 0 && (status = 0);
                }
            }
            
            tangXHR.status = status;
            tangXHR.statusText = '' + (nativeStatusText || statusText);
            
            if(isSuccess){
                deferred.resolveWith(callbackContext, [success, statusText, tangXHR]);
            }else{
                deferred.rejectWith(callbackContext, [tangXHR, statusText, error]);
            }
            tangXHR.statusCode(statusCode);
            statusCode = undefined;
            
//            fireGlobals && globalEventContext.trigger('ajax' + (isSuccess ? 'Success' : 'Error'),
//                        [tangXHR, opts, isSuccess ? success : error]);
            completeDeferred.fireWith(callbackContext, [tangXHR, statusText]);
            //TODO ajaxComplete event;
        }
        
        deferred.promise(tangXHR);
        tangXHR.success = tangXHR.done;
        tangXHR.error = tangXHR.fail;
        tangXHR.complete = completeDeferred.add;
        
        tangXHR.statusCode = function(map){
            if(map){
                if(state < 2){
                    for(var i in map){
                        statusCode[i] = [statusCode[i], map[i]];
                    }
                }else{
                    tangXHR.always(map[tangXHR.status]);
                }
            }
            return this;
        };
        
        //if url is window.location must + ''
        opts.url = ((url || opts.url) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
        opts.dataTypes = baidu.string(opts.dataType || '*').trim().toLowerCase().split(/\s+/);
        // Determine if a cross-domain request is in order
        if (opts.crossDomain == null){
            parts = rurl.exec(opts.url.toLowerCase());
            opts.crossDomain = !!(parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2]
                || (parts[3] || (parts[1] === 'http:' ? 80 : 443)) !=
                    (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? 80 : 443))));
        }
        if(opts.data && opts.processData && baidu.type(opts.data) !== 'string'){
            opts.data = baidu.ajax.param(opts.data, opts.traditional );
        }
        
        inspectPrefiltersOrTransports(prefilters, opts, options, tangXHR);//运行prefilter()
        
        if(state === 2){return '';/*jqXHR*/}
        fireGlobals = opts.global;
        opts.type = opts.type.toUpperCase();
        opts.hasContent = !rnoContent.test(opts.type);
        
        //trigger ajaxStart start;
        //trigger ajaxStart end;
        if(!opts.hasContent){
            if(opts.data){
                opts.url += (~opts.url.indexOf('?') ? '&' : '?') + opts.data;
                delete opts.data;
            }
            ifModifiedKey = opts.url;
            if(opts.cache === false){
                var now = new Date().getTime(),
                    ret = opts.url.replace(rts, '$1_=' + now);
                opts.url = ret + (ret === opts.url ? (~opts.url.indexOf('?') ? '&' : '?') + '_=' + now : '');
            }
        }
        if(opts.data && opts.hasContent && opts.contentType !== false
            || options.contentType){
                tangXHR.setRequestHeader('Content-Type', opts.contentType);
        }
        if(opts.ifModified){
            ifModifiedKey = ifModifiedKey || opts.url;
            lastModified[ifModifiedKey]
                && tangXHR.setRequestHeader('If-Modified-Since', lastModified[ifModifiedKey]);
            etag[ifModifiedKey]
                && tangXHR.setRequestHeader('If-None-Match', etag[ifModifiedKey]);
        }
        
        tangXHR.setRequestHeader('Accept',
            opts.dataTypes[0] && opts.accepts[opts.dataTypes[0]] ?
                opts.accepts[opts.dataTypes[0]] + (opts.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '')
                    : opts.accepts['*']);
        
        for(var i in opts.headers){
            tangXHR.setRequestHeader(i, opts.headers[i]);
        }
        if(opts.beforeSend && (opts.beforeSend.call(callbackContext, tangXHR, opts) === false || state === 2)){
            return tangXHR.abort();
        }
        strAbort = 'abort';
        for(var i in {success: 1, error: 1, complete: 1}){
            tangXHR[i](opts[i]);
        }
        transport = inspectPrefiltersOrTransports(transports, opts, options, tangXHR);
        if(!transport){
            done(-1, 'No Transport');
        }else{
            tangXHR.readyState = 1;
            //TODO trigger ajaxSend
            if(opts.async && opts.timeout > 0){
                timeoutTimer = setTimeout(function(){
                    tangXHR.abort('timeout')
                }, opts.timeout);
            }
            try{
                state = 1;
                transport.send(requestHeaders, done);
            }catch(e){
                if(state < 2){
                    done(-1, e);
                }else{
                    throw e;
                }
            }
        }
        return tangXHR;
    }, function(url, options){
        this.url = url;
        this.options = options;
    });
    
    baidu.ajax.settings = {
       url: ajaxLocation,
        isLocal: rlocalProtocol.test(ajaxLocParts[1]),
        global: true,
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        processData: true,
        async: true,
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {},
        */
        accepts: {
            xml: 'application/xml, text/xml',
            html: 'text/html',
            text: 'text/plain',
            json: 'application/json, text/javascript',
            '*': allTypes
        },
        contents: {
            xml: /xml/,
            html: /html/,
            json: /json/
        },
        responseFields: {
            xml: 'responseXML',
            text: 'responseText'
        },
        converters: {
            '* text': window.String,
            'text html': true,
            'text json': parseJSON,
            'text xml': parseXML
        },
        flatOptions: {
            context: true,
            url: true
        }
    };
    //
    function ajaxExtend(target, src){
        var flatOpt = baidu.ajax.settings.flatOptions || {},
            deep;
        for(var i in src){
            if(src[i] !== undefined){
                (flatOpt[i] ? target : (deep || (deep = {})))[i] = src[i]
            }
        }
        deep && baidu.extend(true, target, deep);
    }
    
    baidu.ajax.setup = function(target, settings){
        if(settings){
            ajaxExtend(target, baidu.ajax.settings);
        }else{
            settings = target;
            target = baidu.ajax.settings;
        }
        ajaxExtend(target, settings);
        return target;
    };
    
    //
    
    function addParam(array, key, val){
        val = baidu.type(val) === 'function' ? val() : (val || '');
        array.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    }
    function buildParams(array, key, val, traditional){
        if(baidu.type(val) === 'array'){
            baidu.forEach(val, function(item, index){
                if(traditional || rbracket.test(key)){
                    addParam(array, key, item);
                }else{
                    buildParams(array, key + '[' + (typeof item === 'object' ? index : '') + ']', item, traditional);
                }
            });
        }else if(!traditional && baidu.type(val) === "object"){
            for(var i in val){
                buildParams(array, key + '[' + i + ']', val[i], traditional);
            }
        }else{
            addParam(array, key, val);
        }
    }
    
    baidu.ajax.param = function(src, traditional){
        var ret = [];
        if(baidu.type(src) === 'array'){
            baidu.forEach(src, function(item){
                addParam(ret, item.name, item.value);
            });
        }else{
            for(var i in src){
                buildParams(ret, i, src[i], traditional);
            }
        }
        return ret.join('&').replace(/%20/g, '+');
    };
    
    baidu.ajax.prefilter = toPrefiltersOrTransports(prefilters);
    baidu.ajax.transport = toPrefiltersOrTransports(transports);
    
    //jsonp
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/,
        nonce = new Date().getTime();
    baidu.ajax.setup({
        jsonp: 'callback',
        jsonpCallback: function(){
            var callback = oldCallbacks.pop() || (baidu.id.key + '_' + (nonce++));
            this[callback] = true;
            return callback;
        }
    });
    baidu.ajax.prefilter('json jsonp', function(opts, originalSettings, tangXHR){
        var callbackName, overwritten, responseContainer,
            data = opts.data,
            url = opts.url,
            hasCallback = opts.jsonp !== false,
            replaceInUrl = hasCallback && rjsonp.test(url),
            replaceInData = hasCallback && !replaceInUrl && baidu.type(data) === 'string'
                && !(opts.contentType || '').indexOf('application/x-www-form-urlencoded')
                && rjsonp.test(data);
        if(opts.dataTypes[0] === 'jsonp' || replaceInUrl || replaceInData){
            callbackName = opts.jsonpCallback = baidu.type(opts.jsonpCallback) === 'function' ?
                opts.jsonpCallback() : opts.jsonpCallback;
            overwritten = window[callbackName];
            
            if (replaceInUrl) {
                opts.url = url.replace(rjsonp, '$1' + callbackName );
            } else if (replaceInData) {
                opts.data = data.replace(rjsonp, '$1' + callbackName );
            } else if (hasCallback) {
                opts.url += (/\?/.test(url) ? '&' : '?') + opts.jsonp + '=' + callbackName;
            }
            
            opts.converters['script json'] = function() {
//                !responseContainer && jQuery.error( callbackName + " was not called" );
                return responseContainer[0];
            }
            
            opts.dataTypes[0] = 'json';
            window[callbackName] = function(){responseContainer = arguments;}
            tangXHR.always(function(){
                window[callbackName] = overwritten;
                if (opts[callbackName]){
                    opts.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && baidu.type(overwritten) === 'function'){
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return 'script';
        }
    });
    
    baidu.ajax.setup({
        accepts: {script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'},
        contents: {script: /javascript|ecmascript/},
        converters: {'text script': function(txt){
            globalEval(txt);
            return txt;
        }}
    });
    
    baidu.ajax.prefilter('script', function(opts){
        opts.cache === undefined && (opts.cache = false);
        if(opts.crossDomain){
            opts.type = 'GET';
            opts.global = false;
        }
    });
    
    baidu.ajax.transport('script', function(opts){
        if(opts.crossDomain){
            var script,
                head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
            return {
                send: function(arg, callback){
                    script = document.createElement('script');
                    script.async = 'async';
                    opts.scriptCharset && (script.charset = opts.scriptCharset);
                    script.src = opts.url;
                    script.onload = script.onreadystatechange = function(arg, isAbort){
                        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState)){
                            script.onload = script.onreadystatechange = null;
                            head && script.parentNode && head.removeChild( script );
                            script = undefined;
                            !isAbort && callback(200, 'success');
                        }
                    }
                    head.insertBefore(script, head.firstChild);
                },
                
                abort: function(){
                    script && script.onload(0, 1);
                }
            };
        }
    });
    
    var xhrCallbacks,
        xhrId = 0,
        xhrOnUnloadAbort = window.ActiveXObject ? function(){
            for ( var key in xhrCallbacks ) {
                xhrCallbacks[ key ]( 0, 1 );
            }
        } : false;
        
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch( e ) {}
    }
    
    function createActiveXHR() {
        try {
            return new window.ActiveXObject('Microsoft.XMLHTTP');
        } catch( e ) {}
    }
    
    baidu.ajax.settings.xhr = window.ActiveXObject ? function(){
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    
    void function(xhr){
        baidu.extend(baidu.support, {
            ajax: !!xhr,
            cors: !!xhr && ('withCredentials' in xhr)
        });
    }(baidu.ajax.settings.xhr());
    
    if(baidu.support.ajax){
        baidu.ajax.transport(function(opts){
            if(!opts.crossDomain || baidu.support.cors){
                var callback;
                return {
                    send: function(headers, complete){
                        var handle, xhr = opts.xhr();
                        //it's can not use apply here
                        if(opts.username){
                            xhr.open(opts.type, opts.url, opts.async, opts.username, opts.password);
                        }else{
                            xhr.open(opts.type, opts.url, opts.async);
                        }
                        
                        if(opts.xhrFields){
                            for(var i in opts.xhrFields){
                                xhr[i] = opts.xhrFields[i];
                            }
                        }
                        
                        if(opts.mimeType && xhr.overrideMimeType){
                            xhr.overrideMimeType(opts.mimeType);
                        }
                        
                        if(!opts.crossDomain && !headers['X-Requested-With']){
                            headers['X-Requested-With'] = 'XMLHttpRequest';
                        }
                        
                        try{
                            for(var i in headers){
                                xhr.setRequestHeader(i, headers[i]);
                            }
                        }catch(e){}

                        xhr.send((opts.hasContent && opts.data) || null);
                        
                        callback = function(arg, isAbort){
                            var status,
                                statusText,
                                responseHeaders,
                                responses,
                                xml;
                            try{
                                if(callback && (isAbort || xhr.readyState === 4)){
                                    callback = undefined;
                                    if (handle){
                                        xhr.onreadystatechange = function(){};
                                        xhrOnUnloadAbort && (delete xhrCallbacks[handle]);
                                    }
                                    
                                    if(isAbort){
                                        xhr.readyState !== 4 && xhr.abort();
                                    }else{
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        xml && xml.documentElement && (responses.xml = xml);
                                        try{
                                            responses.text = xhr.responseText;
                                        }catch(e){}
                                        
                                        try{
                                            statusText = xhr.statusText;
                                        }catch(e){statusText = '';}
                                        if(!status && opts.isLocal && !opts.crossDomain){
                                            status = responses.text ? 200 : 404;
                                        }else if(status === 1223){
                                            status = 204;
                                        }
                                    }
                                }
                            }catch(firefoxAccessException){
                                !isAbort && complete(-1, firefoxAccessException);
                            }
                            responses && complete(status, statusText, responses, responseHeaders);
                        }
                        
                        if(!opts.async){
                            callback();
                        }else if(xhr.readyState === 4){
                            setTimeout(callback, 0)
                        }else{
                            handle = ++xhrId;
                            if(xhrOnUnloadAbort){
                                if(!xhrCallbacks){
                                    xhrCallbacks = {};
                                    baidu.dom(window).on('unload', xhrOnUnloadAbort);
                                }
                                xhrCallbacks[handle] = callback;
                            }
                            xhr.onreadystatechange = callback;
                        }
                    },
                    
                    abort: function(){
                        callback && callback(0, 1);
                    }
                };
            }
        });
    }
}();
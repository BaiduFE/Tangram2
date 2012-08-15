/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */

///import baidu;
///import baidu.each;

/**
 * @description 判断平台类型和特性的属性
 * @name baidu.platform
 * @namespace
 * @author jz, meizz
 * @modify 2012.6.29 mz 将原 baidu.platform.* 接口全部集成到 baidu.platform.js 中
 */
baidu.platform = baidu.platform || function(){
    var ua = navigator.userAgent,
        result = function(){};

    baidu.each("Android iPad iPhone Linux Macintosh Windows X11".split(" "), function( item ) {
        var key = item.charAt(0).toUpperCase() + item.toLowerCase().substr( 1 );
        baidu[ "is" + key ] = result[ "is" + key ] = ua.indexOf( item ) > -1;//) && (result = item);
    });

    return result;
}();


/*
baidu.platform.isAndroid = /android/i.test(navigator.userAgent);
baidu.platform.isIpad = /ipad/i.test(navigator.userAgent);
baidu.platform.isIphone = /iphone/i.test(navigator.userAgent);
baidu.platform.isMacintosh = /macintosh/i.test(navigator.userAgent);
baidu.platform.isWindows = /windows/i.test(navigator.userAgent);
baidu.platform.isX11 = /x11/i.test(navigator.userAgent);
//*/
///import baidu;
///import baidu.extend;

/**
 * @fileoverview
 * @name baidu.browser
 * @author meizz
 * @create 2012-06-29
 * @modify
 */

/**
 * @description 判断浏览器类型和特性的属性
 * @namespace
 * @namespace baidu.browser
 */
baidu.browser = baidu.browser || function(){
    var ua = navigator.userAgent;
    
    var result = {
        isStrict : document.compatMode == "CSS1Compat"
        ,isGecko : /gecko/i.test(ua) && !/like gecko/i.test(ua)
        ,isWebkit: /webkit/i.test(ua)
    };

    try{/(\d+\.\d+)/.test(external.max_version) && (result.maxthon = + RegExp['\x241'])} catch (e){};

    // 蛋疼 你懂的
    switch (true) {
        case /msie (\d+\.\d+)/i.test(ua) :
            result.ie = document.documentMode || + RegExp['\x241'];
            break;
        case /chrome\/(\d+\.\d+)/i.test(ua) :
            result.chrome = + RegExp['\x241'];
            break;
        case /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) :
            result.safari = + (RegExp['\x241'] || RegExp['\x242']);
            break;
        case /firefox\/(\d+\.\d+)/i.test(ua) : 
            result.firefox = + RegExp['\x241'];
            break;
        case /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(ua) :
            result.opera = + ( RegExp["\x246"] || RegExp["\x242"] );
            break;
    }
           
    baidu.extend(baidu, result);

    return result;
}();
/*
baidu.browser.chrome = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;
baidu.browser.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined;
baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp['\x241'] || RegExp['\x242']) : undefined;
try {
    if (/(\d+\.\d+)/.test(external.max_version)) {
        baidu.browser.maxthon = + RegExp['\x241'];
    }
} catch (e) {}
//*/
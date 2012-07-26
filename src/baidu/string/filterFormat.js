/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/10
 */

///import baidu.string;


/**
 * @description 对目标字符串进行格式化，支持过滤
 * @function 
 * @name baidu.string.filterFormat
 * @grammar baidu.string.filterFormat(str, options)
 * @param {String} str 目标字符串
 * @param {Object|String} options 提供相应数据的对象
 * @return {String} 格式化后的字符串
 */
 
/*
在 baidu.string.format的基础上,增加了过滤功能. 目标字符串中的#{url|escapeUrl},<br/>
会替换成baidu.string.filterFormat["escapeUrl"](opts.url);<br/>
过滤函数需要之前挂载在baidu.string.filterFormat属性中.
*/



baidu.string.filterFormat = function (source, opts) {
    var data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
	    data = data.length == 1 ? 
	    	/* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
	    	(opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
	    	: data;
    	return source.replace(/#\{(.+?)\}/g, function (match, key){
		    var filters, replacer, i, len, func;
		    if(!data) return '';
	    	filters = key.split("|");
	    	replacer = data[filters[0]];
	    	// chrome 下 typeof /a/ == 'function'
	    	if('[object Function]' == toString.call(replacer)){
	    		replacer = replacer(filters[0]/*key*/);
	    	}
	    	for(i=1,len = filters.length; i< len; ++i){
	    		func = baidu.string.filterFormat[filters[i]];
	    		if('[object Function]' == toString.call(func)){
	    			replacer = func(replacer);
	    		}
	    	}
	    	return ( ('undefined' == typeof replacer || replacer === null)? '' : replacer);
    	});
    }
    return source;
};

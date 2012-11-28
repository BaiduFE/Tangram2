///import baidu.string;

/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/string/filterFormat.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/10
 */
/**
 * @description 对目标字符串进行格式化，支持过滤
 * @function 
 * @name baidu.string.filterFormat
 * @grammar baidu.string.filterFormat(str, options)
 * @param {String} str 目标字符串
 * @param {Object|String} options 提供相应数据的对象
 * @return {String} 格式化后的字符串
 */
/**
 * @description 对目标字符串进行格式化，支持过滤
 * @function 
 * @name baidu.string().filterFormat()
 * @grammar baidu.string(str).filterFormat(options)
 * @param {Object|String} options 提供相应数据的对象
 * @return {String} 格式化后的字符串
 */ 
/*
在 baidu.string.format的基础上,增加了过滤功能. 目标字符串中的#{url|escapeUrl},<br/>
会替换成baidu.string.filterFormat["escapeUrl"](opts.url);<br/>
过滤函数需要之前挂载在baidu.string.filterFormat属性中.
*/
baidu.string.filterFormat = function( source, opts ){

    var data = [].slice.call( arguments, 1 ), dl = data.length, _ = {}.toString;

    if( dl ){

	    if( dl == 1 && opts && /Array|Object/.test( _.call( opts ) ) )
	    	data = opts;

    	return source.replace( /#\{(.+?)\}/g, function ( match, key ){
		    var fl = key.split("|"), r, i, l, f;

		    if( !data ) return "";

	    	if( typeof ( r = data[fl[0]] ) == "function" )
	    		r = r( fl[0] );
	    	
	    	for( i = 1, l = fl.length; i < l; ++ i)
	    		if( typeof ( f = baidu.string.filterFormat[ fl[ i ] ] ) == "function" )
	    			r = f(r);

	    	return r == null ? "" : r;
    	});
    }

    return source;
};
/// Tangram 1.x Code End

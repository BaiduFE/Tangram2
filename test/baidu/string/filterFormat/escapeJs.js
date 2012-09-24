///*
// * Tangram
// * Copyright 2009 Baidu Inc. All rights reserved.
// * 
// * path: baidu/string/filterFormat/escapeJs.js
// * author: rocy
// * version: 1.1.2
// * date: 2010/06/12
// */
//
/////import baidu.string.filterFormat;
//baidu.string.filterFormat.escapeJs = function(str){
//	if(!str || 'string' != typeof str) return str;
//	var i,len,charCode,ret = [];
//	for(i=0, len=str.length; i < len; ++i){
//		charCode = str.charCodeAt(i);
//		if(charCode > 255){
//			ret.push(str.charAt(i));
//		} else{
//			ret.push('\\x' + charCode.toString(16));
//		}
//	}
//	return ret.join('');
//};
//baidu.string.filterFormat.js = baidu.string.filterFormat.escapeJs;

module('baidu.string.filterFormat.escapeJs');

test('老接口：format', function(){

	// escapeJs
	var sPattern = '#{0|escapeJs}|#{1|js}|#{2|js}', sRet = baidu.string
			.filterFormat(sPattern, '1a', '中文', 1);
	equals(sRet, '\\x31\\x61|中文|1');

});
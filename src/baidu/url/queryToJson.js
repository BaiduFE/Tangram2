///import baidu.url;
///import baidu.lang.isArray;

/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/url/queryToJson.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */
/**
 * @description 解析目标URL中的参数成json对象
 * @name baidu.url.queryToJson
 * @function
 * @grammar baidu.url.queryToJson(url)
 * @param {string} url 目标URL
 * @see baidu.url.jsonToQuery
 *             
 * @return {Object} 解析为结果对象，其中URI编码后的字符不会被解码，'a=%20' ==> {a:'%20'}。
 */
baidu.url.queryToJson = function(url){
    var params = url.substr(url.lastIndexOf('?') + 1).split('&'),
        len = params.length,
        ret = null, entry, key, val;
    for(var i = 0; i < len; i++){
        entry = params[i].split('=');
        if(entry.length < 2){continue;}
        !ret && (ret = {});
        key = entry[0];
        val = entry[1];
        entry = ret[key];
        if(!entry){
            ret[key] = val;
        }else if(baidu.lang.isArray(entry)){
            entry.push(val);
        }else{// 这里只可能是string了
            ret[key] = [entry, val];
        }
    }
    return ret;
};
/// Tangram 1.x Code End

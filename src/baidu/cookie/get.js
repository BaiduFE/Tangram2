/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/get.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */

///import baidu.cookie.getRaw;

/**
 * @description 获取cookie的值，用decodeURIComponent进行解码
 * @function 
 * @name baidu.cookie.get
 * @grammar baidu.cookie.get(key)
 * @param {String} key 需要获取Cookie的键名
 * @return {string|null} cookie的值，获取不到时返回null
 */
 
baidu.cookie.get = function (key) {
    var value = baidu.cookie.getRaw(key);
    if ('string' == typeof value) {
        value = decodeURIComponent(value);
        return value;
    }
    return null;
};

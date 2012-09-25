/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/guid.js
 * author: meizz
 * version: 1.1.0
 * date: 2010/02/04
 */

///import baidu.id;
///import baidu.lang;

/**
 * @description 返回一个当前页面的唯一标识字符串。
 * @name baidu.lang.guid
 * @function
 * @grammar baidu.lang.guid()
 * @version 1.1.1
 * @meta standard
 *             
 * @return {String} 当前页面的唯一标识字符串
 */
baidu.lang.guid = function() {
    return baidu.id();
};

//不直接使用window，可以提高3倍左右性能
//baidu.$$._counter = baidu.$$._counter || 1;


// 20111129	meizz	去除 _counter.toString(36) 这步运算，节约计算量
/// Tangram 1.x Code End
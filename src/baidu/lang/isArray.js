/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isArray.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 * modify: 2012/6/29 mz
 */

///import baidu.lang;
///import baidu.type;

/**
 * @description 判断目标参数是否Array对象
 * @name baidu.lang.isArray
 * @function
 * @grammar baidu.lang.isArray(source)
 * @param {Any} source 目标参数
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @return {boolean} 类型判断结果
 */
//baidu.lang.isArray = function (source) {
//    return '[object Array]' == Object.prototype.toString.call(source);
//};
baidu.lang.isArray = baidu.isArray;

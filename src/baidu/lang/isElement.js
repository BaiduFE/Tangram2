/// support maigc - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isElement.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 * modify: 2012/6/29 mz
 */

///import baidu.lang;
///import baidu.type;

/**
 * @description 判断目标参数是否为Element对象
 * @name baidu.lang.isElement
 * @function
 * @grammar baidu.lang.isElement(source)
 * @param {Any} source 目标参数
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @return {boolean} 类型判断结果
 */
//baidu.lang.isElement = function (source) {
//    return !!(source && source.nodeName && source.nodeType == 1);
//};
baidu.lang.isElement = baidu.isElement;
/// support maigc - Tangram 1.x Code End
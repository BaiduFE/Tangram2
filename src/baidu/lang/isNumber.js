/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * modify: 2012/6/29 mz
 */

///import baidu.lang;
///import baidu.type;

/**
 * @description 判断目标参数是否number类型或Number对象
 * @name baidu.lang.isNumber
 * @function
 * @grammar baidu.lang.isNumber(source)
 * @param {Any} source 目标参数
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @return {boolean} 类型判断结果
 * @remark 用本函数判断NaN会返回false，尽管在Javascript中是Number类型。
 */
//baidu.lang.isNumber = function (source) {
//    return '[object Number]' == Object.prototype.toString.call(source) && isFinite(source);
//};

baidu.lang.isNumber = baidu.isNumber;
/// Tangram 1.x Code End
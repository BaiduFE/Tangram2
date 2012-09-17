/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */

///import baidu.type;
///import baidu.object;

/**
 * @description 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 * @name baidu.object.isPlain
 * @function
 * @grammar baidu.object.isPlain(source)
 * @param {Object} source 需要检查的对象
 * @remark
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *             
 * @return {Boolean} 检查结果
 */
baidu.object.isPlain  = baidu.isPlainObject;

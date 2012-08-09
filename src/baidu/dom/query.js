///import baidu.dom;
///improt baidu.sizzle;

/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */


/**
 * 提供css选择器功能   选择器支持所有的<a href="http://www.w3.org/TR/css3-selectors/">css3选择器</a> ，核心实现采用sizzle。baidu.dom.query.matches 请参考<a href="http://wiki.github.com/jeresig/sizzle/" target="_blank">sizzle 文档</a> 
 * @name baidu.dom.query
 * @function
 * @grammar baidu.dom.query(selector[, context, results])
 * @param {String} selector 选择器定义
 * @param {HTMLElement | DOMDocument} [context] 查找的上下文
 * @param {Array} [results] 查找的结果会追加到这个数组中
 * @version 1.5
 * @remark
 * 
            选择器支持所有的<a href="http://www.w3.org/TR/css3-selectors/">css3选择器</a> ，核心实现采用sizzle。可参考<a href="https://github.com/jquery/sizzle/wiki/Sizzle-Home" target="_blank">sizzle 文档</a>
        
 * @see baidu.dom.g, baidu.dom.q,
 * @returns {Array}        包含所有筛选出的DOM元素的数组
 */

baidu.dom.query = function(){
	return baidu.dom.apply(arguments);
};
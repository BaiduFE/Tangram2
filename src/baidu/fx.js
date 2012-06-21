/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * 提供各种公共的动画功能
 * @namespace baidu.fx
 */


baidu.createChain("fx",

// 执行方法
function(fn){
	return typeof fn === 'function'? new baidu.$Fn(fn):new baidu.$Fn();
},

// constructor
function(fn){
	this.fn = fn;
});
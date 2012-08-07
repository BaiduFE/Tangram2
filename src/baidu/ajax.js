/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * @description AJAX链式语法的链头
 * @function 
 * @name baidu.ajax()
 * @grammar baidu.ajax(url)
 * @param {String} url 发送请求的url地址
 * @return {TangramAjax} 返回一个TangramAjax对象
 */

baidu.createChain("ajax",

// 执行方法
function(url){
	return typeof url === 'string'? new baidu.$Ajax(url):new baidu.$Ajax();
},

// constructor
function(url){
	this.url = url;
});
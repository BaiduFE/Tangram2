/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * @description Ajax链头，对XMLHttpRequest请求的封装
 * @function
 * @name baidu.ajax
 * @grammer baidu.ajax([url])
 * @param   {Url}
 * @return  {tangramAjax}          返回 new TangramAjax 对象
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
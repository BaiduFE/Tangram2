/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * @description 对异步调用的封装
 * @name baidu.async
 * @namespace
 * @grammer baidu.async(url)
 * @param   {Url}
 * @return  {tangramAsync}          返回 new TangramAsync对象
 */

baidu.createChain("async",

// 执行方法
function(url){
	return typeof url === 'string'? new baidu.$Async(url):new baidu.$Async();
},

// constructor
function(url){
	this.url = url;
});

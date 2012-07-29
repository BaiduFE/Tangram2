/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.createChain;

/**
 * @description 对异步调用的封装
 * @grammer baidu.async(url)
 * @param   {String} 一个目标的url字符串
 * @return  {tangramAsync} 返回一个TangramAsync对象
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

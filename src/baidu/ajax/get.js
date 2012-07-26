/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.ajax.request;

/**
 * @description 发送一个get请求
 * @function 
 * @name baidu.ajax().get()
 * @grammar baidu.ajax(url).get(function(xhr, responseText))
 * @param {function} onsuccess 请求成功之后的回调函数，函数接收两个参数xhr是一个XMLHttpRequest对象，responseText是请求的返回内容
 * @return {XMLHttpRequest} XMLHttpRequest对象
 */

/**
 * @description 发送一个get请求
 * @function 
 * @name baidu.ajax.get
 * @grammar baidu.ajax.get(url[, function(xhr, responseText)])
 * @param {String} url 发送请求的url地址
 * @param {function} onsuccess 请求成功之后的回调函数，函数接收两个参数xhr是一个XMLHttpRequest对象，responseText是请求的返回内容
 * @return {XMLHttpRequest} XMLHttpRequest对象
 */
baidu.ajax.extend({
	get : function(onsuccess){
    	return baidu.ajax.request(this.url, {'onsuccess': onsuccess});
	}
});
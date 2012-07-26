/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.ajax;
///import baidu.ajax.request;

/**
 * @description 发送一个post请求
 * @function 
 * @name baidu.ajax().post()
 * @grammar baidu.ajax(url).post(data, function(xhr, responseText))
 * @param {String} data 需要发送的数据，格式如：user=admin&pwd=admin
 * @param {function} onsuccess 请求成功之后的回调函数，函数接收两个参数xhr是一个XMLHttpRequest对象，responseText是请求的返回内容
 * @return {XMLHttpRequest} XMLHttpRequest对象
 */

/**
 * @description 发送一个post请求
 * @function 
 * @name baidu.ajax.post
 * @grammar baidu.ajax.post(url, data[, function(xhr, responseText)])
 * @param {String} url 发送请求的url地址
 * @param {String} data 需要发送的数据，格式如：user=admin&pwd=admin
 * @param {function} onsuccess 请求成功之后的回调函数，函数接收两个参数xhr是一个XMLHttpRequest对象，responseText是请求的返回内容
 * @return {XMLHttpRequest} XMLHttpRequest对象
 */


baidu.ajax.extend({
	post : function ( data, onsuccess) {
	    return baidu.ajax.request(
	        this.url,  {
	            'onsuccess': onsuccess,
	            'method': 'POST',
	            'data': data
	        }
	    );
	}
});

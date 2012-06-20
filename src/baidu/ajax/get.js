/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.ajax;
///import baidu.ajax.request;

/**
 * 发送一个get请求
 * @name baidu.ajax.get
 * @function
 * @grammar baidu.ajax.get(url[, onsuccess])
 * @param {string} 	url 		发送请求的url地址
 * @param {Function} [onsuccess] 请求成功之后的回调函数，function(XMLHttpRequest xhr, string responseText)
 * @meta standard
 * @see baidu.ajax.post,baidu.ajax.request
 *             
 * @returns {XMLHttpRequest} 	发送请求的XMLHttpRequest对象
 */

baidu.ajax.extend({

	get : function ( onsuccess) {
		var url = this.url;
    	return baidu.ajax.request(url, {'onsuccess': onsuccess});
	}

});
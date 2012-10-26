/// Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
///import baidu.ajax.request;
/**
 * @description 发送一个post请求
 * @function 
 * @name baidu.ajax.post
 * @grammar baidu.ajax.post(url, data[,fn])
 * @param {String} url 发送请求的url地址
 * @param {String} data 需要发送的数据，格式如：user=admin&pwd=admin
 * @param {Function} fn 请求成功之后的回调函数，函数接收两个参数xhr是一个XMLHttpRequest对象，responseText是请求的返回内容
 * @return {XMLHttpRequest} XMLHttpRequest对象
 * @example baidu.ajax.post(url, data, function(xhr, responseText));
 */
baidu.ajax.post = function (url, data, onsuccess) {
    return baidu.ajax.request(
        url, 
        {
            'onsuccess': onsuccess,
            'method': 'POST',
            'data': data
        }
    );
};
/// Tangram 1.x Code End
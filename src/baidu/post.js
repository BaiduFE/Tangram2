///import baidu._util_.smartAjax;
/**
 * @description 通过服务器HTTP GET请求加载数据
 * @function 
 * @name baidu.post()
 * @grammar baidu.post(url[, data], [successtion], [dataType])
 * @param {String} url 一个包含发送请求的URL字符串
 * @param {String|Object} data 向服务器发送请求的Key/value参数
 * @param {function} success 当请求成功后执行的回调函数，函数接收三个参数data, textStatus, tangramAjax
 * @param {String} dataType 从服务器返回的预期的数据类型。默认：智能猜测（xml, json, script, or html）
 * @return {tangramAjax} 一个tangramAjax对象
 */
baidu.post = baidu.post || baidu._util_.smartAjax('post');
/// Tangram 1.x Code Start
///import baidu.ajax.post;
/// Tangram 1.x Code End
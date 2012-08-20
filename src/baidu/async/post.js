/// Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.ajax.request;
///import baidu.async.Deferred;

/**
 * @description 支持异步的ajax.post封装.
 * @function
 * @name baidu.async.post
 * @grammar baidu.async(url).post(data)
 * @param {String} url 请求地址.
 * @param {String} data 请求数据.
 * @version 1.3.9 
 * @return {baidu.async.Deferred} Deferred对象,支持链式调用.
 */

baidu.async.extend({
post : function(data){
    var url = this.url;
    var deferred = new baidu.async.Deferred();
    baidu.ajax.request(url, {
        method: 'POST',
        data: data,
        onsuccess: function(xhr, responseText) {
            deferred.resolve({xhr: xhr, responseText: responseText}); 
        },
        onfailure: function(xhr) {
            deferred.reject({xhr: xhr});
        }
    });
    return deferred;
}    
});
/// Tangram 1.x Code End
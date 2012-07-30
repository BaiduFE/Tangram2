/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.ajax.request;
///import baidu.async.Deferred;

/**
 * @description 支持异步的ajax.get封装
 * @function
 * @grammar baidu.async.get
 * @grammar baidu.async(url).get()
 * @param {String} url 请求地址.
 * @version 1.3.9 
 * @return {baidu.async.Deferred} Deferred对象,支持链式调用.
 */

baidu.async.extend({
    get : function(){
        var url = this.url;
        var deferred = new baidu.async.Deferred();
        baidu.ajax.request(url, {
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
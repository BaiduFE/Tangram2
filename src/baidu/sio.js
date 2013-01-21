/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * @description sio对象链式语法的链头，动态加载javascript
 * @function 
 * @name baidu.sio()
 * @grammar baidu.sio(url)
 * @param {String} url 一个能够访问javascript的字符串路径地址
 * @return {TangramSio} 返回一个TangramSio对象
 */


baidu.createChain("sio",

// 执行方法
function(url){
    switch (typeof url) {
        case "string" :
            return new baidu.sio.$Sio(url);
        // break;
    }
},

// constructor
function(url){
    this.url = url;
});
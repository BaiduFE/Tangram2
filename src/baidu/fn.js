/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.createChain;
///import baidu.type;

/**
 * @description 对function的操作，解决内存泄露问题
 * @function 
 * @name baidu.fn
 * @grammar baidu.fn(func)
 * @param {String|functioin} func 要绑定的函数，或者一个在作用域下可用的函数名
 * @return {TangramFn} 返回一个TangramFn对象
 */

baidu.createChain("fn",

// 执行方法
function(fn){
    return new baidu.fn.$Fn(~'function|string'.indexOf(baidu.type(fn)) ? fn : function(){});
},

// constructor
function(fn){
    this.fn = fn;
});
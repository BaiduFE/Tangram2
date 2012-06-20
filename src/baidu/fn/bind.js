/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.fn;

///import baidu.lang.isString;

/** 
 * 为对象绑定方法和作用域
 * @name baidu.fn.bind
 * @function
 * @grammar baidu.fn.bind(handler[, obj, args])
 * @param {Function|String} handler 要绑定的函数，或者一个在作用域下可用的函数名
 * @param {Object} obj 执行运行时this，如果不传入则运行时this为函数本身
 * @param {args* 0..n} args 函数执行时附加到执行时函数前面的参数
 * @version 1.3
 *
 * @returns {Function} 封装后的函数
 */

baidu.fn.extend({
	bind : function (obj,args) {
		var fn = this.fn ;
        return typeof args === 'undefined'?baidu.fn.bind(fn,obj):baidu.fn.bind(fn,obj,args);
	}
});

baidu.fn.bind = function(func, scope) {
    console.log(arguments);
    var xargs = arguments.length > 2 ? [].slice.call(arguments, 2) : null;
    console.log(xargs);
    return function () {
        var fn = baidu.lang.isString(func) ? scope[func] : func,
            args = (xargs) ? xargs.concat([].slice.call(arguments, 0)) : arguments;
        return fn.apply(scope || fn, args);
    };
};

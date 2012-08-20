/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
///import baidu.fn;
///import baidu.type;
/**
 * @description 为对象绑定方法和作用域
 * @function 
 * @name baidu.fn().bind()
 * @grammar baidu.fn(func).bind([scope[, args]])
 * @param {Object} scope 执行运行时this，如果不传入则运行时this为函数本身
 * @param {Any} args 函数执行时附加到执行时函数前面的参数（支持一个或多个参数）
 * @return {function} 封装后的函数
 */
baidu.fn.extend({
    bind: function(scope){
        var func = this.fn,
            xargs = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;
        return function(){
            var fn = baidu.type(func) === 'string' ? scope[func] : func,
                args = xargs ? xargs.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
            return fn.apply(scope || fn, args);
        }
    }
});
/// Tangram 1.x Code Start
/**
 * @description 为对象绑定方法和作用域
 * @function 
 * @name baidu.fn.bind
 * @function
 * @grammar baidu.fn.bind(handler[, obj, args])
 * @param {Function|String} handler 要绑定的函数，或者一个在作用域下可用的函数名
 * @param {Object} obj 执行运行时this，如果不传入则运行时this为函数本身
 * @param {args* 0..n} args 函数执行时附加到执行时函数前面的参数
 * @version 1.3
 *
 * @return {Function} 封装后的函数
 */
baidu.fn.bind = function(func, scope) {
    var fn = baidu.fn(func);
    return fn.bind.apply(fn, Array.prototype.slice.call(arguments, 1));
};
/// Tangram 1.x Code End
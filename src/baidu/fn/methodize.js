/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.fn;

/**
 * 将一个静态函数变换成一个对象的方法，使其的第一个参数为this，或this[attr]
 * @name baidu.fn.methodize
 * @function
 * @grammar baidu.fn.methodize(func[, attr])
 * @param {Function}	func	要方法化的函数
 * @param {string}		[attr]	属性
 * @version 1.3
 * @return {Function} 已方法化的函数
 */

baidu.fn.extend({

methodize : function (attr) {
	var fn = this.fn ;
    return function(){
        return fn.apply(this, [(attr ? this[attr] : this)].concat([].slice.call(arguments)));
    };
}

});
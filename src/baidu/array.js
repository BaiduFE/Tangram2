///import baidu;
///import baidu.overwrite;
///import baidu.createChain;
/**
 * @fileoverview
 * @name baidu.array
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * array对象链式语法的链头
 *
 * @grammer baidu.array(array)
 * @param   {Array}         array   Array对象
 * @return  {TangramArray}          返回 array 对象，该对象被注入链式方法。
 */
baidu.createChain("array");

// 对系统方法新产生的 array 对象注入自定义方法，支持完美的链式语法
baidu.overwrite(baidu.$Array, "concat slice".split(" "), function(key) {
	return function() {
		return baidu.array(Array.prototype[key].apply(this, arguments));
	}
});
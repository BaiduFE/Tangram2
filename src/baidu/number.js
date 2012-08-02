/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
///import baidu;
///import baidu.createChain
///import baidu.each;
/**
 * number对象链式语法的链头
 *
 * @grammer baidu.number(number)
 * @param   {Number} Number对象
 * @return  {TangramNumber}   返回Number对象，该对象被注入链式方法。
 */

baidu.createChain("number",

// 执行方法
function(number){
	var num = new Number(number),
		pro = Number.prototype;

	baidu.each(baidu.$Number.prototype, function(fn, key) {
		pro[key] || (num[key] = fn);
	});

	return num;
}

);
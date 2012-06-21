/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * 对方法的操作，解决内存泄露问题
 *
 * @grammer baidu.fn(fn)
 * @param   {fn}
 * @return  {tangramFn}          返回 new TangramFn 对象
 */

baidu.createChain("fn",

// 执行方法
function(fn){
	return typeof fn === 'function'? new baidu.$Fn(fn):new baidu.$Fn();
},

// constructor
function(fn){
	this.fn = fn;
});
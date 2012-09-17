
module('baidu.fn.methodize');

/**
 * 用例设计点
 * <li>对象自身作为第一参数
 * <li>对象属性作为第一参数
 */

//新接口
test('base', function() {
	var fn1 = function(a){
		return a.t; 
	},
	fn2 = function(a){
		return a;
	};
	
	var o = {
		t : 1,
		f1 : baidu.fn(fn1).methodize(),
		f2 : baidu.fn(fn2).methodize('t')
	};
	
	equals(o.f1(), 1, '对象校验');
	equals(o.f2(), 1, '对象属性校验');
});

//老接口
test('老接口：base', function() {
	var fn1 = function(a){
		return a.t; 
	},
	fn2 = function(a){
		return a;
	};
	
	var o = {
		t : 1,
		f1 : baidu.fn.methodize(fn1),
		f2 : baidu.fn.methodize(fn2, 't')
	};
	
	equals(o.f1(), 1, '对象校验');
	equals(o.f2(), 1, '对象属性校验');
});
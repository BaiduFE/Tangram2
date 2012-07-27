///import baidu;
///import baidu.type;
/*
 * @fileoverview
 * @author meizz
 * @create 2012-05-30
 * @modify
 */

/**
 * @description 分析形参对象的类型，返回以逗号分隔的对象类型字符串
 * @function
 * @name baidu.param
 * @grammer baidu.param(arg)
 * @param   {Object}    arg     被分析的形参对象
 * @return  {String}            对象类型字符串，以逗号分隔
 */
baidu.param = function(arg) {
	arg = arg || arguments.callee.caller.arguments;

	var s = "",
		n = arg.length;

	for (var i = 0; i < n; i++) {
		s += "," + baidu.type(arg[i]);
	}

	return s ? s.substr(1) : "";
};

// [Notice] meizz callee等操作是一个低性能的处理，因此 arg 参数尽量传过来，尽管不传这个参数本方法也能正确执行
// [Notice] meizz 本方法是一个被其它方法调用的方法，在不传arg又不是被调用的状态下，本方法会报错
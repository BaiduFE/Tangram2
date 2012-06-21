﻿/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.createChain;

/**
 * 对form的操作，解决表单数据问题
 *
 * @grammer baidu.fn(fn)
 * @param   {fn}
 * @return  {tangramFn}          返回 new TangramFn 对象
 */

baidu.createChain("form",

// 执行方法
function(form){
	return typeof form === 'undefined'? new baidu.$Form():new baidu.$Form(form);
},

// constructor
function(form){
	this.form = form;
});
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.createChain;

/**
 * @description 对form的操作，解决表单数据问题
 * @grammer baidu.form(ele)
 * @param   {Element} ele 一个目标的form元素
 * @return  {tangramForm} 返回一个tangramForm对象
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
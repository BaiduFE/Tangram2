module('baidu.dom.removeClss')

//加载快捷方式
test('prepareTest',function(){
	expect(1);
	stop();

	//加载快捷方式
	ua.importsrc("baidu.short", function(){
		start();
		ok(true,'ok');
	}, "baidu.dom.removeClass", "baidu.dom.removeClass");
});

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};

//新接口测试
test('正常用例',function(){
	//expect(4);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.className = 'div_class1';
	equal(div.className,'div_class1','div className');
	
	baidu.dom(div).removeClass('div_class1');//remove 1 class
	equal(div.className,'','div has no className');
	
	div.className = 'div_class1 div_class2 div_class3 div_class4';
	baidu.dom(div).removeClass('div_class2 div_class3    ');//remove 2 classes
	equal(div.className,'div_class1 div_class4','remove 2 classes');
	
	baidu.dom(div).removeClass('div_class1 div_class2 div_class3');
	equal(div.className,'div_class4','remove not existed classes');

	document.body.removeChild(div);
});

test('shortcut',function(){
	//expect(3);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.className = 'div_class1';
	baidu.dom(div).removeClass('div_class1');//remove 1 class
	equal(div.className,'','div has no className--shortcut');
	
	div.className = 'div_class1 div_class2 div_class3 div_class4';
	baidu.dom(div).removeClass('div_class2 div_class3    ');//remove 2 classes
	equal(div.className,'div_class1 div_class4','remove 2 classes--shortcut');
	
	baidu.dom(div).removeClass('div_class1 div_class2 div_class3');
	equal(div.className,'div_class4','remove not existed classes--shortcut');
	
	document.body.removeChild(div);
});

test('异常用例', function(){
	//expect(3);
	var html = document.getElementsByTagName('html')[0];
	var head = document.getElementsByTagName('head')[0];
	html.className = "html_name";
	head.className = "head_name";
	baidu.dom(html).removeClass("html_class1");//not existed class
	baidu.dom(head).removeClass("head_name");
	equal(html.className,"html_name","html fails to removes classname");
	equal(head.className,"","head removes classname");
	
	baidu.dom(html).removeClass('not_exited_class');
	equal(html.className,'html_name','remove not existed class of html');
});

//老接口测试
test('老接口：正常用例',function(){
	expect(4);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.className = 'div_class1';
	equal(div.className,'div_class1','div className')
	baidu.dom.removeClass(div,'div_class1');//remove 1 class
	equal(div.className,'','div has no className');
	
	div.className = 'div_class1 div_class2 div_class3 div_class4';
	baidu.dom.removeClass(div,'div_class2 div_class3    ');//remove 2 classes
	equal(div.className,'div_class1 div_class4','remove 2 classes');
	baidu.dom.removeClass(div,'div_class1 div_class2 div_class3');
	equal(div.className,'div_class4','remove not existed classes');
	document.body.removeChild(div);
});

test('老接口：shortcut',function(){
	//expect(3);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.className = 'div_class1';
	baidu.removeClass(div,'div_class1');//remove 1 class
	equal(div.className,'','div has no className--shortcut');
	
	div.className = 'div_class1 div_class2 div_class3 div_class4';
	baidu.removeClass(div,'div_class2 div_class3    ');//remove 2 classes
	equal(div.className,'div_class1 div_class4','remove 2 classes--shortcut');
	baidu.removeClass(div,'div_class1 div_class2 div_class3');
	equal(div.className,'div_class4','remove not existed classes--shortcut');
	document.body.removeChild(div);
});

test('老接口：异常用例', function(){
	//expect(3);
	var html = document.getElementsByTagName('html')[0];
	var head = document.getElementsByTagName('head')[0];
	html.className = "html_name";
	head.className = "head_name";
	baidu.dom.removeClass(html,"html_class1");//not existed class
	baidu.dom.removeClass(head,"head_name");
	equal(html.className,"html_name","html fails to removes classname");
	equal(head.className,"","head removes classname");
	
	baidu.dom.removeClass(html,'not_exited_class');
	equal(html.className,'html_name','remove not existed class of html');
});

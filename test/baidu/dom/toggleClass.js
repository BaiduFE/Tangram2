module('baidu.dom.toggleClass');

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};
var trim = function(str){
	str.replace(/^\s+/g,'').replace(/\s+$/g,'');
	return str;
};

//新接口测试

/**
 * 貌似依然需要遍历，这个是否可以考虑添加到tools.js中
 */
test('add', function(){
	//expect(2);
	var div = document.createElement('div');
	baidu.dom(div).toggleClass("div_class1");
	baidu.dom(div).toggleClass("div_class2 div_class3 div_class4");
	equal(div.className,"div_class1 div_class2 div_class3 div_class4","add class");

	baidu.dom(div).toggleClass("div_class5 div_class1");
	equal(div.className,"div_class2 div_class3 div_class4 div_class5","add class");

});

/**
 * 针对有class的元素进行移除操作
 */
test('remove', function(){
	//expect(2);
	var div = document.createElement('div');
	baidu.dom(div).toggleClass("div_class1");
	baidu.dom(div).toggleClass("div_class2 div_class3 div_class4 div_class5");
	baidu.dom(div).toggleClass("div_class2");
	equal(div.className,"div_class1 div_class3 div_class4 div_class5","remove 1 class");

	baidu.dom(div).toggleClass("div_class3 div_class5");
	equal(div.className,"div_class1 div_class4","remove 2 classes");

});

/**
 * 针对不可以设置class的元素进行操作,base,head,html,meta,param,script,style以及title,实验证明是可以设置的
 */
test('异常用例', function(){
	//expect(2);
	var html = document.getElementsByTagName('html')[0];
	var head = document.getElementsByTagName('head')[0];
	html.className = "html_name";
	head.className = "head_name";
	baidu.dom(html).toggleClass("html_class1");
	baidu.dom(head).toggleClass("head_name");
	equal(html.className,"html_name html_class1","html sets classname");
	equal(head.className,"","head sets classname");
});

//兼容1.x接口测试
/**
 * 貌似依然需要遍历，这个是否可以考虑添加到tools.js中
 */
test('兼容1.x接口：add', function(){
	//expect(2);
	var div = document.createElement('div');
	baidu.dom.toggleClass(div,"div_class1");
	baidu.dom.toggleClass(div,"div_class2 div_class3 div_class4");
	equal(trim(div.className),"div_class1 div_class2 div_class3 div_class4","add class");

	baidu.dom.toggleClass(div,"div_class5 div_class1");
	equal(trim(div.className),"div_class1 div_class2 div_class3 div_class4 div_class5","add class");
});

/**
 * 针对有class的元素进行移除操作
 */
test('remove', function(){
	//expect(2);
	var div = document.createElement('div');
	baidu.dom.toggleClass(div,"div_class1");
	baidu.dom.toggleClass(div,"div_class2 div_class3 div_class4 div_class5");
	baidu.dom.toggleClass(div,"div_class2");
	equal(trim(div.className),"div_class1 div_class3 div_class4 div_class5","remove 1 class");
	baidu.dom.toggleClass(div,"div_class3 div_class5");
	equal(trim(div.className),"div_class1 div_class4","remove 2 classes");

});

/**
 * 针对不可以设置class的元素进行操作,base,head,html,meta,param,script,style以及title,实验证明是可以设置的
 */
test('异常用例', function(){
	expect(2);
	var html = document.getElementsByTagName('html')[0];
	var head = document.getElementsByTagName('head')[0];
	html.className = "html_name";
	head.className = "head_name";
	baidu.dom.toggleClass(html,"html_class1");
	baidu.dom.toggleClass(head,"head_name");
	equal(html.className,"html_name html_class1","html sets classname");
	equal(head.className,"","head sets classname");

});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").toggleClass("wangxiao");
    ok(result);
});

test("没有参数", function(){
	var div = document.createElement('div');
	document.body.appendChild(div);
	
	div.innerHTML = "<div class='A'></div><div class='B'></div><div class='C'></div>";
	
	baidu.dom("div", div).toggleClass();
	equal(formatHTML(div.innerHTML), "<div class=></div><div class=></div><div class=></div>", "");
	document.body.removeChild(div);
});

test("参数是一个 fn", function(){
	var div = document.createElement('div');
	document.body.appendChild(div);
	
	div.innerHTML = "<div class='A'></div><div class='B'></div><div class='C'></div>";
	
	baidu.dom("div", div).toggleClass(function(index, className){
	    switch(index){
	        case 0:
	        	ok( className == "A" );
	        	return "A";
	        	break;
	        case 1:
	        	ok( className == "B" );
	        	return "B";
	        	break;
	        case 2:
	        	ok( className == "C" );
	        	return "C";
	        	break;
	    }
	});
	equal(formatHTML(div.innerHTML), "<div class=></div><div class=></div><div class=></div>", "");

	document.body.removeChild(div);
});

test("toggle传入状态量", function(){
	//expect(4);
	var div = document.createElement('div');

	document.body.appendChild(div);
	equal(div.className, "", "div no class");
	
	baidu.dom(div).toggleClass("div_class1",true);
	equal(div.className, "div_class1", "div_class1");

	baidu.dom(div).toggleClass("div_class2 div_class3",true);// 添加多个class
	equal(div.className, "div_class1 div_class2 div_class3");

	baidu.dom(div).toggleClass("div_class1",false);
	equal(div.className, "div_class2 div_class3");

	document.body.removeChild(div);
});
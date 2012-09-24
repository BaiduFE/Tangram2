module("baidu.dom.hasClass")

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};

//新接口测试
test("新接口测试",function(){

	//创建一个测试div
	var div = document.createElement('div');
	document.body.appendChild(div);

	//没有className的情况
	ok(!baidu.dom(div).hasClass("class1"),"没有className的情况");

	//一个className情况
	div.className = "class1";
	ok(baidu.dom(div).hasClass('class1'),"一个className情况，有");
	ok(!baidu.dom(div).hasClass('class2'),"一个className情况，没有");

	//多个className情况
	div.className = "class1 class2";
	ok(baidu.dom(div).hasClass('class1 class2'),"多个className情况，有");
	ok(!baidu.dom(div).hasClass('class1 class2 class3'),"多个className情况，没有");
	ok(!baidu.dom(div).hasClass('class1 class3'),"多个className情况，没有");

	//多个className乱序
	div.className = "class1 class2";
	ok(baidu.dom(div).hasClass('class2 class1'),"多个className情况，有");
	ok(!baidu.dom(div).hasClass('class2 class1 class3'),"多个className情况，没有");
	ok(!baidu.dom(div).hasClass('class3 class2'),"多个className情况，没有");

	div.className = "class1 class2 class3";
	ok(baidu.dom(div).hasClass('class2 class1 class3'),"多个className情况，有");
	ok(!baidu.dom(div).hasClass('class2 class1 class3 class4'),"多个className情况，没有");
	ok(baidu.dom(div).hasClass('class3 class2'),"多个className情况，没有");
	
	//异常处理：无参数 
	equal(div,baidu.dom(div).hasClass()[0],"异常处理：无参数");

	document.body.removeChild(div);
});

//老接口测试
test("给没有className的元素判断className",function(){
	//expect(1);
	var div = document.createElement('div');
	ok(!baidu.dom.hasClass(div,"class"),"no class");
});

test("给有className的元素判断className",function(){
	//expect(8);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.className = "class";
	div.id = "div_id";
	ok(baidu.dom.hasClass(div,'class'),"div has class");

	ok(!baidu.dom.hasClass(div,'class class2'),'div contains 1 class');//2个中包含 1个
	
	ok(baidu.dom.hasClass('div_id','class'),'div contains 1 class by id');
	div.className = "class1 class2";
	
	ok(baidu.dom.hasClass(div,'class1 class2'),"div has 2 classes");//存在2个class
	
	ok(!baidu.dom.hasClass(div,'notexist'),"div doesn't have class notexist");//不存在
	
	ok(!baidu.dom.hasClass(div,'class1 class2 class3'),"div contains 2 classes");//3个包含2个
	
	ok(baidu.dom.hasClass(div,' class2 class1 '),"div contains 2 classes");//调换顺序
	
	ok(baidu.dom.hasClass(div,'  class2     '),"div contains 2 classes");//有空格
	document.body.removeChild(div);
});


test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").hasClass("wangxiao");
    ok(result==false);
});
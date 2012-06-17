module("baidu.dom.hasClass")
stop();
var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};

waiting(function(){ return baidu.selector; }, function(){

//新接口测试
test("给没有className的元素判断className",function(){
	//expect(1);
	var div = document.createElement('div');
	ok(!baidu.dom(div).hasClass("class"),"no class");
});

test("给有className的元素判断className",function(){
	//expect(8);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.className = "class";
	div.id = "div_id";
	
	ok(baidu.dom(div).hasClass('class'),"div has class");

	ok(!baidu.dom(div).hasClass('class class2'),'div contains 1 class');//2个中包含 1个

	ok(baidu.dom("#div_id").hasClass('class'),'div contains 1 class by id');

	div.className = "class1 class2";
	ok(baidu.dom(div).hasClass('class1 class2'),"div has 2 classes");//存在2个class

	ok(!baidu.dom(div).hasClass('notexist'),"div doesn't have class notexist");//不存在

	ok(!baidu.dom(div).hasClass('class1 class2 class3'),"div contains 2 classes");//3个包含2个

	ok(baidu.dom(div).hasClass(' class2 class1 '),"div contains 2 classes");//调换顺序

	ok(baidu.dom(div).hasClass('  class2     '),"div contains 2 classes");//有空格
	document.body.removeChild(div);
});

//老接口测试
/*
test("给没有className的元素判断className",function(){
	expect(1);
	var div = document.createElement('div');
	ok(!baidu.dom.hasClass(div,"class"),"no class");
});

test("给有className的元素判断className",function(){
	expect(8);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.className = "class";
	div.id = "div_id";
	ok(baidu.dom.hasClass(div,'class'),"div has class");
	ok(!baidu.dom.hasClass(div,'class class2'),'div contains 1 class');//2个中包含 1个
	ok(baidu.dom.hasClass('div_id','class '),'div contains 1 class by id');
	div.className = "class1 class2";
	ok(baidu.dom.hasClass(div,'class1 class2'),"div has 2 classes");//存在2个class
	ok(!baidu.dom.hasClass(div,'notexist'),"div doesn't have class notexist");//不存在
	ok(!baidu.dom.hasClass(div,'class1 class2 class3'),"div contains 2 classes");//3个包含2个
	ok(baidu.dom.hasClass(div,' class2 class1 '),"div contains 2 classes");//调换顺序
	ok(baidu.dom.hasClass(div,'  class2     '),"div contains 2 classes");//有空格
	document.body.removeChild(div);
});
*/

	start();
});
ua.importsrc("baidu.sizzle"); // 由于加载的资源中不存在 baidu.sizzle 这个对象，所以不能使用 importsrc 自带的 callback

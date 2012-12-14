module('baidu.dom.toggle')

//新接口
test('新接口：显示或隐藏',function(){

	var div = document.createElement('div');
	document.body.appendChild(div);

	equal(div.style.display,"","default to display;")

	baidu.dom(div).toggle();
	equal(div.style.display,"none","not to display");

	baidu.dom(div).toggle();
	var dis = div.style.display;
	ok(dis!='none',"change to display");

	baidu.dom(div).toggle();
	equal(div.style.display,"none","not to display");

	baidu.dom(div).toggle();
	ok(dis!='none',"change to display");

	document.body.removeChild(div);
})

//兼容1.x接口
test('兼容1.x接口：element',function(){
	var div = document.createElement('div');
	document.body.appendChild(div);
	equal(div.style.display,"","default to display;")
	baidu.dom.toggle(div);
	equal(div.style.display,"none","not to display");
	baidu.dom.toggle(div);
	equal(div.style.display,"","change to display");
	document.body.removeChild(div);
})

test('兼容1.x接口：id',function(){
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.id = 'div_id';
	equal(div.style.display,"","default to display;")
	baidu.dom.toggle('div_id');
	equal(div.style.display,"none","not to display");
	baidu.dom.toggle('div_id');
	equal(div.style.display,"","change to display");
	document.body.removeChild(div);
})


//describe('baidu.dom.toggle测试', {
//    '将显示/隐藏的元素切换状态': function(){
//        var oDiv1 = baidu.dom.g("div1_toggle");
//
//        value_of(oDiv1.style.display).should_be("");
//        baidu.dom.toggle(oDiv1);
//        value_of(oDiv1.style.display).should_be("none");
//        baidu.dom.toggle(oDiv1);
//        value_of(oDiv1.style.display).should_be("");
//
//        value_of(baidu.dom.g("div2_toggle").style.display).should_be("none");
//        baidu.dom.toggle("div2_toggle");
//        value_of(baidu.dom.g("div2_toggle").style.display).should_be("");
//        baidu.dom.toggle("div2_toggle");
//        value_of(baidu.dom.g("div2_toggle").style.display).should_be("none");
//    }/*,1.0.1版本中已不支持多个参数的情况
//	'同时切换多个元素的状态': function() {
//		var oDiv3 = baidu.dom.g("div3_toggle");
//		
//		value_of(oDiv3.style.display).should_be("");
//		value_of(baidu.G("div4_toggle").style.display).should_be("none");
//		baidu.dom.toggle("div3_toggle", baidu.G("div4_toggle"));
//		value_of(oDiv3.style.display).should_be("none");
//		value_of(baidu.G("div4_toggle").style.display).should_be("");
//		baidu.dom.toggle(oDiv3, "div4_toggle");
//		value_of(oDiv3.style.display).should_be("");
//		value_of(baidu.G("div4_toggle").style.display).should_be("none");
//	}*/
//});
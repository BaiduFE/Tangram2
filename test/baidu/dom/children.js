/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.children");

var html1 =
	'<div id="e1">' +
		'文本节点' +
		'<p id="e2">子节点</p>' +
		'<p id="e3">另一个子节点</p>' +
		'<!--文本节点-->' +
		'<div id="e4">' +
			'<p id="e5">孙节点</p>' +
		'</div>' +
		'<script>alert("Script tag");</script>' +
	'</div>';


var html2 =
	'<div id="e1">' +
		'<div id="e2">' +
			'<p id="e3">孙节点</p>' +
		'</div>' +
	'</div>' +
	'<div id="e4">' +
		'<p id="e5">子节点</p>' +
	'</div>';

test('逻辑特性测试（单个元素）', function () {
	useTangramDom(html1, function ($dom) {
		var target = $dom.children();
		equal(target.length, 4, '子节点个数');
		equal(target[0].id, 'e2', '第一个子节点');
		equal(target[1].id, 'e3', '第二个子节点');
		equal(target[2].id, 'e4', '第三个子节点');
		equal(target[3].tagName, 'SCRIPT', '第三个子节点');
	});
});

test('多个元素情况', function () {
	useTangramDom(html2, function ($dom) {
		var target = $dom.children();
		equal(target.length, 2, '子节点个数');
		equal(target[0].id, 'e2', '第一个子节点');
		equal(target[1].id, 'e5', '第二个子节点');
	});
});

test('.children( selector )重载', function () {
	useTangramDom(html1, function ($dom) {
		var target = $dom.children("p");
		equal(target.length, 2, '子节点个数');
		equal(target[0].id, 'e2');
		equal(target[1].id, 'e3');
	});
});


//老用例
test("Element or id ", function() {
	expect(2);
	var div = document.createElement('div');
	div.id = "div_id";
	var img = document.createElement('img');
	var a = document.createElement('a');
	a.innerHTML = "a text node";// textnode
		var p = document.createElement('p');
		var text = document.createTextNode('textnode');// nodeType==3,won't
														// count in childs
		document.body.appendChild(div);
		div.appendChild(img);
		div.appendChild(a);
		div.appendChild(p);
		div.appendChild(text);
		var childs = baidu.dom.children(div);
		ok(ua.isEqualArray(childs, [ img, a, p ]), "get all childs");
		childs = baidu.dom.children("div_id");
		ok(ua.isEqualArray(childs, [ img, a, p ]),
				"get all childs by id");
		document.body.removeChild(div);
	});

test("body", function() {
	stop();
	expect(1);

	var next = function() {
		var w = frames[frames.length - 1];
		var doc = w.document;
		var div = doc.createElement('div');
		var a = doc.createElement('a');
		var img = doc.createElement('img');
		var p = doc.createElement('p');
		a.innerHTML = "a innerHTML";// 孙子节点
		doc.body.appendChild(div);
		div.appendChild(img);// grandson
		doc.body.appendChild(a);
		doc.body.appendChild(p);
		var childs = baidu.dom.children(doc.body);
		ok(ua.isEqualArray(childs, [ div, a, p ]),
				"get all childs of body");
		$('iframe#test_frame').remove();
		start();
	};
	var f = document.createElement("iframe");
	f.id = 'test_frame';
	f.src = cpath + "test.html";
	document.body.appendChild(f);
	$('iframe#test_frame').load(next);
});

test("empty childs", function() {
	expect(2);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.id = "div_id";
	equal(baidu.dom.children(div), "", "no childs");
	equal(baidu.dom.children('div_id'), "", "no childs by id");
	document.body.removeChild(div);
})
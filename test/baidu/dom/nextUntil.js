/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.nextUntil");

var html =
	'<div id="e1">' +
		'文本节点' +
		'<p id="e2">子节点</p>' +
		'<p id="e3">另一个子节点</p>' +
		'<!--文本节点-->' +
		'<script>alert("Script tag");</script>' +
		'<div id="e4">' +
			'<p id="e5">孙节点</p>' +
		'</div>' +
	'</div>' +
	'<div id="e6">' +
		'<p id="e7"></p>' +
		'<p id="e8"></p>' +
		'<div id="e9"></div>' +
	'</div>';

test('没有next情况的测试', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e5').nextUntil(".foo");
		equal(target.length, 0);
	});
});

test('不重叠情形', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom("#e2, #e8").nextUntil('script');
		equal(target.length, 2);
		equal(target[0].id, 'e3');
		equal(target[1].id, 'e9');
	});
});

test('重叠情形', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom("#e2, #e3").nextUntil('div');
		equal(target.length, 2);
		equal(target[0].id, 'e3');
		equal(target[1].tagName, 'SCRIPT');
	});
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").nextUntil("wangxiao");
    ok(result);
});
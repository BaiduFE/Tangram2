/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.prevUntil");

var html =
	'<div id="e1">' +
		'文本节点' +
		'<p id="e1">子节点</p>' +
		'<script>alert("Script tag");</script>' +
		'<p id="e2">子节点</p>' +
		'<p id="e3">另一个子节点</p>' +
		'<!--文本节点-->' +
		'<div id="e4">' +
			'<p id="e5">孙节点</p>' +
		'</div>' +
	'</div>' +
	'<div id="e6">' +
		'<p id="e7"></p>' +
		'<p id="e8"></p>' +
		'<div id="e9"></div>' +
	'</div>';

test('没有prev情况的测试', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e5').prevUntil(".bar");
		equal(target.length, 0);
	});
});

test('不重叠情形', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom("#e4, #e9").prevUntil('script');
		equal(target.length, 4);
		equal(target[0].id, 'e3');
		equal(target[1].id, 'e2');
		equal(target[2].id, 'e8');
		equal(target[3].id, 'e7');
	});
});

test('重叠情形', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom("#e3, #e4").prevUntil('script');
		equal(target.length, 2);
		equal(target[0].id, 'e2');
		equal(target[1].id, 'e3');
	});
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").prevUntil("wangxiao");
    ok(result);
});
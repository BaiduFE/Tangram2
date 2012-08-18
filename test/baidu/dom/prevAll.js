/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.prevAll");

var html =
	'<div id="e1">' +
		'文本节点' +
		'<p id="e2">子节点</p>' +
		'<p id="e3">另一个子节点</p>' +
		'<!--文本节点-->' +
		'<div id="e4">' +
			'<p id="e5">孙节点</p>' +
		'</div>' +
		'<script>alert("Script tag");</script>' +
	'</div>' +
	'<div id="e6">' +
		'<p id="e7"></p>' +
		'<p id="e8"></p>' +
		'<div id="e9"></div>' +
	'</div>';

test('没有prev情况的测试', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e5').prevAll();
		equal(target.length, 0);
	});
});

test('不重叠情形', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom("#e3, #e8").prevAll();
		equal(target.length, 2);
		equal(target[0].id, 'e2');
		equal(target[1].id, 'e7');
	});
});

test('重叠情形', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom("#e3, #e4").prevAll();
		equal(target.length, 2);
		equal(target[0].id, 'e2');
		equal(target[1].id, 'e3');
	});
});

test('.prevAll( selector )重载', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e4, #e6').prevAll('p');
		equal(target.length, 2);
		equal(target[0].id, 'e2');
		equal(target[1].id, 'e3');
	});
});
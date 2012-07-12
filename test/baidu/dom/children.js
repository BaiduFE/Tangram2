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
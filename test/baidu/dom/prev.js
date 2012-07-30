/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.prev");

var html =
	'<p id="e2">子节点</p>' +
	'<div id="e4">' +
		'<p id="e5">孙节点</p>' +
	'</div>' +
	'<p id="e3">另一个子节点</p>' +
	'<!--文本节点-->' +
	'文本节点';

test('跳过文本节点测试', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e4, #e3').prev();
		equal(target.length, 2);
		equal(target[0].id, 'e2');
		equal(target[1].id, 'e4');
	});
});

test('没有prev情况的测试', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e2').prev();
		equal(target.length, 0);
	});
});

test('.prev( selector )重载', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e3, #e4').prev('p');
		equal(target.length, 1);
		equal(target[0].id, 'e2');
	});
});
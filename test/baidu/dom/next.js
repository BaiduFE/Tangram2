/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.next");

var html =
	'<p id="e2">子节点</p>' +
	'<p id="e3">另一个子节点</p>' +
	'<!--文本节点-->' +
	'<div id="e4">' +
		'<p id="e5">孙节点</p>' +
	'</div>' +
	'文本节点';

test('跳过文本节点测试', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e2, #e3').next();
		equal(target.length, 2);
		equal(target[0].id, 'e3');
		equal(target[1].id, 'e4');
	});
});

test('没有next情况的测试', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e4').next();
		equal(target.length, 0);
	});
});

test('.next( selector )重载', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('#e2, #e3').next('p');
		equal(target.length, 1);
		equal(target[0].id, 'e3');
	});
});
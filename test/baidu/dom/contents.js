/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.contents");

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
	'</div>';

test('逻辑特性测试', function () {
	useTangramDom(html, function ($dom) {
		var target = $dom.contents();
		equal(target.length, 6, '元素长度');
		equal(target[0].nodeType, document.TEXT_NODE);
		equal(target[1].id, 'e2');
		equal(target[2].id, 'e3');
		equal(target[3].nodeType, document.COMMENT_NODE);
		equal(target[4].id, 'e4');
		equal(target[5].tagName, 'SCRIPT');
	});
});

test('.contents( selector )重载测试', function () {
	useTangramDom(html, function ($dom) {
		var target = $dom.contents('p');
		equal(target.length, 2);
		equal(target[0].id, 'e2');
		equal(target[1].id, 'e3');
	});
});
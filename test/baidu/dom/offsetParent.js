/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.parents");

var html =
	'<ul class="level-1">' +
		'<li class="item-i">I</li>' +
		'<li class="item-ii">II' +
			'<ul class="level-2" style="position: relative;">' +
				'<li class="item-a">A</li>' +
				'<li class="item-b">B' +
					'<ul class="level-3" style="position: fixed;">' +
						'<li class="item-1">1</li>' +
						'<li class="item-2">2</li>' +
						'<li class="item-3">3</li>' +
					'</ul>' +
				'</li>' +
				'<li class="item-c">C</li>' +
			'</ul>' +
		'</li>' +
		'<li class="item-iii">III</li>' +
	'</ul>' +
	'<ul class="level-3" style="position: absolute;">' +
		'<li class="item-1">1</li>' +
		'<li class="item-2">2</li>' +
		'<li class="item-3">3</li>' +
	'</ul>';

function count($dom, condition) {
	var tester = /^(\w+?)(\.(.+?))?$/,
		result = tester.exec(condition),
		tagName = result[1].toUpperCase(),
		className = result[3],
		cnt = 0, i;
	for (i = 0; i < $dom.length; i++) {
		var el = $dom[i];
		(el.tagName && el.tagName === tagName) && (!className || className === el.className) && cnt++;
	}
	return cnt;
}


test('逻辑特性测试 - 无offsetParent情况', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-i', wrapper).offsetParent();
		equal(target.length, 1);
		equal(target[0].nodeName, 'BODY');
	});
});

test('逻辑特性测试 - 有offsetParent情况', function () {
	useTangramDom(html, function ($dom, wrapper) {
	    //ie6下取得offsetParent和其它浏览器存在差异，jq也是同样的结果
		var target = baidu.dom('li.item-1, li.item-a', wrapper).offsetParent();
		equal(target.length, 3);
		equal(count(target, 'ul.level-2'), 1);
		equal(count(target, 'ul.level-3'), 2);
	});
});

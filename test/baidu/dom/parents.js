/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.parents");

var html =
	'<ul class="level-1">' +
		'<li class="item-i">I</li>' +
		'<li class="item-ii">II' +
			'<ul class="level-2">' +
				'<li class="item-a">A</li>' +
				'<li class="item-b">B' +
					'<ul class="level-3">' +
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
	'<ul class="level-3">' +
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

test('获得单个元素的祖先', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-i', wrapper).parents();
		equal(target.length, 4);
		equal(count(target, 'html'), 1);
		equal(count(target, 'body'), 1);
		equal(count(target, 'div'), 1);
		equal(count(target, 'ul.level-1'), 1);
	});
});

test('获得多个元素的祖先', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-i, .item-1, .item-a').parents();
		equal(target.length, 9);
		equal(count(target, 'html'), 1, 'html');
		equal(count(target, 'body'), 1, 'body');
		equal(count(target, 'div'), 1, 'div');
		equal(count(target, 'ul.level-1'), 1,'ul.level-1');
		equal(count(target, 'ul.level-3'), 2, 'ul.level-3');
		equal(count(target, 'li.item-b'), 1, 'li.item-b');
		equal(count(target, 'ul.level-2'), 1, 'li.level-2');
		equal(count(target, 'li.item-ii'), 1, 'li.item-ii');
	});
});

test('.parents( selector )重载', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-i, .item-1, .item-a').parents('ul');
		equal(target.length, 4);
		equal(count(target, 'ul.level-1'), 1, 'ul.level-1');
		equal(count(target, 'ul.level-3'), 2, 'ul.level-3');
		equal(count(target, 'ul.level-2'), 1, 'li.level-2');
	});
});
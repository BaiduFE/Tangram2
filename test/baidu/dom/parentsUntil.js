/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.parentsUntil");

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
		var target = baidu.dom('.item-i', wrapper).parentsUntil('body');
		equal(target.length, 2);
		equal(count(target, 'html'), 0);
		equal(count(target, 'body'), 0);
		equal(count(target, 'div'), 1);
		equal(count(target, 'ul.level-1'), 1);
	});
});

test('获得多个元素的祖先（至ul.level-1为止）', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-i, .item-a').parentsUntil('ul.level-1');
		equal(target.length, 2);
		equal(count(target, 'html'), 0, 'html');
		equal(count(target, 'body'), 0, 'body');
		equal(count(target, 'div'), 0, 'div');
		equal(count(target, 'ul.level-1'), 0,'ul.level-1');
		equal(count(target, 'ul.level-3'), 0, 'ul.level-3');
		equal(count(target, 'li.item-b'), 0, 'li.item-b');
		equal(count(target, 'ul.level-2'), 1, 'li.level-2');
		equal(count(target, 'li.item-ii'), 1, 'li.item-ii');
	});
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").parentsUntil("wangxiao");
    ok(result);
});
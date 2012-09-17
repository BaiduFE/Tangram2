/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.closest");

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
	'</ul>';

test('单个元素', function () {
	useTangramDom(html, function ($dom) {
		var target = baidu.dom('.item-a').closest('ul');
		equal(target[0].className, 'level-2');

		target = baidu.dom('.item-a').closest('li');
		equal(target[0].className, 'item-a');
	});
});

test('多个元素', function () {
	useTangramDom(html, function ($dom) {
		var target = baidu.dom('.item-1, .item-c').closest('ul');
		equal(target.length, 2);
		equal(target[0].className, 'level-3');
		equal(target[1].className, 'level-2');
	});
});

test('.closest( context )重载', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-1').closest('body', document);
		equal(target.length, 1, 'find body');
		equal(target[0].tagName, 'BODY');
		var target = baidu.dom('.item-1').closest('body', wrapper);
		equal(target.length, 0, 'find body');
	});
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").closest("wangxiao");
    ok(result);
});
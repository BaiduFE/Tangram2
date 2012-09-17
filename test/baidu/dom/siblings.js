/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.siblings");

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

test('单个节点的兄弟', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-a').siblings();
		equal(target.length, 2);
		equal(target[0].className, 'item-b');
		equal(target[1].className, 'item-c');
	});
});

test('多个节点的兄弟（不重复）', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-ii, .item-a').siblings();
		equal(target.length, 4);
		equal(target[0].className, 'item-i');
		equal(target[1].className, 'item-iii');
		equal(target[2].className, 'item-b');
		equal(target[3].className, 'item-c');
	});
});

test('多个节点的兄弟（有重复）', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-a, .item-c').siblings();
		equal(target.length, 3);
		equal(target[0].className, 'item-b');
		equal(target[1].className, 'item-c');
		equal(target[2].className, 'item-a');
	});
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").siblings("wangxiao");
    ok(result);
});
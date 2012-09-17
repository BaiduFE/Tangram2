/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.parent");

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

test('获得单个元素的父亲', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-i', wrapper).parent();
		equal(target.length, 1);
		equal(target[0].className, 'level-1');
	});
});

test('获得多个元素不重复的父亲', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-i, .item-a, .item-1').parent();
		equal(target.length, 3);
		equal(target[0].className, 'level-1');
		equal(target[1].className, 'level-2');
		equal(target[2].className, 'level-3');
	});
});

test('获得多个元素重复的父亲(JQuery)', function () {
	var target = $(html).find('li').parent();
	equal(target.length, 3);
	equal(target[0].className, 'level-1');
	equal(target[1].className, 'level-2');
	equal(target[2].className, 'level-3');
})

test('获得多个元素重复的父亲', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('li', wrapper).parent();
		equal(target.length, 3);
		equal(target[0].className, 'level-1');
		equal(target[1].className, 'level-2');
		equal(target[2].className, 'level-3');
	});
});

test('.parent( selector )重载', function () {
	useTangramDom(html, function ($dom, wrapper) {
		var target = baidu.dom('.item-i, .item-a, .item-1').parent('.level-1, .level-2');
		equal(target.length, 2);
		equal(target[0].className, 'level-1');
		equal(target[1].className, 'level-2');
	});
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").parent("wangxiao");
    ok(result);
});
/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.find");

var html =
	'<ul class="level-1">'+
		'<li class="item-i">I</li>'+
		'<li class="item-ii">II'+
			'<ul class="level-2">'+
				'<li class="item-a">A</li>'+
				'<li class="item-b">B'+
					'<ul class="level-3">'+
						'<li class="item-1">1</li>'+
						'<li class="item-2">2</li>'+
						'<li class="item-3">3</li>'+
					'</ul>'+
				'</li>'+
				'<li class="item-c">C</li>'+
			'</ul>'+
		'</li>'+
		'<li class="item-iii">III</li>'+
	'</ul>'+
	'<ul class="level-2">'+
		'<li class="item-a">A</li>'+
		'<li class="item-b">B'+
			'<ul class="level-3">'+
				'<li class="item-1">1</li>'+
				'<li class="item-2">2</li>'+
				'<li class="item-3">3</li>'+
			'</ul>'+
		'</li>'+
		'<li class="item-c">C</li>'+
	'</ul>';

test('逻辑特性测试（单个元素）', function () {
	useTangramDom(html, function ($dom) {
		var target = $dom.find('li, .level-1');
		equal(target.length, 15, '结果数');
		var i = 0;
		equal(target[i++].className, 'item-i');
		equal(target[i++].className, 'item-ii');
		equal(target[i++].className, 'item-a');
		equal(target[i++].className, 'item-b');
		equal(target[i++].className, 'item-1');
		equal(target[i++].className, 'item-2');
		equal(target[i++].className, 'item-3');
		equal(target[i++].className, 'item-c');
		equal(target[i++].className, 'item-iii');
		equal(target[i++].className, 'item-a');
		equal(target[i++].className, 'item-b');
		equal(target[i++].className, 'item-1');
		equal(target[i++].className, 'item-2');
		equal(target[i++].className, 'item-3');
		equal(target[i++].className, 'item-c');
	});
});

/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.not");

var html =
	'<div id="div0"></div>' +
	'<div id="div1" class="a"></div>' +
	'<div id="div2" class="a b"></div>' +
	'<div id="div3" class="b"></div>' +
	'<div id="div4" class="a"></div>' +
	'<div id="div5" class="b"></div>';


test('逻辑特性测试', function () {
	useTangramDom(html, function ($dom) {
		var target;

		target = $dom.not('.a');
		equal(target.length, 3);
		equal(target[0].id, 'div0');
		equal(target[1].id, 'div3');
		equal(target[2].id, 'div5');

		target = $dom.not('.b.a');
		equal(target.length, 5);
		equal(target[0].id, 'div0');
		equal(target[1].id, 'div1');
		equal(target[2].id, 'div3');
		equal(target[3].id, 'div4');
		equal(target[4].id, 'div5');

		target = $dom.not('.a').not('.b');
		equal(target.length, 1);
		equal(target[0].id, 'div0');
	});
});

test('.not( elements )重载测试', function () {
	useTangramDom(html, function ($dom) {
		var target = $dom.not($dom[0]);
		equal(target.length, 5);
		equal(target[0].id, 'div1');

		target = $dom.not([$dom[0], $dom[2], $dom[5]]);
		equal(target.length, 3);
		equal(target[0].id, 'div1');
		equal(target[1].id, 'div3');
		equal(target[2].id, 'div4');
		equal(target[3].id, 'div6');
	});
});

test('.not( elements )重载测试（JQuery验证）', function () {
	useTangramDom(html, function ($dom) {
		/*JQuery 验证*/
		$dom = $(html);
		var target = $dom.not([$dom[0], $dom[2], $dom[5]]);
		equal(target.length, 3);
		equal(target[0].id, 'div1');
		equal(target[1].id, 'div3');
		equal(target[2].id, 'div4');
	});
});

test('.not( function(index) )重载测试', function () {
	useTangramDom(html, function ($dom) {
		var target = $dom.not(function (index) {
			ok(typeof index === 'number', 'index param check');
			equal(this, $dom[index], 'this pointer check');
			return index % 3 === 1;
		});
		equal(target.length, 4);
		equal(target[0].id, 'div0');
		equal(target[1].id, 'div2');
		equal(target[2].id, 'div3');
		equal(target[3].id, 'div5');
	});
});
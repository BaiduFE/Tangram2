/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.each");

var html =
    '<div id="div0"></div>' +
    '<div id="div1"></div>' +
    '<div id="div2"></div>' +
    '<div id="div3"></div>' +
    '<div id="div4"></div>' +
    '<div id="div5"></div>';

test('功能性测试', 24, function () {
	useTangramDom(html, function ($dom) {
		var indexCheck = 0;
		$dom.each(function (index, el) {
			equal(index, indexCheck, 'index check');
			equal($dom[indexCheck++], el, 'dom element check');
			equal(this, el, 'this pointer check');
			this.className = this.id;
		});
		for (var i = 0; i < $dom.length; i++) {
			equal($dom[i].id, $dom[i].className, 'function check');
		}
	});
});

test('嵌套调用测试', 6, function () {
	useTangramDom(html, function ($dom) {
		var indexCheck = 0;
		$dom.each(function (index, el) {
			$dom.each(function (index2, el2) {
				if (index === index2) {
					this.className = 'class-' + index * index;
				}
			});
		});
		for (var i = 0; i < $dom.length; i++) {
			equal($dom[i].className, 'class-' + (i * i), 'function check');
		}
	});
});

test('return false中断测试', 4, function () {
	useTangramDom(html, function ($dom) {
		$dom.each(function (index, el) {
			ok(index <= 3, 'enter ' + this.id);
			return index !== 3;
		});
	});
});

test('return false中断测试(JQuery)', 4, function () {
	$(html).each(function (index, el) {
		ok(index <= 3, 'enter ' + this.id);
		return index !== 3;
	});
});
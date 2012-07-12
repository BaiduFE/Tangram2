/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.map");

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
		var actual = $dom.map(function (index, el) {
			equal(index, indexCheck, 'index check');
			equal(el, $dom[indexCheck], 'dom element check');
			equal(this, $dom[indexCheck++], 'this pointer check');
			return this.id;
		});
		for (var i = 0; i < actual.length; i++) {
			equal(actual[i], 'div' + i);
		}
	});
});

test('嵌套调用测试', 43, function () {
	useTangramDom(html, function ($dom) {
		var actual = $dom.map(function (index, el) {
			var nextId = $dom.map(function (index2, el2) {
				return index2 > index ? el2.id : '-';
			});
			return nextId;
		});
		var expected = [
			['-', 'div1', 'div2', 'div3', 'div4', 'div5'],
			['-', '-', 'div2', 'div3', 'div4', 'div5'],
			['-', '-', '-', 'div3', 'div4', 'div5'],
			['-', '-', '-', '-', 'div4', 'div5'],
			['-', '-', '-', '-', '-', 'div5'],
			['-', '-', '-', '-', '-', '-'],
		];
		equal(actual.length, expected.length, "length : ");
		for (var i = 0; i < expected.length; i++) {
			equal(actual[i].length, expected[i].length);
			for (var j = 0; j < expected[i].length; j++) {
				equal(actual[i][j], expected[i][j]);
			}
		}
	});
});

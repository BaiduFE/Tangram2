/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />
/// <reference path="http://localhost/Tangram2/test/tools/br/import.php?f=baidu.dom.map" />

module("baidu.dom.is");

var testHtml =
    '<div></div>' +
    '<div class="a"></div>' +
    '<div class="b"></div>' +
    '<div class="b"></div>';

test("业务特性测试", function () {
	useTangramDom(testHtml, function ($dom, wrapper) {
		equal($dom.is('.c'), false, '不包含元素的情况');
		equal($dom.is('.a'), true, '一个元素满足条件');
		equal($dom.is('.b'), true, '多个元素满足条件');
	});
});

test('.is( function(index) )重载测试', function () {
	useTangramDom(testHtml, function ($dom, wrapper) {
		var indexCheck = 0;
		var actual = $dom.is(function (index) {
			equal(this, $dom[indexCheck], 'this pointer check');
			equal(index, indexCheck++, 'index param check');
			return this.className = 'a';
		});
		equal(actual, true, 'result check');
	});
});

test('.is( element )重载测试', function () {
	useTangramDom(testHtml, function ($dom, wrapper) {
		equal($dom.is($dom[1]), true);
		useTangramDom("<p></p>", function ($dom2) {
			equal($dom.is($dom2[0]), false);
		});
	});
});

test('.is( TangramDom )重载测试', function () {
	useTangramDom(testHtml, function ($dom, wrapper) {
		equal($dom.is($dom), true);
		equal($dom.is(baidu.dom($dom[1])), true);
		useTangramDom("<p></p>", function ($dom2) {
			equal($dom.is($dom2), false);
		});
	});
});
/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.last");

var html = '<div id="e1"></div>' +
           '<div id="e2"></div>' +
           '<div id="e3"></div>';

test("获得最后一个元素（集合包含元素）", function () {
    useTangramDom(html, function ($dom) {
        var actual = $dom.last();
        equal(actual.length, 1, '结果长度');
        equal(actual[0].outerHTML, '<div id="e3"></div>', '最后一个元素');
    });
});

test("获得最后一个元素（集合不包含元素）", function () {
    useTangramDom(function ($dom) {
        var actual = $dom.last();
        equal(actual.length, 0, '结果长度');
    });
});
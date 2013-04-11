/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.eq");

var html =
    '<div id="div0"></div>' +
    '<div id="div1"></div>' +
    '<div id="div2"></div>' +
    '<div id="div3"></div>' +
    '<div id="div4"></div>' +
    '<div id="div5"></div>';

test("从前面获得第3个div", function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.eq(3)[0];
        equal(target.id, 'div3', "获得的第3个div的id");
    });
});

test("从后面获得第2个div", function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.eq(-2)[0];
        equal(target.id, 'div4', "倒数第2个div的id");
    });
});

test("参数容错测试：从前面获得第10个div", function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.eq(10);
        equal(target.length, 0, "获得的元素个数");
    });
});

test("参数容错测试：从后面获得第-10个div", function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.eq(-10);
        equal(target.length, 0, "获得的元素个数");
    });
});

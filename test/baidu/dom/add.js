/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.add");

var html1 = '<div id="e1" class="c1"></div>' +
            '<div id="e2" class="c1"></div>' +
            '<div id="e3" class="c2"></div>' +
            '<div id="e4" class="c2"></div>',

    html2 = '<div id="e5" class="c3"></div>' +
            '<div id="e6" class="c4"></div>' +
            '<div id="e7" class="c3"></div>' +
            '<div id="e8" class="c4"></div>';

test("原集合为空，要添加的集合为空", function () {
    useTangramDom(function ($dom1) {
        useTangramDom(html2, function ($dom2) {
            var target = $dom1.add(".c2");
            equal(target.length, 0, "结果长度");
        });
    });
});

test("原集合为空，添加集合中不存在的元素", function () {
    useTangramDom(function ($dom1) {
        useTangramDom(html2, function ($dom2) {
            var target = $dom1.add('#e5');
            equal(target.length, 1, "结果长度");
            equal(target[0].id, 'e5', '验证添加的元素');
        });
    });
});

test("原集合不为空，添加集合中不存在的元素", function () {
    useTangramDom(html1, function ($dom1) {
        useTangramDom(html2, function ($dom2) {
            var target = $dom1.add('.c3');
            equal(target.length, 6, "结果长度");
            equal(target[0].id, 'e1', '验证原有元素');
            equal(target[1].id, 'e2', '验证原有元素');
            equal(target[2].id, 'e3', '验证原有元素');
            equal(target[3].id, 'e4', '验证原有元素');
            equal(target[4].id, 'e5', '验证添加的元素');
            equal(target[5].id, 'e7', '验证添加的元素');
        });
    });
});

test("原集合不为空，添加集合中存在的元素", function () {
    useTangramDom(html1, function ($dom1) {
        useTangramDom(html2, function ($dom2) {
            var target = $dom1.add('.c2');
            equal(target.length, 4, "结果长度");
            equal(target[0].id, 'e1', '验证原有元素');
            equal(target[1].id, 'e2', '验证原有元素');
            equal(target[2].id, 'e3', '验证原有元素');
            equal(target[3].id, 'e4', '验证原有元素');
        });
    });
});

test(".add( element )重载", function () {
    useTangramDom(html1, function ($dom) {
        var e5 = document.createElement("div");
        e5.id = "e5";
        var target = $dom.add(e5);
        equal(target.length, 5, '结果长度');
        equal(target[0].id, 'e1', '验证原有元素');
        equal(target[1].id, 'e2', '验证原有元素');
        equal(target[2].id, 'e3', '验证原有元素');
        equal(target[3].id, 'e4', '验证原有元素');
        equal(target[4].id, 'e5', '验证添加的元素');
    });
});

test(".add( html )重载", function () {
    useTangramDom(html1, function ($dom) {
        var target = $dom.add("<div id='e5'>hzl</div>");
        equal(target.length, 5, '结果长度');
        equal(target[0].id, 'e1', '验证原有元素');
        equal(target[1].id, 'e2', '验证原有元素');
        equal(target[2].id, 'e3', '验证原有元素');
        equal(target[3].id, 'e4', '验证原有元素');
        equal(target[4].id, 'e5', '验证添加的元素');
    });
});

test(".add( selector, context )重载", function () {
    useTangramDom(html1, function ($dom1) {
        useTangramDom(html2, function ($dom2) {
            var target = $dom1.add('.c4', document.body);
            equal(target.length, 6, "结果长度");
            equal(target[0].id, 'e1', '验证原有元素');
            equal(target[1].id, 'e2', '验证原有元素');
            equal(target[2].id, 'e3', '验证原有元素');
            equal(target[3].id, 'e4', '验证原有元素');
            equal(target[4].id, 'e6', '验证添加的元素');
            equal(target[5].id, 'e8', '验证添加的元素');
        });
    });
});

test(".add( array )重载", function () {
    useTangramDom(html1, function ($dom) {
        var e9 = baidu("<div id='e9'>hzl</div>").get(0);
        var e10 = baidu("<div id='e10'>ttt</div>").get(0);
        var target = $dom.add([e9,e10]);
        equal(target.length, 6, '结果长度');
        equal(target[0].id, 'e1', '验证原有元素');
        equal(target[1].id, 'e2', '验证原有元素');
        equal(target[2].id, 'e3', '验证原有元素');
        equal(target[3].id, 'e4', '验证原有元素');
        equal(target[4].id, 'e9', '验证添加的元素');
        equal(target[5].id, 'e10', '验证添加的元素');
    });
});

test(".add( obj )默认重载", function () {
    useTangramDom(html1, function ($dom) {
        var e9 = baidu("<div id='e9'>hzl</div>").get(0);
        var e10 = baidu("<div id='e10'>ttt</div>").get(0);
        var obj = {'e9':e9,'e10':e10};
        obj.length = 2;
        var target = $dom.add(obj);
        equal(target.length, 5, '结果长度');
        equal(target[0].id, 'e1', '验证原有元素');
        equal(target[1].id, 'e2', '验证原有元素');
        equal(target[2].id, 'e3', '验证原有元素');
        equal(target[3].id, 'e4', '验证原有元素');
    });
});

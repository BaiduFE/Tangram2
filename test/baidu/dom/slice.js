/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.slice");

var html = '<div id="e1"></div>' +
           '<div id="e2"></div>' +
           '<div id="e3"></div>' +
           '<div id="e4"></div>' +
           '<div id="e5"></div>' +
           '<div id="e6"></div>' +
           '<div id="e7"></div>' +
           '<div id="e8"></div>';


test('slice(0)', 9, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(0);
        equal(target.length, 8, '元素长度');
        for (var i = 0; i < target.length; i++) {
            equal(target[i].id, 'e' + (i + 1), '元素');
        }
    });
});

test('slice(4)', 5, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(4);
        equal(target.length, 4, '元素长度');
        for (var i = 0; i < target.length; i++) {
            equal(target[i].id, 'e' + (i + 5), '元素');
        }
    });
});

test('slice(0,4)', 5, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(0, 4);
        equal(target.length, 4, '元素长度');
        for (var i = 0; i < target.length; i++) {
            equal(target[i].id, 'e' + (i + 1), '元素');
        }
    });
});

test('slice(-3)', 4, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(-3);
        equal(target.length, 3, '元素长度');
        equal(target[0].id, 'e6', '元素');
        equal(target[1].id, 'e7', '元素');
        equal(target[2].id, 'e8', '元素');
    });
});

test('slice(-5, -2)', 4, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(-5, -2);
        equal(target.length, 3, '元素长度');
        equal(target[0].id, 'e4', '元素');
        equal(target[1].id, 'e5', '元素');
        equal(target[2].id, 'e6', '元素');
    });
});


test('slice(1,-3)', 5, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(1, -3);
        equal(target.length, 4, '元素长度');
        equal(target[0].id, 'e2', '元素');
        equal(target[1].id, 'e3', '元素');
        equal(target[2].id, 'e4', '元素');
        equal(target[3].id, 'e5', '元素');
    });
});


test('slice(8)', function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(8);
        equal(target.length, 0, '元素长度');
    });
});


test('slice(9)', function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(9);
        equal(target.length, 0, '元素长度');
    });
});


test('slice(-8)', 9, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(-8);
        equal(target.length, 8, '元素长度');
        for (var i = 0; i < target.length; i++) {
            equal(target[i].id, 'e' + (i + 1), '元素');
        }
    });
});


test('slice(-10)', 9, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(-10);
        equal(target.length, 8, '元素长度');
        for (var i = 0; i < target.length; i++) {
            equal(target[i].id, 'e' + (i + 1), '元素');
        }
    });
});

test('(JQuery) slice(-10)', 9, function () {
    var $dom = $(html);
    var target = $dom.slice(-10);
    equal(target.length, 8, '元素长度');
    for (var i = 0; i < target.length; i++) {
        equal(target[i].id, 'e' + (i + 1), '元素');
    }
});

test('slice(2,1)', 1, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(2, 1);
        equal(target.length, 0, '元素长度');
    });
});

test('slice(-1,-2)', 1, function () {
    useTangramDom(html, function ($dom) {
        var target = $dom.slice(-1, -2);
        equal(target.length, 0, '元素长度');
    });
});
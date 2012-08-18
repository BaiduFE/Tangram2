/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

/**
 *@author techird
 */

module("baidu.dom.filter");

var html =
    '<p id="e1"></p>' +
    '<div id="e2"></div>' +
    '<div id="e3">' +
        '<p id="e4"></p>' +
    '</div>';

function getHtml($dom) {
    var html = "";
    for (var i = 0; i < $dom.length; ++i) {
        html += $dom[i].outerHTML;
    }
    return html;
}

test('无满足条件的元素（selector=".filter"）', function () {
    useTangramDom(html, function ($dom) {
        var expected = "",
            actual = getHtml($dom.filter('.filter'));
        equal(actual, expected, '返回结果');
    });
});

test('有满足条件的元素（selector="p"），且不会在子元素中选择', function () {
    useTangramDom(html, function ($dom) {
        equal($dom.filter("p")[0].id, "e1", '返回结果');
    });
});

test('测试.filter( function(index) )重载', function () {
    useTangramDom(html, function ($dom) {
        var mm = $dom.filter(function (index) {
            if (index === 1) {
                equal(this.id, 'e2', '测试this指针正确性, this.id');
            }
            return index < 2;
        });
        ok(mm[0].id=="e1" && mm[1].id=="e2", '返回结果');
    });
});

//test('测试.filter( element )重载', function () {
//    useTangramDom(html, function ($dom) {
//        ok(false, '不知道此重载怎么用');
//    });
//});
//
//test('测试.filter( Tangram object )重载', function () {
//    useTangramDom(html, function ($dom) {
//        ok(false, '不知道此重载怎么用');
//    });
//});
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
        equal(actual[0].id, "e3", '最后一个元素');
    });
});

test("获得最后一个元素（集合不包含元素）", function () {
    useTangramDom(function ($dom) {
        var actual = $dom.last();
        equal(actual.length, 0, '结果长度');
    });
});

//老用例
test('兼容1.x接口：最后一个子节点有空节点',function(){
    expect(2);
    var div = document.createElement('div');
    var a = document.createElement('a');
    var img = document.createElement('img');
    var text = document.createTextNode('text');
    document.body.appendChild(div);
    div.appendChild(img);
    div.appendChild(a);
    div.appendChild(text);
    div.id = "div_id";
    equal(baidu.dom.last(div),a,"last node is not textNode");
    equal(baidu.dom.last('div_id'),a,"get last node by id");
    document.body.removeChild(div);
})

test('兼容1.x接口：最后一个子节点后没有空节点',function(){
    expect(1);
    var div = document.createElement('div');
    var a = document.createElement('a');
    var img = document.createElement('img');
    document.body.appendChild(div);
    div.appendChild(img);
    div.appendChild(a);
    equal(baidu.dom.last(div),a,"last node is a");
    document.body.removeChild(div);
})

test('兼容1.x接口：不在dom树上',function(){
    expect(1);
    var div = document.createElement('div');
    equal(baidu.dom.last(div),null,"no child");
})

test('兼容1.x接口：没有子节点',function(){
    expect(1);
    var div = document.createElement('div');
    document.body.appendChild(div);
    equal(baidu.dom.last(div),null,"no child");
    document.body.removeChild(div);
})
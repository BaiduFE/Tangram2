/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.first");

var html = '<div id="e1"></div>' +
           '<div id="e2"></div>' +
           '<div id="e3"></div>';

test("获得第1个元素（集合包含元素）", function () {
    useTangramDom(html, function ($dom) {
        var actual = $dom.first();
        equal(actual.length, 1, '结果长度');
        equal(actual[0].id, "e1", '第一个元素');
    });
});

test("获得第1个元素（集合不包含元素）", function () {
    useTangramDom(function ($dom) {
        var actual = $dom.first();
        equal(actual.length, 0, '结果长度');
    });
});

//老用例

test("老接口：第一个子节点为空节点",function(){
    expect(2);
    var div = document.createElement('div');
    var text = document.createTextNode('textnode');
    var img = document.createElement('img');
    var table = document.createElement('table');
    document.body.appendChild(div);
    div.id = "div";
    div.appendChild(text);
    div.appendChild(img);
    div.appendChild(table);
    equal(baidu.dom.first(div),img,"first child is not textNode");
    equal(baidu.dom.first('div'),img,"first child is not textNode--by id");
    document.body.removeChild(div);
})


test("老接口：第一个子节点不是空节点",function(){
    expect(2);
    var div = document.createElement('div');
    var img = document.createElement('img');
    var table = document.createElement('table');
    document.body.appendChild(div);
    div.appendChild(img);
    div.appendChild(table);
    div.id = "div_id";
    equal(baidu.dom.first(div),img,"first child is img");
    equal(baidu.dom.first('div_id'),img,"first child is img--by id");
    document.body.removeChild(div);
})

test("老接口：html",function(){
//  alert(baidu.dom.first(document));
    expect(2);
    equal(baidu.dom.first(document),document.documentElement,"first child is html");
    equal(baidu.dom.first(document.documentElement),document.documentElement.firstChild,"first child of html is head ");
})

test("老接口：没有子节点",function(){
    expect(1);
    var div = document.createElement('div');
    equal(baidu.dom.first(div),null,"no child");
})


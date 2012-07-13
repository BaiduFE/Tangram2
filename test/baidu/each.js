module("baidu.each");

test("数组", function(){
    var a = [2,1,3],
        result = "";
    baidu.each(a, function(item, index){result += item});
    equal(a.join(""), result, "数组正常");

    result="";
    baidu.each(a, function(item, index){result += index});
    equal("012", result, "iterator 的第二个参数 index 正常");

    result="";
    baidu.each(a, function(item, index, target){result = target});
    equal(a, result, "iterator 的第三个参数 target 正常");
});

test("ArrayLike", function(){
    var a = {0:1, 1:2, 2:3},
        result = "";
    baidu.each(a, function(item, index){result += item});
    equal(result, "123", "ArrayLike 无 length");

    a.length = 4; result = "";
    baidu.each(a, function(item, index){result += item});
    equal(result, "123undefined", "ArrayLike 有 length(4)");
});

test("NodeList", function(){
    var result = "";

    baidu.each(document.getElementsByTagName("HEAD"), function(item, index) {
        result += item.tagName.toLowerCase();
    });

    equal(result, "head", "NodeList : document.getElementsByTagName('head')");
});

test("String", function(){
    var result = "";

    baidu.each("abcdefg", function(item, index) {
        result += item;
    });

    equal(result, "abcdefg", "String");
});

test("非法参数", function(){
    var a;
    equal(baidu.each(window, function(item, index){ok(false, "Window : ")}), window, "第一外参数为DOM");
    equal(baidu.each(true, function(item, index){ok(false, "Boolean : ")}), true, "第一个参数为Boolean");
    equal(baidu.each(a, function(item, index){ok(false, "undefined : ")}), a, "第一个参数为undefined");
    equal(baidu.each(false, a), false, "第二个参数非法");
    equal(baidu.each(1), 1, "第二个参数缺失");
});
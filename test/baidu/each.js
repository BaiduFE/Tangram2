module("baidu.each");

test("数组", function(){
    var a = [2,1,3],
        result = "";
    baidu.each(a, function(index, item){result += item});
    equal(a.join(""), result, "数组正常");

    result="";
    baidu.each(a, function(index, item){result += index});
    equal("012", result, "iterator 的第二个参数 index 正常");

    result="";
    baidu.each(a, function(index, item, target){result = target});
    equal(a, result, "iterator 的第三个参数 target 正常");
});

test("ArrayLike", function(){
    var a = {0:1, 1:2, 2:3},
        result = "";
    baidu.each(a, function(index, item){result += item});
    equal(result, "123", "ArrayLike 无 length");

    a.length = 4; result = "";
    baidu.each(a, function(index, item){result += item});
    equal(result, "123undefined", "ArrayLike 有 length(4)");
});

test("NodeList", function(){
    var result = "";

    baidu.each(document.getElementsByTagName("HEAD"), function(index, item) {
        result += item.tagName.toLowerCase();
    });

    equal(result, "head", "NodeList : document.getElementsByTagName('head')");
});

test("String", function(){
    var result = "";

    baidu.each("abcdefg", function(index, item) {
        result += item;
    });

    equal(result, "abcdefg", "String");
});

test("非法参数", function(){
    var a;
    equal(baidu.each(window, function(index, item){ok(false, "Window : ")}), window, "第一外参数为DOM");
    equal(baidu.each(true, function(index, item){ok(false, "Boolean : ")}), true, "第一个参数为Boolean");
    equal(baidu.each(a, function(index, item){ok(false, "undefined : ")}), a, "第一个参数为undefined");
    equal(baidu.each(false, a), false, "第二个参数非法");
    equal(baidu.each(1), 1, "第二个参数缺失");
});

test('数字测试', function(){
    var len = 3;
    expect(len);
    baidu.each(len, function(index, item){
        ok(true, 'number: ' + index + '; item: ' + item);
    });
});
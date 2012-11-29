module("baidu.isArray");

test("Array", function(){
    ok(baidu.isArray([]), "正常的 []");
    ok(baidu.isArray(new Array()), "正常的 new Array()");
    ok(baidu.isArray("".split("")), "正常的 .split() ");
});

test("非正常的 Array", function(x){
    ok(!baidu.isArray(0), "Number");
    ok(!baidu.isArray(""), "String");
    ok(!baidu.isArray({}), "Object");
    ok(!baidu.isArray(/mm/), "RegExp");
    ok(!baidu.isArray(true), "Boolean");
    ok(!baidu.isArray(window), "Window");
    ok(!baidu.isArray(new Date()), "Date");
    ok(!baidu.isArray(arguments), "Arguments");
    ok(!baidu.isArray(function(xx){}), "Function");
    ok(!baidu.isArray(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isArray(document.getElementsByTagName("HEAD")[0]), "HTMLElement");
});


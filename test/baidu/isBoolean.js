module("baidu.isBoolean");

test("Boolean", function(){
    ok(baidu.isBoolean(true), "正常的布尔值");
    ok(baidu.isBoolean(new Boolean("false")), "正常的布尔值");
});

test("非正常的 Boolean", function(x){
    ok(!baidu.isBoolean(0), "Number");
    ok(!baidu.isBoolean(""), "String");
    ok(!baidu.isBoolean([]), "Array");
    ok(!baidu.isBoolean({}), "Object");
    ok(!baidu.isBoolean(/mm/), "RegExp");
    ok(!baidu.isBoolean(new Date()), "Date");
    ok(!baidu.isBoolean(arguments), "Arguments");
    ok(!baidu.isBoolean(function(xx){}), "Function");
    ok(!baidu.isBoolean(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isBoolean(document.getElementsByTagName("HEAD")[0]), "HTMLElement");
});


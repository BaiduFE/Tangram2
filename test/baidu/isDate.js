module("baidu.isDate");

test("Date", function(){
    ok(baidu.isDate(new Date()), "正常的 日期");
    ok(!baidu.isDate(new Date("abcde")), "不正常的 日期");
});

test("非正常的 Date", function(x){
    ok(!baidu.isDate(0), "Number");
    ok(!baidu.isDate(""), "String");
    ok(!baidu.isDate([]), "Array");
    ok(!baidu.isDate({}), "Object");
    ok(!baidu.isDate(/mm/), "RegExp");
    ok(!baidu.isDate(new Boolean()), "Boolean");
    ok(!baidu.isDate(arguments), "Arguments");
    ok(!baidu.isDate(function(xx){}), "Function");
    ok(!baidu.isDate(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isDate(document.getElementsByTagName("HEAD")[0]), "HTMLElement");
});


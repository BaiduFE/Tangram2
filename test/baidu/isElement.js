module("baidu.isElement");

test("HTMLElement", function(){
    ok(baidu.isElement(document.getElementsByTagName("HEAD")[0]), "HTMLElement");
});

test("非正常的 HTMLElement", function(x){
    ok(!baidu.isElement(0), "Number");
    ok(!baidu.isElement(""), "String");
    ok(!baidu.isElement([]), "Array");
    ok(!baidu.isElement({}), "Object");
    ok(!baidu.isElement(/mm/), "RegExp");
    ok(!baidu.isElement(window), "Window");
    ok(!baidu.isElement(document), "Document");
    ok(!baidu.isElement(new Date()), "Date");
    ok(!baidu.isElement(new Boolean()), "Boolean");
    ok(!baidu.isElement(arguments), "Arguments");
    ok(!baidu.isElement(function(xx){}), "Function");
    ok(!baidu.isElement(document.getElementsByTagName("*")), "NodeList");
});


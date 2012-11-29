module("baidu.isDocument");

test("Document", function(){
    ok(baidu.isDocument(document), "正常的 document");
});

test("非正常的 Document", function(x){
    ok(!baidu.isDocument(0), "Number");
    ok(!baidu.isDocument(""), "String");
    ok(!baidu.isDocument([]), "Array");
    ok(!baidu.isDocument({}), "Object");
    ok(!baidu.isDocument(/mm/), "RegExp");
    ok(!baidu.isDocument(window), "Window");
    ok(!baidu.isDocument(new Boolean()), "Boolean");
    ok(!baidu.isDocument(arguments), "Arguments");
    ok(!baidu.isDocument(function(xx){}), "Function");
    ok(!baidu.isDocument(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isDocument(document.getElementsByTagName("HEAD")[0]), "HTMLElement");
});

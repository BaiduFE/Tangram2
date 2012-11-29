module("baidu.isPlainObject");

test("PlainObject", function(x){
    ok(baidu.isPlainObject({}), "Object");
    ok(baidu.isPlainObject(arguments), "Arguments");
});

test("非正常的 PlainObject", function(x){
    ok(!baidu.isPlainObject(""), "String");
    ok(!baidu.isPlainObject(0), "Number");
    ok(!baidu.isPlainObject([]), "Array");
    ok(!baidu.isPlainObject(/mm/), "RegExp");
    ok(!baidu.isPlainObject(window), "Window");
    ok(!baidu.isPlainObject(document), "Document");
    ok(!baidu.isPlainObject(new Date()), "Date");
    ok(!baidu.isPlainObject(new Boolean()), "Boolean");
    ok(!baidu.isPlainObject(new String("")), "String");
    ok(!baidu.isPlainObject(function(xx){}), "Function");
    ok(!baidu.isPlainObject(new Function("")), "Function");
    ok(!baidu.isPlainObject(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isPlainObject(document.getElementsByTagName("HEAD")[0]), "HTMLElement");

    function Class(){}
    ok(!baidu.isPlainObject(new Class()), "Class");

    try{
        throw new Error("haha")
    } catch(ex) {
        ok(!baidu.isPlainObject(ex), "Error");
    }
});


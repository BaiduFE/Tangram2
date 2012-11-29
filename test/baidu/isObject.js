module("baidu.isObject");

test("Number", function(){
    ok(baidu.isObject([]), "Array");
    ok(baidu.isObject({}), "Object");
    ok(baidu.isObject(/mm/), "RegExp");
    ok(baidu.isObject(window), "Window");
    ok(baidu.isObject(document), "Document");
    ok(baidu.isObject(new Date()), "Date");
    ok(baidu.isObject(new String("")), "String");
    ok(baidu.isObject(new Boolean()), "Boolean");
    ok(baidu.isObject(arguments), "Arguments");
    ok(baidu.isObject(function(xx){}), "Function");
    ok(baidu.isObject(new Function("")), "Function");
    ok(baidu.isObject(document.getElementsByTagName("*")), "NodeList");
    ok(baidu.isObject(document.getElementsByTagName("HEAD")[0]), "HTMLElement");

    try{
        throw new Error("haha")
    } catch(ex) {
        ok(baidu.isObject(ex), "Error");
    }
});

test("非正常的 Number", function(x){
    ok(!baidu.isObject(0), "Number");
    ok(!baidu.isObject(""), "String");
    ok(!baidu.isObject(Number.POSITIVE_INFINITY), "Number");
});


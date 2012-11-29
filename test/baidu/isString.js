module("baidu.isString");

test("String", function(){
    ok(baidu.isString(""), "String");
    ok(baidu.isString(new String("")), "String");
});

test("非正常的 String", function(x){
    ok(!baidu.isString(0), "Number");
    ok(!baidu.isString([]), "Array");
    ok(!baidu.isString({}), "Object");
    ok(!baidu.isString(/mm/), "RegExp");
    ok(!baidu.isString(window), "Window");
    ok(!baidu.isString(document), "Document");
    ok(!baidu.isString(new Date()), "Date");
    ok(!baidu.isString(new Boolean()), "Boolean");
    ok(!baidu.isString(arguments), "Arguments");
    ok(!baidu.isString(function(xx){}), "Function");
    ok(!baidu.isString(new Function("")), "Function");
    ok(!baidu.isString(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isString(document.getElementsByTagName("HEAD")[0]), "HTMLElement");

    try{
        throw new Error("haha")
    } catch(ex) {
        ok(!baidu.isString(ex), "Error");
    }
});


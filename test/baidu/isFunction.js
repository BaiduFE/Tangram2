module("baidu.isFunction");

test("Function", function(){
    ok(baidu.isFunction(function(xx){}), "Function");
    ok(baidu.isFunction(new Function("")), "Function");
});

test("非正常的 Function", function(x){
    ok(!baidu.isFunction(0), "Number");
    ok(!baidu.isFunction(""), "String");
    ok(!baidu.isFunction([]), "Array");
    ok(!baidu.isFunction({}), "Object");
    ok(!baidu.isFunction(/mm/), "RegExp");
    ok(!baidu.isFunction(window), "Window");
    ok(!baidu.isFunction(document), "Document");
    ok(!baidu.isFunction(new Date()), "Date");
    ok(!baidu.isFunction(new Boolean()), "Boolean");
    ok(!baidu.isFunction(arguments), "Arguments");
    ok(!baidu.isFunction(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isFunction(document.getElementsByTagName("HEAD")[0]), "HTMLElement");

    try{
        throw new Error("haha")
    } catch(ex) {
        ok(!baidu.isFunction(ex), "Error");
    }
});


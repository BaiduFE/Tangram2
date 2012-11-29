module("baidu.isError");

test("Error", function(){
    try{
        throw new Error("haha")
    } catch(ex) {
        ok(baidu.isError(ex), "Error");
    }
});

test("非正常的 Error", function(x){
    ok(!baidu.isError(0), "Number");
    ok(!baidu.isError(""), "String");
    ok(!baidu.isError([]), "Array");
    ok(!baidu.isError({}), "Object");
    ok(!baidu.isError(/mm/), "RegExp");
    ok(!baidu.isError(window), "Window");
    ok(!baidu.isError(document), "Document");
    ok(!baidu.isError(new Date()), "Date");
    ok(!baidu.isError(new Boolean()), "Boolean");
    ok(!baidu.isError(arguments), "Arguments");
    ok(!baidu.isError(function(xx){}), "Function");
    ok(!baidu.isError(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isError(document.getElementsByTagName("HEAD")[0]), "HTMLElement");
});


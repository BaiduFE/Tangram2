module("baidu.isWindow");

test("Window", function(){
    ok(baidu.isWindow(window), "Window");
});

test("非正常的 Window", function(x){
    ok(!baidu.isWindow(""), "String");
    ok(!baidu.isWindow(0), "Number");
    ok(!baidu.isWindow([]), "Array");
    ok(!baidu.isWindow({}), "Object");
    ok(!baidu.isWindow(/mm/), "RegExp");
    ok(!baidu.isWindow(document), "Document");
    ok(!baidu.isWindow(new Date()), "Date");
    ok(!baidu.isWindow(new Boolean()), "Boolean");
    ok(!baidu.isWindow(new String("")), "String");
    ok(!baidu.isWindow(arguments), "Arguments");
    ok(!baidu.isWindow(function(xx){}), "Function");
    ok(!baidu.isWindow(new Function("")), "Function");
    ok(!baidu.isWindow(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isWindow(document.getElementsByTagName("HEAD")[0]), "HTMLElement");

    try{
        throw new Error("haha")
    } catch(ex) {
        ok(!baidu.isWindow(ex), "Error");
    }
});


module("baidu.isEnumerable");

test("Enumerable", function(x){
    stop();
    ua.importsrc("baidu.dom", function(){
        ok(baidu.isEnumerable(baidu.dom()), "TangramDOM");
        start();
    })


    ok(baidu.isEnumerable(arguments), "Arguments");
    ok(baidu.isEnumerable(new Array()), "Array");
    ok(baidu.isEnumerable(document.getElementsByTagName("*")), "NodeList");
    // ok(!baidu.isEnumerable(window), "window");
    // ok(!baidu.isEnumerable(document), "document");

    if (window.ArrayBuffer) {
        ok(baidu.isEnumerable(new ArrayBuffer()), "ArrayBuffer");
    }
});

test("非正常的 Enumerable", function(x){
    ok(!baidu.isEnumerable(""), "String");
    ok(!baidu.isEnumerable(0), "Number");
    ok(!baidu.isEnumerable({}), "Object");
    ok(!baidu.isEnumerable(/mm/), "RegExp");
    ok(!baidu.isEnumerable(new Boolean()), "Boolean");
    ok(!baidu.isEnumerable(function(xx){}), "Function");
    ok(!baidu.isEnumerable(document.getElementsByTagName("HEAD")[0]), "HTMLElement");
});


module("baidu.isRegExp");

test("RegExp", function(){
    ok(baidu.isRegExp(/mm/), "RegExp");
    ok(baidu.isRegExp(new RegExp("mm")), "RegExp");
});

test("非正常的 RegExp", function(x){
    ok(!baidu.isRegExp(0), "Number");
    ok(!baidu.isRegExp(""), "String");
    ok(!baidu.isRegExp([]), "Array");
    ok(!baidu.isRegExp({}), "Object");
    ok(!baidu.isRegExp(window), "Window");
    ok(!baidu.isRegExp(document), "Document");
    ok(!baidu.isRegExp(new Date()), "Date");
    ok(!baidu.isRegExp(new Boolean()), "Boolean");
    ok(!baidu.isRegExp(arguments), "Arguments");
    ok(!baidu.isRegExp(function(xx){}), "Function");
    ok(!baidu.isRegExp(new Function("")), "Function");
    ok(!baidu.isRegExp(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isRegExp(document.getElementsByTagName("HEAD")[0]), "HTMLElement");

    try{
        throw new Error("haha")
    } catch(ex) {
        ok(!baidu.isRegExp(ex), "Error");
    }
});


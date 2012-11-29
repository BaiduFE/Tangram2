module("baidu.isNumber");

test("Number", function(){
    ok(baidu.isNumber(0), "Number");
    ok(!baidu.isNumber(NaN), "NaN is not Number");
    ok(!baidu.isNumber(Number.POSITIVE_INFINITY), "无穷");
});

test("非正常的 Number", function(x){
    ok(!baidu.isNumber(""), "String");
    ok(!baidu.isNumber([]), "Array");
    ok(!baidu.isNumber({}), "Object");
    ok(!baidu.isNumber(/mm/), "RegExp");
    ok(!baidu.isNumber(window), "Window");
    ok(!baidu.isNumber(document), "Document");
    ok(!baidu.isNumber(new Date()), "Date");
    ok(!baidu.isNumber(new Boolean()), "Boolean");
    ok(!baidu.isNumber(arguments), "Arguments");
    ok(!baidu.isNumber(function(xx){}), "Function");
    ok(!baidu.isNumber(new Function("")), "Function");
    ok(!baidu.isNumber(document.getElementsByTagName("*")), "NodeList");
    ok(!baidu.isNumber(document.getElementsByTagName("HEAD")[0]), "HTMLElement");

    try{
        throw new Error("haha")
    } catch(ex) {
        ok(!baidu.isNumber(ex), "Error");
    }
});


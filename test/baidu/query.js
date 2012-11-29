module("baidu.query");

//baidu.query( selector[, context[, results]] )
var div = document.createElement("DIV");
div.innerHTML = [
     "<div id='divId' class='divClass' style='display:none'>"
    ,   "<ul id='ulId' class='ulClass'>"
    ,       "<li class='a' id='li1'>ul.li1</li>"
    ,       "<li class='a b' id='li2'>ul.li2</li>"
    ,       "<li class='a b c' id='li3'>ul.li3</li>"
    ,   "</ul>"
    ,   "<ol id='olId' class='olClass'>"
    ,       "<li class='a' id='li1'>ul.li1</li>"
    ,       "<li class='a b' id='li2'>ul.li2</li>"
    ,       "<li class='a b c' id='li3'>ul.li3</li>"
    ,   "</ol>"
    ,"</div>"
].join("");

if (document.body) {
    document.body.appendChild(div.firstChild.cloneNode(true))

} else {
    document.write(div.innerHTML);
}

test("第一个参数为 # tag .class * 及这四种的组合，后二个参数为空", function(){
    ok(baidu.query("ul").length == 1, "按 TagName 取对象");
    ok(baidu.query("#ulId").length == 1, "按 ID 取对象");
    ok(baidu.query(".olClass").length == 1, "按 className 取对象");
    ok(baidu.query("*", div).length == 9, "按 * 取对象");

    ok(baidu.query("ol li").length == 3, "TagName + TagName");
    ok(baidu.query("div .olClass").length == 1, "TagName + className");
    ok(baidu.query("ul #li1").length == 1, "TagName + ID");

    ok(baidu.query("ul li, ol li").length == 6, "TagName+TagName, TagName+TagName");
    ok(baidu.query("ul #li1, ol #li1").length == 2, "TagName+ID, TagName+ID");
    ok(baidu.query("ul li, ol .b").length == 5, "复杂组合");
});

test("验证后二个参数：指定选择域 和 指定返回的数组", function(){
    ok(baidu.query("ol .b", div).length == 2, "按TagName取对象，加第二个参数：选择的作用域");

    var array = [1,2,3];
    baidu.query("ol li", div, array);
    ok(array.length == 6, "第三个参数：将返回结果注入到第三个参数指定的数组中");
});

test("异常情况的检测", function(){
    ok(baidu.query("#li1").length == 1, "ID有重复时应该都返回");
    ok(baidu.query("#li1", div).length == 2, "ID有重复时应该都返回");
});
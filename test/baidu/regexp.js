module("baidu.regexp");

//baidu.regexp( reg[, modal] )

test("传入 regString 返回统一的正则表达式对象", function(){
    var str = "[^\\x00-\\xff]";
    var reg = baidu.regexp(str);

    ok(baidu.regexp(str) === reg, "重复使用同一个正则表达式对象");
    ok(baidu.regexp(str, "m") !== reg, "不同的匹配模式 m，对应的正则表达式对象不同");
    ok(baidu.regexp(str, "g") !== reg, "不同的匹配模式 g，对应的正则表达式对象不同");
    ok(baidu.regexp(str, "i") !== reg, "不同的匹配模式 i，对应的正则表达式对象不同");
});

test("直接传入正则表达式对象", function(){
    var str = "[^\\x00-\\xff]";
    var reg = baidu.regexp(str);

    ok(baidu.regexp(/[^\x00-\xff]/) === reg, "直接传入正则表达式对象");
    ok(baidu.regexp(/[^\x00-\xff]/g) !== reg, "直接传入正则表达式对象");
});

module("baidu.createSingle");

//baidu.createSingle(methods[, type])

test("创建单实例", function(){
    var b = baidu.createSingle({});
    var c = baidu.createSingle({method: function(){}}, "single");

    equal(b.toString(), "[object Object]", "创建单实例，缺省type");
    equal(c.toString(), "[object single]", "创建单实例，不缺省type");
    equal(typeof c.method, "function", "创建单实例，扩展方法");
});

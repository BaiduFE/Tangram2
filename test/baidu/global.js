module("baidu.global");

test("读取", function(){
    var obj = baidu.global("mm");
    equals(typeof obj, 'object', '从未赋过值的 key 读取的时候创建 {} 并返回');

    obj.name = "baidu";
    var obj2 = baidu.global("mm");
    ok(obj2.name == "baidu", "每次读取的对象是同一个对象");
});

test("赋值", function(){
    var json = {name: "baidu"};
    baidu.global("key", json);
    var obj = baidu.global("key");
    ok(obj.name == "baidu", "从未赋过值的 key 赋值成功");

    var json2 = {name: "tangram"};
    baidu.global("key", json2);
    ok(baidu.global("key").name == "baidu", "赋值时，默认不覆盖");

    baidu.global("key", json2, true);
    ok(baidu.global("key").name == "tangram", "赋值时，指定第三个参数为 true 时可覆盖原数据");
});
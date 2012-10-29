module("baidu.id");

test("参数为空或不合法时直接返回 id", function(){
    var reg = /^[a-zA-Z_]+\d+$/;
    ok(reg.test(baidu.id()), "参数为空 返回 id");
    ok(reg.test(baidu.id(123)), "参数不合法 返回 id");
    ok(baidu.id() != baidu.id(), "多次运行时返回不同的 id ");
});

test("第一个参数为对象", function(){
    var reg = /^[a-zA-Z_]+\d+$/;
    var obj = [1,2,3];
    var dom = document.body;
    var key = baidu.id.key;
    var maps = window[ baidu.guid ]._._maps_id;

    var id = baidu.id(obj);

    ok(reg.test(id), "没有第二个参数时，给obj的key赋值(id)，并且返回这个id");
    ok(reg.test(obj[key]), "对象指定 key 赋值（id）");
    ok(reg.test(baidu.id(obj, "get")), "通过第二个参数'get'来取id");
    ok(id  == obj[ key ], "对象指定的 key 是否已经赋值");
    ok(obj == maps[ id ], "是否已经将对象存在全局映射中？");

    baidu.id(obj, "get");
    ok(baidu.id(obj, "get") == id, "get: 通过 get 模式取 id，此时对象的 id 不会变化");
    ok(baidu.id(obj, "remove") == id,  "remove: 通过 remove 删除时，返回 id");
    ok(typeof obj[key] == "undefined", "remove: 清除对象的 key");
    ok(typeof maps[id] == "undefined", "remove: 解除全局映射 maps 时原映射");

    var str = "mm";
    ok(baidu.id(obj, "mm") == str, "set: 第二个参数为非指定字符时用户指定id执行");
    ok(obj[key] == str, "对象指定 key 赋值（id）");
    ok(maps[str] == obj, "全局对象映射maps");
    ok(baidu.id(obj, "delete") == str, "delete: 通过 delete 删除时，返回 id");
    ok(typeof obj[key] == "undefined", "delete: 清除对象的 key");
    ok(typeof maps[str]== "undefined", "delete: 解除全局映射 maps 时原映射");
});

test("第一个参数为字符串", function(){
    var reg = /^[a-zA-Z_]+\d+$/;
    var obj = [1,2,3];
    var dom = document.body;
    var key = baidu.id.key;
    var maps = window[ baidu.guid ]._._maps_id;

    var id = baidu.id(obj);
    ok(baidu.id(id) == obj, "没有第二个参数时，通过 id 取对象");
    ok(baidu.id(id, "get") == obj, "get: 通过 id 取对象");
    ok(id  == obj[ key ], "对象指定的 key 是否已经赋值");
    ok(obj == maps[ id ], "是否已经将对象存在全局映射中？");
    ok(baidu.id(id, "remove") == id,  "remove: 通过 remove 删除时，返回 id");
    ok(typeof obj[key] == "undefined", "remove: 清除对象的 key");
    ok(typeof maps[id] == "undefined", "remove: 解除全局映射 maps 时原映射");

    var str = "mm";
    var id = baidu.id(obj);
    ok(baidu.id(id, "mm") == str, "set: 第二个参数为非指定字符时用户指定id执行");
    ok(obj[key] == str, "对象指定 key 赋值（id）");
    ok(maps[str] == obj, "全局对象映射maps");
    ok(baidu.id(str, "delete") == str, "delete: 通过 delete 删除时，返回 id");
    ok(typeof obj[key] == "undefined", "delete: 清除对象的 key");
    ok(typeof maps[str]== "undefined", "delete: 解除全局映射 maps 时原映射");
});
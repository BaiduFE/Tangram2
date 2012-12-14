

module("baidu.dom.removeData");


test("第一个参数为 String ", function () {

    stop();
    ua.importsrc("baidu.dom.data", function(){

        var guid = baidu.id.key
            , $dom = baidu.dom(document.body)
            , maps = baidu.global("_maps_HTMLElementData");

        $dom.data("key", "value");
        equal($dom.data("key"), maps[document.body[guid]].key, "赋值");

        $dom.removeData("key");
        equal($dom.data("key"), undefined, "removeData");

        equal(maps[document.body[guid]].key, undefined, "removeData");

    start();
    }, "baidu.dom.data", "baidu.dom.removeData");

});

test('第一个参数为array', function(){
    ok(false, 'baidu.dom.data是否支持第一参数是array? removeData接口支持删除第一参数是array')
});


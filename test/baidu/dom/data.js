
module("baidu.dom.data");


test("第一个参数为 String ", function () {
    var guid = baidu.id.key
        , $dom = baidu.dom(document.body)
        , maps = window[ baidu.guid ]._maps_HTMLElementData;


    equal( $dom[0][guid], undefined, "DOM对象未赋GUID" );
    equal( $dom.data()[0][guid], document.body[guid], "DOM对象 赋GUID" );
    equal( $dom.data("key"), undefined, "第一个参数为String，但未赋值" );
    $dom.data("key", "value");
    equal( $dom.data("key"), "value", "第一个参数为String，赋值后" );
    $dom.data("key", {a:"aa",b:"bb"});
    equal( $dom.data("key").a, "aa", "第一个参数为String，赋给一个对象" );
    $dom.data("key", "value");
    equal( $dom.data("key"), "value", "第一个参数为String，覆盖赋值后" );

});

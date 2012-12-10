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

//兼容JQ
test("获取自定义属性", function () {
    var div1 = document.createElement('div');
    div1.id = 'test-data1';
    div1.setAttribute('data-rayi','{"jiyou":"wangxiao","dashu":"jihu"}');
    document.body.appendChild(div1);
    equal( baidu.dom('#test-data1').data("rayi").dashu,"jihu", "取得data-开头的自定义Object" );    

    var div2 = document.createElement('div');
    div2.id = 'test-data2';
    div2.setAttribute('data-rayi','jiyou');
    document.body.appendChild(div2);
    equal( baidu.dom('#test-data2').data("rayi"), "jiyou", "取得data-开头的自定义属性" );    
});
module("baidu.plugin._util_.fx");

test("cssUnit", function(){
    var cssUnit = baidu.plugin._util_.fx.cssUnit;

    equal(cssUnit("opacity"), "", "ok");
    equal(cssUnit("zIndex"), "", "ok");
    equal(cssUnit("width"), "px", "ok");
});

test("getAllData", function(){
    var getAllData = baidu.plugin._util_.fx.getAllData;

    var div = baidu('<div></div>');

    div.data('key1', '123');
    div.data('key2', '123');
    div.data('key3', '123');

    var all = getAllData(div[0]);

    ok("key1" in all, "ok");
    ok("key2" in all, "ok");
    ok("key3" in all, "ok");

    equal(all.key1, "123", "ok");
});

test("propExpand", function(){
    var propExpand = baidu.plugin._util_.fx.propExpand;

    var values = propExpand("padding", "1px");
    equal(values.paddingTop, "1px", "ok");
    equal(values.paddingRight, "1px", "ok");
    equal(values.paddingBottom, "1px", "ok");
    equal(values.paddingLeft, "1px", "ok");

    values = propExpand("padding", "1px 2px 3px 4px");
    equal(values.paddingTop, "1px", "ok");
    equal(values.paddingRight, "2px", "ok");
    equal(values.paddingBottom, "3px", "ok");
    equal(values.paddingLeft, "4px", "ok");

    values = propExpand("width", "1px");

    equal(values, null, "ok");
});
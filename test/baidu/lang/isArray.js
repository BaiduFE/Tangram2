module("baidu.lang.isArray");

test("老接口：Array对象", function(){
	equals(baidu.lang.isArray([]), true, 'baidu.lang.isArray([]) is true');
});

test("老接口：Object参数", function(){
	equals(baidu.lang.isArray({}), false, 'baidu.lang.isArray({}) is false'); // {} is object
});

test("老接口：Function类型", function(){
	equals(baidu.lang.isArray(new Function()), false, 'baidu.lang.isArray(new Function()) is false');
});

test("老接口：Element对象", function(){
	equals(baidu.lang.isArray(document.getElementById("erikElement")), false, 'baidu.lang.isArray(document.getElementById("erikElement")) is false');
});

test("老接口：string类型", function(){
	equals(baidu.lang.isArray("test"), false, 'baidu.lang.isArray("test") is false');
});

test("老接口：number类型'", function(){
	equals(baidu.lang.isArray(1), false, 'baidu.lang.isArray(1) is false');
});

test("老接口：boolean类型", function(){
	equals(baidu.lang.isArray(true), false, 'baidu.lang.isArray(true) is false');
});

test("老接口：null参数", function(){
	equals(baidu.lang.isArray(null), false, 'baidu.lang.isArray(null) is false');
});

test("老接口：undefined参数", function(){
	equals(baidu.lang.isArray(void(0)), false, 'baidu.lang.isArray(void(0)) is false');
});

//describe('baidu.lang.isArray测试',{
//    'Array对象': function () {
//        value_of(baidu.lang.isArray([])).should_be_true();
//    },
//
//    'Object参数': function () {
//        value_of(baidu.lang.isArray({})).should_be_false();
//    },
//
//    'Function类型': function () {
//        value_of(baidu.lang.isArray(new Function())).should_be_false();
//    },
//
//    'Element对象': function () {
//        value_of(baidu.lang.isArray(document.getElementById('erikElement'))).should_be_false();
//    },
//
//    'string类型': function () {
//        value_of(baidu.lang.isArray("test")).should_be_false();
//    },
//
//    'number类型': function () {
//        value_of(baidu.lang.isArray(1)).should_be_false();
//    },
//
//    'boolean类型': function () {
//        value_of(baidu.lang.isArray(true)).should_be_false();
//    },
//
//    'null参数': function () {
//        value_of(baidu.lang.isArray(null)).should_be_false();
//    },
//
//    'undefined参数': function () {
//        value_of(baidu.lang.isArray(void(0))).should_be_false();
//    }
//});

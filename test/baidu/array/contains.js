module("baidu.array.contains");

//新接口
test("基础校验", function(){
    var source = [1,2,3];
    equals(baidu.array(source).contains(1), true, "基础校验");
    equals(baidu.array(source).contains(4), false, "基础校验");
});

//老接口
test("基础校验", function(){
    var source = [1,2,3];
    equals(baidu.array(source).contains(1), true, "基础校验");
    equals(baidu.array(source).contains(4), false, "基础校验");
});

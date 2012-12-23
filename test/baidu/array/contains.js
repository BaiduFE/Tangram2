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

//baidu.array.concat
test("连接数组", function(){
    var source = [1,2,3];
    equal(baidu.array(source).concat([4,5])[3], 4, "连接数组");
});

//baidu.array.slice
test("截断数组", function(){
    var source = ['a1','a2','a3','a4','a5'];
    equals(baidu.array(source).slice(1,3)[1], 'a3', "截断数组");
});

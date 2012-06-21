module("baidu.array.empty");


//新接口
test("基础校验", function(){
    var source = [1,2,3];
    baidu.array(source).empty();
    equals(source[0], undefined,  "基础校验");
});

//老接口
test("基础校验", function(){
    var source = [1,2,3];
    baidu.array.empty(source);
    equals(source[0], undefined,  "基础校验");
});

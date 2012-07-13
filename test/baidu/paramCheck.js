module("baidu.paramCheck");

test("参数为空或不合法时直接返回 id", function(){
    baidu.paramCheck("undefined");
});


module("baidu.base.register");

//baidu.base.register(Class, constructorHook[, methods])

test("插件机制", function(){
    stop();
    ua.importsrc("baidu.createClass", function(){

        var Class = baidu.createClass()

        baidu.base.register(Class,
            function(a){
                this.name = "mm";
                this.arg = a;
            }, {
                method: function(){}
            }
        );

        var c = new Class("xx");

        equal(c.name, "mm", "插件植入构造器");
        equal(c.arg, "xx", "插件方法接收参数");
        equal(typeof c.method, "function", "插件扩展方法");

        start();
    })
});

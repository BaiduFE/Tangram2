module("baidu.base.inherits");

//baidu.base.inherits(subClass, superClass[, type])

test("类的继承", function(){
    stop();
    ua.importsrc("baidu.base.Class", function(){

        var Class = function(){
            this.name = "mm";
        }

        baidu.base.inherits(Class, baidu.base.Class, "Class").extend({
            method: function(){}
        });

        var c = new Class();

        equal(c.name, "mm", "类");
        equal(typeof c.dispose, "function", "继承父类成功");
        equal(c.toString(), "[object Class]", "指定类名成功");
        equal(typeof c.method, "function", "扩展方法");

        start();
    })
});

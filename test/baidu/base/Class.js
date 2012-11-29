module("baidu.base.Class");

//new baidu.base.Class()

test("基类 调用与声明", function(){
    var Class = function(){
        baidu.base.Class.call(this);
        this.name = "mm";
    }
    var b = new Class()

    var a = new baidu.base.Class();
    a.show = function(){
        if (this.fire("onshow")) {
            this.showed = true;
        }
    };
});

module("baidu.createClass");

//baidu.createClass(constructor[, type][, options])

test("创建新类", function(){
    var Class1 = baidu.createClass(function(){this.name="mm"}, "className");

    // constructor 缺省这个设计暂时不开放 20121129mz
    //equal(typeof baidu.createClass().register, "function", "什么参数都缺省");
    equal(typeof Class1, "function", "创建类");
    equal(new Class1().name, "mm", "创建新类实例化成功");
    ok(new Class1().guid, "新类实例化.guid正常");
});

test("创建新类，扩展的方法检测", function(){
    var Class = baidu.createClass(function(){this.name="mm"});

    Class.inherits(function(){this.check="mm"});
    Class.extend({method: function(){}})

    equal(new Class().check, "mm", "检测Class.inherits()");
    equal(typeof (new Class()).method, "function", "检测Class.extend()扩展原型链方法");
});

test("创建新类，插件扩展模式检测", function(){
    var Class = baidu.createClass(function(){this.name="mm"});

    Class.register(function(arg){this.plugin="mm";this.arg=arg;}, {method2: function(){}});
    var me = new Class("argu");

    equal(me.plugin, "mm", "插件植入到构造器");
    equal(me.arg, "argu", "插件模块接收参数");
    equal(typeof me.method2, "function", "插件植入方法");
});

test("创建新类，检测 type 参数", function(){
    var Class1 = baidu.createClass(function(){this.name="mm"}, "className");
    var Class2 = baidu.createClass(function(){this.name="mm"});
    var Class3 = baidu.createClass(function(){this.name="mm"}, {type:"className"});

    equal(new Class1().toString(), "[object className]", "(constructor, type)");
    equal(new Class2().toString(), "[object Object]", "(constructor)");
    equal(new Class3().toString(), "[object className]", "(constructor, options)");
});

test("创建新类，检测 options 参数", function(){
    var Class1 = baidu.createClass(function(){this.name="mm"}, "className", {type:"mm"});
    var Class2 = baidu.createClass(function(){this.name="mm"}, {type:"className"});

    equal(new Class1().toString(), "[object className]", "(constructor, type, options)");
    equal(new Class2().toString(), "[object className]", "(constructor, options)");
    ok(new Class2().guid, "options.superClass则默认继承于baidu.base.Class");
});

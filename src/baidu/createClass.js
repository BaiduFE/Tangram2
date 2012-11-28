///import baidu.extend;
///import baidu.base.Class;

/**
 * @description 创建一个类，包括创造类的构造器、继承基类Class
 * @author meizz
 * @modify 2012.11.05 meizz
 * @name baidu.createClass
 * @function
 * @grammar baidu.createClass(constructor[, options])
 * @remark
            使用createClass能方便的创建一个带有继承关系的类。同时会为返回的类对象添加extend方法，使用obj.extend({});可以方便的扩展原型链上的方法和属性
 *             
 * @param {Function} constructor 类的构造器函数
 * @param {String}   type        [可选]类的名字
 * @param {Object}   options     [可选]配置{superClass: 父类, type:className: 类名, decontrolled: 不受控}
 * @return {Function}            类的最终构造器
 */
baidu.createClass = /**@function*/function(constructor, type, options) {
    options = options || {};

    // 创建新类的真构造器函数
    var fn = function(){
        var me = this;

        // 20101030 某类在添加该属性控制时，guid将不在全局instances里控制
        options.decontrolled && (me._decontrol_ = true);

        // 继承父类的构造器
        fn.superClass.apply(me, arguments);

        // 全局配置
        for (var i in fn.options) me[i] = fn.options[i];

        constructor.apply(me, arguments);

        for (var i=0, reg=fn._reg_; reg && i<reg.length; i++) {
            reg[i].apply(me, arguments);
        }
    };

    baidu.extend(fn, {
        superClass: options.superClass || baidu.base.Class

        ,inherits: function(superClass){
            if (typeof superClass != "function") return fn;

            var C = function(){};
            C.prototype = (fn.superClass = superClass).prototype;

            // 继承父类的原型（prototype)链
            var fp = fn.prototype = new C();
            // 继承传参进来的构造器的 prototype 不会丢
            baidu.extend(fn.prototype, constructor.prototype);
            // 修正这种继承方式带来的 constructor 混乱的问题
            fp.constructor = constructor;

            return fn;
        }
        ,register: function(hook, methods) {
            (fn._reg_ || (fn._reg_ = [])).push( hook );
            methods && baidu.extend(fn.prototype, methods);
            return fn;
        }
        ,extend: function(json){baidu.extend(fn, json); return fn;}
    });

    type = type || options.className || options.type;
    typeof type == "string" && (constructor.prototype._type_ = type);
    typeof fn.superClass == "function" && fn.inherits(fn.superClass);

    return fn;
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20121105 meizz   给类添加了几个静态属性方法：.options .superClass .inherits() .extend() .register()


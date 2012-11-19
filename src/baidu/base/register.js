///import baidu.base;

/**
 * @description 向某个类注册插件
 * author meizz, dron
 * create 2011/11/29
 * @name baidu.base.register
 * @function
 * @grammar baidu.base.register(Class, constructorHook, methods)
 * @param   {Class}     Class           接受注册的载体 类
 * @param   {Function}  constructorHook 运行在载体类构造器里钩子函数
 * @param    {Object}  methods   [可选]挂载到载体类原型链上的方法集，可选
 * @meta standard
 *             
 */
baidu.base.register = function (Class, constructorHook, methods) {
    (Class._reg_ || (Class._reg_ = [])).push( constructorHook );

    for (var method in methods) {
        Class.prototype[method] = methods[method];
    }
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20111129    meizz    添加第三个参数，可以直接挂载方法到目标类原型链上

/// include baidu;
/// include baidu.extend;

/**
 * 创建链头，用于链式语法
 * 
 * @author: meizz
 * @namespace: baidu.createChain
 * @version: 2012-05-16
 * 
 * @param   {String}    chainName   链头方法名，一般小写
 * @param   {Function}  fn          链头方法函数体
 * @param   {Function}  constructor 内部类的构造器
 * @return  {Object}                链头函数
 */
baidu.createChain = function(chainName, fn, constructor) {
    // 创建一个内部类名
    var className = "$Chain";

    // 构建链头执行方法
    var chain = baidu[chainName] = baidu[chainName] || fn || function(object) {
        return baidu.extend(object, baidu[chainName].fn);
    };

    // 扩展 .extend 静态方法，通过本方法给链头对象添加原型方法
    chain.extend = function (extended) {
        var method
            ,slice = Array.prototype.slice;

        // 直接构建静态接口方法，如 baidu.array.each() 指向到 baidu.array().each()
        for (method in extended) {
            chain[method] = function() {
                var object  = chain(arguments[0]);

                return object[method].apply(object, slice.call(arguments, 1));
            }
        }
        return baidu.extend(baidu[chainName].fn, extended);
    };
    
    // 创建 链头对象 构造器
    chain[className] = chain[className] || constructor || function() {};

    // 给 链头对象 原型链做一个短名映射
    chain.fn = chain[className].prototype;
    
    return chain;
};
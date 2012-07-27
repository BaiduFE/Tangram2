///import baidu;
///import baidu.type;
///import baidu.extend;
/*
 * @fileoverview
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * @description 创建链头对象，用于链式语法
 * @name baidu.createChain
 * @function
 * @grammer baidu.createChain(chainName[, fn[, constructor]])
 *
 * @param   {String}    chainName   链头方法名，一般小写
 * @param   {Function}  fn          链头方法函数体
 * @param   {Function}  constructor 内部类的构造器
 * @return  {Object}                链头函数
 */
baidu.createChain = function(chainName, fn, constructor) {
    // 创建一个内部类名
    var className = chainName=="dom"?"$DOM":"$"+chainName.charAt(0).toUpperCase()+chainName.substr(1);
    var slice = Array.prototype.slice;

    // 构建链头执行方法
    var chain = baidu[chainName] = baidu[chainName] || fn || function(object) {
        return baidu.extend(object, baidu[chainName].fn);
    };

    // 扩展 .extend 静态方法，通过本方法给链头对象添加原型方法
    chain.extend = function(extended) {
        var method;

        // 直接构建静态接口方法，如 baidu.array.each() 指向到 baidu.array().each()
        for (method in extended) {
            chain[method] = function() {
                var id = arguments[0];

                // 在新版接口中，ID选择器必须用 # 开头
                chainName=="dom" && baidu.type(id)=="string" && (id = "#"+ id);

                var object = chain(id);
                var result = object[method].apply(object, slice.call(arguments, 1));

                // 老版接口返回实体对象 getFirst
                return baidu.type(result) == "$DOM" ? result.get(0) : result;
            }
        }
        return baidu.extend(baidu[chainName].fn, extended);
    };

    // 创建 链头对象 构造器
    baidu[className] = baidu[className] || constructor || function() {};

    // 给 链头对象 原型链做一个短名映射
    chain.fn = baidu[className].prototype;

    return chain;
};

/**
 * @description 将系统对象上的方法重写到 自定义对象上去（为链式语法准备）
 *
 * @function
 * @grammar baidu.overwrite(Class, list, fn)
 * @param   {Object}        Class   系统对象原型
 * @param   {Array}         list    需要重写的方法名列表
 * @param   {Function}      fn      被覆盖的函数
 * @return  {Function}              自定义的类
 */
baidu.overwrite = function(Class, list, fn) {
	for (var i = list.length - 1; i > -1; i--) {
		Class.prototype[list[i]] = fn(list[i]);
	}

	return Class;
};
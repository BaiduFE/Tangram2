///import baidu.createChain;
///import baidu.type;

/*
 * @fileOverview 
 * @author linlingyu
 * @create 2013-04-10
 */
/**
 * @description 该接口可以在已有的链式中扩展接口或是新建一个目前不存在的链头并扩展接口
 * @function
 * @name baidu.plugin
 * @grammar baidu.plugin(chainName, copy[, fn[, constructor]])
 * @param {String} chainName 一个已经存在或是不存在的链头名称，将会在该链上进行接口扩展
 * @param {Object} copy 需要扩展到该链上的一组链式接口，如：{invoke: function(){}, run: function(){}}
 * @param {function} fn [可选]表示该链头执行时的处理函数，如果链头已经存在，该参数无效
 * @param {function} constructor [可选]构成该链的构造函数，链式接口都会扩展到该构造的实例对象上，如果链头已经存在，该参数无效
 * @return {Object} 链头函数
 */


baidu.plugin = function(chainName, copy, fn, constructor){
    var isCopy = baidu.isPlainObject(copy), chain;
    if(!isCopy){
        constructor = fn;
        fn = copy;
    }
    baidu.type(fn) != 'function' && (fn = undefined);
    baidu.type(constructor) != 'function' && (constructor = undefined);
    chain = baidu.createChain(chainName, fn, constructor);
    isCopy && chain.extend(copy);
    return chain;
};
///import baidu.createChain;
///import baidu.type;

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
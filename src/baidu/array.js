/// include baidu;
/// include baidu.overwrite;
/// include baidu.createChain;

/**
 * amz.array 所有与 Array 相关的操作方法都在此命名空间之下
 * 
 * @author: meizz
 * @namespace: baidu.array
 * @version: 2012-04-20
 */
baidu.createChain("array");

//*
// 对系统方法新产生的array对象注入自定义方法，支持完美的链式语法
baidu.overwrite(baidu.array.$Chain, "concat reverse slice".split(" "), function(key){
    return function(){
        return baidu.array(Array.prototype[key].apply(this, arguments));
    }
});
//*/
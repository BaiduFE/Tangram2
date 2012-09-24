/*
 * @author meizz
 * @create 2012-09-24
 */

///import baidu.regexp;
///import baidu.global;

/**
 * @description 将所有的正则表达式对象进行预编译处理，存储到全局对象中，以便重复调用
 * @function 
 * @name baidu.regexp.compile()
 * @grammar baidu.regexp.compile(regString)
 * @param {String} regString 正则表达式的文本
 * @return {RegExp} 返回一个正则表达式对象
 */

baidu.regexp.compile = function(maps){
    return function(regString, modal){
        var reg, key = regString + "$$"+ modal;
        !(reg = maps[ key ]) && (reg = maps[ key ] = new RegExp( regString, modal ));

        // 注意：加了这句代码之后，会对 g 模式的 lastIndex 赋值的情况产生影响
        reg.lastIndex > 0 && ( reg.lastIndex = 0 );
        return reg;
    }
}(baidu.global("_maps_RegExp"));
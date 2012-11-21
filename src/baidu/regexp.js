///import baidu.type;
///import baidu.global;

/*
 * @author meizz
 * @create 2012-11-09
 */

/**
 * @description 将所有的正则表达式对象进行预编译处理，存储到全局对象中，以便重复调用
 * @function 
 * @name baidu.regexp
 * @grammar baidu.regexp(reg[, modal])
 * @param {String} reg 正则表达式的文本
 * @param {String} modal 正则表匹配模式(mgi)
 * @return {RegExp} 返回一个正则表达式对象
 */
/**
 * @description 将所有的正则表达式对象进行预编译处理，存储到全局对象中，以便重复调用
 * @function 
 * @name baidu.regexp
 * @grammar baidu.regexp(reg)
 * @param {RegExp} reg 正则表达式对象
 * @return {RegExp} 返回一个正则表达式对象
 */
baidu.regexp = baidu.regexp || function(maps){
    var modalReg = /[^mig]/;

    return function(reg, modal){
        var key, result;

        if ( baidu.isString(reg) ) {
        
            modalReg.test(modal) && (modal = "");
            key = reg + "$$" + (modal || "");
            (result = maps[ key ]) || (result = maps[ key ] = new RegExp( reg, modal ));
        
        } else if ( baidu.isRegExp(reg) ) {
        
            modal = (reg.global ? "g" : "") + (reg.ignoreCase ? "i" : "") + (reg.multiline ? "m" : "");
            key = reg.source + "$$" + modal;
            result = maps[key] || (maps[key] = reg);
        }

        // 注意：加了这句代码之后，会对 g 模式的 lastIndex 赋值的情况产生影响
        (result || (result = reg)) && reg.lastIndex > 0 && ( reg.lastIndex = 0 );
        return result;
    }
}( baidu.global("_maps_RegExp") );
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * author: berg
 */

///import baidu.fn;

/**
 * @description 对函数进行集化，使其在第一个参数为array时，结果也返回一个数组
 * @function 
 * @name baidu.fn().multize()
 * @grammar baidu.fn(func).multize([recursive[, joinArray]])
 * @param {Boolean} recursive 是否递归包装（如果数组里面一项仍然是数组，递归）
 * @param {Boolean} joinArray 可选，将操作的结果展平后返回（如果返回的结果是数组，则将多个数组合成一个）
 * @return {function} 返回已集化的函数
 */
baidu.fn.extend({
    multize: function(recursive, joinArray){
        var func = this.fn;
        function newFunc(){
            var list = arguments[0],
                fn = recursive ? newFunc : func,
                ret = [],
                moreArgs = Array.prototype.slice.call(arguments, 0),
                result;
            
            if(list instanceof Array){
                for(var i = 0, item; item = list[i]; i++){
                    moreArgs[0] = item;
                    result = fn.apply(this, moreArgs);
                    if(joinArray){
                        //TODO: 需要去重吗？
                        result && (ret = ret.concat(result));
                    }else{
                        ret.push(result);
                    }
                }
                return ret;
            }else{
                return func.apply(this, arguments);
            }
        }
        return newFunc;
    }
});
/// Tangram 1.x Code Start
/**
 * @description 对函数进行集化，使其在第一个参数为array时，结果也返回一个数组
 * @function 
 * @name baidu.fn.multize
 * @function
 * @grammar baidu.fn.multize(func[, recursive])
 * @param {Function}    func        需要包装的函数
 * @param {Boolean}     [recursive] 是否递归包装（如果数组里面一项仍然是数组，递归），可选
 * @param {Boolean}     [joinArray] 将操作的结果展平后返回（如果返回的结果是数组，则将多个数组合成一个），可选
 * @version 1.3
 *
 * @return {Function} 已集化的函数
 */
baidu.fn.multize = function (func, recursive, joinArray) {
    return baidu.fn(func).multize(recursive, joinArray);
};
/// Tangram 1.x Code End

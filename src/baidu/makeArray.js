/**
 * @author linlingyu
 */

///import baidu.merge;
///import baidu.type;
/**
 * @description 转换一个类似数组的对象成为真正的JavaScript数组
 * @function 
 * @name baidu.makeArray
 * @grammar baidu.makeArray(obj)
 * @param {Object} obj 转换成一个原生数组的任何对象
 * @return {Array} 一个转换后的数组
 */
baidu.makeArray = function(array, results){
    var ret = results || [];
    if(!array){return ret;}
    array.length == null || ~'string|function|regexp'.indexOf(baidu.type(array)) ?
        [].push.call(ret, array) : baidu.merge(ret, array);
    return ret;
};
///import baidu;

/**
 * @fileoverview
 * @name baidu.unique
 * @author meizz
 * @create 2012-06-10
 * @modify 
 */

/**
 * 去除数组中的重复项，可以传入去重函数
 *
 * @param {Function} fn 查询条件函数
 * @return {Array} 被去重后的数组
 */
baidu.unique = function(array, fn) {

    var len = array.length,
        result = Array.prototype.slice.call(array, 0),
        i, datum;
        
    if ('function' != typeof fn) {
        fn = function (item1, item2) {
            return item1 === item2;
        };
    }
    
    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
            if (fn(datum, result[i])) {
                result.splice(len, 1);
                break;
            }
        }
    }

    return result;
};

///import baidu.array;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-21
 * @modify
 */
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 查询数组中指定元素的索引位置
 *
 * @name baidu.array.indexOf
 * @function
 * @grammar $Aarray.indexOf(match[, fromIndex])
 * @param   {Object}      match     匹配项
 * @param   {Number}      fromIndex 起始位置
 * @return  {Number}      被匹配项的下标
 */
baidu.array.extend({
    indexOf : function (match, fromIndex) {
        baidu.paramCheck(".+(,number)?","baidu.array.indexOf");
        var len = this.length;

        // 小于 0
        (fromIndex = fromIndex | 0) < 0 && (fromIndex = Math.max(0, len + fromIndex));

        for ( ; fromIndex < len; fromIndex++) {
            if(fromIndex in this && this[fromIndex] === match) {
                return fromIndex;
            }
        }
        
        return -1;
    }
});
///import baidu.array;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 从后往前，查询数组中指定元素的索引位置
 *
 * @name baidu.array.lastIndexOf
 * @function
 * @grammar $Aarray.lastIndexOf(match[, fromIndex])
 * @param   {Object}      match     匹配项
 * @param   {Number}      fromIndex 起始位置
 * @return  {Number}      被匹配项的下标
 */
baidu.array.extend({
    lastIndexOf : function (match, fromIndex) {
        baidu.paramCheck(".+(,number)?", "baidu.array.lastIndexOf");
        var len = this.length;

        (!(fromIndex = fromIndex | 0) || fromIndex >= len) && (fromIndex = len - 1);
        fromIndex < 0 && (fromIndex += len);

        for(; fromIndex >= 0; fromIndex --){
            if(fromIndex in this && this[fromIndex] === match){
                return fromIndex;
            }
        }
        
        return -1;
    }
});

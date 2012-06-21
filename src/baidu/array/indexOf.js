///import baidu.array;

/**
 * @fileoverview
 * @name baidu.array.indexOf
 * @author meizz
 * @create 2012-06-21
 * @modify
 */


/**
 * 查询数组中指定元素的索引位置
 * @param   {Object}    match
 * @param   {Number}    [fromIndex] 查询的起始位索引位置，如果为负数，则从source.length+fromIndex往后开始查找
 * @returns {Number}                指定元素的索引位置，查询不到时返回-1
 */
baidu.array.extend({
    indexOf : function (match, fromIndex) {
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
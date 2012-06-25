///import baidu.array;

/**
 * @fileoverview
 * @name baidu.array.lastIndexOf
 * @author meizz
 * @create 2012-06-21
 * @modify
 */

/**
 * 从后往前，查询数组中指定元素的索引位置
 */
baidu.array.extend({
    lastIndexOf : function (match, fromIndex) {
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

// TOCHECK
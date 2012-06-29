///import baidu.type;
///import baidu.array;

/**
 * @fileoverview
 * @name baidu.array.find
 * @author meizz
 * @create 2012-06-21
 * @modify
 */

/**
 * 从数组中寻找符合条件的第一个元素
 * 
 * @param   {Object}        item    被包含项
 * @return  {Any}
 */
baidu.array.extend({
    find : function (iterator) {
        var i, item, n=this.length;

        if (baidu.type(iterator) == "function") {
            for (i=0; i<n; i++) {
                item = this[i];
                if (iterator.call(this, item, i, this) === true) {
                    return item;
                }
            }
        }

        return null;
    }
});

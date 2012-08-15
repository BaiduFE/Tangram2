///import baidu.array;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 删除数组项
 *
 * @name baidu.array.remove
 * @function
 * @grammar $Array.remove(item)
 * @param   {Object}        match   数组匹配项
 * @return  {Array}                 操作后的数组
 */
baidu.array.extend({
    remove : function (match) {
        var n = this.length;
            
        while (n--) {
            if (this[n] === match) {
                this.splice(n, 1);
            }
        }
        return this;
    }
});

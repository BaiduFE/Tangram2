///import baidu.array.indexOf;

/**
 * @fileoverview
 * @name baidu.array.contains
 * @author meizz
 * @create 2012-06-21
 * @modify
 */

/**
 * 数组包含某项
 * 
 * @param   {Object}        item    被包含项
 * @return  {Boolean}
 */
baidu.array.extend({
    contains : function (item) {
        return this.indexOf(item) > -1;
    }
});

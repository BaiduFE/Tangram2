///import baidu.array.indexOf;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 数组包含某项
 *
 * @name baidu.array.contains
 * @function
 * @grammar $Array.contains( item )
 * @param   {Object}      item  被包含项
 * @return  {Boolean}           是否包含
 */
baidu.array.extend({
    contains : function (item) {
        return this.indexOf(item) > -1;
    }
});

///import baidu.array;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 删除数组指定的项
 *
 * @name baidu.array.removeAt
 * @function
 * @grammar $Array.removeAt(index)
 * @param   {Number}        index   指定项的索引位置
 * @return  {Boolean}               被删除的项
 */
baidu.array.extend({
    removeAt : function (index) {
        baidu.paramCheck("number", "baidu.array.removeAt");
        return this.splice(index, 1)[0];
    }
});
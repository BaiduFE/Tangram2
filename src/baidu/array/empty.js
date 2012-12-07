///import baidu.array;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 清空数组
 *
 * @name baidu.array.empty
 * @function
 * @grammar $Array.empty()
 * @return  {Array}             空数组
 */

/**
 * @description 清空数组
 *
 * @name baidu.array().empty()
 * @function
 * @grammar $Array.empty()
 * @return  {Array}             空数组
 */

baidu.array.extend({
    empty : function () {
        this.length = 0;
        return this;
    }
});
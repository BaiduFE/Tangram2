///import baidu.type;
///import baidu.array;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 从数组中寻找符合条件的第一个元素
 *
 * @name baidu.array.find
 * @function
 * @grammar $Array.find([fn])
 * @param   {Function}      iterator    用于做对比的函数
 * @return  {Object}                    匹配的项
 */
/**
 * @description 从数组中寻找符合条件的第一个元素
 *
 * @name baidu.array().find()
 * @function
 * @grammar $Array.find([fn])
 * @param   {Function}      iterator    用于做对比的函数
 * @return  {Object}                    匹配的项
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

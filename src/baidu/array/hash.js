///import baidu.array;

/**
 * 将两个数组参数合并成一个类似hashMap结构的对象，这个对象使用第一个数组做为key，使用第二个数组做为值，如果第二个参数未指定，则把对象的所有值置为true。
 *
 */
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 将两个数组参数合并成一个类似hashMap结构的对象，这个对象使用第一个数组做为key，使用第二个数组做为值，如果第二个参数未指定，则把对象的所有值置为true
 *
 * @name baidu.array.hash
 * @function
 * @grammar $Aarray.hash(values)
 * @param   {Object}      values     匹配项
 * @return  {Array}         映射后的HASH对象
 */
baidu.array.extend({
    hash : function (values) {
        var result = {},
            vl = values && values.length,
            i, n;

        for (i=0, n=this.length; i < n; i++) {
            result[this[i]] = (vl && vl > i) ? values[i] : true;
        }
        return result;
    }
});
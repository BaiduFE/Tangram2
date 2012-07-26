///import baidu;

/**
 * @fileoverview
 * @author meizz
 * @create 2010-01-23
 * @modify 2012-05-20
 */

/**
 * 拷贝某对象的所有属性/方法
 * 
 * @function
 * @name baidu.extend
 * @grammar baidu.extend(first, json)
 * @param   {Object}    first       对象
 * @param   {JSON}      second      被合并的JSON对象
 * @return  {Object}                合并后的JS对象
 */
baidu.extend = function(first, second) {
    var i;

    if( first && second && typeof second == "object" ) {
        for( i in second ) {
            second.hasOwnProperty(i) && (first[ i ] = second[ i ]);
        }
    }

    return first;
};

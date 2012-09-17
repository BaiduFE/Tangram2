///import baidu;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * @description 将第二个 ArrayLike对象合并到第一个 ArrayLike 中去
 * 
 * @function
 * @name baidu.merge
 * @grammar baidu.merge(arrayLike, arrayLike)
 * @param   {Object}    first   第一个 ArrayLike
 * @param   {Object}    second  第二个 ArrayLike
 * @return              first   第一个对象
 */
baidu.merge = function(first, second) {
    var i = first.length,
        j = 0;

    if ( typeof second.length === "number" ) {
        for ( var l = second.length; j < l; j++ ) {
            first[ i++ ] = second[ j ];
        }

    } else {
        while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
        }
    }

    first.length = i;

    return first;
};
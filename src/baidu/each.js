///import baidu;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-20
 * @modify 2012.6.29 扩展对 String Number 的支持
 */

/**
 * @description 枚举目标对象中的每一个元素，进行指定函数操作
 * @function
 * @name baidu.each
 * @grammar baidu.each( enumerable, iterator[, context] )
 * @param   {Object}        enumerable      被枚举的对象（Array|ArrayLike|NodeList|String|Number）
 * @param   {Function}      iterator        遍历操作的函数
 * @param   {Object}        context         [可选]作用域
 * @return  {ArrayLike}     arrayLike
 */
 
baidu.each = function( enumerable, iterator, context ) {
    var i, n, t, result;

    if ( typeof iterator == "function" && enumerable) {

        // Array or ArrayLike or NodeList or String
        if ( typeof enumerable.length == "number" ) {

            for ( i=0, n=enumerable.length; i<n; i++ ) {

                t = enumerable[ i ] || (enumerable.charAt && enumerable.charAt( i ));

                // 被循环执行的函数，默认会传入三个参数(array[i], i, array)
                result = iterator.call( context || null, t, i, enumerable );

                // 被循环执行的函数的返回值若为 false 和"break"时可以影响each方法的流程
                if ( result === false || result == "break" ) { break;}
            }
        
        // enumerable is number
        } else if (typeof enumerable == "number") {

            for (i=0; i<enumerable; i++) {
                result = iterator.call( context || null, i, i, i);
                if ( result === false || result == "break" ) { break;}
            }
        
        // enumerable is json
        } else if (typeof enumerable == "object") {

            for (i in enumerable) {
                if ( enumerable.hasOwnProperty(i) ) {
                    result = iterator.call( context || null, enumerable[ i ], i, enumerable );

                    if ( result === false || result == "break" ) { break;}
                }
            }
        }
    }

    return enumerable;
};

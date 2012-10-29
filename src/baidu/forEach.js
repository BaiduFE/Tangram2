///import baidu;
/**
 * @fileoverview forEach是ECMAScript 5 里的标准方法，而each不是标准；
 * 目前为了兼容jQuery保留baidu.each()，$.each()接口与标准的forEach有三大差异：
 *   1.iterator的参数forEach是value,index；
 *   2.forEach中iterator里的this默认是指向window；
 *   3.forEach中iterator返回false是不会中断迭代的
 * 因此添加baidu.forEach()接口，并且推行这个接口
 * @author meizz
 * @create 2012-08-30
 */

/**
 * @description 枚举目标对象中的每一个元素，进行指定函数操作
 * @function
 * @name baidu.forEach
 * @grammar baidu.forEach( enumerable, iterator[, context] )
 * @param   {Object}        enumerable      被枚举的对象（Array|ArrayLike|NodeList|String|Number）
 * @param   {Function}      iterator        遍历操作的函数，参数顺序iterator(value, index, object)
 * @param   {Object}        context         [可选]作用域
 * @return  {ArrayLike}     arrayLike
 */
 
baidu.forEach = function( enumerable, iterator, context ) {
    var i, n, t, len;

    if ( typeof iterator == "function" && enumerable) {

        if ( typeof enumerable == "object" || typeof enumerable == "string" ) {

            // Array or ArrayLike or NodeList or String
            len = enumerable.length || enumerable.byteLength;
            if ( typeof len == "number" ) {

                for ( i=0, n=len; i<n; i++ ) {

                    t = enumerable[ i ] || (enumerable.charAt && enumerable.charAt( i ));

                    // 被循环执行的函数，默认会传入三个参数(array[i], i, array)
                    iterator.call( context || null, t, i, enumerable );
                }

            // enumerable is json
            } else {
                for (i in enumerable) {
                    if ( enumerable.hasOwnProperty(i) ) {
                        iterator.call( context || null, enumerable[ i ], i, enumerable );
                    }
                }
            }
        
        // enumerable is number
        } else if (typeof enumerable == "number") {

            for (i=0; i<enumerable; i++) {
                iterator.call( context || null, i, i, i);
            }
        }
    }

    return enumerable;
};

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
    var i, n;

    var callbacks = {
            arrayLike: function(i,enumerable){
                var t = enumerable[ i ] || (enumerable.charAt && enumerable.charAt( i ));
                iterator.call( context || null, t, i, enumerable);
            },
            number: function(i){
                iterator.call( context || null, i, i, i);
            }
        };

    if ( typeof iterator !== "function" || !enumerable) return enumerable;

    var type = typeof enumerable.length == "number" ? "arrayLike" :
               typeof enumerable == "number" ? "number" : "other" ;

    if (type === "other" && typeof enumerable == "object") {
        // 作为属性 变量为property 缩写p
        for ( var p in enumerable ) {
            if ( enumerable.hasOwnProperty(p) ) {
                iterator.call( context || null, enumerable[ p ], p, enumerable );
            }
        }
        return enumerable;
    }

    var n = type === "number" ? enumerable : enumerable.length;

    for ( i=0 ; i<n; i++ ) {
        callbacks[type](i,enumerable);
    }

    return enumerable;
};

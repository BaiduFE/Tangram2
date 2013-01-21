///import baidu.array;

/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 遍历数组中所有元素，将每一个元素应用方法进行合并，并返回合并后的结果。
 *
 * @name baidu.array.reduce
 * @function
 * @grammar array.reduce(iterator[, initializer])
 * @param   {Function}      iterator    指定项的索引位置
 * @param   {Function}      initializer 指定项的索引位置
 * @return  {Object}                    iterator计算后的结果
 */
/// Tangram 1.x Code Start
// TODO: delete in tangram 3.0
baidu.array.reduce = function(source, iterator, initializer) {
    var i = 0,
        l = source.length,
        found = 0;

    if( arguments.length < 3){
        //没有initializer的情况，找到第一个可用的值
        for(; i < l; i++){
            initializer = source[i++];
            found = 1;
            break;
        }
        if(!found){
            return ;
        }
    }

    for (; i < l; i++) {
        if( i in source){
            initializer = iterator(initializer, source[i] , i , source);
        }
    }
    return initializer;
};
/// Tangram 1.x Code End

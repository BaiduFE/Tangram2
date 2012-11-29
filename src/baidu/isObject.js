///import baidu;

/**
 * @description 判断对象是否为Object或Function类型
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name baidu.isObject
 * @grammer baidu.isObject( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
baidu.isObject = function( unknow ) {
    return typeof unknow === "function" || ( typeof unknow === "object" && unknow != null );
};

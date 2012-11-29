///import baidu.type;

/**
 * @description 判断Number对象类型
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name baidu.isNumber
 * @grammer baidu.isNumber( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
baidu.isNumber = function( unknow ) {
    return baidu.type( unknow ) == "number" && isFinite( unknow );
};

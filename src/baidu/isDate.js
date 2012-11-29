///import baidu.type;

/**
 * @description 判断对象类型
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name baidu.isDate
 * @grammer baidu.isDate( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
baidu.isDate = function( unknow ) {
    return baidu.type(unknow) == "date" && unknow.toString() != 'Invalid Date' && !isNaN(unknow);
};

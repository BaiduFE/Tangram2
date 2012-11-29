///import baidu.type;

/**
 * @description 判断对象类型是否为 HTMLElement
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name baidu.isElement
 * @grammer baidu.isElement( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
baidu.isElement = function( unknow ) {
    return baidu.type(unknow) == "HTMLElement";
};

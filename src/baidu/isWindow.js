///import baidu.type;

/**
 * @description 判断对象是否为 Window
 * @author meizz
 * @create 2012-11-27
 *
 * @function
 * @name baidu.isWindow
 * @grammer baidu.isWindow( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
baidu.isWindow = function( unknow ) {
    return baidu.type( unknow ) == "Window";
};

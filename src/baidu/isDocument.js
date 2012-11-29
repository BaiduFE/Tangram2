///import baidu.type;

/**
 * @description 判断对象是否为 Document
 * @author meizz
 * @create 2012-11-27
 *
 * @function
 * @name baidu.isDocument
 * @grammer baidu.isDocument( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */
baidu.isDocument = function( unknow ) {
    return baidu.type( unknow ) == "Document";
};

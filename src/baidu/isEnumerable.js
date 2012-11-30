///import baidu;

/**
 * @description 判断对象是否可被遍历
 *
 * @author meizz
 * @create 2012-05-04
 *
 * @function
 * @name baidu.isEnumerable
 * @grammer baidu.isEnumerable( unknow )
 *
 * @param   {Any}       unknow  任意类型的对象
 * @return  {Boolean}           true|false
 */

// 20120818 mz 检查对象是否可被枚举，对象可以是：Array NodeList HTMLCollection $DOM
// baidu.isEnumerable = function( unknow ){
//     return unknow != null
//         && (typeof unknow == "object" || ~toString.call( unknow ).indexOf( "NodeList" ))
//         &&(typeof unknow.length == "number"
//         || typeof unknow.byteLength == "number"     //ArrayBuffer
//         || typeof unknow[0] != "undefined");
// };

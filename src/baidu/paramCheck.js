///import baidu;
///import baidu.type;
///import baidu.global;
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-10
 * @modify
 */

/**
 * @description 分析形参对象的类型
 *
 * @function
 * @name baidu.paramCheck
 * @grammar baidu.paramCheck(regString, moduleName)
 * @param   {String}    regString     被分析的形参匹配字符串
 * @param   {String}    moduleName    被分析的模块名
 */
baidu.paramCheck = function() {
    var maps = baidu.global("_maps_RegExp");

    return function(regString, namespace){
        regString = "^" + regString + "$";

        var caller, arg, i, n,
            types = "",
            reg = maps[ regString ] || ( maps[ regString ] = new RegExp(regString, "i") );

        if ( caller = arguments.callee.caller ) {
            arg = caller.arguments;

            for ( i=0, n=arg.length; i<n; i++ ) {
                types += "," + baidu.type( arg[ i ] );
            }

            types.length && ( types = types.substr( 1 ) );

            if ( reg.test( types ) ) {
                return;
            }

            throw new Error( "Parameter type mismatch.\nPosition : " + ( namespace || caller.toString() ) );
        }
    };
}();

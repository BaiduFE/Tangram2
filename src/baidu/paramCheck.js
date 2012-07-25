///import baidu;
///import baidu.type;
///import baidu.global;
/**
 * @fileoverview
 * @name baidu.paramCheck
 * @author meizz
 * @create 2012-07-10
 * @modify
 */

/**
 * 分析形参对象的类型
 *
 * @param   {String}    regString     被分析的形参匹配字符串
 * @param   {String}    moduleName    被分析的模块名
 */
baidu.paramCheck = function() {
    var maps = baidu.global("_maps_RegExp");

    return function(regString, namespace){
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

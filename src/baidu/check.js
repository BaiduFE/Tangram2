///import baidu;
///import baidu.type;
/*
 * @fileoverview
 * @author meizz
 * @create 2012-07-10
 * @modify 2012-08-28 mz 添加对指定对象列的检查
 */

/**
 * @description 分析形参对象的类型
 *
 * @function
 * @name baidu.check
 * @grammar baidu.check(regString, moduleName[, object1,[objectn, ...]])
 * @param   {String}    regString     被分析的形参匹配字符串
 * @param   {String}    moduleName    被分析的模块名
 */
baidu.check = function(){
    function check(list, i, reg) {
        var types = "", n;

        for (n=list.length; i<n; i++) {
            types += "," + baidu.type( list[i] );
        }
        types.length && ( types = types.substr(1) );

        return reg.test(types);
    }

    return function(regString, position){
        if (!(baidu.isString(regString) && baidu.isString(position))) {
            throw new Error("Arguments error on baidu.check!");
        }
        var rs = regString;
        rs.indexOf("^") && (rs = "^" + rs);
        rs.indexOf("$") != rs.length - 1 && (rs += "$");

        var caller, arg, i, n,
            types = "",
            reg = new RegExp(rs, 'i');

        // 检查指定的对象(列)
        if (arguments.length > 2) {
            if (check(arguments, 2, reg)) return;
            else throw new Error("\u6307\u5b9a\u7684\u5bf9\u8c61\u7c7b\u578b\u4e0d\u7b26\u5408\u9884\u671f("+
                regString +")  \u4f4d\u7f6e\u5728 " + position);
        }

        // 检查函数参数类型
        if ( caller = arguments.callee.caller ) {
            if (!check(caller.arguments, 0, reg)) {
                throw new Error("\u51fd\u6570\u53c2\u6570\u7c7b\u578b\u4e0d\u7b26\u5408\u9884\u671f("+
                    regString +")  \u4f4d\u7f6e\u5728 " + ( position || caller.toString() ) );
            }
        }
    };
}();

/// include baidu;
/// include baidu.type;

/**
 * @fileoverview
 * @name baidu.param
 * @author meizz
 * @create 2012-05-30
 * @modify
 */

/**
 * 分析形参对象的类型，返回以逗号分隔的对象类型字符串
 * 
 * @param   {Object}    arg     被分析的形参对象
 * @return  {String}            对象类型字符串，以逗号分隔
 */
baidu.param = function(arg) {
    var s = ""
        ,i = 0
        ,n = arg.length;

    for (; i<n; i++) {
        s += ","+ baidu.type(arg[i]);
    }

    return s ? s.substr(1) : "";
};
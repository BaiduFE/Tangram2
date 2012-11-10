///import baidu;

/*
 * @fileoverview 在当前页面开辟一个全局的信息存放地
 * @name baidu.global
 * @author meizz
 * @create 2012-07-25
 */

/**
 * @description 在当前页面开辟一个全局的信息存放地
 * @function
 * @name baidu.global
 * @grammar baidu.global(key[, value[, overwrite]])
 * @param   {String}    key         被存储的变量名
 * @param   {Object}    value       [可选]需要存储的变量值
 * @param   {String}    overwrite   [可选]true 覆盖原值
 * @return  {Object}                该key对象的对象
 */
baidu.global = baidu.global || (function() {
    baidu._global_ = window[ baidu.guid ];
    var global = baidu._global_._ = {};

    return function( key, value, overwrite ) {
        if ( typeof value != "undefined" ) {
            if(!overwrite) {
                value = typeof global[ key ] == "undefined" ? value : global[ key ];
            }
            global[ key ] =  value;

        } else if (key && typeof global[ key ] == "undefined" ) {
            global[ key ] = {};
        }

        return global[ key ];
    }
})();

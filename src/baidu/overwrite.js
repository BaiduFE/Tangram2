///import baidu;

/**
 * @fileoverview
 * @name baidu.overwrite
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * 将系统对象上的方法重写到 自定义对象上去（为链式语法准备）
 * 
 * @param   {Function}  Class   自定义的类
 * @param   {Object}    System  系统对象原型
 * @param   {Array|String}  methods 需要重写的方法名列表
 * @return  {Function}          自定义的类
 */
baidu.overwrite = function(Class, list, fn) {
    for (var i=list.length-1; i>-1; i--) {
        Class.prototype[list[i]] = fn(list[i]);
    }

    return Class;
};

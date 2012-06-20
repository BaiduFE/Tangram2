///import baidu;

/**
 * @fileoverview
 * @name baidu.extend
 * @author meizz
 * @create 2010-01-23
 * @modify 2012-05-20
 */

/**
 * 拷贝某对象的所有属性/方法
 * 
 * @param   {Object}    target      对象
 * @param   {JSON}      json        被合并的JSON对象
 * @return  {Object}                合并后的JS对象
 */
baidu.extend = function(target, json) {
    if(target && json && typeof json === "object") {
        for(var p in json) {
            target[p] = json[p];
        }
    }
    return target;
};

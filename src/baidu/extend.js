///include baidu;

/**
 * 拷贝某对象的所有属性/方法
 * 
 * @author: meizz
 * @namespace: baidu.extend
 * @modify: 2011-06-01
 * @create: 2010-01-23
 * 
 * @param   {Object}    obj         对象
 * @param   {JSON}      json        被合并的JSON对象
 * @return  {Object}                合并后的JS对象
 */
baidu.extend = function(obj, json) {
    if(obj && json && typeof json == "object") {
        for(var p in json) {
            obj[p] = json[p];
        }
    }
    return obj;
};

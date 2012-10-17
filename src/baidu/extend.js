///import baidu;
///import baidu.type;

/*
 * @fileoverview
 * @author meizz
 * @create 2010-01-23
 * @modify 2012-08-31 mz 添加深度clone和多对象拷贝策略
 */

/**
 * @description 拷贝某对象的所有属性/方法，并返回一个全新对象(非深度克隆)
 * @function
 * @name baidu.extend
 * @grammar baidu.extend(obj1[, obj2[, ...objN]])
 * @param   {Object} obj0,obj1。。。objN  每一个传入的对象
 * @return  {Object}                合并后的JS对象
 */

/**
 * @description 拷贝某对象的所有属性/方法；如果第一个参数为true，则进入深度克隆，并返回一个全新对象
 * @function
 * @name baidu.extend
 *
 * @grammar baidu.extend(depthClone, obj1[, obj2[, ...objN]])
 * @param   {Boolean}   depthClone  是否深度克隆的标识，默认为false，可以不传。
 * @param   {Object} obj0,obj1。。。objN  每一个传入的对象
 * @return  {Object}                合并后的JS对象
 */

baidu.extend = function(depthClone, object) {
    var second, options, key, src, copy,
        i = 1,
        n = arguments.length,
        result = depthClone || {},
        copyIsArray, clone;
    
    baidu.isBoolean( depthClone ) && (i = 2) && (result = object || {});
    !baidu.isObject( result ) && (result = {});

    for (; i<n; i++) {
        options = arguments[i];
        if( baidu.isObject(options) ) {
            for( key in options ) {
                src = result[key];
                copy = options[key];
                // Prevent never-ending loop
                if ( src === copy ) {
                    continue;
                }
                
                if(baidu.isBoolean(depthClone) && depthClone && copy
                    && (baidu.isPlainObject(copy) || (copyIsArray = baidu.isArray(copy)))){
                        if(copyIsArray){
                            copyIsArray = false;
                            clone = src && baidu.isArray(src) ? src : [];
                        }else{
                            clone = src && baidu.isPlainObject(src) ? src : {};
                        }
                        result[key] = baidu.extend(depthClone, clone, copy);
                }else if(copy !== undefined){
                    result[key] = copy;
                }
            }
        }
    }
    return result;
};
/* extend 策略
   1、第一个参数为 bool ，则进行克隆操作，返回聚合后对象的副本
   2、第一个参数为 true  时进行深度克隆；
   3、第一个参数为 false 时进行浅克隆；
   4、接受聚合的对象不是一个object时，返回 空对象
//*/
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */

///import baidu.object;
///import baidu.lang.isObject;
///import baidu.lang.isFunction;

/*
 * 默认情况下，所有在源对象上的属性都会被非递归地合并到目标对象上
 * 并且如果目标对象上已有此属性，不会被覆盖
 */
/**
 * @description 合并源对象的属性到目标对象。
 * @name baidu.object.merge
 * @function
 * @grammar baidu.object.merge(target, source[, opt_options])
 * @param {Function} target 目标对象.
 * @param {Function} source 源对象.
 * @param {Object} opt_options  optional merge选项.
 * @param {boolean} opt_options.overwrite   optional 如果为真，源对象属性会覆盖掉目标对象上的已有属性，默认为假.
 * @param {string[]} opt_options.whiteList   optional 白名单，默认为空，如果存在，只有在这里的属性才会被处理.
 * @param {boolean} opt_options.recursive    optional 是否递归合并对象里面的object，默认为否.
 * @return {object} merge后的object.
 * @see baidu.object.extend
 * @author berg
 */
baidu.object.merge = function(){
    function isPlainObject(source) {
        return baidu.lang.isObject(source) && !baidu.lang.isFunction(source);
    };
    function mergeItem(target, source, index, overwrite, recursive) {
        if (source.hasOwnProperty(index)) {
            if (recursive && isPlainObject(target[index])) {
                // 如果需要递归覆盖，就递归调用merge
                baidu.object.merge(
                    target[index],
                    source[index],
                    {
                        'overwrite': overwrite,
                        'recursive': recursive
                    }
                );
            } else if (overwrite || !(index in target)) {
                // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
                target[index] = source[index];
            }
        }
    };
    
    return function(target, source, opt_options){
        var i = 0,
            options = opt_options || {},
            overwrite = options['overwrite'],
            whiteList = options['whiteList'],
            recursive = options['recursive'],
            len;
    
        // 只处理在白名单中的属性
        if (whiteList && whiteList.length) {
            len = whiteList.length;
            for (; i < len; ++i) {
                mergeItem(target, source, whiteList[i], overwrite, recursive);
            }
        } else {
            for (i in source) {
                mergeItem(target, source, i, overwrite, recursive);
            }
        }
        return target;
    };
}();
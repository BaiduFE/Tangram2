/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/instance.js
 * author: meizz, erik
 * version: 1.1.0
 * date: 2009/12/1
 */

///import baidu.lang;
///import baidu.global;

/**
 * @description 根据参数(guid)的指定，返回对应的实例对象引用
 * @name baidu.lang.instance
 * @function
 * @grammar baidu.lang.instance(guid)
 * @param {string} guid 需要获取实例的guid
 * @meta standard
 * @return {Object|null} 如果存在的话，返回;否则返回null。
 */
baidu.lang.instance = function(){
    var maps = baidu.global("_maps_id");

    return function (guid) {
        return maps[ guid ] || null;
    };
}();


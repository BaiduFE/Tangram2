/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/decontrol.js
 * author: meizz
 * version: 1.1.0
 * $date$
 */

///import baidu.lang;
///import baidu.global;

/**
 * @description 解除instance中对指定类实例的引用关系。
 * @name baidu.lang.decontrol
 * @function
 * @grammar baidu.lang.decontrol(guid)
 * @param {string} guid 类的唯一标识
 * @version 1.1.1
 * @see baidu.lang.instance
 */
baidu.lang.decontrol = function(){
    var maps = baidu.global("_maps_id");

    return function(guid) {
        delete maps[guid];
    };
}();

/// Tangram 1.x Code End
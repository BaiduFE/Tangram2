/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @create: 2010-07-16
 * @namespace: baidu.fx.current
 */

///import baidu.fx;
///import baidu.dom.g;

/**
 * 获取DOM元素正在运行的效果实例列表
 * @function
 * @grammar baidu.fx.current(element)
 * @param     {string|HTMLElement}     element     被查询的DOM元素或元素id
 * @see baidu.fx.current
 * @returns {Array} 效果对象
 */
baidu.fx.current = function(element) {
    if (!(element = baidu.dom.g(element))) return null;
    var a, guids, reg = /\|([^\|]+)\|/g;

    // 可以向<html>追溯
    do {if (guids = element.getAttribute("baidu_current_effect")) break;}
    while ((element = element.parentNode) && element.nodeType == 1);

    if (!guids) return null;

    if ((a = guids.match(reg))) {
        //fix
        //在firefox中使用g模式，会出现ture与false交替出现的问题
        reg = /\|([^\|]+)\|/;
        
        for (var i=0; i<a.length; i++) {
            reg.test(a[i]);
            a[i] = window[baidu.guid]._instances[RegExp["\x241"]];
        }
    }
    return a;
};

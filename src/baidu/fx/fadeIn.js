/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.fadeIn
 * @version: 2010-01-23
 */

///import baidu.dom.g;
///import baidu.fx.opacity;

 
/**
 * 渐现渐变效果。注意，如果元素的visibility属性如果为hidden，效果将表现不出来。
 * @function
 * @grammar baidu.fx.fadeIn(element, options)
 * @param      {string|HTMLElement}     element            元素或者元素的ID
 * @param      {Object}                 options            选项。参数的详细说明如下表所示
 * @config     {Number}                 duration           500,//效果持续时间，默认值为500ms
 * @config     {Number}                 interval           16, //动画帧间隔时间，默认值为16ms
 * @config     {Function}               transition         function(schedule){return schedule;},时间线函数
 * @config     {Function}               onbeforestart      function(){},//效果开始前执行的回调函数
 * @config     {Function}               onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config     {Function}               onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config     {Function}               onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config     {Function}               oncancel           function(){},//效果被撤销时的回调函数
 * @see baidu.fx.fadeOut
 */

baidu.fx.fadeIn = function(element, options) {
    if (!(element = baidu.dom.g(element))) return null;

    var fx = baidu.fx.opacity(element,
        baidu.object.extend({from:0, to:1, restoreAfterFinish:true}, options||{})
    );
    fx.__type = "baidu.fx.fadeIn";

    return fx;
};

/// Tangram 1.x Code End
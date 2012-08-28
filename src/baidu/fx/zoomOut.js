/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.zoomOut
 * @version: 2010-06-07
 */

///import baidu.dom.g;
///import baidu.dom.hide;
///import baidu.object.extend;

///import baidu.fx.scale;

 
/**
 * 将元素缩小的消失效果。
 * @function
 * @grammar baidu.fx.zoomOut(element, options)
 * @param     {string|HTMLElement}    element            元素或者元素的ID
 * @param     {Object}                options            选项。参数的详细说明如下表所示
 * @config    {String}                transformOrigin    "0px 0px",//起始坐标描述。"x y"：x方向和y方向坐标，取值包括像素(含px字符)，百分比，top、left、center、bottom、right，默认"0px 0px"。
 * @config    {Number}                from               1,//效果起始值。介于0到1之间的一个数字，默认为1。
 * @config    {Number}                to                 0.1,//效果结束值。介于0到1之间的一个数字，默认为0.1。
 * @config    {Number}                duration           500,//效果持续时间，默认值为500ms。
 * @config    {Number}                interval           16, //动画帧间隔时间，默认值为16ms。
 * @config    {Function}              transition         function(schedule){return schedule;},时间线函数
 * @config    {Function}              onbeforestart      function(){},//效果开始前执行的回调函数
 * @config    {Function}              onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config    {Function}              onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config    {Function}              onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config    {Function}              oncancel           function(){},//效果被撤销时的回调函数
 */
baidu.fx.zoomOut = function(element, options) {
    if (!(element = baidu.dom.g(element))) return null;

    options = baidu.object.extend({
        to:0.1
        ,from:1
        ,opacityTrend:false
        ,restoreAfterFinish:true
        ,transition:function(n){return 1 - Math.pow(1 - n, 2);}
    },  options||{});

    var effect = baidu.fx.scale(element, options);
    effect.addEventListener("onafterfinish", function(){baidu.dom.hide(this.element);});

    return effect;
};

/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.pulsate
 * @version: 2010-01-23
 */

///import baidu.dom.g;
///import baidu.object.extend;

///import baidu.fx.create;

 
/**
 * 心跳闪现效果。
 * @function
 * @grammar baidu.fx.pulsate(element, loop, options)
 * @param       {string|HTMLElement}      element               元素或者元素的ID
 * @param       {Number}                  loop                  心跳次数，小于0则为永远跳动，默认为0次。
 * @param       {Object}                  options               选项。参数的详细说明如下表所示
 * @config      {Number}                  duration              500,//效果持续时间，默认值为500ms。
 * @config      {Number}                  interval              16, //动画帧间隔时间，默认值为16ms。
 * @config      {Function}                transition            function(schedule){return schedule;},时间线函数
 * @config      {Function}                onbeforestart         function(){},//效果开始前执行的回调函数
 * @config      {Function}                onbeforeupdate        function(){},//每次刷新画面之前会调用的回调函数
 * @config      {Function}                onafterupdate         function(){},//每次刷新画面之后会调用的回调函数
 * @config      {Function}                onafterfinish         function(){},//效果结束后会执行的回调函数
 * @config      {Function}                oncancel              function(){},//效果被撤销时的回调函数
 */
baidu.fx.pulsate = function(element, loop, options) {
    if (!(element = baidu.dom.g(element))) return null;
    if (isNaN(loop) || loop == 0) return null;

    var e = element;

    var fx = baidu.fx.create(e, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {this.protect("visibility");}

        //[Implement Interface] transition
        ,transition : function(percent) {return Math.cos(2*Math.PI*percent);}

        //[Implement Interface] render
        ,render : function(schedule) {
            e.style.visibility = schedule > 0 ? "visible" : "hidden";
        }

        //[Implement Interface] finish
        ,finish : function(){
            setTimeout(function(){
                baidu.fx.pulsate(element, --loop, options);
            }, 10);
        }
    }, options), "baidu.fx.pulsate");

    return fx.launch();
};

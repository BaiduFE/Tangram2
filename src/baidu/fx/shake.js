/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.shake
 * @version: 2010-01-23
 */

///import baidu.dom;
///import baidu.object.extend;
///import baidu.dom.getStyle;

///import baidu.fx.create;

 
/**
 * 颤动的效果。
 * 说明：在效果执行过程中会修改DOM元素的position属性，可能会对包含的DOM元素带来影响
 * @function
 * @grammar baidu.fx.shake(element, offset, options)
 * @param     {string|HTMLElement}    element            元素或者元素的ID
 * @param     {Array|Object}          offset             震动范围。若为数组，索引0为x方向，索引1为y方向；若为Object，键x为x方向，键y为y方向；单位：px，默认值：元素本来的坐标。
 * @param     {Object}                options            选项。参数的详细说明如下表所示
 * @config    {Number}                duration           500,//效果持续时间，默认值为500ms。
 * @config    {Number}                interval           16, //动画帧间隔时间，默认值为16ms。
 * @config    {Function}              transition         function(schedule){return schedule;},时间线函数
 * @config    {Function}              onbeforestart      function(){},//效果开始前执行的回调函数
 * @config    {Function}              onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config    {Function}              onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config    {Function}              onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config    {Function}              oncancel           function(){},//效果被撤销时的回调函数
 */
baidu.fx.shake = function(element, offset, options) {
    if (!(element = baidu.dom.g(element))) return null;

    var e = element;
    offset = offset || [];
    function tt() {
        for (var i=0; i<arguments.length; i++) {
            if (!isNaN(arguments[i])) return arguments[i];
        }
    }

    var fx = baidu.fx.create(e, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {
            this.protect("top");
            this.protect("left");
            this.protect("position");
            this.restoreAfterFinish = true;

            if (baidu.dom.getStyle(e, "position") == "static") {
                e.style.position = "relative";
            }
			var original = this['\x06original'];
            this.originX = parseInt(original.left|| 0);
            this.originY = parseInt(original.top || 0);
            this.offsetX = tt(offset[0], offset.x, 16);
            this.offsetY = tt(offset[1], offset.y, 5);
        }

        //[Implement Interface] transition
        ,transition : function(percent) {
            var line = 1 - percent;
            return Math.floor(line * 16) % 2 == 1 ? line : percent - 1;
        }

        //[Implement Interface] render
        ,render : function(schedule) {
            e.style.top  = (this.offsetY * schedule + this.originY) +"px";
            e.style.left = (this.offsetX * schedule + this.originX) +"px";
        }
    }, options || {}), "baidu.fx.shake");

    return fx.launch();
};

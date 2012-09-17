/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.mask
 * @version: 2010-05-20
 */

///import baidu.dom.getStyle;
///import baidu.object.extend;

///import baidu.fx.create;


/**
 * 面具遮罩效果。注意：只适用于绝对定位的DOM元素.
 * @function
 * @grammar baidu.fx.mask(element, options)
 * @param       {string|HTMLElement}      element           元素或者元素的ID
 * @param       {Object}                  options           选项。参数的详细说明如下表所示
 * @config      {String}                  startOrigin       "0px 0px",//起始坐标描述。"x y"：x方向和y方向坐标。取值包括像素(含px字符)，百分比，top、left、center、bottom、right，默认"0px 0px"。
 * @config      {Number}                  from              0,//效果起始值。介于0到1之间的一个数字，默认为0。
 * @config      {Number}                  to                1,//效果结束值。介于0到1之间的一个数字，默认为1。
 * @config      {Number}                  duration          500,//效果持续时间，默认值为500ms。
 * @config      {Number}                  interval          16, //动画帧间隔时间，默认值为16ms。
 * @config      {Function}                transition        function(schedule){return schedule;},时间线函数
 * @config      {Function}                onbeforestart     function(){},//效果开始前执行的回调函数
 * @config      {Function}                onbeforeupdate    function(){},//每次刷新画面之前会调用的回调函数
 * @config      {Function}                onafterupdate     function(){},//每次刷新画面之后会调用的回调函数
 * @config      {Function}                onafterfinish     function(){},//效果结束后会执行的回调函数
 * @config      {Function}                oncancel          function(){},//效果被撤销时的回调函数
 */
baidu.fx.mask = function(element, options) {
    // mask 效果只适用于绝对定位的DOM元素
    if (!(element = baidu.dom.g(element)) ||
        baidu.dom.getStyle(element, "position") != "absolute")
        return null;

    var e = element, original = {};
    options = options || {};

    // [startOrigin] "0px 0px" "50% 50%" "top left"
    var r = /^(\d+px|\d?\d(\.\d+)?%|100%|left|center|right)(\s+(\d+px|\d?\d(\.\d+)?%|100%|top|center|bottom))?/i;
    !r.test(options.startOrigin) && (options.startOrigin = "0px 0px");

    var options = baidu.object.extend({restoreAfterFinish:true, from:0, to:1}, options || {});

    var fx = baidu.fx.create(e, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {
            e.style.display = "";
            this.protect("clip");
            original.width = e.offsetWidth;
            original.height = e.offsetHeight;

            // 计算效果起始点坐标
            r.test(this.startOrigin);
            var t1 = RegExp["\x241"].toLowerCase(),
                t2 = RegExp["\x244"].toLowerCase(),
                ew = this.element.offsetWidth,
                eh = this.element.offsetHeight,
                dx, dy;

            if (/\d+%/.test(t1)) dx = parseInt(t1, 10) / 100 * ew;
            else if (/\d+px/.test(t1)) dx = parseInt(t1);
            else if (t1 == "left") dx = 0;
            else if (t1 == "center") dx = ew / 2;
            else if (t1 == "right") dx = ew;

            if (!t2) dy = eh / 2;
            else {
                if (/\d+%/.test(t2)) dy = parseInt(t2, 10) / 100 * eh;
                else if (/\d+px/.test(t2)) dy = parseInt(t2);
                else if (t2 == "top") dy = 0;
                else if (t2 == "center") dy = eh / 2;
                else if (t2 == "bottom") dy = eh;
            }
            original.x = dx;
            original.y = dy;
        }

        //[Implement Interface] render
        ,render : function(schedule) {
            var n = this.to * schedule + this.from * (1 - schedule),
                top = original.y * (1 - n) +"px ",
                left = original.x * (1 - n) +"px ",
                right = original.x * (1 - n) + original.width * n +"px ",
                bottom = original.y * (1 - n) + original.height * n +"px ";
            e.style.clip = "rect("+ top + right + bottom + left +")";
        }

        //[Implement Interface] finish
        ,finish : function(){
            if (this.to < this.from) e.style.display = "none";
        }
    }, options), "baidu.fx.mask");

    return fx.launch();
};

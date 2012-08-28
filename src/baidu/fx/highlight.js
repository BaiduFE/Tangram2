/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.highlight
 * @create: 2010-01-23
 * @version: 2010-07-07
 */

///import baidu.fx.create;

///import baidu.dom.g;
///import baidu.dom.getStyle;
///import baidu.object.extend;
///import baidu.string.formatColor;

 
/**
 * 这个方法改变DOM元素的背景色，实现高亮的效果。
 * @function
 * @grammar baidu.fx.highlight(element, options)
 * @param      {string|HTMLElement}     element            元素或者元素的ID
 * @param      {Object}                 options            选项。参数的详细说明如下表所示
 * @config     {String}                 beginColor         渐变开始时的背景色，如果设置了背景色则以设置的颜色为默认开始颜色，否则默认为'#FFFF00'
 * @config     {String}                 endColor           渐变结束时的背景色，如果设置了背景色则以设置的颜色为默认结束颜色，否则默认为'#FFFFFF'
 * @config     {String}                 finalColor         渐变结束时的背景色，如果设置了背景色则以设置的颜色为结束时背景色，否则默认为endColor值
 * @config     {String}                 textColor          渐变结束时的背景色，如果设置了背景色则以设置的颜色为结束时文本的颜色，否则默认为原文本色值
 * @config     {Number}                 duration           500,//效果持续时间，默认值为500ms
 * @config     {Number}                 interval           16, //动画帧间隔时间，默认值为16ms
 * @config     {Function}               transition         function(schedule){return schedule;},时间线函数
 * @config     {Function}               onbeforestart      function(){},//效果开始前执行的回调函数
 * @config     {Function}               onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config     {Function}               onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config     {Function}               onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config     {Function}               oncancel           function(){},//效果被撤销时的回调函数
 */
baidu.fx.highlight = function(element, options) {
    if (!(element = baidu.dom.g(element))) return null;

    var e = element;

    var fx = baidu.fx.create(e, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {
            var me = this,
                CS = baidu.dom.getStyle,
                FC = baidu.string.formatColor,
                color = FC(CS(e, "color")) || "#000000",
                bgc   = FC(CS(e, "backgroundColor"));

            // 给用户指定的四个配置参数做一个保护值
            me.beginColor = me.beginColor || bgc || "#FFFF00";
            me.endColor   = me.endColor   || bgc || "#FFFFFF";
            me.finalColor = me.finalColor || me.endColor || me.element.style.backgroundColor;
            me.textColor == color && (me.textColor = "");

            this.protect("color");
            this.protect("backgroundColor");

            me.c_b = []; me.c_d = []; me.t_b = []; me.t_d = [];
            for (var n, i=0; i<3; i++) {
                n = 2 * i + 1;
                me.c_b[i]=parseInt(me.beginColor.substr(n, 2), 16);
                me.c_d[i]=parseInt(me.endColor.substr(n, 2), 16) - me.c_b[i];

                // 如果指定了文字的颜色，则文字颜色也渐变
                if (me.textColor) {
                    me.t_b[i]=parseInt(color.substr(n, 2), 16);
                    me.t_d[i]=parseInt(me.textColor.substr(n,2),16)-me.t_b[i];
                }
            }
        }

        //[Implement Interface] render
        ,render : function(schedule) {
            for (var me=this, a="#", b="#", n, i=0; i<3; i++) {
                n = Math.round(me.c_b[i] + me.c_d[i] * schedule).toString(16);
                a += ("00"+ n).substr(n.length);

                // 如果指定了文字的颜色，则文字颜色也渐变
                if (me.textColor) {
                    n = Math.round(me.t_b[i]+me.t_d[i]*schedule).toString(16);
                    b += ("00"+ n).substr(n.length);
                }
            }
            e.style.backgroundColor = a;
            me.textColor && (e.style.color = b);
        }

        //[Implement Interface] finish
        ,finish : function(){
            this.textColor && (e.style.color = this.textColor);
            e.style.backgroundColor = this.finalColor;
        }
    }, options || {}), "baidu.fx.highlight");

    return fx.launch();
};

/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.collapse
 * @version: 2010-01-23
 */

///import baidu.dom.g;
///import baidu.dom.hide;
///import baidu.object.extend;
///import baidu.fx.create;

/**
 * 从下向上收拢DOM元素的效果。
 * @function
 * @grammar baidu.fx.collapse(element, options)
 * @param     {string|HTMLElement}    element            元素或者元素的ID
 * @param     {Object}                options            选项。参数的详细说明如下表所示
 * @config    {Number}                duration           500,//效果持续时间，默认值为500ms
 * @config    {Number}                interval           16, //动画帧间隔时间，默认值为16ms
 * @config    {String}                orientation        动画收拢方向，取值：vertical（默认），horizontal
 * @config    {Function}              transition         function(schedule){return schedule;},时间线函数
 * @config    {Function}              onbeforestart      function(){},//效果开始前执行的回调函数
 * @config    {Function}              onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config    {Function}              onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config    {Function}              onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config    {Function}              oncancel           function(){},//在onafterfinish与oncancel时默认调用
 * @see baidu.fx.expand
 */

baidu.fx.collapse = function(element, options) {
    if (!(element = baidu.dom.g(element))) return null;

    var e = element, 
        value, 
        attr,
        attrHV = {
            "vertical": {
                value: 'height',
                offset: 'offsetHeight',
                stylesValue: ["paddingBottom","paddingTop","borderTopWidth","borderBottomWidth"]
            },
            "horizontal": {
                value: 'width',
                offset: 'offsetWidth',
                stylesValue: ["paddingLeft","paddingRight","borderLeftWidth","borderRightWidth"]
            }
        };

    var fx = baidu.fx.create(e, baidu.object.extend({
        orientation: 'vertical'
        
        //[Implement Interface] initialize
        ,initialize : function() {
            attr = attrHV[this.orientation];
            this.protect(attr.value);
            this.protect("overflow");
            this.restoreAfterFinish = true;
            value = e[attr.offset];
            e.style.overflow = "hidden";
        }

        //[Implement Interface] transition
        ,transition : function(percent) {return Math.pow(1 - percent, 2);}

        //[Implement Interface] render
        ,render : function(schedule) {
            e.style[attr.value] = Math.floor(schedule * value) +"px";
        }

        //[Implement Interface] finish
        ,finish : function(){baidu.dom.hide(e);}
    }, options || {}), "baidu.fx.expand_collapse");

    return fx.launch();
};

// [TODO] 20100509 在元素绝对定位时，收缩到最后时会有一次闪烁
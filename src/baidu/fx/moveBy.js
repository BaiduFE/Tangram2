/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.moveBy
 * @version: 2010-06-04
 */


///import baidu.dom.g;
///import baidu.fx.move;
///import baidu.object.extend;
///import baidu.dom.getStyle;

 
/**
 * 移动渐变效果。这个效果会使目标元素移动指定的距离。注意: 对static定位的DOM元素无效。
 * @function
 * @grammar baidu.fx.moveBy(element, distance, options)
 * @param       {string|HTMLElement}      element               元素或者元素的ID
 * @param       {Array|Object}            distance              偏移距离。若为数组，索引0为x方向，索引1为y方向；若为Object，键x为x方向，键y为y方向；单位：px，默认值为：0。
 * @param       {Object}                  options               选项。参数的详细说明如下表所示
 * @config      {Number}                  duration              500,//效果持续时间，默认值为500ms。
 * @config      {Number}                  interval              16, //动画帧间隔时间，默认值为16ms。
 * @config      {Function}                restore               restore方法,在onafterfinish与oncancel时默认调用
 * @config      {Boolean}                 restoreAfterFinish    默认为true，在onafterfinish与oncancel事件中调用restore方法。
 * @config      {Function}                transition            function(schedule){return schedule;},时间线函数
 * @config      {Function}                onbeforestart         function(){},//效果开始前执行的回调函数
 * @config      {Function}                onbeforeupdate        function(){},//每次刷新画面之前会调用的回调函数
 * @config      {Function}                onafterupdate         function(){},//每次刷新画面之后会调用的回调函数
 * @config      {Function}                onafterfinish         function(){},//效果结束后会执行的回调函数
 * @config      {Function}                oncancel              function(){},//效果被撤销时的回调函数
 * @remark
 * 1.0.0开始支持
 * @see baidu.fx.moveBy
 */
baidu.fx.moveBy = function(element, distance, options) {
    if (!(element = baidu.dom.g(element))
        || baidu.dom.getStyle(element, "position") == "static"
        || typeof distance != "object") return null;

    var d = {};
    d.x = distance[0] || distance.x || 0;
    d.y = distance[1] || distance.y || 0;

    var fx = baidu.fx.move(element, baidu.object.extend(d, options||{}));

    return fx;
};

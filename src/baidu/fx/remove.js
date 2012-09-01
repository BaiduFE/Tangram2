/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.remove
 * @version: 2010-01-23
 */

///import baidu.fx.fadeOut;

///import baidu.dom.remove;
///import baidu.object.extend;

 
/**
 * 删除元素的时候使用fadeOut效果
 * @function
 * @grammar baidu.fx.remove(element, options)
 * @param       {string|HTMLElement}      element               元素或者元素的ID
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

baidu.fx.remove = function(element, options) {
    var afterFinish = options.onafterfinish ? options.onafterfinish : new Function();
    
    return baidu.fx.fadeOut(element, baidu.object.extend(options||{}, {
        onafterfinish: function(){
            baidu.dom.remove(this.element);
            afterFinish.call(this);
        }
    }));
};

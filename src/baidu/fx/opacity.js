/*
 * JavaScript framework: mz
 * Copyright (c) 2010 meizz, http://www.meizz.com/
 *
 * http://www.meizz.com/mz/license/ MIT-style license
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software
 */

///import baidu.dom.g;
///import baidu.dom.show;
///import baidu.browser.ie;
///import baidu.object.extend;

///import baidu.fx.create;

 
/**
 * 控制元素的透明度 渐变
 * @function
 * @grammar baidu.fx.opacity(element, options)
 * @param       {String|Object}           element               元素或者元素的ID
 * @param       {Object}                  options               选项。参数的详细说明如下表所示
 * @config      {Number}                  from                  0,//效果起始值。介于0到1之间的一个数字，默认为0。
 * @config      {Number}                  to                    1,//效果结束值。介于0到1之间的一个数字，默认为1。
 * @config      {Number}                  duration              500,//效果持续时间，默认值为500ms。
 * @config      {Number}                  interval              16, //动画帧间隔时间，默认值为16ms。
 * @config      {Function}                transition            function(schedule){return schedule;},时间线函数
 * @config      {Function}                onbeforestart         function(){},//效果开始前执行的回调函数
 * @config      {Function}                onbeforeupdate        function(){},//每次刷新画面之前会调用的回调函数
 * @config      {Function}                onafterupdate         function(){},//每次刷新画面之后会调用的回调函数
 * @config      {Function}                onafterfinish         function(){},//效果结束后会执行的回调函数
 * @config      {Function}                oncancel              function(){},//效果被撤销时的回调函数
 */

baidu.fx.opacity = function(element, options) {
    if (!(element = baidu.dom.g(element))) return null;

    options = baidu.object.extend({from: 0,to: 1}, options||{});

    var e = element;

    var fx = baidu.fx.create(e, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {
            baidu.dom.show(element);

            if (baidu.browser.ie) {
                this.protect("filter");
            } else {
                this.protect("opacity");
                this.protect("KHTMLOpacity");
            }

            this.distance = this.to - this.from;
        }

        //[Implement Interface] render
        ,render : function(schedule) {
            var n = this.distance * schedule + this.from;

            if(!baidu.browser.ie) {
                e.style.opacity = n;
                e.style.KHTMLOpacity = n;
            } else {
                e.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity:"+
                    Math.floor(n * 100) +")";
            }
        }
    }, options), "baidu.fx.opacity");

    return fx.launch();
};

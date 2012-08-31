/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 在匹配的元素集合中的每个元素上添加或删除一个或多个className，如果存在就删除一个className，不存在就添加。
 * @function 
 * @name baidu.dom().toggleClass()
 * @grammar baidu.dom(args).toggleClass(className)
 * @param {String} className 要添加或者删除的className名（多个用空格间隔）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类，取决于这个样式类是否存在或价值切换属性。
 即：如果存在（不存在）就删除（添加）一个类。

 */
/**
 * @description 在匹配的元素集合中的每个元素上添加或删除一个或多个className，如果存在就删除一个className，不存在就添加。
 * @function 
 * @name baidu.dom().toggleClass()
 * @grammar baidu.dom(args).toggleClass(className,switch)
 * @param {String} className 要添加或者删除的className名（多个用空格间隔）
 * @param {Boolean} switch 一个用来判断传入的className添加还是移除的 boolean 值。true则都添加，false则都删除。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 在匹配的元素集合中的每个元素上添加或删除一个或多个className，如果存在就删除一个className，不存在就添加。
 * @function 
 * @name baidu.dom().toggleClass()
 * @grammar baidu.dom(args).toggleClass(fn)
 * @param {Function} fn 用来返回在匹配的元素集合中的每个元素上用来切换的className的一个函数。接收元素的索引位置和元素旧的className作为参数。
 * @param {Boolean} switch 一个用来判断传入的className添加还是移除的 boolean 值。true则都添加，false则都删除。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").toggleClass(function(index, class),switch);
 */

///import baidu;
///import baidu.dom;
///import baidu.forEach;

baidu.dom.extend({
    toggleClass: function(value,status){
    	var type = typeof value;
        var status = (typeof status === 'undefined')? status : Boolean(status);

        if(arguments.length <= 0 ){
            baidu.forEach(this,function(item){
                item.className = '';
            });
        };

        switch(typeof value){
            case 'string':

                //对输入进行处理
                value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');

                var arr = value.split(' ');
                baidu.forEach(this, function(item){
                    var str = item.className;
                    for(var i = 0;i<arr.length;i++){

                        //有这个className
                        if(((' '+str+' ').indexOf(' '+arr[i]+' ') > -1)&&(typeof status === 'undefined')){
                            str = (' '+str+' ').replace(' '+arr[i]+' ',' ');
                            
                        }else if(((' '+str+' ').indexOf(' '+arr[i]+' ') === -1)&&(typeof status === 'undefined')){
                            str += ' '+arr[i];

                        }else if(((' '+str+' ').indexOf(' '+arr[i]+' ') === -1)&&(status === true)){
                            str += ' '+arr[i];

                        }else if(((' '+str+' ').indexOf(' '+arr[i]+' ') > -1)&&(status === false)){
                            str = str.replace(arr[i],'');
                        };
                    };
                    item.className = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
                });
            break;
            case 'function':

                baidu.forEach(this, function(item, index){
                    baidu.dom(item).toggleClass(value.call(item, index, item.className),status);
                });

            break;
            default:
            break;
        };

        return this;
    }
});

/// Tangram 1.x Code Start
//兼容老接口

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/toggleClass.js
 * author: berg
 * version: 1.0
 * date: 2010-07-06
 */

/**
 * 添加或者删除一个节点中的指定class，如果已经有就删除，否则添加
 * @name baidu.dom.toggleClass
 * @function
 * @grammar baidu.dom.toggleClass(element, className)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {String} className 指定的className。允许同时添加多个class，中间使用空白符分隔
 * @version 1.3
 * @remark
 * 
 * 传入多个class时，只要其中有一个class不在当前元素中，则添加所有class，否则删除所有class。
 */


///import baidu.dom.addClass;
///import baidu.dom.removeClass;
///import baidu.dom.hasClass;
baidu.dom.toggleClass = function (element, className) {
    if(baidu.dom.hasClass(element, className)){
        baidu.dom.removeClass(element, className);
    }else{
        baidu.dom.addClass(element, className);
    }
};
/// Tangram 1.x Code End

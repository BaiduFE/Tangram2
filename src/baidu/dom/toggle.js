/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.dom.show;
///import baidu.dom.hide;

/**
 * @description 显示或隐藏匹配的元素
 * @function 
 * @name baidu.dom().toggle()
 * @grammar baidu.dom(args).toggle()
 * @return {TangramDom} 之前匹配的TangramDom对象
 * @example 
 toggle方法是最简单的显示或者隐藏一个元素的方法，
 如果当前元素显示状态，则就会被隐藏；当前元素隐藏状态，则会被显示。

 示例代码：
 //HTML片段
 <div>元素</div>

 var div = baidu("div");

 //隐藏一个元素
 div.toggle();

 //再次显示这个元素
 div.toggle();

 //再次隐藏这个元素
 div.toggle();

 */

baidu.dom.extend({
    toggle: function(){
        return this.each(function(index, ele){
            if(ele.style && ele.style.display != 'none'){
                baidu.dom(ele).hide();
            }else{
                baidu.dom(ele).show();
            };
        });
    }
});

///import baidu.dom.g;

/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/toggle.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */
/**
 * 改变目标元素的显示/隐藏状态
 * @name baidu.dom.toggle
 * @function
 * @grammar baidu.dom.toggle(element)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @meta standard
 * @returns {HTMLElement} 目标元素
 */
baidu.dom.toggle = function (element) {
    element = baidu.dom.g(element);
    element.style.display = element.style.display == "none" ? "" : "none";

    return element;
};
/// Tangram 1.x Code End

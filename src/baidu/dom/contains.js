/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/contains.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */

///import baidu.dom;
///import baidu._util_.contains;

/**
 * @description 判断一个元素是否包含另一个元素
 * @name baidu.dom().contains()
 * @function
 * @grammar baidu.dom(args).contains(contained)
 * @param {HTMLElement|string} args 包含元素或元素的id
 * @param {HTMLElement|string} contained 被包含元素或元素的id
 * @meta standard
 * @see baidu.dom.intersect
 *             
 * @return {boolean} contained元素是否被包含于container元素的DOM节点上
 */
 
baidu.dom.extend({
    contains : function(contained) {
        var container = this[0];
            contained = baidu.dom(contained)[0];
        if(!container || !contained){return false;}
        return baidu._util_.contains(container, contained);
    }	
});
///import baidu.dom._g;

/// Tangram 1.x Code Start
baidu.dom.contains = function (container, contained) {
    var g = baidu.dom._g;
    return baidu._util_.contains(g(container), g(contained));
};
/// Tangram 1.x Code End
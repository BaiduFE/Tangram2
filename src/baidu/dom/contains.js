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
        contained = baidu.dom(contained);
        if(this.size() <= 0
            || contained.size() <= 0){
            return false;
        }
        var container = this[0];
        contained = contained[0];
        //fixme: 无法处理文本节点的情况(IE)
        return container.contains
            ? container != contained && container.contains(contained)
            : !!(container.compareDocumentPosition(contained) & 16);
    }	
});
/// Tangram 1.x Code Start
///import baidu.dom._g;
baidu.dom.contains = function (container, contained) {
    var g = baidu.dom._g;
    container = g(container);
    contained = g(contained);

    //fixme: 无法处理文本节点的情况(IE)
    return container.contains
        ? container != contained && container.contains(contained)
        : !!(container.compareDocumentPosition(contained) & 16);
};
/// Tangram 1.x Code End
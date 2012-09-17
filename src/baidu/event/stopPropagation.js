/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/stopPropagation.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */

///import baidu.event;

/**
 * 阻止事件传播
 * @name baidu.event.stopPropagation
 * @function
 * @grammar baidu.event.stopPropagation(event)
 * @param {Event} event 事件对象
 * @see baidu.event.stop,baidu.event.preventDefault
 */
baidu.event.stopPropagation = function (event) {
    event.originalEvent && (event = event.originalEvent);
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
};
/// Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 *
 * path: baidu/dom/g.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/11/17
 */

///import baidu.dom;

/**
 * @description 从文档中获取指定的DOM元素
 * @function 
 * @name baidu.dom.g
 * @grammar baidu.dom.g(id)
 * @param {String|Element} id 元素的ID名称或者直接传入元素本身
 * @return {Element} 如果传入的ID是不存在的则返回Null
 */

baidu.dom.g = function(id) {
    if (!id) return null; //修改IE下baidu.dom.g(baidu.dom.g('dose_not_exist_id'))报错的bug，by Meizz, dengping
    if ('string' == typeof id || id instanceof String) {
        return document.getElementById(id);
    } else if (id.nodeName && (id.nodeType == 1 || id.nodeType == 9)) {
        return id;
    }
    return null;
};

/// support magic - Tangram 1.x Code End
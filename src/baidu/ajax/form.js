/// Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/ajax/form.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */

///import baidu.ajax;
///import baidu.ajax.request;
///import baidu.url.escapeSymbol;

/**
 * @description 将一个表单用ajax方式提交
 * @function 
 * @name baidu.ajax.form
 * @grammar baidu.ajax.form(form[, options])
 * @param {Object} options 发送请求的选项参数
 * @param {Element} form 需要提交的表单元素
 * @param {Boolean} options.async 是否异步请求。默认为true（异步）
 * @param {String} options.username 用户名
 * @param {String} options.password 密码
 * @param {Object} options.headers 要设置的http request header
 * @param {function} options.replacer 对参数值特殊处理的函数,replacer(string value, string key)
 * @param {function} options.onsuccess 请求成功时触发，格式：function(XMLHttpRequest xhr, String responseText)
 * @param {function} options.onfailure 请求失败时触发，格式：function(XMLHttpRequest xhr)
 * @param {function} options.onbeforerequest 发送请求之前触发，格式：function(XMLHttpRequest xhr)
 * @param {function} options.on{STATUS_CODE} 当请求为相应状态码时触发的事件，如on302、on404、on500，function(XMLHttpRequest xhr)。3XX的状态码浏览器无法获取，4xx的，可能因为未知问题导致获取失败
 * @return {XMLHttpRequest} 返回发送请求的XMLHttpRequest对象
 */

baidu.ajax.form = function (form, options) {
    options = options || {};
    var elements    = form.elements,
        len         = elements.length,
        method      = form.getAttribute('method'),
        url         = form.getAttribute('action'),
        replacer    = options.replacer || function (value, name) {
            return value;
        },
        sendOptions = {},
        data = [],
        i, item, itemType, itemName, itemValue, 
        opts, oi, oLen, oItem;
        
    /**
     * 向缓冲区添加参数数据
     * @private
     */
    function addData(name, value) {
        data.push(name + '=' + value);
    }
    
    // 复制发送参数选项对象
    for (i in options) {
        if (options.hasOwnProperty(i)) {
            sendOptions[i] = options[i];
        }
    }
    
    for (i = 0; i < len; i++) {
        item = elements[i];
        itemName = item.name;
        
        // 处理：可用并包含表单name的表单项
        if (!item.disabled && itemName) {
            itemType = item.type;
            itemValue = baidu.url.escapeSymbol(item.value);
        
            switch (itemType) {
            // radio和checkbox被选中时，拼装queryString数据
            case 'radio':
            case 'checkbox':
                if (!item.checked) {
                    break;
                }
                
            // 默认类型，拼装queryString数据
            case 'textarea':
            case 'text':
            case 'password':
            case 'hidden':
            case 'select-one':
                addData(itemName, replacer(itemValue, itemName));
                break;
                
            // 多行选中select，拼装所有选中的数据
            case 'select-multiple':
                opts = item.options;
                oLen = opts.length;
                for (oi = 0; oi < oLen; oi++) {
                    oItem = opts[oi];
                    if (oItem.selected) {
                        addData(itemName, replacer(oItem.value, itemName));
                    }
                }
                break;
            }
        }
    }
    
    // 完善发送请求的参数选项
    sendOptions.data = data.join('&');
    sendOptions.method = form.getAttribute('method') || 'GET';
    
    // 发送请求
    return baidu.ajax.request(url, sendOptions);
};
/// Tangram 1.x Code End
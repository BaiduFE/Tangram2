/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getViewHeight.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */

///import baidu.page;
///import baidu.browser.ie;

/**
 * @description 获取页面视觉区域高度
 * @name baidu.page.getViewHeight
 * @function
 * @grammar baidu.page.getViewHeight()
 * @see baidu.page.getViewWidth
 * @meta standard
 * @return {number} 页面视觉区域高度
 */
baidu.page.getViewHeight = function () {
    var doc = document,
        ie = baidu.browser.ie || 1,
        client = doc.compatMode === 'BackCompat'
            && ie < 9 ? doc.body : doc.documentElement;
        //ie9浏览器需要取得documentElement才能取得到正确的高度
    return client.clientHeight;
};
/// support magic - Tangram 1.x Code End

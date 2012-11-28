///import baidu.lang.createSingle;
///import baidu.lang.Event;
///import baidu.lang.Class.$removeEventListener;

/// Tangram 1.x Code Start
//为兼容Tangram1.x的magic增加的接口
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/dragManager.js
 * author: rocy
 * version: 1.4.0
 * date: 2010/10/14
 */
/**
 * 拖曳管理器
 * @function
 * @param   {HTMLElement|ID}    element 被拖曳的元素
 * @param   {JSON}              options 拖曳配置项 {toggle, autoStop, interval, capture, range, ondragstart, ondragend, ondrag}
 * @return {DOMElement}                 可拖拽的元素
 * @private
 */
baidu.dom.ddManager = baidu.lang.createSingle({
    _targetsDroppingOver:{}
});
/// Tangram 1.x Code End

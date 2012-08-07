// Copyright (c) 2009-2012, Baidu Inc. All rights reserved.
//
// Licensed under the BSD License
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//      http://tangram.baidu.com/license.html
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Tangram
 * Copyright 2012 Baidu Inc. All rights reserved.
 *
 * @author meizz, dron, linlingyu, erik, berg, allstar
 * @modify 2012-05-20   meizz 转接到baidu.dom()做链头方法用
 */


/**
 * 声明 baidu 包
 *
 */

/**
 * @description 生成DOM操作链头
 * @function 
 * @name baidu()
 * @grammar baidu(selector[, context])
 * @param {String|null|Undefined} selector 非正常的对象
 * @return {$DOM} 空TangramDom对象
 * @meta standard
 */

/**
 * @description 从文档中获取指定的DOM元素
 * @function 
 * @name baidu.g
 * @grammar baidu.g(id)
 * @param {String|Element} id 元素的ID名称或者直接传入元素本身
 * @return {Element} 如果传入的ID是不存在的则返回Null
 */

/**
 * @description 创建一个空的TangramDom对象
 * @name baidu()
 * @function 
 * @grammer baidu("")
 * @param   {String}    selector    空字符串
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @name baidu()
 * @grammer baidu(null)
 * @param   {Null}      selector    null对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @name baidu()
 * @function 
 * @grammer baidu()
 * @param   {undefined} selector    undefined未定义
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu()
 * @grammer baidu(selector[, context])
 * @param   {String}        selector    CSS选择器字符串
 * @param   {Document}      context     [可选]指选择器的范围
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu()
 * @grammer baidu(HTMLElement)
 * @param   {HTMLElement}   HTMLElement DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu()
 * @grammer baidu(Array)
 * @param   {Array}         Array       一组DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu()
 * @grammer baidu(TangramDom)
 * @param   {TangramDom}    selector    TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 通过传入 HTMLString 创建TangramDom对象
 * @function 
 * @name baidu()
 * @grammer baidu(HTMLString)
 * @param   {String}   HTMLString
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 在dom.onready时运行指定函数
 * @function 
 * @name baidu()
 * @grammer baidu(fn)
 * @param   {Function}  fn   Function函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

var T,
    baidu = T = baidu || function(q, c) {
        return baidu.dom ? baidu.dom(q, c) : null;
    };

// 版本号
baidu.version = "2.0.0";

// baidu 对象的唯一标识（身份证号）
baidu.guid = "$BAIDU$";

// 对象唯一标识属性名
baidu.key = "tangram_guid";

// Tangram可能被放在闭包中
// 一些页面级别唯一的属性，需要挂载在window[baidu.guid]上
window[baidu.guid] = window[baidu.guid] || {};

// 20120709 mz 添加参数类型检查器，对参数做类型检测保护
baidu.paramCheck = baidu.paramCheck || function(){};

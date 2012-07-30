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

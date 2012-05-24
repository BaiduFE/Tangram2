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

/*
 * Tangram
 * Copyright 2012 Baidu Inc. All rights reserved.
 * @author:meizz, dron, erik, berg, allstar
 */


/**
 * 声明 baidu 包
 */
var T,
    baidu = T = baidu || function(q, c) {
        return baidu.dom ? baidu.dom(q, c) : null;
    };

// 版本号
baidu.version = "2.0.0";

// baidu 对象的唯一标识（身份证号）
baidu.guid = "$BAIDU$";

// Tangram可能被放在闭包中
// 一些页面级别唯一的属性，需要挂载在window[baidu.guid]上
window[baidu.guid] = window[baidu.guid] || {};

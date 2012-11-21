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
 * @fileoverview Tangram
 * Copyright 2012 Baidu Inc. All rights reserved.
 *
 * @author meizz, dron, linlingyu, erik, berg, allstar
 * @modify 2012-05-20   meizz 转接到baidu.dom()做链头方法用
 */


/*
 * 声明 baidu 包
 *
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
 * @function 
 * @name baidu()
 * @grammar baidu("")
 * @param   {String}    selector    空字符串
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu()
 * @grammar baidu(null)
 * @param   {Null}      selector    null对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu()
 * @grammar baidu()
 * @param   {undefined} selector    undefined未定义
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu()
 * @grammar baidu(selector[, context])
 * @param   {String}        selector    CSS选择器字符串
 * @param   {Document}      context     [可选]指选择器的范围
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @name baidu()
 * @function 
 * @grammar baidu(HTMLElement)
 * @param   {HTMLElement}   HTMLElement DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu()
 * @grammar baidu(Array)
 * @param   {Array}         Array       一组DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu()
 * @grammar baidu(TangramDom)
 * @param   {TangramDom}   TangramDom    TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 通过传入 HTMLString 创建TangramDom对象
 * @function 
 * @name baidu()
 * @grammar baidu(HTMLString)
 * @param   {String}     HTMLString    HTMLString
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 在dom.onready时运行指定函数
 * @function 
 * @name baidu()
 * @grammar baidu(fn)
 * @param   {Function} fn Function函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

var T,
    baidu = T = baidu || function(q, c) {
        return baidu.dom ? baidu.dom(q, c) : null;
    };

// 版本号
baidu.version = "2.0.0.3";

// baidu 对象的唯一标识（身份证号）
baidu.guid = "$BAIDU$";

// 对象唯一标识属性名
baidu.key = "tangram_guid";

// Tangram可能被放在闭包中
// 一些页面级别唯一的属性，需要挂载在window[baidu.guid]上
var _ = window[baidu.guid] = window[baidu.guid] || {};
(_.versions || (_.versions = [])).push(baidu.version);

// 20120709 mz 添加参数类型检查器，对参数做类型检测保护
baidu.check = baidu.check || function(){};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * @description 对语言层面的封装，包括类型判断、模块扩展、继承基类以及对象自定义事件的支持。
 * @name baidu.lang
 * @namespace baidu.lang
 */
 
baidu.lang = baidu.lang || {};

/**
 * @fileoverview forEach是ECMAScript 5 里的标准方法，而each不是标准；
 * 目前为了兼容jQuery保留baidu.each()，$.each()接口与标准的forEach有三大差异：
 *   1.iterator的参数forEach是value,index；
 *   2.forEach中iterator里的this默认是指向window；
 *   3.forEach中iterator返回false是不会中断迭代的
 * 因此添加baidu.forEach()接口，并且推行这个接口
 * @author meizz
 * @create 2012-08-30
 */

/**
 * @description 枚举目标对象中的每一个元素，进行指定函数操作
 * @function
 * @name baidu.forEach
 * @grammar baidu.forEach( enumerable, iterator[, context] )
 * @param   {Object}        enumerable      被枚举的对象（Array|ArrayLike|NodeList|String|Number）
 * @param   {Function}      iterator        遍历操作的函数，参数顺序iterator(value, index, object)
 * @param   {Object}        context         [可选]作用域
 * @return  {ArrayLike}     arrayLike
 */
 
baidu.forEach = function( enumerable, iterator, context ) {
    var i, n, t;

    if ( typeof iterator == "function" && enumerable) {

        // Array or ArrayLike or NodeList or String or ArrayBuffer
        n = typeof enumerable.length == "number" ? enumerable.length : enumerable.byteLength;
        if ( typeof n == "number" ) {

            // 20121030 function.length
            //safari5.1.7 can not use typeof to check nodeList - linlingyu
            if (Object.prototype.toString.call(enumerable) === "[object Function]") {
                return enumerable;
            }

            for ( i=0; i<n; i++ ) {

                t = enumerable[ i ] || (enumerable.charAt && enumerable.charAt( i ));

                // 被循环执行的函数，默认会传入三个参数(array[i], i, array)
                iterator.call( context || null, t, i, enumerable );
            }
        
        // enumerable is number
        } else if (typeof enumerable == "number") {

            for (i=0; i<enumerable; i++) {
                iterator.call( context || null, i, i, i);
            }
        
        // enumerable is json
        } else if (typeof enumerable == "object") {

            for (i in enumerable) {
                if ( enumerable.hasOwnProperty(i) ) {
                    iterator.call( context || null, enumerable[ i ], i, enumerable );
                }
            }
        }
    }

    return enumerable;
};




/*
 * @fileoverview
 * @name baidu.type
 * @author meizz
 * @create 2012-05-20
 * @modify 2012.6.29 mz 将baidu.isArray() 类似的接口直接在本文件中实现，并且为兼容老版本处理
 */

/**
 * @description 判断对象类型，返回值为全小写对象名
 * @function
 * @name baidu.type()
 * @grammar baidu.type( unknow[,match] )
 * @param   {Any}       unknow  任意类型的对象
 * @param   {String}    match   [可选]与对象类型作比较的字符串，这个参数如果赋值则.type()方法的返回值为布尔值，使用此种判断的效率只有 is* 系列的 1/7
 * @return  {String}            对应对象类型的字符串
 * @example 
    返回值
    基础类型：string , number , function , array , object , boolean , null
    其他类型：HTMLElement , Attribute , Text , Comment , Document , DocumentFragment

 */
baidu.type = (function() {
    var objectType = {},
        nodeType = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ],
        str = "Array Boolean Date Error Function Number RegExp String",
        retryType = {'object': 1, 'function': '1'},//解决safari对于childNodes算为function的问题
        toString = objectType.toString;

    // 给 objectType 集合赋值，建立映射
    baidu.forEach(str.split(" "), function(name) {
        objectType[ "[object " + name + "]" ] = name.toLowerCase();

        baidu[ "is" + name ] = function ( unknow ) {
            return baidu.type(unknow) == name.toLowerCase();
        }
    });

    // 方法主体
    return function ( unknow ) {
        var s = typeof unknow;
        return !retryType[s] ? s
            : unknow == null ? "null"
            : unknow._type_
                || objectType[ toString.call( unknow ) ]
                || nodeType[ unknow.nodeType ]
                || ( unknow == unknow.window ? "Window" : "" )
                || "object";
    };
})();

// extend
baidu.isDate = function( unknow ) {
    return baidu.type(unknow) == "date" && unknow.toString() != 'Invalid Date' && !isNaN(unknow);
};

baidu.isElement = function( unknow ) {
    return baidu.type(unknow) == "HTMLElement";
};

// 20120818 mz 检查对象是否可被枚举，对象可以是：Array NodeList HTMLCollection $DOM
baidu.isEnumerable = function( unknow ){
    return unknow != null
        && typeof unknow == "object"
        &&(typeof unknow.length == "number"
        || typeof unknow[0] != "undefined");
};

baidu.isNumber = function( unknow ) {
    return baidu.type(unknow) == "number" && isFinite( unknow );
};

// 20120903 mz 检查对象是否为一个简单对象 {}
baidu.isPlainObject = function(unknow) {
    var key,
        hasOwnProperty = Object.prototype.hasOwnProperty;

    if ( baidu.type(unknow) != "object" ) {
        return false;
    }

    //判断new fn()自定义对象的情况
    //constructor不是继承自原型链的
    //并且原型中有isPrototypeOf方法才是Object
    if ( unknow.constructor &&
        !hasOwnProperty.call(unknow, "constructor") &&
        !hasOwnProperty.call(unknow.constructor.prototype, "isPrototypeOf") ) {
        return false;
    }
    //判断有继承的情况
    //如果有一项是继承过来的，那么一定不是字面量Object
    //OwnProperty会首先被遍历，为了加速遍历过程，直接看最后一项
    for ( key in unknow ) {}
    return key === undefined || hasOwnProperty.call( unknow, key );
};

baidu.isObject = function( unknow ) {
    return typeof unknow === "function" || ( typeof unknow === "object" && unknow != null );
};


/*
 1-ELEMENT
 2-ATTRIBUTE
 3-TEXT
 4-CDATA
 5-ENTITY REFERENCE
 6-ENTITY
 7-PI (processing instruction)
 8-COMMENT
 9-DOCUMENT
10-DOCUMENT TYPE
11-DOCUMENT FRAGMENT
12-NOTATION
*/



/*
 * @fileoverview
 * @author meizz
 * @create 2010-01-23
 * @modify 2012-08-31 mz 添加深度clone和多对象拷贝策略
 */

/**
 * @description 拷贝某对象的所有属性/方法，并返回一个全新对象(非深度克隆)
 * @function
 * @name baidu.extend
 * @grammar baidu.extend(obj1[,objN])
 * @param   {Object} obj0,obj1,objN  每一个传入的对象
 * @return  {Object}                合并后的JS对象
 */

/**
 * @description 拷贝某对象的所有属性/方法；如果第一个参数为true，则进入深度克隆，并返回一个全新对象
 * @function
 * @name baidu.extend
 *
 * @grammar baidu.extend(depthClone, obj1[,objN])
 * @param   {Boolean}   depthClone  是否深度克隆的标识，默认为false，可以不传。
 * @param   {Object} obj0,obj1,objN  每一个传入的对象
 * @return  {Object}                合并后的JS对象
 */

baidu.extend = function(depthClone, object) {
    var second, options, key, src, copy,
        i = 1,
        n = arguments.length,
        result = depthClone || {},
        copyIsArray, clone;
    
    baidu.isBoolean( depthClone ) && (i = 2) && (result = object || {});
    !baidu.isObject( result ) && (result = {});

    for (; i<n; i++) {
        options = arguments[i];
        if( baidu.isObject(options) ) {
            for( key in options ) {
                src = result[key];
                copy = options[key];
                // Prevent never-ending loop
                if ( src === copy ) {
                    continue;
                }
                
                if(baidu.isBoolean(depthClone) && depthClone && copy
                    && (baidu.isPlainObject(copy) || (copyIsArray = baidu.isArray(copy)))){
                        if(copyIsArray){
                            copyIsArray = false;
                            clone = src && baidu.isArray(src) ? src : [];
                        }else{
                            clone = src && baidu.isPlainObject(src) ? src : {};
                        }
                        result[key] = baidu.extend(depthClone, clone, copy);
                }else if(copy !== undefined){
                    result[key] = copy;
                }
            }
        }
    }
    return result;
};
/* extend 策略
   1、第一个参数为 bool ，则进行克隆操作，返回聚合后对象的副本
   2、第一个参数为 true  时进行深度克隆；
   3、第一个参数为 false 时进行浅克隆；
   4、接受聚合的对象不是一个object时，返回 空对象
//*/



/*
 * @fileoverview
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * @description 创建链头对象，用于链式语法
 * @function
 * @name baidu.createChain
 * @grammar baidu.createChain(chainName[, fn[, constructor]])
 * @param   {String}    chainName   链头方法名，一般小写
 * @param   {Function}  fn          链头方法函数体
 * @param   {Function}  constructor 内部类的构造器
 * @return  {Object}                链头函数
 */
baidu.createChain = function(chainName, fn, constructor) {
    // 创建一个内部类名
    var className = chainName=="dom"?"$DOM":"$"+chainName.charAt(0).toUpperCase()+chainName.substr(1);
    var slice = Array.prototype.slice;

    // 构建链头执行方法
    var chain = baidu[chainName] = baidu[chainName] || fn || function(object) {
        return baidu.extend(object, baidu[chainName].fn);
    };

    // 扩展 .extend 静态方法，通过本方法给链头对象添加原型方法
    chain.extend = function(extended) {
        var method;

        // 直接构建静态接口方法，如 baidu.array.each() 指向到 baidu.array().each()
        for (method in extended) {
            chain[method] = function() {
                var id = arguments[0];

                // 在新版接口中，ID选择器必须用 # 开头
                chainName=="dom" && baidu.type(id)=="string" && (id = "#"+ id);

                var object = chain(id);
                var result = object[method].apply(object, slice.call(arguments, 1));

                // 老版接口返回实体对象 getFirst
                return baidu.type(result) == "$DOM" ? result.get(0) : result;
            }
        }
        return baidu.extend(baidu[chainName].fn, extended);
    };

    // 创建 链头对象 构造器
    baidu[chainName][className] = baidu[chainName][className] || constructor || function() {};

    // 给 链头对象 原型链做一个短名映射
    chain.fn = baidu[chainName][className].prototype;

    return chain;
};

/**
 * @description 将系统对象上的方法重写到 自定义对象上去（为链式语法准备）
 *
 * @function
 * @grammar baidu.overwrite(Class, list, fn)
 * @param   {Object}        Class   系统对象原型
 * @param   {Array}         list    需要重写的方法名列表
 * @param   {Function}      fn      被覆盖的函数
 * @return  {Function}              自定义的类
 */
baidu.overwrite = function(Class, list, fn) {
    for (var i = list.length - 1; i > -1; i--) {
        Class.prototype[list[i]] = fn(list[i]);
    }

    return Class;
};
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */


/**
 * @description 操作原生对象的方法
 * @name baidu.object 
 * @namespace
 */
baidu.object = baidu.object || {};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */




/**
 * @description 判断一个对象是不是字面量对象，即判断这个对象是不是由{}或者new Object类似方式创建
 * @name baidu.object.isPlain
 * @function
 * @grammar baidu.object.isPlain(source)
 * @param {Object} source 需要检查的对象
 * @remark
 * 事实上来说，在Javascript语言中，任何判断都一定会有漏洞，因此本方法只针对一些最常用的情况进行了判断
 *             
 * @return {Boolean} 检查结果
 */
baidu.object.isPlain  = baidu.isPlainObject;

/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */





/**
 * @description string对象链式语法的链头，操作字符串
 * @function 
 * @name baidu.string()
 * @grammar baidu.string(str)
 * @param {String} str 一个需要处理的字符串
 * @return {TangramString} 返回一个TangramString对象
 */

baidu.createChain('string',
    // 执行方法
    function(string){
        var type = baidu.type(string),
            str = new String(~'string|number'.indexOf(type) ? string : type),
            pro = String.prototype;
        baidu.forEach(baidu.string.$String.prototype, function(fn, key) {
            pro[key] || (str[key] = fn);
        });
        return str;
    }
);
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 删除目标字符串两端的空白字符
 * @function 
 * @name baidu.string().trim()
 * @grammar baidu.string(str).trim()
 * @return {String} 删除两端空白字符后的字符串
 */

/**
 * @description 删除目标字符串两端的空白字符
 * @function 
 * @name baidu.string.trim
 * @grammar baidu.string.trim(str)
 * @param {String} str 目标字符串
 * @return {String} 删除两端空白字符后的字符串
 */

baidu.string.extend({
    trim: function(){
        var trimer = new RegExp('(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)', 'g');
        return function(){
            return this.replace(trimer, '');
        }
    }()
});




/*
 * @fileoverview
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * @description array对象链式语法的链头
 * @name baidu.array
 * @function
 * @grammar baidu.array(array)
 * @param   {Array}         array   Array对象
 * @return  {TangramArray}          返回TangramArray对象，该对象被注入链式方法。
 */
baidu.createChain("array", function(array){
    var pro = baidu.array.$Array.prototype
        ,ap = Array.prototype
        ,key;

    baidu.type( array ) != "array" && ( array = [] );

    for ( key in pro ) {
        ap[key] || (array[key] = pro[key]);
    }

    return array;
});

// 对系统方法新产生的 array 对象注入自定义方法，支持完美的链式语法
baidu.overwrite(baidu.array.$Array, "concat slice".split(" "), function(key) {
    return function() {
        return baidu.array( Array.prototype[key].apply(this, arguments) );
    }
});


/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-21
 * @modify
 */
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 查询数组中指定元素的索引位置
 *
 * @name baidu.array.indexOf
 * @function
 * @grammar $Aarray.indexOf(match[, fromIndex])
 * @param   {Object}      match     匹配项
 * @param   {Number}      fromIndex 起始位置
 * @return  {Number}      被匹配项的下标
 */
/**
 * @description 查询数组中指定元素的索引位置
 *
 * @name baidu.array().indexOf()
 * @function
 * @grammar $Aarray.indexOf(match[, fromIndex])
 * @param   {Object}      match     匹配项
 * @param   {Number}      fromIndex 起始位置
 * @return  {Number}      被匹配项的下标
 */

baidu.array.extend({
    indexOf : function (match, fromIndex) {
        baidu.check(".+(,number)?","baidu.array.indexOf");
        var len = this.length;

        // 小于 0
        (fromIndex = fromIndex | 0) < 0 && (fromIndex = Math.max(0, len + fromIndex));

        for ( ; fromIndex < len; fromIndex++) {
            if(fromIndex in this && this[fromIndex] === match) {
                return fromIndex;
            }
        }
        
        return -1;
    }
});
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */






/**
 * @description 一个多用途的回调列表对象，提供了强大的的方式来管理回调函数列表
 * @function 
 * @name baidu.Callbacks()
 * @grammar baidu.Callbacks(flags)
 * @param {String} flags 一个用空格标记分隔的标志可选列表,用来改变回调列表中的行为
 * @return {Callbacks} 返回一个Callbacks对象
 */

/**
 * @description 回调列表中添加一个回调函数或回调函数的集合
 * @function 
 * @name baidu.Callbacks().add()
 * @grammar baidu.Callbacks().add(callbacks)
 * @param {Function|Array} callbacks 一个函数，或者一个函数数组用来添加到回调列表
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 禁用回调列表中的回调
 * @function 
 * @name baidu.Callbacks().disable()
 * @grammar baidu.Callbacks().disable()
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 判断当前列表是否被禁用
 * @function 
 * @name baidu.Callbacks().disabled()
 * @grammar baidu.Callbacks().disabled()
 * @return {Callbacks} 如果已经被禁用返回true，如果没有返回false。
 */

/**
 * @description 从列表中删除所有的回调
 * @function 
 * @name baidu.Callbacks().empty()
 * @grammar baidu.Callbacks().empty()
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 用给定的参数调用所有的回调
 * @function 
 * @name baidu.Callbacks().fire()
 * @grammar baidu.Callbacks().fire(arguments)
 * @param {Any} arguments 这个参数或参数列表传回给回调列表
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 确定如果回调至少已经调用一次
 * @function 
 * @name baidu.Callbacks().fired()
 * @grammar baidu.Callbacks().fired()
 * @param {Any|Boolean} arguments 这个参数或参数列表传回给回调列表
 * @return {Boolean} 如果被调用过一次，则返回true，没被调用过返回false
 */

/**
 * @description 访问给定的上下文和参数列表中的所有回调
 * @function 
 * @name baidu.Callbacks().fireWith()
 * @grammar baidu.Callbacks().fireWith([context][,args])
 * @param {Any} context 该列表中的回调被触发的上下文引用
 * @param {Any} args 一个参数或参数列表传回给回调列表
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 确定是否含有提供的回调列表
 * @function
 * @name baidu.Callbacks().has()
 * @grammar baidu.Callbacks().has(callback)
 * @param {Function} callback 判断是否含有的回调函数
 * @return {Boolean} 当含有该函数，返回true，不含有返回false
 */

/**
 * @description 锁定在其当前状态的回调列表
 * @function
 * @name baidu.Callbacks().lock()
 * @grammar baidu.Callbacks().lock()
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 判断是否已被锁定的回调列表
 * @function
 * @name baidu.Callbacks().locked()
 * @grammar baidu.Callbacks().locked()
 * @param {Function} callback 判断是否含有的回调函数
 * @return {Boolean} 当前列表已被锁定，返回true，没有锁定返回false
 */

/**
 * @description 删除回调或回调回调列表的集合
 * @function
 * @name baidu.Callbacks().remove()
 * @grammar baidu.Callbacks().remove(callbacks)
 * @param {Function|Array} callbacks 一个函数，或者一个函数数组，会被从回调列表中删除
 * @return {Callbacks} 返回当前的Callbacks对象
 */

baidu.createChain("Callbacks",
//copy from jquery 1.8.2,thanks for jquery

// 执行方法
function(options){

    // String to Object options format cache
    var optionsCache = {};

    // Convert String-formatted options into Object-formatted ones and store in cache
    function createOptions( options ) {
        var object = optionsCache[ options ] = {};
        baidu.forEach( options.split(/\s+/), function( flag, _ ) {
            object[ flag ] = true;
        });
        return object;
    };

    /*
     * Create a callback list using the following parameters:
     *
     *    options: an optional list of space-separated options that will change how
     *            the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *    once:            will ensure the callback list can only be fired once (like a Deferred)
     *
     *    memory:            will keep track of previous values and will call any callback added
     *                    after the list has been fired right away with the latest "memorized"
     *                    values (like a Deferred)
     *
     *    unique:            will ensure a callback can only be added once (no duplicate in the list)
     *
     *    stopOnFalse:    interrupt callings when a callback returns false
     *
     */
    // Convert options from String-formatted to Object-formatted if needed
    // (we check in cache first)
    options = typeof options === "string" ?
        ( optionsCache[ options ] || createOptions( options ) ) :
        baidu.extend( {}, options );

    var // Last fire value (for non-forgettable lists)
        memory,
        // Flag to know if list was already fired
        fired,
        // Flag to know if list is currently firing
        firing,
        // First callback to fire (used internally by add and fireWith)
        firingStart,
        // End of the loop when firing
        firingLength,
        // Index of currently firing callback (modified by remove if needed)
        firingIndex,
        // Actual callback list
        list = [],
        // Stack of fire calls for repeatable lists
        stack = !options.once && [],
        // Fire callbacks
        fire = function( data ) {
            memory = options.memory && data;
            fired = true;
            firingIndex = firingStart || 0;
            firingStart = 0;
            firingLength = list.length;
            firing = true;
            for ( ; list && firingIndex < firingLength; firingIndex++ ) {
                if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
                    memory = false; // To prevent further calls using add
                    break;
                }
            }
            firing = false;
            if ( list ) {
                if ( stack ) {
                    if ( stack.length ) {
                        fire( stack.shift() );
                    }
                } else if ( memory ) {
                    list = [];
                } else {
                    self.disable();
                }
            }
        },
        // Actual Callbacks object
        self = {
            // Add a callback or a collection of callbacks to the list
            add: function() {
                if ( list ) {
                    // First, we save the current length
                    var start = list.length;
                    (function add( args ) {
                        baidu.forEach( args, function( arg, _) {
                            if ( (typeof arg === 'function') && ( !options.unique || !self.has( arg ) ) ) {
                                list.push( arg );
                            } else if ( arg && arg.length ) {
                                // Inspect recursively
                                add( arg );
                            }
                        });
                    })( arguments );
                    // Do we need to add the callbacks to the
                    // current firing batch?
                    if ( firing ) {
                        firingLength = list.length;
                    // With memory, if we're not firing then
                    // we should call right away
                    } else if ( memory ) {
                        firingStart = start;
                        fire( memory );
                    }
                }
                return this;
            },
            // Remove a callback from the list
            remove: function() {
                if ( list ) {
                    baidu.forEach( arguments, function( arg, _ ) {
                        var index;
                        while( ( index = baidu.array(list).indexOf(arg,index) ) > -1 ) {
                            list.splice( index, 1 );
                            // Handle firing indexes
                            if ( firing ) {
                                if ( index <= firingLength ) {
                                    firingLength--;
                                }
                                if ( index <= firingIndex ) {
                                    firingIndex--;
                                }
                            }
                        }
                    });
                }
                return this;
            },
            // Control if a given callback is in the list
            has: function( fn ) {
                return baidu.array(list).indexOf(fn) > -1;
            },
            // Remove all callbacks from the list
            empty: function() {
                list = [];
                return this;
            },
            // Have the list do nothing anymore
            disable: function() {
                list = stack = memory = undefined;
                return this;
            },
            // Is it disabled?
            disabled: function() {
                return !list;
            },
            // Lock the list in its current state
            lock: function() {
                stack = undefined;
                if ( !memory ) {
                    self.disable();
                }
                return this;
            },
            // Is it locked?
            locked: function() {
                return !stack;
            },
            // Call all callbacks with the given context and arguments
            fireWith: function( context, args ) {
                args = args || [];
                args = [ context, args.slice ? args.slice() : args ];
                if ( list && ( !fired || stack ) ) {
                    if ( firing ) {
                        stack.push( args );
                    } else {
                        fire( args );
                    }
                }
                return this;
            },
            // Call all the callbacks with the given arguments
            fire: function() {
                self.fireWith( this, arguments );
                return this;
            },
            // To know if the callbacks have already been called at least once
            fired: function() {
                return !!fired;
            }
        };

    return self;
},
// constructor
function(){});
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */







/**
 * @description 提供应对延迟事件、异步调用的解决方案
 * @function 
 * @name baidu.Deferred()
 * @grammar baidu.Deferred()
 * @return {Deferred} 返回一个Deferred对象
 */

/**
 * @description 添加一个当延对象是无论成功失败都会被调用函数
 * @function 
 * @name baidu.Deferred().always()
 * @grammar baidu.Deferred().always( alwaysCallbacks )
 * @param {Function|Array} alwaysCallbacks 一个函数，或者函数数组
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 添加一个当延对象成功后会被调用函数
 * @function 
 * @name baidu.Deferred().done()
 * @grammar baidu.Deferred().done( doneCallbacks )
 * @param {Function|Array} doneCallbacks 一个函数，或者函数数组
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 添加一个当延对象失败后会被调用函数
 * @function 
 * @name baidu.Deferred().fail()
 * @grammar baidu.Deferred().fail( failCallbacks )
 * @param {Function|Array} failCallbacks 一个函数，或者函数数组
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 将当前Deferred对象的执行状态从"未完成"改为"已完成"，从而触发done()方法
 * @function 
 * @name baidu.Deferred().resolve()
 * @grammar baidu.Deferred().resolve([args])
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 将当前Deferred对象的执行状态从"未完成"改为"已完成"，从而触发done()方法，并根据给定的上下文和参数调用回调函数
 * @function 
 * @name baidu.Deferred().resolveWith()
 * @grammar baidu.Deferred().resolve(context[,args])
 * @param {Any} context 传递给回调函数的上下文
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 将当前Deferred对象的执行状态从"未完成"改为"已失败"，从而触发fail()方法
 * @function 
 * @name baidu.Deferred().reject()
 * @grammar baidu.Deferred().reject([args])
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 将当前Deferred对象的执行状态从"未完成"改为"已失败"，并根据给定的上下文和参数调用回调函数，从而触发fail()方法
 * @function 
 * @name baidu.Deferred().rejectWith()
 * @grammar baidu.Deferred().rejectWith(context[,args])
 * @param {Any} context 传递给回调函数的上下文
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 确定一个Deferred对象的当前状态
 * @function 
 * @name baidu.Deferred().state()
 * @grammar baidu.Deferred().state()
 * @return {Deferred} 返回当前的Deferred对象的状态，"pending"：未完成，“resolved”：被解决，“rejected”：被拒绝（失败）
 */

/**
 * @description 产生一个Promise对象，该对象为Deferred对象的精简对象，用户无法在外层通过resolve和reject方法改变状态
 * @function 
 * @name baidu.Deferred().promise()
 * @grammar baidu.Deferred().promise()
 * @return {Promise} 返回一个Promise对象
 */

/**
 * @description 传入Deferred对象（通常表示异步事件），提供一种方法来执行一个或多个Deferred对象的回调函数。
 * @function 
 * @name baidu.when()
 * @grammar baidu.when(deferreds)
 * @param {Deferred|Object} deferreds 一个或多个延迟对象，或者普通的Object。
 * @return {Deferred} 返回一个Deferred对象
 */

/**
 * @description 添加Deferred对象延迟成功或者失败时的调用
 * @function 
 * @name baidu.Deferred().then()
 * @grammar baidu.Deferred().then(doneCallbacks, failCallbacks)
 * @param {Function|Array} doneCallbacks 一个函数或函数数组，当延迟解决时调用
 * @param {Function|Array} failCallbacks 一个函数或函数数组，当延迟失败时调用
 * @return {Deferred} 返回一个Deferred对象
 */

/**
 * @description 当Deferred对象时生成进度通知时添加被访问处理程序
 * @function 
 * @name baidu.Deferred().progress()
 * @grammar baidu.Deferred().progress( progressCallbacks )
 * @param {Function|Array} progressCallbacks 一个函数或函数数组，当延迟解决时调用
 * @return {Deferred} 返回一个Deferred对象
 */

/**
 * @description 添加一个Promise对象延迟成功或者失败时的调用
 * @function 
 * @name baidu.Deferred().pipe()
 * @grammar baidu.Deferred().pipe(doneCallbacks, failCallbacks)
 * @param {Function|Array} doneCallbacks 一个函数或函数数组，当延迟解决时调用
 * @param {Function|Array} failCallbacks 一个函数或函数数组，当延迟失败时调用
 * @return {Promise} 返回一个Promise对象
 */

/**
 * @description 用来通知正在进行的延迟对象的回调函数
 * @function 
 * @name baidu.Deferred().notify()
 * @grammar baidu.Deferred().notify([args])
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 用来通知正在进行的延迟对象的回调函数
 * @function 
 * @name baidu.Deferred().notifyWith()
 * @grammar baidu.Deferred().notifyWith(context[,args])
 * @param {Any} context 传递给回调函数的上下文
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

baidu.createChain("Deferred",
//copy from jquery 1.8.2,thanks for jquery

// 执行方法
function( func ) {
    var core_slice = Array.prototype.slice;
    var tuples = [
            // action, add listener, listener list, final state
            [ "resolve", "done", baidu.Callbacks("once memory"), "resolved" ],
            [ "reject", "fail", baidu.Callbacks("once memory"), "rejected" ],
            [ "notify", "progress", baidu.Callbacks("memory") ]
        ],
        state = "pending",
        promise = {
            state: function() {
                return state;
            },
            always: function() {
                deferred.done( arguments ).fail( arguments );
                return this;
            },
            then: function( /* fnDone, fnFail, fnProgress */ ) {
                var fns = arguments;
                return baidu.Deferred(function( newDefer ) {
                    baidu.forEach( tuples, function( tuple, i ) {
                        var action = tuple[ 0 ],
                            fn = fns[ i ];
                        // deferred[ done | fail | progress ] for forwarding actions to newDefer
                        deferred[ tuple[1] ]( (typeof fn === 'function') ?
                            function() {
                                var returned = fn.apply( this, arguments );
                                if ( returned && ( typeof returned.promise === 'function') ) {
                                    returned.promise()
                                        .done( newDefer.resolve )
                                        .fail( newDefer.reject )
                                        .progress( newDefer.notify );
                                } else {
                                    newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
                                }
                            } :
                            newDefer[ action ]
                        );
                    });
                    fns = null;
                }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function( obj ) {
                return typeof obj === "object" ? baidu.extend( obj, promise ) : promise;
            }
        },
        deferred = {};

    // Keep pipe for back-compat
    promise.pipe = promise.then;

    // Add list-specific methods
    baidu.forEach( tuples, function( tuple,i ) {
        var list = tuple[ 2 ],
            stateString = tuple[ 3 ];

        // promise[ done | fail | progress ] = list.add
        promise[ tuple[1] ] = list.add;

        // Handle state
        if ( stateString ) {
            list.add(function() {
                // state = [ resolved | rejected ]
                state = stateString;

            // [ reject_list | resolve_list ].disable; progress_list.lock
            }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
        }

        // deferred[ resolve | reject | notify ] = list.fire
        deferred[ tuple[0] ] = list.fire;
        deferred[ tuple[0] + "With" ] = list.fireWith;
    });

    // Make the deferred a promise
    promise.promise( deferred );

    // Call given func if any
    if ( func ) {
        func.call( deferred, deferred );
    }

    baidu.extend(baidu,{
        // Deferred helper
        when: function( subordinate /* , ..., subordinateN */ ) {
            var i = 0,
                resolveValues = core_slice.call( arguments ),
                length = resolveValues.length,

                // the count of uncompleted subordinates
                remaining = length !== 1 || ( subordinate && (typeof subordinate.promise === 'function') ) ? length : 0,

                // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : baidu.Deferred(),

                // Update function for both resolve and progress values
                updateFunc = function( i, contexts, values ) {
                    return function( value ) {
                        contexts[ i ] = this;
                        values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
                        if( values === progressValues ) {
                            deferred.notifyWith( contexts, values );
                        } else if ( !( --remaining ) ) {
                            deferred.resolveWith( contexts, values );
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if ( length > 1 ) {
                progressValues = new Array( length );
                progressContexts = new Array( length );
                resolveContexts = new Array( length );
                for ( ; i < length; i++ ) {
                    if ( resolveValues[ i ] && (typeof resolveValues[ i ].promise ==='function') ) {
                        resolveValues[ i ].promise()
                            .done( updateFunc( i, resolveContexts, resolveValues ) )
                            .fail( deferred.reject )
                            .progress( updateFunc( i, progressContexts, progressValues ) );
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if ( !remaining ) {
                deferred.resolveWith( resolveContexts, resolveValues );
            }

            return deferred.promise();
        }    
    });

    // All done!
    return deferred;
},
// constructor
function(){});




/**
 * @description 在页面全局读取或写入指定值
 * @author meizz
 * @create 2012-07-25
 *
 * @function
 * @name baidu.global
 * @grammar baidu.global(key[, value[, overwrite]])
 * @param   {String}    key         被存储的变量名
 * @param   {Object}    value       [可选]需要存储的变量值
 * @param   {String}    overwrite   [可选]true 覆盖原值
 * @return  {Object}                该key对象的对象
 */
baidu.global = baidu.global || (function() {
    var me = baidu._global_ = window[ baidu.guid ],
        // 20121116 mz 在多个tangram同时加载时有互相覆写的风险
        global = me._ = me._ || {};

    return function( key, value, overwrite ) {
        if ( typeof value != "undefined" ) {
            overwrite || ( value = typeof global[ key ] == "undefined" ? value : global[ key ] );
            global[ key ] =  value;

        } else if (key && typeof global[ key ] == "undefined" ) {
            global[ key ] = {};
        }

        return global[ key ];
    }
})();




/*
 * @fileoverview
 * @name baidu.browser
 * @author meizz
 * @create 2012-06-29
 * @modify
 */

/**
 * @description 判断浏览器类型和特性的属性
 * @namespace
 * @name baidu.browser
 * @grammar baidu.browser.ie
 * @grammar baidu.browser.chrome
 * @grammar baidu.browser.firefox
 * @grammar baidu.browser.opera
 * @grammar baidu.browser.safari
 * @grammar baidu.browser.isGecko
 * @grammar baidu.browser.isStrict
 * @grammar baidu.browser.isWebkit
 */
baidu.browser = baidu.browser || function(){
    var ua = navigator.userAgent;
    
    var result = {
        isStrict : document.compatMode == "CSS1Compat"
        ,isGecko : /gecko/i.test(ua) && !/like gecko/i.test(ua)
        ,isWebkit: /webkit/i.test(ua)
    };

    try{/(\d+\.\d+)/.test(external.max_version) && (result.maxthon = + RegExp['\x241'])} catch (e){};

    // 蛋疼 你懂的
    switch (true) {
        case /msie (\d+\.\d+)/i.test(ua) :
            result.ie = document.documentMode || + RegExp['\x241'];
            break;
        case /chrome\/(\d+\.\d+)/i.test(ua) :
            result.chrome = + RegExp['\x241'];
            break;
        case /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) :
            result.safari = + (RegExp['\x241'] || RegExp['\x242']);
            break;
        case /firefox\/(\d+\.\d+)/i.test(ua) : 
            result.firefox = + RegExp['\x241'];
            break;
        
        case /opera(?:\/| )(\d+(?:\.\d+)?)(.+?(version\/(\d+(?:\.\d+)?)))?/i.test(ua) :
            result.opera = + ( RegExp["\x244"] || RegExp["\x241"] );
            break;
    }
           
    baidu.extend(baidu, result);

    return result;
}();
/*
baidu.browser.chrome = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;
baidu.browser.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;
baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;
baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);
baidu.browser.isStrict = document.compatMode == "CSS1Compat";
baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);
baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined;
baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp['\x241'] || RegExp['\x242']) : undefined;
try {
    if (/(\d+\.\d+)/.test(external.max_version)) {
        baidu.browser.maxthon = + RegExp['\x241'];
    }
} catch (e) {}
//*/




/*
 * @fileoverview
 * @author dron,meizz
 * @create 2012-06-13
 * @modify
 */

/**
 * @description 页面级唯一标识的方法
 * @function
 * @name baidu.id
 * @grammar baidu.id( [id[, command]] )
 * @param   {Object}        object      Object or id
 * @param   {String}        command     [可选] 操作名，若该字符不是指定操作符时将认为是指定 id
 * @return  {Object}        String or Object
 */
baidu.id = function() {
    var maps = baidu.global("_maps_id")
        ,key = baidu.key;

    baidu.global("_counter", 1, true);

    return function( object, command ) {
        var e
            ,str_1= baidu.isString( object )
            ,obj_1= baidu.isObject( object )
            ,id = obj_1 ? object[ key ] : str_1 ? object : "";

        // 第二个参数为 String
        if ( baidu.isString( command ) ) {
            switch ( command ) {
            case "get" :
                return obj_1 ? id : maps[id];
            break;
            case "remove" :
            case "delete" :
                if ( e = maps[id] ) {
                    // 20120827 mz IE低版本给 element[key] 赋值时会写入DOM树，因此在移除的时候需要使用remove
                    if (baidu.isElement(e) && baidu.browser.ie < 7) {
                        e.removeAttribute(key);
                    } else {
                        delete e[ key ];
                    }
                    delete maps[ id ];
                }
                return id;
            break;
            case "decontrol" : 
                !(e = maps[id]) && obj_1 && ( object[ key ] = id = baidu.id() );
                id && delete maps[ id ];
                return id;
            break;
            default :
                if ( str_1 ) {
                    (e = maps[ id ]) && delete maps[ id ];
                    e && ( maps[ e[ key ] = command ] = e );
                } else if ( obj_1 ) {
                    id && delete maps[ id ];
                    maps[ object[ key ] = command ] = object;
                }
                return command;
            }
        }

        // 第一个参数不为空
        if ( obj_1 ) {
            !id && (maps[ object[ key ] = id = baidu.id() ] = object);
            return id;
        } else if ( str_1 ) {
            return maps[ object ];
        }

        return "TANGRAM__" + baidu._global_._._counter ++;
    };
}();

baidu.id.key = "tangram_guid";

//TODO: mz 20120827 在低版本IE做delete操作时直接 delete e[key] 可能出错，这里需要重新评估，重写


/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * @description 将第二个 ArrayLike对象合并到第一个 ArrayLike 中去
 * 
 * @function
 * @name baidu.merge
 * @grammar baidu.merge(first,second)
 * @param   {Object}    first   第一个 ArrayLike
 * @param   {Object}    second  第二个 ArrayLike
 * @return              first   第一个对象
 */
baidu.merge = function(first, second) {
    var i = first.length,
        j = 0;

    if ( typeof second.length === "number" ) {
        for ( var l = second.length; j < l; j++ ) {
            first[ i++ ] = second[ j ];
        }

    } else {
        while ( second[j] !== undefined ) {
            first[ i++ ] = second[ j++ ];
        }
    }

    first.length = i;

    return first;
};


/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 去除数组中的重复项
 *
 * @name baidu.array.unique
 * @function
 * @grammar $Array.unique([fn])
 * @param   {Function}      fn  用于做除重对比的函数
 * @return  {Array}             已经除重后的数组
 */

/**
 * @description 去除数组中的重复项
 *
 * @name baidu.array().unique()
 * @function
 * @grammar $Array.unique([fn])
 * @param   {Function}      fn  用于做除重对比的函数
 * @return  {Array}             已经除重后的数组
 */
baidu.array.extend({
    unique : function (fn) {
        var len = this.length,
            result = this.slice(0),
            i, datum;
            
        if ('function' != typeof fn) {
            fn = function (item1, item2) {
                return item1 === item2;
            };
        }
        
        // 从后往前双重循环比较
        // 如果两个元素相同，删除后一个
        while (--len > 0) {
            datum = result[len];
            i = len;
            while (i--) {
                if (fn(datum, result[i])) {
                    result.splice(len, 1);
                    break;
                }
            }
        }

        len = this.length = result.length;
        for ( i=0; i<len; i++ ) {
            this[ i ] = result[ i ];
        }

        return this;
    }
});




/*
 * @fileoverview
 * @name baidu.query
 * @author meizz
 * @create 2012-05-30
 * @modify 2012-06-10 将大函数分拆成 query() 和 queryCombo()；使用 querySelectAll()；
 */

/**
 * @description 通过指定的CSS选择器取指定的DOM元素
 * 在用户选择使用 Sizzle 时会被覆盖成 Sizzle 方法
 * 目前这个简版的 selector 函数支持四种选择器 * #id .class tagName
 *
 * @function
 * @name baidu.query
 * @grammar baidu.query(selector[, context[, results]])
 * @param   {String}    selector    CSS选择器字符串
 * @param   {Document}  context     选择的范围
 * @param   {Array}     results     返回的结果对象（数组）
 * @return  {Array}                 筛选后的对象组
 */
baidu.query = baidu.query || (function(){
    var rId = /^(\w*)#([\w\-\$]+)$/
       ,rId0= /^#([\w\-\$]+)$/
       ,rTag = /^\w+$/
       ,rClass = /^(\w*)\.([\w\-\$]+)$/
       ,rComboClass = /^(\.[\w\-\$]+)+$/
       ,rDivider = /\s*,\s*/
       ,rSpace = /\s+/g
       ,slice = Array.prototype.slice;

    // selector: #id, .className, tagName, *
    function query(selector, context) {
        var t, x, id, dom, tagName, className, arr, list, array = [];

        // tag#id
        if (rId.test(selector)) {
            id = RegExp.$2;
            tagName = RegExp.$1 || "*";

            // 本段代码效率很差，不过极少流程会走到这段
            baidu.forEach(context.getElementsByTagName(tagName), function(dom) {
                dom.id == id && array.push(dom);
            });

        // tagName or *
        } else if (rTag.test(selector) || selector == "*") {
            baidu.merge(array, context.getElementsByTagName(selector));

        // .className
        } else if (rClass.test(selector)) {
            arr = [];
            tagName = RegExp.$1;
            className = RegExp.$2;
            t = " " + className + " ";
            // bug: className: .a.b

            if (context.getElementsByClassName) {
                arr = context.getElementsByClassName(className);
            } else {
                baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                    dom.className && (" " + dom.className + " ").indexOf(t) > -1 && (arr.push(dom));
                });
            }

            if (tagName && (tagName = tagName.toUpperCase())) {
                baidu.forEach(arr, function(dom) {
                    dom.tagName.toUpperCase() === tagName && array.push(dom);
                });
            } else {
                baidu.merge(array, arr);
            }
        
        // IE 6 7 8 里组合样式名(.a.b)
        } else if (rComboClass.test(selector)) {
            list = selector.substr(1).split(".");

            baidu.forEach(context.getElementsByTagName("*"), function(dom) {
                if (dom.className) {
                    t = " " + dom.className + " ";
                    x = true;

                    baidu.forEach(list, function(item){
                        t.indexOf(" "+ item +" ") == -1 && (x = false);
                    });

                    x && array.push(dom);
                }
            });
        }

        return array;
    }

    // selector 还可以是上述四种情况的组合，以空格分隔
    // @return ArrayLike
    function queryCombo(selector, context) {
        var a, s = selector, id = "__tangram__", array = [];

        // 在 #id 且没有 context 时取 getSingle，其它时 getAll
        if (!context && rId0.test(s) && (a=document.getElementById(s.substr(1)))) {
            return [a];
        }

        context = context || document;

        // 用 querySelectorAll 时若取 #id 这种唯一值时会多选
        if (context.querySelectorAll) {
            // 在使用 querySelectorAll 时，若 context 无id将貌似 document 而出错
            if (context.nodeType == 1 && !context.id) {
                context.id = id;
                a = context.querySelectorAll("#" + id + " " + s);
                context.id = "";
            } else {
                a = context.querySelectorAll(s);
            }
            return a;
        } else {
            if (s.indexOf(" ") == -1) {
                return query(s, context);
            }

            baidu.forEach(query(s.substr(0, s.indexOf(" ")), context), function(dom) { // 递归
                baidu.merge(array, queryCombo(s.substr(s.indexOf(" ") + 1), dom));
            });
        }

        return array;
    }

    return function(selector, context, results) {
        if (!selector || typeof selector != "string") {
            return results || [];
        }

        var arr = [];
        selector = selector.replace(rSpace, " ");
        results && baidu.merge(arr, results) && (results.length = 0);

        baidu.forEach(selector.indexOf(",") > 0 ? selector.split(rDivider) : [selector], function(item) {
            baidu.merge(arr, queryCombo(item, context));
        });

        return baidu.merge(results || [], baidu.array(arr).unique());
    };
})();






/**
 * @fileoverview DOM操作链式语法头
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom("")
 * @param   {String}    selector    空字符串
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(null)
 * @param   {Null}   null    null对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建一个空的TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom()
 * @param   {undefined} selector    undefined未定义
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(selector[, context])
 * @param   {String}        selector    CSS选择器字符串
 * @param   {Document}      context     [可选]指选择器的范围
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @name baidu.dom()
 * @function 
 * @grammar baidu.dom(HTMLElement)
 * @param   {HTMLElement}   HTMLElement DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(Array)
 * @param   {Array}         Array       一组DOM对象（包括Document）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 创建TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(TangramDom)
 * @param   {TangramDom}    selector    TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 通过传入 HTMLString 创建TangramDom对象
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(HTMLString)
 * @param   {String}        selector    HTMLString
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 在dom.onready时运行指定函数
 * @function 
 * @name baidu.dom()
 * @grammar baidu.dom(fn)
 * @param   {Function} fn Function函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.createChain("dom",

// method function


function(selector, context) {
    var e, me = new baidu.dom.$DOM(context);

    // Handle $(""), $(null), or $(undefined)
    if (!selector) {
        return me;
    }

    // Handle $($DOM)
    if (selector._type_ == "$DOM") {
        return selector;

    // Handle $(DOMElement)
    } else if (selector.nodeType || selector == selector.window) {
        me[0] = selector;
        me.length = 1;
        return me;

    // Handle $(Array) or $(Collection) or $(NodeList)
    } else if (selector.length && me.toString.call(selector) != "[object String]") {
        return baidu.merge(me, selector);

    } else if (typeof selector == "string") {
        // HTMLString
        if (selector.charAt(0) == "<" && selector.charAt(selector.length - 1) == ">" && selector.length > 2) {
            if ( baidu.dom.createElements ) {
                baidu.merge( me, baidu.dom.createElements( selector ) );
            }

        // baidu.query
        } else {
            baidu.query(selector, context, me);
        }
    
    // document.ready
    } else if (typeof selector == "function") {
        return me.ready ? me.ready(selector) : me;
    }

    return me;
},

// constructor
function(context) {
    this.length = 0;
    this._type_ = "$DOM";
    this.context = context || document;
}

).extend({

/**
 * @description 取得 TangramDom 对象里的 length
 * @name baidu.dom().size()
 * @function 
 * @grammar TangramDom.size()
 * @return  {Number}    TangramDom对象里DOM元素的个数
 * @example 
 直接获取baidu()方法所生成的TangramDom对象中的元素数量，也可以直接baidu(args).length 

 示例代码：
 //HTML片段
 <div>1</div>
 <div>2</div>

 //取得src属性
 baidu("div").size();  //2    
 */
    
    size: function() {
        return this.length;
    }

    ,splice : function(){}

    /**
     * @description 按指定序号返回TangramDom对象里的DOM元素，如果不传序号则返回所有的DOM对象
     * @name baidu.dom().get()
     * @function 
     * @grammar TangramDom.get([index])
     * @param   {Number}    index   序号
     * @return  {Array}     TangramDom对象里DOM元素
     */
    ,
    get: function(index) {

        if ( typeof index == "number" ) {
            return index < 0 ? this[this.length + index] : this[index];
        }

        return Array.prototype.slice.call(this, 0);
    }

    ,toArray: function(){
        return this.get();
    }

});

/*
 * @author meizz
 * @create 2012.08.28
 */



/**
 * @description 框架内一些私用方法的集合
 * @Object 
 * @name baidu._util_
 */


baidu._util_ = baidu._util_ || {};
/**
 * @author dron,wangxiao
 */






/**
 * @description 监听 documentDomReady 事件
 * @function 
 * @name baidu.dom().ready()
 * @grammar baidu.dom(args).ready(fn)
 * @param {Function} fn 事件回调函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

/**
 * @description 监听 documentDomReady 事件
 * @function 
 * @name baidu.dom.ready
 * @grammar baidu.dom.ready(fn)
 * @param {Function} fn 事件回调函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    ready: function(){

        var me = this,

            // The deferred used on DOM ready
            readyList,

            // Use the correct document accordingly with window argument (sandbox)
            document = window.document;

        // Is the DOM ready to be used? Set to true once it occurs.
        baidu._util_.isDomReady = false;

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        baidu._util_._readyWait = 1;

        // Hold (or release) the ready event
        baidu.dom.holdReady = function( hold ) {
            if ( hold ) {
                baidu._util_.readyWait++;
            } else {
                _ready( true );
            }
        };

        // Handle when the DOM is ready
        var _ready = function( wait ) {

            // Abort if there are pending holds or we're already ready
            if ( wait === true ? --baidu._util_.readyWait : baidu._util_.isDomReady ) {
                return;
            }

            // Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
            if ( !document.body ) {
                return setTimeout( _ready, 1 );
            }

            // Remember that the DOM is ready
            baidu._util_.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if ( wait !== true && --baidu._util_.readyWait > 0 ) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith( document );

            // Trigger any bound ready events
            if ( baidu.dom.trigger ) {
                baidu.dom( document ).trigger("ready").off("ready");
            }
        };

        var DOMContentLoaded = function() {
            if ( document.addEventListener ) {
                document.removeEventListener( "DOMContentLoaded", DOMContentLoaded, false );
                _ready();
            } else if ( document.readyState === "complete" ) {
                // we're here because readyState === "complete" in oldIE
                // which is good enough for us to call the dom ready!
                document.detachEvent( "onreadystatechange", DOMContentLoaded );
                _ready();
            }
        };

        var readyPromise = function( obj ) {
            if ( !readyList ) {

                readyList = baidu.Deferred();

                // Catch cases where $(document).ready() is called after the browser event has already occurred.
                // we once tried to use readyState "interactive" here, but it caused issues like the one
                // discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
                if ( document.readyState === "complete" ) {
                    // Handle it asynchronously to allow scripts the opportunity to delay ready
                    setTimeout( _ready, 1 );

                // Standards-based browsers support DOMContentLoaded
                } else if ( document.addEventListener ) {
                    // Use the handy event callback
                    document.addEventListener( "DOMContentLoaded", DOMContentLoaded, false );

                    // A fallback to window.onload, that will always work
                    window.addEventListener( "load", _ready, false );

                // If IE event model is used
                } else {
                    // Ensure firing before onload, maybe late but safe also for iframes
                    document.attachEvent( "onreadystatechange", DOMContentLoaded );

                    // A fallback to window.onload, that will always work
                    window.attachEvent( "onload", _ready );

                    // If IE and not a frame
                    // continually check to see if the document is ready
                    var top = false;

                    try {
                        top = window.frameElement == null && document.documentElement;
                    } catch(e) {}

                    if ( top && top.doScroll ) {
                        (function doScrollCheck() {
                            if ( !baidu._util_.isDomReady ) {

                                try {
                                    // Use the trick by Diego Perini
                                    // http://javascript.nwbox.com/IEContentLoaded/
                                    top.doScroll("left");
                                } catch(e) {
                                    return setTimeout( doScrollCheck, 50 );
                                }

                                // and execute any waiting functions
                                _ready();
                            }
                        })();
                    }
                }
            }
            return readyList.promise( obj );
        };

        return function( fn ) {

            // Add the callback
            readyPromise().done( fn );

            return me;
        }

    }()
});


/**
 * @author linlingyu  wangxiao
 */




baidu.support = baidu.support || function(){
    var div = document.createElement('div'),
        support,
        a, input;
    
    div.innerHTML = '<a href="/a" style="top:1px; float: left; opacity: .55">Tangram</a><input type="checkbox">';
    a = div.getElementsByTagName('A')[0];
    input = div.getElementsByTagName('input')[0];
    input.checked = true;
    
    support = {
        opacity: a.style.opacity === '0.55',
        cssFloat: !!a.style.cssFloat,
        noCloneChecked: input.cloneNode(true).checked,
        noCloneEvent: true
    };
    if (!div.addEventListener && div.attachEvent && div.fireEvent){
        div.attachEvent('onclick', function(){support.noCloneEvent = false;});
        div.cloneNode(true).fireEvent('onclick');
    }
    
    baidu(function(){
        var body = document.getElementsByTagName('body')[0],
            container = document.createElement('div'),
            div = document.createElement('div'),
            paddingMarginBorder = 'padding: 0; margin: 0; border: ',
            boundString = 'left: 0; top: 0; width: 0px; height: 0px; ',
            visibleString = boundString + paddingMarginBorder + '0; visibility: hidden;',
            styleString = boundString + paddingMarginBorder + '5px solid #000; position: absolute;',
            outer,
            inner,
            select,
            opt,
            table;
            
        container.style.cssText = 'position: static;' + visibleString;
        body.insertBefore(container, body.firstChild);
        container.appendChild(div);
        div.style.cssText = 'position: absolute;' + visibleString;
        div.innerHTML = '<div style="'+ styleString +'display: bloack;"><div style="'+ paddingMarginBorder +'0; display: block; overflow: hidden;"></div></div><table style="'+ styleString +'" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
        outer = div.firstChild;
        inner = outer.firstChild;
        table = outer.nextSibling;

        support.hasBorderWidth = inner.offsetTop >= 5;//opera
        support.hasTableCellBorderWidth = table.rows[0].cells[0].offsetTop >= 5;//ie,firefox
        
        inner.style.position = 'fixed';
        inner.style.top = '20px';

        support.fixedPosition = inner.offsetTop === 20 || inner.offsetTop === 15;

//author wangxiao start
        support.deleteExpando = true;

        // Test to see if it's possible to delete an expando from an element
        // Fails in Internet Explorer
        try {
            delete div.test;
        } catch( e ) {
            support.deleteExpando = false;
        }
    
        select = document.createElement( "select" );
        opt = select.appendChild( document.createElement("option") );

        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        support.optSelected = opt.selected;

        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        var input = div.getElementsByTagName("input")[ 0 ];

        // Make sure that if no value is specified for a checkbox
        // that it defaults to "on".
        // (WebKit defaults to "" instead)
        support.checkOn = ( input.value === "on" );

        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        support.htmlSerialize = !!div.getElementsByTagName("link").length;

        // IE strips leading whitespace when .innerHTML is used
        support.leadingWhitespace = ( div.firstChild.nodeType === 3 );

        support.getSetAttribute = div.className !== "t";
        support.pixelMargin = true;

        // Check box-sizing and margin behavior
        div.innerHTML = "";
        div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

        // NOTE: To any future maintainer, window.getComputedStyle was used here
        // instead of getComputedStyle because it gave a better gzip size.
        // The difference between window.getComputedStyle and getComputedStyle is
        // 7 bytes
        if ( window.getComputedStyle ) {            
            support.pixelMargin = ( window.getComputedStyle( div, null ) || {} ).marginTop !== "1%";
        };
 
        // Check if a radio maintains its value
        // after being appended to the DOM
        var input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";

        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        support.hrefNormalized = ( a.getAttribute("href") === "/a" );

        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        support.style = /top/.test(a.getAttribute("style"));

        // Tests for enctype support on a form(#6743)
        support.enctype = !!document.createElement("form").enctype; 

//author wangxiao end


//        inner.style.position = inner.style.top = '';
//        outer.style.overflow = 'hidden';
//        outer.style.position = 'relative';
        
        body.removeChild(container);
        container = div = outer = inner = table = null;
    });

    return support;
}();





/*
 * @fileoverview
 * @name baidu.event
 * @author meizz, dron
 * @create 2012-06-14
 * @modify
 */

/**
 * @description 对系统event对象进行封装，主要是解决浏览器兼容问题，并且做了功能增强
 * @function
 * @name baidu.event()
 * @grammar baidu.event([event])
 * @param   {Event}         event   系统 event 对象
 * @return  {TangramEvebt}          返回 new TangramEvent 对象
 */

/**
 * @description TangramDom集合触发 blur 事件
 * @function
 * @name baidu.dom().blur()
 * @grammar baidu.dom(args).blur()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 blur 事件监听
 * @function
 * @name baidu.dom().blur()
 * @grammar baidu.dom(args).blur([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 change 事件
 * @function
 * @name baidu.dom().change()
 * @grammar baidu.dom(args).change()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 change 事件监听
 * @function
 * @name baidu.dom().change()
 * @grammar baidu.dom(args).change([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 click 事件
 * @function
 * @name baidu.dom().click()
 * @grammar baidu.dom(args).click()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 click 事件监听
 * @function
 * @name baidu.dom().click()
 * @grammar baidu.dom(args).click([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 dblclick 事件
 * @function
 * @name baidu.dom().dblclick()
 * @grammar baidu.dom(args).dblclick()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 dblclick 事件监听
 * @function
 * @name baidu.dom().dblclick()
 * @grammar baidu.dom(args).dblclick([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 error 事件
 * @function
 * @name baidu.dom().error()
 * @grammar baidu.dom(args).error()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 error 事件监听
 * @function
 * @name baidu.dom().error()
 * @grammar baidu.dom(args).error([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 focus 事件
 * @function
 * @name baidu.dom().focus()
 * @grammar baidu.dom(args).focus()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 focus 事件监听
 * @function
 * @name baidu.dom().focus()
 * @grammar baidu.dom(args).focus([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发focusin 事件
 * @function
 * @name baidu.dom().focusin()
 * @grammar baidu.dom(args).focusin()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 focusin 事件监听
 * @function
 * @name baidu.dom().focusin()
 * @grammar baidu.dom(args).focusin([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发focusout事件
 * @function
 * @name baidu.dom().focusout()
 * @grammar baidu.dom(args).focusout()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 focusout 事件监听
 * @function
 * @name baidu.dom().focusout()
 * @grammar baidu.dom(args).focusout([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 keydown 事件
 * @function
 * @name baidu.dom().keydown()
 * @grammar baidu.dom(args).keydown()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 keydown 事件监听
 * @function
 * @name baidu.dom().keydown()
 * @grammar baidu.dom(args).keydown([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发keypress事件
 * @function
 * @name baidu.dom().keypress()
 * @grammar baidu.dom(args).keypress()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 keypress 事件监听
 * @function
 * @name baidu.dom().keypress()
 * @grammar baidu.dom(args).keypress([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 keyup 事件
 * @function
 * @name baidu.dom().keyup()
 * @grammar baidu.dom(args).keyup()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 keyup 事件监听
 * @function
 * @name baidu.dom().keyup()
 * @grammar baidu.dom(args).keyup([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 mousedown 事件
 * @function
 * @name baidu.dom().mousedown()
 * @grammar baidu.dom(args).mousedown()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 mousedown 事件监听
 * @function
 * @name baidu.dom().mousedown()
 * @grammar baidu.dom(args).mousedown([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 mouseenter 事件
 * @function
 * @name baidu.dom().mouseenter()
 * @grammar baidu.dom(args).mouseenter()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 mouseenter 事件监听
 * @function
 * @name baidu.dom().mouseenter()
 * @grammar baidu.dom(args).mouseenter([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 mouseleave 事件
 * @function
 * @name baidu.dom().mouseleave()
 * @grammar baidu.dom(args).mouseleave()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 mouseleave 事件监听
 * @function
 * @name baidu.dom().mouseleave()
 * @grammar baidu.dom(args).mouseleave([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 mousemove 事件
 * @function
 * @name baidu.dom().mousemove()
 * @grammar baidu.dom(args).mousemove()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 mousemove 事件监听
 * @function
 * @name baidu.dom().mousemove()
 * @grammar baidu.dom(args).mousemove([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 mouseout 事件
 * @function
 * @name baidu.dom().mouseout()
 * @grammar baidu.dom(args).mouseout()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 mouseout 事件监听
 * @function
 * @name baidu.dom().mouseout()
 * @grammar baidu.dom(args).mouseout([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 mouseover 事件
 * @function
 * @name baidu.dom().mouseover()
 * @grammar baidu.dom(args).mouseover()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 mouseover 事件监听
 * @function
 * @name baidu.dom().mouseover()
 * @grammar baidu.dom(args).mouseover([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 mouseup 事件
 * @function
 * @name baidu.dom().mouseup()
 * @grammar baidu.dom(args).mouseup()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 mouseup 事件监听
 * @function
 * @name baidu.dom().mouseup()
 * @grammar baidu.dom(args).mouseup([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 resize 事件
 * @function
 * @name baidu.dom().resize()
 * @grammar baidu.dom(args).resize()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 resize 事件监听
 * @function
 * @name baidu.dom().resize()
 * @grammar baidu.dom(args).resize([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 scroll 事件
 * @function
 * @name baidu.dom().scroll()
 * @grammar baidu.dom(args).scroll()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 scroll 事件监听
 * @function
 * @name baidu.dom().scroll()
 * @grammar baidu.dom(args).scroll([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 select 事件
 * @function
 * @name baidu.dom().select()
 * @grammar baidu.dom(args).select()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 select 事件监听
 * @function
 * @name baidu.dom().select()
 * @grammar baidu.dom(args).select([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 submit 事件
 * @function
 * @name baidu.dom().submit()
 * @grammar baidu.dom(args).submit()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 submit 事件监听
 * @function
 * @name baidu.dom().submit()
 * @grammar baidu.dom(args).submit([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 load 事件
 * @function
 * @name baidu.dom().load()
 * @grammar baidu.dom(args).load()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 load 事件监听
 * @function
 * @name baidu.dom().load()
 * @grammar baidu.dom(args).load([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 unload 事件
 * @function
 * @name baidu.dom().unload()
 * @grammar baidu.dom(args).unload()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 unload 事件监听
 * @function
 * @name baidu.dom().unload()
 * @grammar baidu.dom(args).unload([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合触发 contextmenu 事件
 * @function
 * @name baidu.dom().contextmenu()
 * @grammar baidu.dom(args).contextmenu()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description TangramDom集合添加 contextmenu 事件监听
 * @function
 * @name baidu.dom().contextmenu()
 * @grammar baidu.dom(args).contextmenu([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

baidu.createChain("event",

// 执行方法
function(){
    var lastEvt = {};
    return function( event, json ){
        switch( baidu.type( event ) ){
            // event
            case "object":
                return lastEvt.originalEvent === event ? lastEvt : ( lastEvt = new baidu.event.$Event( event ) );

            case "$Event":
                return event;

            // event type
            case "string" :
                var e = new baidu.event.$Event( event );
                typeof json == "object" && baidu.forEach( e, json );
                return e;
        }
    }
}(),

// constructor
function( event ){
    var e, t, f;
    var me = this;

    this._type_ = "$Event";

    if( typeof event == "object" && event.type ){
        me.originalEvent = e = event;

        baidu.forEach( "altKey bubbles button buttons cancelable clientX clientY ctrlKey commandKey currentTarget fromElement metaKey screenX screenY shiftKey toElement type view which triggerData".split(" "), function(item){
            me[ item ] = e[ item ];
        });

        me.target = me.srcElement = e.srcElement || (( t = e.target ) && ( t.nodeType == 3 ? t.parentNode : t ));
        me.relatedTarget = e.relatedTarget || (( t = e.fromElement ) && (t === me.target ? e.toElement : t ));

        me.keyCode = me.which = e.keyCode || e.which;

        // Add which for click: 1 === left; 2 === middle; 3 === right
        if( !me.which && e.button !== undefined )
            me.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );

        var doc = document.documentElement, body = document.body;

        me.pageX = e.pageX || (e.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc && doc.clientLeft || body && body.clientLeft || 0));
        me.pageY = e.pageY || (e.clientY + (doc && doc.scrollTop  || body && body.scrollTop  || 0) - (doc && doc.clientTop  || body && body.clientTop  || 0));

        me.data;
    }

    // event.type
    typeof event == "string" && ( this.type = event );

    // event.timeStamp
    this.timeStamp = new Date().getTime();
}

// 扩展两个常用方法
).extend({
    // 阻止事件冒泡
    stopPropagation : function() {
        var e = this.originalEvent;

        e && (e.stopPropagation ? e.stopPropagation() : e.cancelBubble = true);
    }

    // 阻止事件默认行为
    ,preventDefault : function() {
        var e = this.originalEvent;

        e && (e.preventDefault ? e.preventDefault() : e.returnValue = false);
    }
});



/**
 * @fileoverview
 * @name baidu.dom.each
 * @author meizz
 * @create 2012-06-05
 * @modify
 */

/**
 * @description 枚举当前 TangramDom 对象里的所有 DOM 元素，并执行指定的函数
 * 指定的函数参数（index[, dom]），函数里的 this 指向 DOM 元素
 * @function
 * @name baidu.dom().each()
 * @grammar baidu.dom(args).each(iterator)
 * @param   {Function}      iterator    迭代器
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象                tangramDom(this)
 * @example 
 
 
 示例代码：
 //HTML片段
 <div>1</div>
 <div>2</div>

 //取得src属性
 baidu("div").size();  //2     
 */

baidu.dom.extend({
    each : function (iterator) {
        baidu.check("function", "baidu.dom.each");
        var i, result,
            n = this.length;

        for (i=0; i<n; i++) {
            result = iterator.call( this[i], i, this[i], this );

            if ( result === false || result == "break" ) { break;}
        }

        return this;
    }
});








/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-18
 * @modify
 */

/**
 * @description 对 TangramDom 里的所有元素进行筛选匹配，返回匹配上的DOM元素数组
 * @name baidu.dom.match
 * @grammar baidu.dom.match(selector)
 * @grammar baidu.dom.match(tangramDom)
 * @grammar baidu.dom.match(HTMLElement)
 * @grammar baidu.dom.match(fn(index))
 *
 * @param   {ArrayLike}     array       被筛选的集合
 * @param   {String}        selector    CSS选择器
 * @return  {Array}         Array
 */
baidu.dom.match = function(){
    var reg = /^[\w\#\-\$\.\*]+$/,

        // 使用这个临时的 div 作为CSS选择器过滤
        div = document.createElement("DIV");
        div.id = "__tangram__";

    return function( array, selector, context ){
        var root, results = baidu.array();

        switch ( baidu.type(selector) ) {
            // 取两个 TangramDom 的交集
            case "$DOM" :
                for (var x=array.length-1; x>-1; x--) {
                    for (var y=selector.length-1; y>-1; y--) {
                        array[x] === selector[y] && results.push(array[x]);
                    }
                }
                break;

            // 使用过滤器函数，函数返回值是 Array
            case "function" :
                baidu.forEach(array, function(item, index){
                    selector.call(item, index) && results.push(item);
                });
                break;
            
            case "HTMLElement" :
                baidu.forEach(array, function(item){
                    item == selector && results.push(item);
                });
                break;

            // CSS 选择器
            case "string" :
                var da = baidu.query(selector, context || document);
                baidu.forEach(array, function(item){
                    if ( root = getRoot(item) ) {
                        var t = root.nodeType == 1
                            // in DocumentFragment
                            ? baidu.query(selector, root)
                            : da;

                        for (var i=0, n=t.length; i<n; i++) {
                            if (t[i] === item) {
                                results.push(item);
                                break;
                            }
                        }
                    }
                });
                results = results.unique();
                break;

            default :
                results = baidu.array( array ).unique();
                break;
        }
        return results;

    };

    function getRoot(dom) {
        var result = [], i;

        while(dom = dom.parentNode) {
            dom.nodeType && result.push(dom);
        }

        for (var i=result.length - 1; i>-1; i--) {
            // 1. in DocumentFragment
            // 9. Document
            if (result[i].nodeType == 1 || result[i].nodeType == 9) {
                return result[i];
            }
        }
        return null;
    }
}();



/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 根据 selector 检测匹配元素集合，如果其中至少有一个元素符合这个给定的表达式就返回true
 *
 * @function
 * @name baidu.dom().is()
 * @grammar baidu.dom(args).is(selector)
 * @param   {Object}            selector    选择器
 * @return  {Boolean}       是否符合条件
 */
baidu.dom.extend({
    is : function (selector) {
        return baidu.dom.match(this, selector).length > 0;
    }
});

/**
 * @author dron
 */



/**
 * @description 对指定的 TangramDom 集合派发指定的事件函数，不触发事件默认行为
 * @function 
 * @name baidu.dom().triggerHandler()
 * @grammar baidu.dom(args).triggerHandler(type[,data])
 * @param {String} type 事件类型
 * @param {Array} data 触发事件函数时携带的参数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    triggerHandler: function(type, triggerData){
        var eb = baidu._util_.eventBase;

        baidu.forEach(this, function(item){
            eb.fireHandler(item, type, triggerData);
        });

        return this;
    }
});


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/contains.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */



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





/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-12
 * @modify
 */

/**
 * @description 从元素本身开始，逐级向上级元素匹配，并返回最先匹配的元素
 *
 * @function
 * @name baidu.dom().closest()
 * @grammar baidu.dom(args).closest(selector)
 * @param   {Object}            selector    选择器
 * @param   {HTMLElement}       context     选择器适用范围
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    closest : function (selector, context) {
        var results = baidu.array();

        baidu.forEach ( this, function(dom) {
            var t = [dom];
            while ( dom = dom.parentNode ) {
                dom.nodeType && t.push( dom );
            }
            t = baidu.dom.match( t, selector, context );

            t.length && results.push(t[0]);
        });
        
        return baidu.dom( results.unique() );
    }
});

/**
 * @author dron
 */











baidu._util_.eventBase = function(){
    var eventsCache = {
        /*
            tangram-id: {
                eventName: [fn, fn...],
                eventName: [fn, fn...],
                ...
            },
            tangram-id: {
                eventName: [fn, fn...],
                eventName: [fn, fn...],
                ...
            },
            ...
        */
    };

    var proxyCache = {
        /*
            tangram-id: { eventName: 1, eventName: 1, ... },
            tangram-id: { eventName: 1, eventName: 1, ... },
            ...
         */
    };

    var ae = 

    window.addEventListener ? 
    function( target, name, fn ){
        target.addEventListener( name, fn, false );
    } : 

    window.attachEvent ?
    function( target, name, fn ){
        target.attachEvent( "on" + name, fn );
    } :

    function(){};

    var proxy = function( target, name, fnAry ){
        var id = baidu.id( target );
        var c = proxyCache[ id ] = proxyCache[ id ] || {};
        if( c[ name ] )
            return;
        c[ name ] = 1;

        var call = function( e ){
            var args = Array.prototype.slice.call( arguments, 1 );
                args.unshift( e = baidu.event( e )  );            
            
            if( !e.currentTarget )
                e.currentTarget = target;

            for(var i = 0, l = fnAry.length; i < l; i += 2)
                fnAry[i].apply( this, args );
        };

        ae( target, name, call );
    };

    var addEvent = function( target, name, fn, selector, data ){
        var call = function( e ){
            var t = baidu.dom( e.target ), args = arguments;
            if( data && !e.data ) 
                e.data = data;
            if( e.triggerData ) 
                [].push.apply( args, e.triggerData );
            if( !proxyEl )
                return e.result = fn.apply( target, args );

            var found = false;

            var callWithProxyEl = function(){
                for(var i = 0, l = proxyEl.length; i < l; i ++)
                    if(proxyEl.get(i).contains( e.target ))
                        return found = true, e.result = fn.apply( proxyEl[i], args );
            };

            for(var i = 0, r; i < 2; i ++){
                r = callWithProxyEl();
                if(found)
                    return r;
                buildProxyEl();
            }
        };

        var tangId = baidu.id( target );
        var c = eventsCache[ tangId ] || ( eventsCache[ tangId ] = {});
        var eventArray = c[ name ] || ( c[ name ] = [] );

        eventArray.push( call, fn );
        proxy( target, name, eventArray );

        var proxyEl = null;

        var buildProxyEl = function(){
            proxyEl = baidu.dom( selector, target );  
        };

        if(selector)
            buildProxyEl();

        return call;
    };

    var removeEvent = function( target, name, fn, selector ){
        var tangId;
        if( !( tangId = baidu.id( target, "get" ) ) ) 
            return ;
        
        var c = eventsCache[ tangId ] || ( eventsCache[tangId] = {});

        //fix _getEventsLength bug
        var fix_event = {
            'mouseenter':'mouseover',
            'mouseleave':'mouseout',
            'focusin':'focus',
            'focusout':'blur'
        };
        
        var eventArray = c[ name ] || ( c[ name ] = [] ) ;
        if(fix_event[ name ]) {
            c[ fix_event[ name ] ] = [];
        }

        for( var i = eventArray.length - 1, f; i >= 0; i-- )
            if( f = eventArray[i], f === fn )
                eventArray.splice( i - 1, 2 );
    };

    var removeAllEvent = function( target, name ){
        var tangId;
        if( !( tangId = baidu.id( target, "get" ) ) )
            return ;

        var c = eventsCache[tangId] || ( eventsCache[tangId] = {} );

        var remove = function( name ){
            var eventArray = c[ name ] || ( c[ name ] = [] );
            for ( var i = eventArray.length - 1, fn; i >= 0; i -= 2 ) 
                fn = eventArray[i],
                removeEvent( target, name, fn );
        };

        if( name )
            remove( name );
        else for( var name in c ) 
            remove( name );
    };

    var fireHandler = function( target, name, triggerData ){
        var tangId;
        if( !( tangId = baidu.id( target, "get" ) ) )
            return ;

        var c = eventsCache[tangId] || ( eventsCache[tangId] = {} );
        var eventArray = c[name] || ( c[name] = [] );
        var event = baidu.event({ type: name });
        var args = [ event ];

        if( triggerData )
            event.triggerData = triggerData,
            args.push.apply( args, triggerData );

        for( var i = 0, l = eventArray.length; i < l; i += 2 ) 
            eventArray[i].apply( this, args );
    };

    var getHandler = function( target ){
        var tangId;
        if( !( tangId = baidu.id( target, "get" ) ) ) 
            return ;
        
        var c = eventsCache[tangId] || ( eventsCache[tangId] = {} );
        var ret = {}, arr;

        for( var event in c ){
            arr = ret[ event ] = [];
            ce = c[ event ];
            for( var i = 1, l = ce.length; i < l; i += 2 ) 
                arr.push( ce[i] );
        }

        return ret;
    };

    var special = function( name )  {
        switch ( name )  {
            case "focusin":
            case "focusout":
                if ( !/firefox/i.test( navigator.userAgent ) ) 
                    return false;

                var object = {},
                    fixName = name == "focusin" ? "focus" : "blur";

                object[name] = function( data, fn ){
                    if( typeof data == "function" )
                        fn = data, 
                        data = null;

                    var me = this;

                    if( !fn ){
                        return this.triggerHandler( name, data );
                    }else{
                        var call = function(){
                            me.triggerHandler( name );
                        };

                        baidu.forEach( this, function( item ){
                            baidu( "textarea,select,input,button,a", item ).on( fixName, call );
                        });

                        return this._on( name, data, fn ), this;
                    }
                };

                return baidu.dom.extend( object ), true;

            case "mouseenter":
            case "mouseleave":
                if( /msie/i.test( navigator.userAgent ) )
                    return false;

                var object = {},
                    fixName = name == "mouseenter" ? "mouseover" : "mouseout";

                var contains = baidu.dom.contains;

                object[name] = function( data, fn ){

                    if( arguments.length == 0 )
                        return this.trigger( name );

                    if( typeof data == "function" )
                        fn = data,
                        data = null;

                    var me = this;
                    var call = function( event ){
                        related = event.relatedTarget;
                        if( !related || (related !== this && !contains( this, related )) )
                            me.triggerHandler( name );
                    };

                    baidu.forEach( this, function( item ){
                        this.on( fixName, call );
                    }, this );

                    return this._on( name, data, fn ), this;
                };

                return baidu.dom.extend( object ), true;
        }
        
        return false;
    };

    return {
        add: function( dom, event, fn, selector, data ){
            return addEvent( dom, event, fn, selector, data );
        },

        get: function( dom ){
            return getHandler( dom );
        },

        remove: function( dom, event, fn, selector ){
            var id;
            if( ( id = baidu.id( dom, "get" ) ) && fn && fn[ "_" + id + "_" + event ] )
                fn = fn[ "_" + id + "_" + event ],
                delete fn[ "_" + id + "_" + event ];

            if( typeof fn == "function" )
                return removeEvent( dom, event, fn, selector );
            else
                return removeAllEvent( dom, event, selector );
        },

        removeAll: function( dom ){
            return removeAllEvent( dom );
        },

        fireHandler: function( dom, event, triggerData ){
            return fireHandler( dom, event, triggerData );
        },

        method: function( name ){
            if( arguments.length > 1 ){
                for( var i = 0, l = arguments.length; i < l; i ++ ) 
                    this.method( arguments[i] );
                return this;
            }

            if( !special( name ) ){
                var object = {};

                object[ name ] = function( data, fn ){

                    if( arguments.length == 0 )
                        return this.trigger( name );
                    else{
                        if( typeof data == "function" )
                            fn = data,
                            data = null;
                        return this._on( name, data, fn );
                    }
                };

                baidu.dom.extend( object );
            }
        },
        
        _getEventsLength: function( tang, evtName ){
            var len = 0, item;
            if( tang ){
                item = eventsCache[ baidu.id( tang[0] || tang, "get" ) ];
                if( evtName )
                    item[ evtName ] && ( len = item[ evtName ].length );
                else for( var i in item )
                    len += item[ i ].length;
            }else for( var i in eventsCache ){
                item = eventsCache[ i ];
                for( var j in item )
                    len += item[ j ].length;
            }

            return len / 2;
        }
    }
}();

baidu._util_.eventBase.method(

/**
 * @description TangramDom集合触发 blur 事件
 * @function
 * @name baidu.dom().blur()
 * @grammar baidu.dom(args).blur()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 blur 事件监听
 * @function
 * @name baidu.dom().blur()
 * @grammar baidu.dom(args).blur([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"blur",

/**
 * @description TangramDom集合触发 change 事件
 * @function
 * @name baidu.dom().change()
 * @grammar baidu.dom(args).change()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 change 事件监听
 * @function
 * @name baidu.dom().change()
 * @grammar baidu.dom(args).change([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"change",

/**
 * @description TangramDom集合触发 click 事件
 * @function
 * @name baidu.dom().click()
 * @grammar baidu.dom(args).click()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 click 事件监听
 * @function
 * @name baidu.dom().click()
 * @grammar baidu.dom(args).click([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

 "click",

/**
 * @description TangramDom集合触发 dblclick 事件
 * @function
 * @name baidu.dom().dblclick()
 * @grammar baidu.dom(args).dblclick()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 dblclick 事件监听
 * @function
 * @name baidu.dom().dblclick()
 * @grammar baidu.dom(args).dblclick([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"dblclick",

/**
 * @description TangramDom集合触发 error 事件
 * @function
 * @name baidu.dom().error()
 * @grammar baidu.dom(args).error()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 error 事件监听
 * @function
 * @name baidu.dom().error()
 * @grammar baidu.dom(args).error([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"error",

/**
 * @description TangramDom集合触发 focus 事件
 * @function
 * @name baidu.dom().focus()
 * @grammar baidu.dom(args).focus()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 focus 事件监听
 * @function
 * @name baidu.dom().focus()
 * @grammar baidu.dom(args).focus([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"focus", 

/**
 * @description TangramDom集合触发focusin 事件
 * @function
 * @name baidu.dom().focusin()
 * @grammar baidu.dom(args).focusin()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 focusin 事件监听
 * @function
 * @name baidu.dom().focusin()
 * @grammar baidu.dom(args).focusin([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"focusin",

/**
 * @description TangramDom集合触发focusout事件
 * @function
 * @name baidu.dom().focusout()
 * @grammar baidu.dom(args).focusout()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 focusout 事件监听
 * @function
 * @name baidu.dom().focusout()
 * @grammar baidu.dom(args).focusout([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"focusout",

/**
 * @description TangramDom集合触发 keydown 事件
 * @function
 * @name baidu.dom().keydown()
 * @grammar baidu.dom(args).keydown()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 keydown 事件监听
 * @function
 * @name baidu.dom().keydown()
 * @grammar baidu.dom(args).keydown([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"keydown", 

/**
 * @description TangramDom集合触发keypress事件
 * @function
 * @name baidu.dom().keypress()
 * @grammar baidu.dom(args).keypress()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 keypress 事件监听
 * @function
 * @name baidu.dom().keypress()
 * @grammar baidu.dom(args).keypress([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"keypress", 

/**
 * @description TangramDom集合触发 keyup 事件
 * @function
 * @name baidu.dom().keyup()
 * @grammar baidu.dom(args).keyup()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 keyup 事件监听
 * @function
 * @name baidu.dom().keyup()
 * @grammar baidu.dom(args).keyup([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"keyup",

/**
 * @description TangramDom集合触发 mousedown 事件
 * @function
 * @name baidu.dom().mousedown()
 * @grammar baidu.dom(args).mousedown()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mousedown 事件监听
 * @function
 * @name baidu.dom().mousedown()
 * @grammar baidu.dom(args).mousedown([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

 "mousedown",

/**
 * @description TangramDom集合触发 mouseenter 事件
 * @function
 * @name baidu.dom().mouseenter()
 * @grammar baidu.dom(args).mouseenter()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseenter 事件监听
 * @function
 * @name baidu.dom().mouseenter()
 * @grammar baidu.dom(args).mouseenter([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"mouseenter", 

/**
 * @description TangramDom集合触发 mouseleave 事件
 * @function
 * @name baidu.dom().mouseleave()
 * @grammar baidu.dom(args).mouseleave()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseleave 事件监听
 * @function
 * @name baidu.dom().mouseleave()
 * @grammar baidu.dom(args).mouseleave([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"mouseleave", 

/**
 * @description TangramDom集合触发 mousemove 事件
 * @function
 * @name baidu.dom().mousemove()
 * @grammar baidu.dom(args).mousemove()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mousemove 事件监听
 * @function
 * @name baidu.dom().mousemove()
 * @grammar baidu.dom(args).mousemove([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"mousemove", 

/**
 * @description TangramDom集合触发 mouseout 事件
 * @function
 * @name baidu.dom().mouseout()
 * @grammar baidu.dom(args).mouseout()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseout 事件监听
 * @function
 * @name baidu.dom().mouseout()
 * @grammar baidu.dom(args).mouseout([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"mouseout",

/**
 * @description TangramDom集合触发 mouseover 事件
 * @function
 * @name baidu.dom().mouseover()
 * @grammar baidu.dom(args).mouseover()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseover 事件监听
 * @function
 * @name baidu.dom().mouseover()
 * @grammar baidu.dom(args).mouseover([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"mouseover",

/**
 * @description TangramDom集合触发 mouseup 事件
 * @function
 * @name baidu.dom().mouseup()
 * @grammar baidu.dom(args).mouseup()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseup 事件监听
 * @function
 * @name baidu.dom().mouseup()
 * @grammar baidu.dom(args).mouseup([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"mouseup", 

/**
 * @description TangramDom集合触发 resize 事件
 * @function
 * @name baidu.dom().resize()
 * @grammar baidu.dom(args).resize()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 resize 事件监听
 * @function
 * @name baidu.dom().resize()
 * @grammar baidu.dom(args).resize([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"resize",

/**
 * @description TangramDom集合触发 scroll 事件
 * @function
 * @name baidu.dom().scroll()
 * @grammar baidu.dom(args).scroll()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 scroll 事件监听
 * @function
 * @name baidu.dom().scroll()
 * @grammar baidu.dom(args).scroll([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

 "scroll", 

/**
 * @description TangramDom集合触发 select 事件
 * @function
 * @name baidu.dom().select()
 * @grammar baidu.dom(args).select()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 select 事件监听
 * @function
 * @name baidu.dom().select()
 * @grammar baidu.dom(args).select([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"select", 

/**
 * @description TangramDom集合触发 submit 事件
 * @function
 * @name baidu.dom().submit()
 * @grammar baidu.dom(args).submit()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 submit 事件监听
 * @function
 * @name baidu.dom().submit()
 * @grammar baidu.dom(args).submit([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"submit", 

/**
 * @description TangramDom集合触发 load 事件
 * @function
 * @name baidu.dom().load()
 * @grammar baidu.dom(args).load()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 load 事件监听
 * @function
 * @name baidu.dom().load()
 * @grammar baidu.dom(args).load([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"load",

/**
 * @description TangramDom集合触发 unload 事件
 * @function
 * @name baidu.dom().unload()
 * @grammar baidu.dom(args).unload()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 unload 事件监听
 * @function
 * @name baidu.dom().unload()
 * @grammar baidu.dom(args).unload([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"unload",

/**
 * @description TangramDom集合触发 contextmenu 事件
 * @function
 * @name baidu.dom().contextmenu()
 * @grammar baidu.dom(args).contextmenu()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 contextmenu 事件监听
 * @function
 * @name baidu.dom().contextmenu()
 * @grammar baidu.dom(args).contextmenu([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

"contextmenu" );
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
/**
 * @fileOverview 对当前 TangramDom 集合添加事件监听
 * @author dron
 */






/**
 * @description 对当前 TangramDom 集合添加事件监听
 * @function 
 * @name baidu.dom().on()
 * @grammar baidu.dom(args).on(events[,selector][,data][,fn])
 * @param {String} events 事件名称，如果是多个事件，以空格或半角逗号隔开
 * @param {String} selector 选择器表达式，用限制事件源对象范围，当符合表达式，才触发事件，此参数可选。
 * @param {Object} data 事件触发时携带的数据，JSON 格式，此参数可选。
 * @param {Function} fn 事件触发函数，fn 接受一个参数 e，为 baidu.event() 事件对象实例
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

/**
 * @description 对当前 TangramDom 集合添加事件监听
 * @function 
 * @name baidu.dom().on()
 * @grammar baidu.dom(args).on(eventsMap[,selector][,data])
 * @param {Object} eventsMap 一个用 eventName: eventFn 键值对表示的 JSON 格式对象
 * @param {String} selector 选择器表达式，用限制事件源对象范围，当符合表达式，才触发事件，此参数可选。
 * @param {Object} data 事件触发时携带的数据，JSON 格式，此参数可选。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */


baidu.dom.extend({
    on: function( events, selector, data, fn ){
        var eb = baidu._util_.eventBase;
        var specials = { mouseenter: 1, mouseleave: 1, focusin: 1, focusout: 1 };

        if( typeof selector == "object" && selector )
            fn = data,
            data = selector,
            selector = null;
        else if( typeof data == "function" )
            fn = data,
            data = null;
        else if( typeof selector == "function" )
            fn = selector,
            selector = data = null;

        if( typeof events == "string" ){
            events = events.split(/[ ,]+/);
            this.each(function(){
                baidu.forEach(events, function( event ){
                    if( specials[ event ] )
                        baidu( this )[ event ]( data, fn );
                    else
                        eb.add( this, event, fn, selector, data );
                }, this);
            });
        }else if( typeof events == "object" ){
            if( fn )
                fn = null;
            baidu.forEach(events, function( fn, eventName ){
                this.on( eventName, selector, data, fn );
            }, this);
        }

        return this;
    },

    _on: function( name, data, fn ){
        var eb = baidu._util_.eventBase;
        this.each(function(){
            eb.add( this, name, fn, undefined, data );
        });
        return this;
    }
});

/// support - magic Tangram 1.x Code Start

baidu.event.on = baidu.on = function(element, evtName, handler){
    element = baidu.dom.g(element);
    baidu.dom(element).on(evtName.replace(/^\s*on/, ''), handler);
    return element;
};
/// support - magic Tangram 1.x Code End












/**
 * @description 执行一个异步的ajax请求
 * @function 
 * @name baidu.ajax()
 * @grammar baidu.ajax(url[, options])
 * @param {String} url 用来发送请求的url字符串
 * @param {Object} options options参数
 * @param {Boolean} options.async 设置该次请求是一个异步请求或是同步，默认是异步请求
 * @param {function} options.beforeSend 发送请求之前的触发事件，事件函数第一参数接收tangramAjax对象，第二参数接收setting，即当次的ajax设置
 * @param {Boolean} options.cache 是否开启ajax缓存，默认true，当dataType为"script"和"jsonp"时默认为false，即不缓存
 * @param {function} options.complete 请求完成后的回调函数（请求成功与失败都回调），函数接收两个参数，tangramAjax对象和一个描述成功请求类型的字符串("success", "notmodified", "error","timeout", or "parsererror")
 * @param {Object} options.contents 一个以"{字符串:正则表达式}"配对的对象，用来确定ajax将如何解析响应，给定其内容类型
 * @param {String} options.contentType 发送信息至服务器时内容编码类型。默认值是"application/x-www-form-urlencoded"，适合大多数情况。如果你明确地传递了一个content-type给 baidu.ajax() 那么他必定会发送给服务器（即使没有数据要发送）。数据将总是使用UTF-8字符集传递给服务器；你必须译码这适当的在服务器端。
 * @param {Object} options.context 这个对象用于设置Ajax相关回调函数的上下文。也就是说，让回调函数内this指向这个对象（如果不设定这个参数，那么this就指向调用本次AJAX请求时传递的options参数）。比如指定一个DOM元素作为context参数，这样就设置了success回调函数的上下文为这个DOM元素。
 * @param {Object} options.converters 一个数据类型对数据类型转换器的对象。每个转换器的值是一个函数，返回响应的转化值，默认值是： {"* text": window.String, "text html": true, "text json": parseJSON, "text xml": parseXML}
 * @param {Boolean} options.crossDomain 同域请求为false， 跨域请求为true，如果你想强制跨域请求（如JSONP形式）同一域，设置crossDomain为true。这使得例如，服务器端重定向到另一个域
 * @param {Object|String} options.data 发送到服务器的数据。将自动转换为请求字符串格式。GET 请求中将附加在 URL 后。
 * @param {function} options.dataFilter 一个函数被用来处理XMLHttpRequest的原始响应数据。这是一个预过滤功能，净化响应。您应该返回安全数据。函数接收data和type两个参数：data是Ajax返回的原始数据，type是调用baidu.ajax时提供的dataType参数
 * @param {String} options.dataType 预期服务器返回的数据类型。如果不指定，将自动根据 HTTP 包 MIME 信息来智能判断，可用值：xml, html, script, json, jsonp, text
 * @param {function} options.error 请求失败时调用此函数，函数接收三个参数：tangramAjax, textStatus, errorThrown。textStatus是描述发生的错误类型的一个字符串，取值除了得到null之外，还可能是"timeout", "error", "abort" 和 "parsererror"。errorThrown是捕获的异常对象。注意：此处理程序不被跨域脚本和JSONP形式的请求调用。
 * @param {Object} options.headers 一个额外的"{键:值}"对映射到请求一起发送。此设置被设置之前beforeSend函数被调用;因此，消息头中的值设置可以在覆盖beforeSend函数范围内的任何设置。
 * @param {Boolean} options.ifModified 仅在服务器数据改变时获取新数据。使用 HTTP 包 Last-Modified 头信息判断。默认值false
 * @param {Boolean} options.isLocal 允许当前环境被认定为“本地”，（如文件系统）。以下协议目前公认为本地：file, *-extension, and widget。
 * @param {String} options.jsonp 在一个jsonp请求中重写回调函数的名字。这个值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分，比如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器。设置jsonp选项为false阻止了ajax从加入"?callback"字符串的URL或试图使用"=?"转换。在这种情况下，你也应该明确设置jsonpCallback设置。例如, { jsonp: false, jsonpCallback: "callbackName" }
 * @param {String|function} options.jsonpCallback 为jsonp请求指定一个回调函数名。这个值将用来取代ajax自动生成的随机函数名。这主要用来让ajax生成度独特的函数名，这样管理请求更容易，也能方便地提供回调函数和错误处理。你也可以在想让浏览器缓存GET请求的时候，指定这个回调函数名。
 * @param {String} options.mimeType 一个mime类型用来覆盖XHR的 MIME类型
 * @param {String} options.password 用于响应HTTP访问认证请求的密码
 * @param {Boolean} options.processData 默认情况下，通过data选项传递进来的数据，如果是一个对象(技术上讲只要不是字符串)，都会处理转化成一个查询字符串，以配合默认内容类型 "application/x-www-form-urlencoded"。如果要发送 DOM 树信息或其它不希望转换的信息，请设置为 false。
 * @param {String} options.scriptCharset 只有当请求时dataType为"jsonp"或"script"，并且type是"GET"才会用于强制修改charset。通常只在本地和远程的内容编码不同时使用。
 * @param {Object} options.statusCode 一组数值的HTTP代码和函数对象，当响应时调用了相应的代码。例如，如果响应状态是404，将触发以下警报：baidu.ajax(statusCode: {404: function(){}});
 * @param {function} options.success 请求成功后的回调函数。这个函数传递3个参数data, textStatus, tangramAjax：data从服务器返回的数据，并根据dataType参数进行处理后的数据，一个描述状态的字符串。
 * @param {Number} options.timeout 置请求超时时间（毫秒）。
 * @param {Boolean} options.traditional 如果你想要用传统的方式来序列化数据，那么就设置为true。
 * @param {String} options.type 请求方式 ("POST" 或 "GET")， 默认为 "GET"。
 * @param {Number} options.username 于响应HTTP访问认证请求的用户名
 * @param {function} options.xhr 回调创建XMLHttpRequest对象。当可用时默认为ActiveXObject（IE）中，否则为XMLHttpRequest。提供覆盖你自己的执行的XMLHttpRequest或增强工厂。
 * @param {Number} options.xhrFields 一对“文件名-文件值”在本机设置XHR对象。例如，如果需要的话，你可以用它来设置withCredentials为true的跨域请求。
 * @return {tangramAjax} 一个tangramAjax对象
 */
 
/**
 * @description 设置全局的AJAX请求默认选项
 * @function 
 * @name baidu.ajax.setup
 * @grammar baiud.ajax.setup(options)
 * @param {Object} options 用于设置AJAX的全局参数, 参见baidu.ajax()
 * @return {Object} 最终的options结果
 */
 
/**
 * @description 创建一个序列化的数组或对象，适用于一个URL 地址查询字符串或Ajax请求
 * @function 
 * @name baidu.ajax.param
 * @grammar baidu.ajax.param(obj[, traditional ])
 * @param {Object} obj 一个数组或序列化的对象
 * @param {Boolean} traditional 一个布尔值，指示是否执行了传统的“shallow”的序列化
 * @return {String} 序列化的结果
 */


void function(){
    var ajaxLocation = location.href,
        rlocalProtocol = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
        rprotocol = /^\/\//,
        rurl = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
        rhash = /#.*$/,
        rbracket = /\[\]$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rts = /([?&])_=[^&]*/,
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
        
        // JSON RegExp
        rvalidchars = /^[\],:{}\s]*$/,
        rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
        rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
        rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
        
        
        
        allTypes = ['*/'] + ['*'],
        
        prefilters = {},
        transports = {},
        
        lastModified = {},
        etag = {},
        
        
        
        ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];
        
    function parseXML(data){
        var xml, tmp;
        if (!data || baidu.type(data) !== 'string') {
            return null;
        }
        try {
            if ( window.DOMParser ) { // Standard
                tmp = new DOMParser();
                xml = tmp.parseFromString( data , "text/xml" );
            } else { // IE
                xml = new ActiveXObject( "Microsoft.XMLDOM" );
                xml.async = "false";
                xml.loadXML( data );
            }
        } catch( e ) {
            xml = undefined;
        }
        if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
            throw new Error( "Invalid XML: " + data );
        }
        return xml;
    }
    
    function parseJSON(data){
        if(!data || baidu.type(data) !== 'string'){return null;}
        data = baidu.string(data).trim();
        if ( window.JSON && window.JSON.parse ) {
            return window.JSON.parse( data );
        }
        if ( rvalidchars.test( data.replace( rvalidescape, "@" )
            .replace( rvalidtokens, ']')
            .replace( rvalidbraces, ''))) {

            return ( new Function( 'return ' + data ) )();

        }
        throw new Error( "Invalid JSON: " + data );
    }
    
    function globalEval( data ) {
        if ( data && /\S/.test( data ) ) {
            ( window.execScript || function( data ) {
                window[ "eval" ].call( window, data );
            } )( data );
        }
    }
    
    function toPrefiltersOrTransports(structure){
        return function(expression, func){
            if(baidu.type(expression) !== 'string'){
                func = expression;
                expression = '*';
            }
            var dataTypes = expression.toLowerCase().split(/\s+/),
                placeBefore, array;
            
            if(baidu.type(func) === 'function'){
                for(var i = 0, item; item = dataTypes[i]; i++){
                    placeBefore = /^\+/.test(item);
                    placeBefore && (item = item.substr(1) || '*');
                    array = structure[item] = structure[item] || [];
                    array[placeBefore ? 'unshift' : 'push'](func);
                }
            }
        };
    }
    
    
    function ajaxHandleResponses(opts, tangXHR, responses){
        var ct, type, finalDataType, firstDataType,
            contents = opts.contents,
            dataTypes = opts.dataTypes,
            responseFields = opts.responseFields;
        
        for ( type in responseFields ) {
            if ( type in responses ) {
                tangXHR[responseFields[type]] = responses[ type ];
            }
        }
        while(dataTypes[0] === '*'){
            dataTypes.shift();
            if (ct === undefined){
                ct = opts.mimeType || tangXHR.getResponseHeader('content-type');
            }
        }
        if(ct){
            for(type in contents ){
                if(contents[type] && contents[type].test(ct)){
                    dataTypes.unshift(type);
                    break;
                }
            }
        }
        if (dataTypes[0] in responses){
            finalDataType = dataTypes[0];
        } else {
            for (type in responses){
                if (!dataTypes[0] || opts.converters[type + ' ' + dataTypes[0]]){
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }
            finalDataType = finalDataType || firstDataType;
        }
        if(finalDataType){
            if(finalDataType !== dataTypes[0]){
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }
    
    function ajaxConvert(opts, response){
        var dataTypes = opts.dataTypes.slice(),
            prev = dataTypes[0],
            converters = {},
            conv, array;
            
            
            
        opts.dataFilter && (response = opts.dataFilter(response, opts.dataType));
        if(dataTypes[1]){
            for(var i in opts.converters){
                converters[i.toLowerCase()] = opts.converters[i];
            }
        }
        for(var i = 0, curr; curr = dataTypes[++i];){
            if(curr !== '*'){
                if(prev !== '*' && prev !== curr){
                    conv = converters[prev + ' ' + curr] || converters['* ' + curr];
                    if(!conv){
                        for(var key in converters){
                            array = key.split(' ');
                            if(array[1] === curr){
                                conv = converters[prev + ' ' + array[0]]
                                    || converters['* ' + array[0]];
                                if(conv){
                                    if(conv === true){
                                        conv = converters[key];
                                    }else if(converters[key] !== true){
                                        curr = array[0];
                                        dataTypes.splice(i--, 0, curr);
                                    }
                                    break;
                                }
                            }
                        }
                    }
                    
                    if(conv !== true){
                        if(conv && opts['throws']){
                            response = conv(response);
                        }else{
                            try{
                                response = conv(response);
                            }catch(e){
                                return { state: 'parsererror', error: conv ? e : 'No conversion from ' + prev + ' to ' + curr };
                            }
                        }
                    }
                }
                prev = curr;
            }
        }
        return { state: 'success', data: response };
    }
    
    
    function inspectPrefiltersOrTransports(structure, options, originalOptions, tangXHR, dataType, inspected){
        dataType = dataType || options.dataTypes[0];
        inspected = inspected || {};
        inspected[dataType] = true;
        
        var selection,
        list = structure[ dataType ],
        length = list ? list.length : 0,
        executeOnly = ( structure === prefilters );
        
        for (var i = 0; i < length && ( executeOnly || !selection ); i++ ) {
            selection = list[ i ]( options, originalOptions, tangXHR );
            if ( typeof selection === "string" ) {
                if ( !executeOnly || inspected[selection]){
                    selection = undefined;
                } else {
                    options.dataTypes.unshift(selection);
                    selection = inspectPrefiltersOrTransports(
                            structure, options, originalOptions, tangXHR, selection, inspected );
                }
            }
        }
        if ( ( executeOnly || !selection ) && !inspected['*'] ) {
            selection = inspectPrefiltersOrTransports(
                    structure, options, originalOptions, tangXHR, '*', inspected );
        }
        return selection;
    }
    
    baidu.createChain('ajax', function(url, options){
        if(baidu.object.isPlain(url)){
            options = url;
            url = undefined;
        }
        options = options || {};
        
        var opts = baidu.ajax.setup({}, options),
            callbackContext = opts.context || opts,
            fireGlobals,
            ifModifiedKey,
            parts,
            
            //tangXHR
            
            deferred = baidu.Deferred(),
            completeDeferred = baidu.Callbacks('once memory'),
            statusCode = opts.statusCode || {},
            
            state = 0,
            requestHeadersNames = {},
            requestHeaders = {},
            strAbort = 'canceled',
            responseHeadersString,
            responseHeaders,
            transport,
            //tangXHR
            //done
            
            //done
            tangXHR = baidu.extend(new baidu.ajax.$Ajax(url, opts), {
                readyState: 0,
                setRequestHeader: function(name, value){
                    if(!state){
                        var lname = name.toLowerCase();
                        name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
                        requestHeaders[ name ] = value;
                    }
                },
                getAllResponseHeaders: function(){
                    return state === 2 ? responseHeadersString : null;
                },
                
                getResponseHeader: function(key){
                    var match;
                    if(state === 2){
                        if(!responseHeaders){
                            responseHeaders = {};
                            while(match = rheaders.exec(responseHeadersString)){
                                responseHeaders[match[1].toLowerCase()] = match[2];
                            }
                        }
                        match = responseHeaders[key.toLowerCase()];
                    }
                    return match === undefined ? null : match;
                },
                
                overrideMimeType: function(type){
                    !state && (opts.mimeType = type);
                    return this;
                },
                
                abort: function(statusText){
                    statusText = statusText || strAbort;
                    transport && transport.abort(statusText);
                    done(0, statusText);
                    return this;
                }
            });
        var timeoutTimer;
        
        
        function done(status, nativeStatusText, responses, headers){
            var statusText = nativeStatusText,
                isSuccess, success, error, response, modified;
            if(state === 2){return;}
            state = 2;
            timeoutTimer && clearTimeout(timeoutTimer);
            transport = undefined;
            responseHeadersString = headers || '';
            tangXHR.readyState = status > 0 ? 4 : 0;
            responses && (response = ajaxHandleResponses(opts, tangXHR, responses));
            
            if(status >= 200 && status < 300 || status === 304){
                if(opts.ifModified){
                    modified = tangXHR.getResponseHeader('Last-Modified');
                    modified && (lastModified[ifModifiedKey] = modified);
                    modified = tangXHR.getResponseHeader('Etag');
                    modified && (etag[ifModifiedKey] = modified);
                }
                if(status === 304){
                    statusText = 'notmodified';
                    isSuccess = true;
                }else{
                    isSuccess = ajaxConvert(opts, response);
                    statusText = isSuccess.state;
                    success = isSuccess.data;
                    error = isSuccess.error;
                    isSuccess = !error;
                }
            }else{
                error = statusText;
                if(!statusText || status){
                    statusText = 'error';
                    status < 0 && (status = 0);
                }
            }
            
            tangXHR.status = status;
            tangXHR.statusText = '' + (nativeStatusText || statusText);
            
            if(isSuccess){
                deferred.resolveWith(callbackContext, [success, statusText, tangXHR]);
            }else{
                deferred.rejectWith(callbackContext, [tangXHR, statusText, error]);
            }
            tangXHR.statusCode(statusCode);
            statusCode = undefined;
            
//            fireGlobals && globalEventContext.trigger('ajax' + (isSuccess ? 'Success' : 'Error'),
//                        [tangXHR, opts, isSuccess ? success : error]);
            completeDeferred.fireWith(callbackContext, [tangXHR, statusText]);
            //TODO ajaxComplete event;
        }
        
        deferred.promise(tangXHR);
        tangXHR.success = tangXHR.done;
        tangXHR.error = tangXHR.fail;
        tangXHR.complete = completeDeferred.add;
        
        tangXHR.statusCode = function(map){
            if(map){
                if(state < 2){
                    for(var i in map){
                        statusCode[i] = [statusCode[i], map[i]];
                    }
                }else{
                    tangXHR.always(map[tangXHR.status]);
                }
            }
            return this;
        };
        
        //if url is window.location must + ''
        opts.url = ((url || opts.url) + '').replace(rhash, '').replace(rprotocol, ajaxLocParts[1] + '//');
        opts.dataTypes = baidu.string(opts.dataType || '*').trim().toLowerCase().split(/\s+/);
        // Determine if a cross-domain request is in order
        if (opts.crossDomain == null){
            parts = rurl.exec(opts.url.toLowerCase());
            opts.crossDomain = !!(parts && (parts[1] != ajaxLocParts[1] || parts[2] != ajaxLocParts[2]
                || (parts[3] || (parts[1] === 'http:' ? 80 : 443)) !=
                    (ajaxLocParts[3] || (ajaxLocParts[1] === 'http:' ? 80 : 443))));
        }
        if(opts.data && opts.processData && baidu.type(opts.data) !== 'string'){
            opts.data = baidu.ajax.param(opts.data, opts.traditional );
        }
        
        inspectPrefiltersOrTransports(prefilters, opts, options, tangXHR);//运行prefilter()
        
        if(state === 2){return '';/*jqXHR*/}
        fireGlobals = opts.global;
        opts.type = opts.type.toUpperCase();
        opts.hasContent = !rnoContent.test(opts.type);
        
        //trigger ajaxStart start;
        //trigger ajaxStart end;
        if(!opts.hasContent){
            if(opts.data){
                opts.url += (~opts.url.indexOf('?') ? '&' : '?') + opts.data;
                delete opts.data;
            }
            ifModifiedKey = opts.url;
            if(opts.cache === false){
                var now = new Date().getTime(),
                    ret = opts.url.replace(rts, '$1_=' + now);
                opts.url = ret + (ret === opts.url ? (~opts.url.indexOf('?') ? '&' : '?') + '_=' + now : '');
            }
        }
        if(opts.data && opts.hasContent && opts.contentType !== false
            || options.contentType){
                tangXHR.setRequestHeader('Content-Type', opts.contentType);
        }
        if(opts.ifModified){
            ifModifiedKey = ifModifiedKey || opts.url;
            lastModified[ifModifiedKey]
                && tangXHR.setRequestHeader('If-Modified-Since', lastModified[ifModifiedKey]);
            etag[ifModifiedKey]
                && tangXHR.setRequestHeader('If-None-Match', etag[ifModifiedKey]);
        }
        
        tangXHR.setRequestHeader('Accept',
            opts.dataTypes[0] && opts.accepts[opts.dataTypes[0]] ?
                opts.accepts[opts.dataTypes[0]] + (opts.dataTypes[0] !== '*' ? ', ' + allTypes + '; q=0.01' : '')
                    : opts.accepts['*']);
        
        for(var i in opts.headers){
            tangXHR.setRequestHeader(i, opts.headers[i]);
        }
        if(opts.beforeSend && (opts.beforeSend.call(callbackContext, tangXHR, opts) === false || state === 2)){
            return tangXHR.abort();
        }
        strAbort = 'abort';
        for(var i in {success: 1, error: 1, complete: 1}){
            tangXHR[i](opts[i]);
        }
        transport = inspectPrefiltersOrTransports(transports, opts, options, tangXHR);
        if(!transport){
            done(-1, 'No Transport');
        }else{
            tangXHR.readyState = 1;
            //TODO trigger ajaxSend
            if(opts.async && opts.timeout > 0){
                timeoutTimer = setTimeout(function(){
                    tangXHR.abort('timeout')
                }, opts.timeout);
            }
            try{
                state = 1;
                transport.send(requestHeaders, done);
            }catch(e){
                if(state < 2){
                    done(-1, e);
                }else{
                    throw e;
                }
            }
        }
        return tangXHR;
    }, function(url, options){
        this.url = url;
        this.options = options;
    });
    
    baidu.ajax.settings = {
       url: ajaxLocation,
        isLocal: rlocalProtocol.test(ajaxLocParts[1]),
        global: true,
        type: 'GET',
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
        processData: true,
        async: true,
        /*
        timeout: 0,
        data: null,
        dataType: null,
        username: null,
        password: null,
        cache: null,
        throws: false,
        traditional: false,
        headers: {},
        */
        accepts: {
            xml: 'application/xml, text/xml',
            html: 'text/html',
            text: 'text/plain',
            json: 'application/json, text/javascript',
            '*': allTypes
        },
        contents: {
            xml: /xml/,
            html: /html/,
            json: /json/
        },
        responseFields: {
            xml: 'responseXML',
            text: 'responseText'
        },
        converters: {
            '* text': window.String,
            'text html': true,
            'text json': parseJSON,
            'text xml': parseXML
        },
        flatOptions: {
            context: true,
            url: true
        }
    };
    //
    function ajaxExtend(target, src){
        var flatOpt = baidu.ajax.settings.flatOptions || {},
            deep;
        for(var i in src){
            if(src[i] !== undefined){
                (flatOpt[i] ? target : (deep || (deep = {})))[i] = src[i]
            }
        }
        deep && baidu.extend(true, target, deep);
    }
    
    baidu.ajax.setup = function(target, settings){
        if(settings){
            ajaxExtend(target, baidu.ajax.settings);
        }else{
            settings = target;
            target = baidu.ajax.settings;
        }
        ajaxExtend(target, settings);
        return target;
    };
    
    //
    
    function addParam(array, key, val){
        val = baidu.type(val) === 'function' ? val() : (val || '');
        array.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
    }
    function buildParams(array, key, val, traditional){
        if(baidu.type(val) === 'array'){
            baidu.forEach(val, function(item, index){
                if(traditional || rbracket.test(key)){
                    addParam(array, key, item);
                }else{
                    buildParams(array, key + '[' + (typeof item === 'object' ? index : '') + ']', item, traditional);
                }
            });
        }else if(!traditional && baidu.type(val) === "object"){
            for(var i in val){
                buildParams(array, key + '[' + i + ']', val[i], traditional);
            }
        }else{
            addParam(array, key, val);
        }
    }
    
    baidu.ajax.param = function(src, traditional){
        var ret = [];
        if(baidu.type(src) === 'array'){
            baidu.forEach(src, function(item){
                addParam(ret, item.name, item.value);
            });
        }else{
            for(var i in src){
                buildParams(ret, i, src[i], traditional);
            }
        }
        return ret.join('&').replace(/%20/g, '+');
    };
    
    baidu.ajax.prefilter = toPrefiltersOrTransports(prefilters);
    baidu.ajax.transport = toPrefiltersOrTransports(transports);
    
    //jsonp
    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/,
        nonce = new Date().getTime();
    baidu.ajax.setup({
        jsonp: 'callback',
        jsonpCallback: function(){
            var callback = oldCallbacks.pop() || (baidu.id.key + '_' + (nonce++));
            this[callback] = true;
            return callback;
        }
    });
    baidu.ajax.prefilter('json jsonp', function(opts, originalSettings, tangXHR){
        var callbackName, overwritten, responseContainer,
            data = opts.data,
            url = opts.url,
            hasCallback = opts.jsonp !== false,
            replaceInUrl = hasCallback && rjsonp.test(url),
            replaceInData = hasCallback && !replaceInUrl && baidu.type(data) === 'string'
                && !(opts.contentType || '').indexOf('application/x-www-form-urlencoded')
                && rjsonp.test(data);
        if(opts.dataTypes[0] === 'jsonp' || replaceInUrl || replaceInData){
            callbackName = opts.jsonpCallback = baidu.type(opts.jsonpCallback) === 'function' ?
                opts.jsonpCallback() : opts.jsonpCallback;
            overwritten = window[callbackName];
            
            if (replaceInUrl) {
                opts.url = url.replace(rjsonp, '$1' + callbackName );
            } else if (replaceInData) {
                opts.data = data.replace(rjsonp, '$1' + callbackName );
            } else if (hasCallback) {
                opts.url += (/\?/.test(url) ? '&' : '?') + opts.jsonp + '=' + callbackName;
            }
            
            opts.converters['script json'] = function() {
//                !responseContainer && baidu.error( callbackName + " was not called" );
                return responseContainer[0];
            }
            
            opts.dataTypes[0] = 'json';
            window[callbackName] = function(){responseContainer = arguments;}
            tangXHR.always(function(){
                window[callbackName] = overwritten;
                if (opts[callbackName]){
                    opts.jsonpCallback = originalSettings.jsonpCallback;
                    oldCallbacks.push(callbackName);
                }
                if (responseContainer && baidu.type(overwritten) === 'function'){
                    overwritten(responseContainer[0]);
                }
                responseContainer = overwritten = undefined;
            });
            return 'script';
        }
    });
    
    baidu.ajax.setup({
        accepts: {script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'},
        contents: {script: /javascript|ecmascript/},
        converters: {'text script': function(txt){
            globalEval(txt);
            return txt;
        }}
    });
    
    baidu.ajax.prefilter('script', function(opts){
        opts.cache === undefined && (opts.cache = false);
        if(opts.crossDomain){
            opts.type = 'GET';
            opts.global = false;
        }
    });
    
    baidu.ajax.transport('script', function(opts){
        if(opts.crossDomain){
            var script,
                head = document.head || document.getElementsByTagName('head')[0] || document.documentElement;
            return {
                send: function(arg, callback){
                    script = document.createElement('script');
                    script.async = 'async';
                    opts.scriptCharset && (script.charset = opts.scriptCharset);
                    script.src = opts.url;
                    script.onload = script.onreadystatechange = function(arg, isAbort){
                        if(isAbort || !script.readyState || /loaded|complete/.test(script.readyState)){
                            script.onload = script.onreadystatechange = null;
                            head && script.parentNode && head.removeChild( script );
                            script = undefined;
                            !isAbort && callback(200, 'success');
                        }
                    }
                    head.insertBefore(script, head.firstChild);
                },
                
                abort: function(){
                    script && script.onload(0, 1);
                }
            };
        }
    });
    
    var xhrCallbacks,
        xhrId = 0,
        xhrOnUnloadAbort = window.ActiveXObject ? function(){
            for ( var key in xhrCallbacks ) {
                xhrCallbacks[ key ]( 0, 1 );
            }
        } : false;
        
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch( e ) {}
    }
    
    function createActiveXHR() {
        try {
            return new window.ActiveXObject('Microsoft.XMLHTTP');
        } catch( e ) {}
    }
    
    baidu.ajax.settings.xhr = window.ActiveXObject ? function(){
        return !this.isLocal && createStandardXHR() || createActiveXHR();
    } : createStandardXHR;
    
    void function(xhr){
        baidu.extend(baidu.support, {
            ajax: !!xhr,
            cors: !!xhr && ('withCredentials' in xhr)
        });
    }(baidu.ajax.settings.xhr());
    
    if(baidu.support.ajax){
        baidu.ajax.transport(function(opts){
            if(!opts.crossDomain || baidu.support.cors){
                var callback;
                return {
                    send: function(headers, complete){
                        var handle, xhr = opts.xhr();
                        //it's can not use apply here
                        if(opts.username){
                            xhr.open(opts.type, opts.url, opts.async, opts.username, opts.password);
                        }else{
                            xhr.open(opts.type, opts.url, opts.async);
                        }
                        
                        if(opts.xhrFields){
                            for(var i in opts.xhrFields){
                                xhr[i] = opts.xhrFields[i];
                            }
                        }
                        
                        if(opts.mimeType && xhr.overrideMimeType){
                            xhr.overrideMimeType(opts.mimeType);
                        }
                        
                        if(!opts.crossDomain && !headers['X-Requested-With']){
                            headers['X-Requested-With'] = 'XMLHttpRequest';
                        }
                        
                        try{
                            for(var i in headers){
                                xhr.setRequestHeader(i, headers[i]);
                            }
                        }catch(e){}

                        xhr.send((opts.hasContent && opts.data) || null);
                        
                        callback = function(arg, isAbort){
                            var status,
                                statusText,
                                responseHeaders,
                                responses,
                                xml;
                            try{
                                if(callback && (isAbort || xhr.readyState === 4)){
                                    callback = undefined;
                                    if (handle){
                                        xhr.onreadystatechange = function(){};
                                        xhrOnUnloadAbort && (delete xhrCallbacks[handle]);
                                    }
                                    
                                    if(isAbort){
                                        xhr.readyState !== 4 && xhr.abort();
                                    }else{
                                        status = xhr.status;
                                        responseHeaders = xhr.getAllResponseHeaders();
                                        responses = {};
                                        xml = xhr.responseXML;
                                        xml && xml.documentElement && (responses.xml = xml);
                                        try{
                                            responses.text = xhr.responseText;
                                        }catch(e){}
                                        
                                        try{
                                            statusText = xhr.statusText;
                                        }catch(e){statusText = '';}
                                        if(!status && opts.isLocal && !opts.crossDomain){
                                            status = responses.text ? 200 : 404;
                                        }else if(status === 1223){
                                            status = 204;
                                        }
                                    }
                                }
                            }catch(firefoxAccessException){
                                !isAbort && complete(-1, firefoxAccessException);
                            }
                            responses && complete(status, statusText, responses, responseHeaders);
                        }
                        
                        if(!opts.async){
                            callback();
                        }else if(xhr.readyState === 4){
                            setTimeout(callback, 0)
                        }else{
                            handle = ++xhrId;
                            if(xhrOnUnloadAbort){
                                if(!xhrCallbacks){
                                    xhrCallbacks = {};
                                    baidu.dom(window).on('unload', xhrOnUnloadAbort);
                                }
                                xhrCallbacks[handle] = callback;
                            }
                            xhr.onreadystatechange = callback;
                        }
                    },
                    
                    abort: function(){
                        callback && callback(0, 1);
                    }
                };
            }
        });
    }
}();
/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */




/**
 * @description 对function的操作，解决内存泄露问题
 * @function 
 * @name baidu.fn
 * @grammar baidu.fn(func)
 * @param {String|functioin} func 要绑定的函数，或者一个在作用域下可用的函数名
 * @return {TangramFn} 返回一个TangramFn对象
 */

baidu.createChain("fn",

// 执行方法
function(fn){
    return new baidu.fn.$Fn(~'function|string'.indexOf(baidu.type(fn)) ? fn : function(){});
},

// constructor
function(fn){
    this.fn = fn;
});












/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 数组包含某项
 *
 * @name baidu.array.contains
 * @function
 * @grammar $Array.contains( item )
 * @param   {Object}      item  被包含项
 * @return  {Boolean}           是否包含
 */

/**
 * @description 数组包含某项
 *
 * @name baidu.array().contains()
 * @function
 * @grammar $Array.contains( item )
 * @param   {Object}      item  被包含项
 * @return  {Boolean}           是否包含
 */

baidu.array.extend({
    contains : function (item) {
        return this.indexOf(item) > -1;
    }
});


/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-20
 * @modify 2012.6.29 mz 扩展对 String Number 的支持
 * @modify 2012.8.29 mz 修改iterator参数顺序iterator(index, item, object)；将iterator里的this默认指向到item
 */

/**
 * @description 枚举目标对象中的每一个元素，进行指定函数操作
 * @function
 * @name baidu.each
 * @grammar baidu.each( enumerable, iterator[, context] )
 * @param   {Object}        enumerable      被枚举的对象（Array|ArrayLike|NodeList|String|Number）
 * @param   {Function}      iterator        遍历操作的函数
 * @param   {Object}        context         [可选]作用域
 * @return  {ArrayLike}     arrayLike
 */
baidu.each = function( enumerable, iterator, context ) {
    var i, n, t, result;

    if ( typeof iterator == "function" && enumerable) {

        // Array or ArrayLike or NodeList or String or ArrayBuffer
        n = typeof enumerable.length == "number" ? enumerable.length : enumerable.byteLength;
        if ( typeof n == "number" ) {

            // 20121030 function.length
            //safari5.1.7 can not use typeof to check nodeList - linlingyu
            if (Object.prototype.toString.call(enumerable) === "[object Function]") {
                return enumerable;
            }

            for ( i=0; i<n; i++ ) {

                t = enumerable[ i ] || (enumerable.charAt && enumerable.charAt( i ));

                // 被循环执行的函数，默认会传入三个参数(i, array[i], array)
                result = iterator.call( context || t, i, t, enumerable );

                // 被循环执行的函数的返回值若为 false 和"break"时可以影响each方法的流程
                if ( result === false || result == "break" ) {break;}
            }
        
        // enumerable is number
        } else if (typeof enumerable == "number") {

            for (i=0; i<enumerable; i++) {
                result = iterator.call( context || i, i, i, i);
                if ( result === false || result == "break" ) { break;}
            }
        
        // enumerable is json
        } else if (typeof enumerable == "object") {

            for (i in enumerable) {
                if ( enumerable.hasOwnProperty(i) ) {
                    result = iterator.call( context || enumerable[ i ], i, enumerable[ i ], enumerable );

                    if ( result === false || result == "break" ) { break;}
                }
            }
        }
    }

    return enumerable;
};

/*
error
window.length
function.length
ArrayBuffer.byteLength
*/




/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 遍历数组里的每一项进行指定操作
 *
 * @name baidu.array.each
 * @function
 * @grammar array.each(iterator[,context])
 * @param   {Function}      iterator(item,index,array)    枚举器，函数
 * @param   {Object}        context                         方法作用域
 * @return  {Array}         数组
 */
/**
 * @description 遍历数组里的每一项进行指定操作
 *
 * @name baidu.array().each()
 * @function
 * @grammar array.each(iterator[,context])
 * @param   {Function}      iterator(item,index,array)    枚举器，函数
 * @param   {Object}        context                         方法作用域
 * @return  {Array}         数组
 */
void function () {

    Array.prototype.each = function(iterator, context){
        return baidu.each(this, iterator, context);
    };
    
    Array.prototype.forEach = function(iterator, context){
        return baidu.forEach(this, iterator, context);
    };

    // TODO: delete in tangram 3.0
    baidu.array.each = baidu.array.forEach = function(array, iterator, context) {
        var fn = function(index, item, array){
            return iterator.call(context || array, item, index, array);
        };
        return baidu.isEnumerable(array) ? baidu.each(array, typeof iterator == "function" ? fn : "", context) : array;
    };
}();


/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 清空数组
 *
 * @name baidu.array.empty
 * @function
 * @grammar $Array.empty()
 * @return  {Array}             空数组
 */

/**
 * @description 清空数组
 *
 * @name baidu.array().empty()
 * @function
 * @grammar $Array.empty()
 * @return  {Array}             空数组
 */

baidu.array.extend({
    empty : function () {
        this.length = 0;
        return this;
    }
});



/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 遍历数组每一项，判断是否全部符合指定的条件
 *
 * @name baidu.array.every
 * @function
 * @grammar array.every(iterator[, context])
 * @param   {Function}      iterator  用于做对比的函数
 * @param   {Object}        context   方法作用域
 * @return  {Boolean}           是否全部满足条件
 */
/**
 * @description 遍历数组每一项，判断是否全部符合指定的条件
 *
 * @name baidu.array().every()
 * @function
 * @grammar array.every(iterator[, context])
 * @param   {Function}      iterator  用于做对比的函数
 * @param   {Object}        context   方法作用域
 * @return  {Boolean}           是否全部满足条件
 */
Array.prototype.every = function(iterator, context) {
    baidu.check("function(,.+)?", "baidu.array.every");
    var i, n;

    for (i=0, n=this.length; i<n; i++) {
        if (!iterator.call(context || this, this[i], i, this)) {
            return false;
        }
    }
    return true;
};




/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 过滤数组
 *
 * @name baidu.array.filter
 * @function
 * @grammar array.filter(iterator[, context])
 * @param   {Function}      iterator 用于做过滤的函数
 * @param   {context}       context  方法作用域
 * @return  {Array}             已经过滤后的数组
 */
/**
 * @description 过滤数组
 *
 * @name baidu.array().filter()
 * @function
 * @grammar array.filter(iterator[, context])
 * @param   {Function}      iterator 用于做过滤的函数
 * @param   {context}       context  方法作用域
 * @return  {Array}             已经过滤后的数组
 */
Array.prototype.filter = function(iterator, context) {
    var result = baidu.array([]),
        i, n, item, index=0;

    if (baidu.type(iterator) === "function") {
        for (i=0, n=this.length; i<n; i++) {
            item = this[i];

            if (iterator.call(context || this, item, i, this) === true) {
                result[index ++] = item;
            }
        }
    }

    return result;
};





/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 从数组中寻找符合条件的第一个元素
 *
 * @name baidu.array.find
 * @function
 * @grammar $Array.find([fn])
 * @param   {Function}     fn    用于做对比的函数
 * @return  {Object}                    匹配的项
 */
/**
 * @description 从数组中寻找符合条件的第一个元素
 *
 * @name baidu.array().find()
 * @function
 * @grammar $Array.find([fn])
 * @param   {Function}    fn   用于做对比的函数
 * @return  {Object}                    匹配的项
 */

baidu.array.extend({
    find : function (iterator) {
        var i, item, n=this.length;

        if (baidu.type(iterator) == "function") {
            for (i=0; i<n; i++) {
                item = this[i];
                if (iterator.call(this, item, i, this) === true) {
                    return item;
                }
            }
        }

        return null;
    }
});



/**
 * 将两个数组参数合并成一个类似hashMap结构的对象，这个对象使用第一个数组做为key，使用第二个数组做为值，如果第二个参数未指定，则把对象的所有值置为true。
 *
 */
/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 将两个数组参数合并成一个类似hashMap结构的对象，这个对象使用第一个数组做为key，使用第二个数组做为值，如果第二个参数未指定，则把对象的所有值置为true
 *
 * @name baidu.array.hash
 * @function
 * @grammar $Aarray.hash(values)
 * @param   {Object}      values     匹配项
 * @return  {Array}         映射后的HASH对象
 */
/**
 * @description 将两个数组参数合并成一个类似hashMap结构的对象，这个对象使用第一个数组做为key，使用第二个数组做为值，如果第二个参数未指定，则把对象的所有值置为true
 *
 * @name baidu.array().hash()
 * @function
 * @grammar $Aarray.hash(values)
 * @param   {Object}      values     匹配项
 * @return  {Array}         映射后的HASH对象
 */
baidu.array.extend({
    hash : function (values) {
        var result = {},
            vl = values && values.length,
            i, n;

        for (i=0, n=this.length; i < n; i++) {
            result[this[i]] = (vl && vl > i) ? values[i] : true;
        }
        return result;
    }
});

/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 从后往前，查询数组中指定元素的索引位置
 *
 * @name baidu.array.lastIndexOf
 * @function
 * @grammar $Aarray.lastIndexOf(match[, fromIndex])
 * @param   {Object}      match     匹配项
 * @param   {Number}      fromIndex 起始位置
 * @return  {Number}      被匹配项的下标
 */

/**
 * @description 从后往前，查询数组中指定元素的索引位置
 *
 * @name baidu.array().lastIndexOf()
 * @function
 * @grammar $Aarray.lastIndexOf(match[, fromIndex])
 * @param   {Object}      match     匹配项
 * @param   {Number}      fromIndex 起始位置
 * @return  {Number}      被匹配项的下标
 */

baidu.array.extend({
    lastIndexOf : function (match, fromIndex) {
        baidu.check(".+(,number)?", "baidu.array.lastIndexOf");
        var len = this.length;

        (!(fromIndex = fromIndex | 0) || fromIndex >= len) && (fromIndex = len - 1);
        fromIndex < 0 && (fromIndex += len);

        for(; fromIndex >= 0; fromIndex --){
            if(fromIndex in this && this[fromIndex] === match){
                return fromIndex;
            }
        }
        
        return -1;
    }
});




/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 数组映射
 *
 * @name baidu.array().map()
 * @function
 * @grammar baidu.array(array).map(iterator,context)
 * @param   {Function}      iterator    指定的执行方法
 * @param   {Object}        context     方法作用域
 * @return  {Array}                     映射操作后的数组
 */

Array.prototype.map = function (iterator, context) {
    baidu.check("function(,.+)?","baidu.array.map");
    var i, n,
        array = baidu.array([]);

    for (i=0, n=this.length; i < n; i++) {
        array[i] = iterator.call(context || this, this[i], i, this);
    }
    return array;
};






/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 遍历数组中所有元素，将每一个元素应用方法进行合并，并返回合并后的结果。
 *
 * @name baidu.array.reduce
 * @function
 * @grammar array.reduce(iterator[, initializer])
 * @param   {Function}      iterator    指定项的索引位置
 * @param   {Function}      initializer 指定项的索引位置
 * @return  {Object}                    iterator计算后的结果
 */

/**
 * @description 遍历数组中所有元素，将每一个元素应用方法进行合并，并返回合并后的结果。
 *
 * @name baidu.array().reduce()
 * @function
 * @grammar array.reduce(iterator[, initializer])
 * @param   {Function}      iterator    指定项的索引位置
 * @param   {Function}      initializer 指定项的索引位置
 * @return  {Object}                    iterator计算后的结果
 */
Array.prototype.reduce = function (iterator, initializer) {
    baidu.check("function(,.+)?","baidu.array.reduce");
    var i = 0, 
        n = this.length,
        found = false;

    if (typeof initializer == "undefined") {
        initializer = this[i++];

        if (typeof initializer == "undefined") {
            return ;
        }
    }

    for (; i < n; i++) {
        initializer = iterator(initializer, this[i] , i , this);
    }
    return initializer;
};




/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 删除数组项
 *
 * @name baidu.array.remove
 * @function
 * @grammar $Array.remove(item)
 * @param   {Object}     item   数组匹配项
 * @return  {Array}                 操作后的数组
 */

/**
 * @description 删除数组项
 *
 * @name baidu.array().remove()
 * @function
 * @grammar $Array.remove(item)
 * @param   {Object}    item  数组匹配项
 * @return  {Array}                 操作后的数组
 */
baidu.array.extend({
    remove : function (match) {
        var n = this.length;
            
        while (n--) {
            if (this[n] === match) {
                this.splice(n, 1);
            }
        }
        return this;
    }
});



/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 删除数组指定的项
 *
 * @name baidu.array.removeAt
 * @function
 * @grammar $Array.removeAt(index)
 * @param   {Number}        index   指定项的索引位置
 * @return  {Boolean}               被删除的项
 */
/**
 * @description 删除数组指定的项
 *
 * @name baidu.array().removeAt()
 * @function
 * @grammar $Array.removeAt(index)
 * @param   {Number}        index   指定项的索引位置
 * @return  {Boolean}               被删除的项
 */

baidu.array.extend({
    removeAt : function (index) {
        baidu.check("number", "baidu.array.removeAt");
        return this.splice(index, 1)[0];
    }
});

/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-30
 * @modify
 */

/**
 * @description 遍历当前数组是否拥有指定的条件
 *
 * @name baidu.array.some
 * @function
 * @grammar array.some(fn[, context])
 * @param   {Function}      fn      用于做判断的函数
 * @param   {Object}        context 指定方法作用域
 * @return  {Boolean}               是否含有指定条件
 */

/**
 * @description 遍历当前数组是否拥有指定的条件
 *
 * @name baidu.array().some()
 * @function
 * @grammar array.some(fn[, context])
 * @param   {Function}      fn      用于做判断的函数
 * @param   {Object}        context 指定方法作用域
 * @return  {Boolean}               是否含有指定条件
 */
Array.prototype.some = function(iterator, context){
    baidu.check("function(,.+)?", "baidu.array.some");
    var i, n;

    for (i=0, n=this.length; i<n; i++) {
        if (iterator.call(context || this, this[i], i, this)) {
            return true;
        }
    }
    return false;
};




/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */




/**
 * @description 将源对象的所有属性拷贝到目标对象中
 * @author erik
 * @name baidu.object.extend
 * @function
 * @grammar baidu.object.extend(target, source)
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @see baidu.array.merge
 * @remark
 * 
1.目标对象中，与源对象key相同的成员将会被覆盖。<br>
2.源对象的prototype成员不会拷贝。
        
 * @shortcut extend
 * @meta standard
 *             
 * @return {Object} 目标对象
 */
//baidu.object.extend = function (target, source) {
//    for (var p in source) {
//        if (source.hasOwnProperty(p)) {
//            target[p] = source[p];
//        }
//    }
//    
//    return target;
//};
baidu.object.extend = baidu.extend;

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isFunction.js
 * author: rocy
 * version: 1.1.2
 * date: 2010/06/12
 * modify: 2012/6/29 mz
 */




/**
 * @description 判断目标参数是否为function或Function实例
 * @name baidu.lang.isFunction
 * @function
 * @grammar baidu.lang.isFunction(source)
 * @param {Any} source 目标参数
 * @version 1.2
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 * @meta standard
 * @return {boolean} 类型判断结果
 */
//baidu.lang.isFunction = function (source) {
    // chrome下,'function' == typeof /a/ 为true.
//    return '[object Function]' == Object.prototype.toString.call(source);
//};
baidu.lang.isFunction = baidu.isFunction;










/*
 * @author meizz
 * @create 2012.08.31
 */



/**
 * @description 将原baidu.lang里关于BaseClass和BaseEvent部分搬迁到此新命名空间下
 * @Object 
 * @name baidu.base
 */
baidu.base = baidu.base || {};





/**
 * @description Tangram继承机制提供的一个基类，用户可以通过继承baidu.base.Class来获取它的属性及方法。
 *
 * @author meizz
 * @create 2005.02.28
 * @modify 2012.09.27   将原来的BaseEvent部分合并进来
 *
 * @class
 * @name baidu.base.Class
 * @grammar new baidu.base.Class()
 * @remark baidu.base.Class和它的子类的实例均包含一个全局唯一的标识guid。guid是在构造函数中生成的，因此，继承自baidu.base.Class的类应该直接或者间接调用它的构造函数。<br>baidu.base.Class的构造函数中产生guid的方式可以保证guid的唯一性，及每个实例都有一个全局唯一的guid。
 */
baidu.base.Class = (function() {
    baidu._global_ = window[ baidu.guid ];
    var instances = baidu._global_._instances_;
    !instances && (instances = baidu._global_._instances_ = {});

    // constructor
    return function() {
        this.guid = baidu.id();
        !this._decontrol_ && (instances[this.guid] = this);
    }
})();


baidu.extend(baidu.base.Class.prototype, {
    /*
     * 重载了默认的toString方法，使得返回信息更加准确一些。
     * 20111219 meizz 为支持老版本的className属性，以后统一改成 _type_
     * @return {string} 对象的String表示形式
     */
    toString: function(){
        return "[object " + ( this._type_ || "Object" ) + "]";
    }

    /**
     * @description 类的析构方法，且触发 ondispose 事件，此方法执行后 .disposed 值为 true
     * @name obj.dispose
     * @function 
     * @grammar obj.dispose()
     * TODO: 将_listeners中绑定的事件剔除掉
     */
    ,dispose: function() {
        if (this.fire("ondispose")) {
            // decontrol
            delete baidu._global_._instances_[this.guid];

            if (this._listeners_) {
                for (var item in this._listeners_) {
                    this._listeners_[item].length = 0;
                    delete this._listeners_[item];
                }
            }

            for (var pro in this) {
                typeof this[pro] != "function" && delete this[pro];
            }

            this.disposed = true;   //20100716
        }
    }

    /**
     * @description 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。引入baidu.base.Event后，Class的子类实例才会获得该方法。
     * @grammar instance.fire(event[, options])
     * @param {baidu.base.Event|String}   event   Event对象，或事件名称(1.1.1起支持)
     * @param {Object}                  options 扩展参数,所含属性键值会扩展到Event对象上(1.2起支持)
     * @remark 处理会调用通过on绑定的自定义事件回调函数之外，还会调用直接绑定到对象上面的自定义事件。例如：<br>
        myobj.onMyEvent = function(){}<br>
        myobj.on("onMyEvent", function(){});
     */
    ,fire: function(event, options) {
        baidu.isString(event) && (event = new baidu.base.Event(event));

        var i, n, list
            , t=this._listeners_
            , type=event.type
            // 20121023 mz 修正事件派发多参数时，参数的正确性验证
            , argu=[event].concat( Array.prototype.slice.call(arguments, 1) );
        !t && (t = this._listeners_ = {});

        // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
        baidu.extend(event, options || {});

        event.target = event.target || this;
        event.currentTarget = this;

        type.indexOf("on") != 0 && (type = "on" + type);

        baidu.isFunction(this[type]) && this[type].apply(this, argu);
        (i=this._options) && baidu.isFunction(i[type]) && i[type].apply(this, argu);

        if (baidu.isArray(list = t[type])) {
            for (i=0, n=list.length; i<n; i++) {
                list[i].apply(this, argu);
            }

            if (list.once) {
                for(i=list.once.length-1; i>-1; i--) list.splice(list.once[i], 1);
                delete list.once;
            }
        }

        return event.returnValue;
    }

    /**
     * @description 事件注册
     * @grammer instance.on(event, handler)
     * @param   {String}    type    事件名
     * @param   {Function}  handler 事件处理函数
     * @return  {Class}     返回实例，以便于链式事件注册 $.on().on()
     */
    ,on: function(type, handler, once) {
        if (!baidu.isFunction(handler)) {
            return this;
        }

        var list, t = this._listeners_;
        !t && (t = this._listeners_ = {});

        type.indexOf("on") != 0 && (type = "on" + type);

        !baidu.isArray(list = t[type]) && (list = t[type] = []);
        if (once) {
            !list.once && (list.once = []);
            list.once.push(list.length);
        }
        t[type].push( handler );

        return this;
    }
    // 20120928 mz 取消on()的指定key

    ,once: function(type, handler) {
        return this.on(type, handler, true);
    }
    ,one: function(type, handler) {
        return this.on(type, handler, true);
    }

    /**
     * @description 注销事件处理函数
     * @grammer instance.off([event[, handler]])
     * @param   {String}    type    [可选]事件名
     * @param   {Function}  handler [可选]被注销的函数
     * @return  {Class}     返回实例，以便于链式事件注册 $.on().on()
     */
    ,off: function(type, handler) {
        var i, list,
            t = this._listeners_;
        if (!t) return;

        // remove all event listener
        if (typeof type == "undefined") {
            for (i in t) {
                delete t[i];
            }
            return;
        }

        type.indexOf("on") && (type = "on" + type);

        // 移除某类事件监听
        if (typeof handler == "undefined") {
            delete t[type];
        } else if (list = t[type]) {

            for (i = list.length - 1; i >= 0; i--) {
                list[i] === handler && list.splice(i, 1);
            }
        }

        return this;
    }
});

/*
 * 按唯一标识guid字符串取得实例对象
 * @function
 * @param   {String}    guid
 * @return  {object}            实例对象
 */
window["baiduInstance"] = function(guid) {
    return baidu._global_._instances_[ guid ];
}



/**
 * @class   自定义的事件对象。
 * @name    baidu.base.Event
 * @grammar new baidu.base.Event(type[, target])
 * @param   {string} type    事件类型名称。为了方便区分事件和一个普通的方法，事件类型名称必须以"on"(小写)开头。
 * @param   {Object} [target]触发事件的对象
 */
baidu.base.Event = function(type, target) {
    this.type = type;
    this.returnValue = true;
    this.target = target || null;
    this.currentTarget = null;
    this.preventDefault = function() {this.returnValue = false;};
};


//  2011.11.23  meizz   添加 baiduInstance 这个全局方法，可以快速地通过guid得到实例对象
//  2011.11.22  meizz   废除创建类时指定guid的模式，guid只作为只读属性




/**
 * @description 子类继承父类
 *
 * @author meizz
 * @create 2005.02.28
 *
 * @function
 * @name baidu.inherits
 * @grammar baidu.base.Class(subClass, superClass[, type])
 * @param {Function}    subClass    子类构造器
 * @param {Function}    superClass  父类构造器
 * @param {string}      type        类名标识
 * @return {Function}               子类
  */
baidu.base.inherits = function (subClass, superClass, type) {
    var key, proto, 
        selfProps = subClass.prototype, 
        clazz = new Function();
        
    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();

    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    // 类名标识，兼容Class的toString，基本没用
    typeof type == "string" && (proto._type_ = type);

    subClass.extend = function(json) {
        for (var i in json) proto[i] = json[i];
        return subClass;
    }
    
    return subClass;
};

//  2011.11.22  meizz   为类添加了一个静态方法extend()，方便代码书写


/**
 * @description 向某个类注册插件
 * author meizz, dron
 * create 2011/11/29
 * @name baidu.base.register
 * @function
 * @grammar baidu.base.register(Class, constructorHook, methods)
 * @param   {Class}     Class           接受注册的载体 类
 * @param   {Function}  constructorHook 运行在载体类构造器里钩子函数
 * @param    {Object}  methods   [可选]挂载到载体类原型链上的方法集，可选
 * @meta standard
 *             
 */
baidu.base.register = function (Class, constructorHook, methods) {
    (Class._reg_ || (Class._reg_ = [])).push( constructorHook );

    for (var method in methods) {
        Class.prototype[method] = methods[method];
    }
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20111129    meizz    添加第三个参数，可以直接挂载方法到目标类原型链上

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * @description 判断是否为chrome浏览器
 * @name baidu.browser.chrome
 * @function
 * @grammar baidu.browser.chrome
 * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.safari,baidu.browser.opera   
 * @property chrome chrome版本号
 * @return {Number} chrome版本号
 */
//baidu.browser.chrome = /chrome\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * @description 判断是否为firefox浏览器
 * @property firefox firefox版本号
 * @function
 * @name baidu.browser.firefox
 * @grammar baidu.browser.firefox
 * @meta standard
 * @see baidu.browser.ie,baidu.browser.safari,baidu.browser.opera,baidu.browser.chrome
 * @return {Number} firefox版本号
 */
//baidu.browser.firefox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



//IE 8下，以documentMode为准
//在百度模板中，可能会有$，防止冲突，将$1 写成 \x241
/**
 * @description 判断是否为ie浏览器
 * @name baidu.browser.ie
 * @function
 * @grammar baidu.browser.ie
 * @return {Number} IE版本号
 */
//baidu.browser.ie = baidu.ie = /msie (\d+\.\d+)/i.test(navigator.userAgent) ? (document.documentMode || + RegExp['\x241']) : undefined;

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/isGecko.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * @description 判断是否为gecko内核
 * @function
 * @name baidu.browser.isGecko
 * @grammar baidu.browser.isGecko
 * @meta standard
 * @see baidu.browser.isWebkit
 * @return {Boolean} 布尔值
 */
//baidu.browser.isGecko = /gecko/i.test(navigator.userAgent) && !/like gecko/i.test(navigator.userAgent);



/**
 * @description 判断是否严格标准的渲染模式
 * @function
 * @name baidu.browser.isStrict
 * @grammar baidu.browser.isStrict
 * @meta standard
 * @return {Boolean} 布尔值
 */
//baidu.browser.isStrict = document.compatMode == "CSS1Compat";

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/isWebkit.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * @description 判断是否为webkit内核
 * @name baidu.browser.isWebkit
 * @function
 * @grammar baidu.browser.isWebkit
 * @meta standard
 * @see baidu.browser.isGecko
 * @return {Boolean} 布尔值
 */
//baidu.browser.isWebkit = /webkit/i.test(navigator.userAgent);

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/maxthon.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



//try {
//    if (/(\d+\.\d+)/.test(external.max_version)) {
/**
 * @description 判断是否为maxthon浏览器
 * @function
 * @property maxthon maxthon版本号
 * @name baidu.browser.maxthon
 * @grammar baidu.browser.maxthon
 * @see baidu.browser.ie
 * @return {Number} maxthon版本号
 */
//        baidu.browser.maxthon = + RegExp['\x241'];
//    }
//} catch (e) {}

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/browser/opera.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * @description 判断是否为opera浏览器
 * @property opera opera版本号
 * @function
 * @name baidu.browser.opera
 * @grammar baidu.browser.opera
 * @meta standard
 * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.safari,baidu.browser.chrome
 * @return {Number} opera版本号
 */

/*
 * opera 从10开始不是用opera后面的字符串进行版本的判断
 * 在Browser identification最后添加Version + 数字进行版本标识
 * opera后面的数字保持在9.80不变
 */
//baidu.browser.opera = /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(navigator.userAgent) ?  + ( RegExp["\x246"] || RegExp["\x242"] ) : undefined;

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



//(function(){
//    var ua = navigator.userAgent;
    /*
     * 兼容浏览器为safari或ipad,其中,一段典型的ipad UA 如下:
     * Mozilla/5.0(iPad; U; CPU iPhone OS 3_2 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Version/4.0.4 Mobile/7B314 Safari/531.21.10
     */
    
    /**
     * @description 判断是否为safari浏览器, 支持ipad
     * @property safari safari版本号
     * @function
     * @name baidu.browser.safari
     * @grammar baidu.browser.safari
     * @meta standard
     * @see baidu.browser.ie,baidu.browser.firefox,baidu.browser.opera,baidu.browser.chrome   
     */
//    baidu.browser.safari = /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(ua) && !/chrome/i.test(ua) ? + (RegExp['\x241'] || RegExp['\x242']) : undefined;
//})();

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */


/**
 * @description 操作cookie的方法
 * @namespace
 * @name baidu.cookie
 */
baidu.cookie = baidu.cookie || {};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/_isValidKey.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * 验证字符串是否合法的cookie键名
 * 
 * @param {string} source 需要遍历的数组
 * @meta standard
 * @return {boolean} 是否合法的cookie键名
 */
baidu.cookie._isValidKey = function (key) {
    // http://www.w3.org/Protocols/rfc2109/rfc2109
    // Syntax:  General
    // The two state management headers, Set-Cookie and Cookie, have common
    // syntactic properties involving attribute-value pairs.  The following
    // grammar uses the notation, and tokens DIGIT (decimal digits) and
    // token (informally, a sequence of non-special, non-white space
    // characters) from the HTTP/1.1 specification [RFC 2068] to describe
    // their syntax.
    // av-pairs   = av-pair *(";" av-pair)
    // av-pair    = attr ["=" value] ; optional value
    // attr       = token
    // value      = word
    // word       = token | quoted-string
    
    // http://www.ietf.org/rfc/rfc2068.txt
    // token      = 1*<any CHAR except CTLs or tspecials>
    // CHAR       = <any US-ASCII character (octets 0 - 127)>
    // CTL        = <any US-ASCII control character
    //              (octets 0 - 31) and DEL (127)>
    // tspecials  = "(" | ")" | "<" | ">" | "@"
    //              | "," | ";" | ":" | "\" | <">
    //              | "/" | "[" | "]" | "?" | "="
    //              | "{" | "}" | SP | HT
    // SP         = <US-ASCII SP, space (32)>
    // HT         = <US-ASCII HT, horizontal-tab (9)>
        
    return (new RegExp("^[^\\x00-\\x20\\x7f\\(\\)<>@,;:\\\\\\\"\\[\\]\\?=\\{\\}\\/\\u0080-\\uffff]+\x24")).test(key);
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/getRaw.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * @description 获取cookie的值，不对值进行解码
 * @function 
 * @name baidu.cookie.getRaw
 * @grammar baidu.cookie.getRaw(key)
 * @param {String} key 需要获取Cookie的键名
 * @return {string|null} cookie的值，获取不到时返回null
 */
baidu.cookie.getRaw = function (key) {
    if (baidu.cookie._isValidKey(key)) {
        var reg = new RegExp("(^| )" + key + "=([^;]*)(;|\x24)"),
            result = reg.exec(document.cookie);
            
        if (result) {
            return result[2] || null;
        }
    }

    return null;
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/get.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * @description 获取cookie的值，用decodeURIComponent进行解码
 * @function 
 * @name baidu.cookie.get
 * @grammar baidu.cookie.get(key)
 * @param {String} key 需要获取Cookie的键名
 * @return {string|null} cookie的值，获取不到时返回null
 */
 
baidu.cookie.get = function (key) {
    var value = baidu.cookie.getRaw(key);
    if ('string' == typeof value) {
        value = decodeURIComponent(value);
        return value;
    }
    return null;
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/setRaw.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * @description 设置cookie的值，不对值进行编码
 * @name baidu.cookie.setRaw
 * @function
 * @grammar baidu.cookie.setRaw(key, value[, options])
 * @param {string} key 需要设置Cookie的键名
 * @param {string} value 需要设置Cookie的值
 * @param {Object} options 设置Cookie的其他可选参数
 * @param {string} options.path cookie路径
 * @param {Date|number} options.expires cookie过期时间,如果类型是数字的话, 单位是毫秒
 * @param {string} options.domain cookie域名
 * @param {string} options.secure cookie是否安全传输
 */
/*
 * @remark
 * 
<b>options参数包括：</b><br>
path:cookie路径<br>
expires:cookie过期时间，Number型，单位为毫秒。<br>
domain:cookie域名<br>
secure:cookie是否安全传输
        
 * @meta standard
 * @see baidu.cookie.set,baidu.cookie.getRaw
*/

baidu.cookie.setRaw = function (key, value, options) {
    if (!baidu.cookie._isValidKey(key)) {
        return;
    }
    
    options = options || {};
    //options.path = options.path || "/"; // meizz 20100402 设定一个初始值，方便后续的操作
    //berg 20100409 去掉，因为用户希望默认的path是当前路径，这样和浏览器对cookie的定义也是一致的
    
    // 计算cookie过期时间
    var expires = options.expires;
    if ('number' == typeof options.expires) {
        expires = new Date();
        expires.setTime(expires.getTime() + options.expires);
    }
    
    document.cookie =
        key + "=" + value
        + (options.path ? "; path=" + options.path : "")
        + (expires ? "; expires=" + expires.toGMTString() : "")
        + (options.domain ? "; domain=" + options.domain : "")
        + (options.secure ? "; secure" : ''); 
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/remove.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * @description 删除cookie的值
 * @function
 * @name baidu.cookie.remove
 * @grammar baidu.cookie.remove(key, options)
 * @param {string} key 需要删除Cookie的键名
 * @param {Object} options 需要删除的cookie对应的 path domain 等值
 */
baidu.cookie.remove = function (key, options) {
    options = options || {};
    options.expires = new Date(0);
    baidu.cookie.setRaw(key, '', options);
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/cookie/set.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * @description 设置cookie的值，用encodeURIComponent进行编码
 * @name baidu.cookie.set
 * @function
 * @grammar baidu.cookie.set(key, value[, options])
 * @param {string} key 需要设置Cookie的键名
 * @param {string} value 需要设置Cookie的值
 * @param {Object} options 设置Cookie的其他可选参数
 * @param {string} options.path cookie路径
 * @param {Date|number} options.expires cookie过期时间,如果类型是数字的话, 单位是毫秒
 * @param {string} options.domain cookie域名
 * @param {string} options.secure cookie是否安全传输
 */
/*
 * @remark
 * 
1. <b>注意：</b>该方法会对cookie值进行encodeURIComponent编码。如果想设置cookie源字符串，请使用setRaw方法。<br><br>
2. <b>options参数包括：</b><br>
path:cookie路径<br>
expires:cookie过期时间，Number型，单位为毫秒。<br>
domain:cookie域名<br>
secure:cookie是否安全传输
        
 * @meta standard
 * @see baidu.cookie.setRaw,baidu.cookie.get
*/

baidu.cookie.set = function (key, value, options) {
    baidu.cookie.setRaw(key, encodeURIComponent(value), options);
};




/**
 * @description 创建一个类，包括创造类的构造器、继承基类Class
 * @author meizz
 * @modify 2012.11.05 meizz
 * @name baidu.createClass
 * @function
 * @grammar baidu.createClass(constructor[, options])
 * @remark
            使用createClass能方便的创建一个带有继承关系的类。同时会为返回的类对象添加extend方法，使用obj.extend({});可以方便的扩展原型链上的方法和属性
 * @see baidu.lang.Class,baidu.lang.inherits
 *             
 * @param {Function} constructor 类的构造器函数
 * @param {String}   type        [可选]类的名字
 * @param {Object}   options     [可选]配置{superClass: 父类, type:className: 类名, decontrolled: 不受控}
 * @return {Function}            类的最终构造器
 */
baidu.createClass = /**@function*/function(constructor, type, options) {
    options = options || {};

    // 创建新类的真构造器函数
    var fn = function(){
        var me = this;

        // 20101030 某类在添加该属性控制时，guid将不在全局instances里控制
        options.decontrolled && (me._decontrol_ = true);

        // 继承父类的构造器
        fn.superClass.apply(me, arguments);

        // 全局配置
        for (var i in fn.options) me[i] = fn.options[i];

        constructor.apply(me, arguments);

        for (var i=0, reg=fn._reg_; reg && i<reg.length; i++) {
            reg[i].apply(me, arguments);
        }
    };

    baidu.extend(fn, {
        superClass: options.superClass || baidu.base.Class

        ,inherits: function(superClass){
            if (typeof superClass != "function") return fn;

            var C = function(){};
            C.prototype = (fn.superClass = superClass).prototype;

            // 继承父类的原型（prototype)链
            var fp = fn.prototype = new C();
            // 继承传参进来的构造器的 prototype 不会丢
            baidu.extend(fn.prototype, constructor.prototype);
            // 修正这种继承方式带来的 constructor 混乱的问题
            fp.constructor = constructor;

            return fn;
        }
        ,register: function(hook, methods) {
            (fn._reg_ || (fn._reg_ = [])).push( hook );
            methods && baidu.extend(fn.prototype, methods);
            return fn;
        }
        ,extend: function(json){baidu.extend(fn, json); return fn;}
    });

    type = type || options.className || options.type;
    typeof type == "string" && (constructor.prototype._type_ = type);
    typeof fn.superClass == "function" && fn.inherits(fn.superClass);

    return fn;
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20121105 meizz   给类添加了几个静态属性方法：.options .superClass .inherits() .extend() .register()




/**
 * @description 创建一个baidu.Class的单例实例，主要用于创建 EventCenter DataCenter等全局唯一对象
 * @author meizz
 * @create 2010-05-13
 * @name baidu.createSingle
 * @function
 * @grammar baidu.createSingle(json)
 * @param {Object} json 直接挂载到这个单例里的预定属性/方法
 * @return {Object} 一个实例
 */
baidu.createSingle = function (json) {
    var c = new baidu.base.Class();

    for (var key in json) {
        c[key] = json[key];
    }
    return c;
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/date.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/04
 */


/**
 * @description 操作日期的方法
 * @namespace
 * @name baidu.date
 */
baidu.date = baidu.date || {};

/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */


/**
 * @description number对象链式语法的链头
 * @name baidu.number()
 * @function
 * @grammar baidu.number(number)
 * @param   {Number} Number对象
 * @return  {TangramNumber}   返回Number对象，该对象被注入链式方法。
 */

baidu.createChain('number', function(number){
    var nan = parseFloat(number),
        val = isNaN(nan) ? nan : number;
        clazz = typeof val === 'number' ? Number : String,
        pro = clazz.prototype;
    val = new clazz(val);
    baidu.forEach(baidu.number.$Number.prototype, function(value, key){
        pro[key] || (val[key] = value);
    });
    return val;
});
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */





/**
 * @description 对目标数字进行0补齐处理
 * @function 
 * @name baidu.number().pad()
 * @grammar baidu.number(num).pad(len)
 * @param {Number} len 需要输出的长度
 * @return {String} 对目标数字进行0补齐处理后的结果
 */

/**
 * @description 对目标数字进行0补齐处理
 * @function 
 * @name baidu.number.pad
 * @grammar baidu.number.pad(num, len)
 * @param {Number} num 需要处理的数字
 * @param {Number} len 需要输出的长度
 * @return {String} 对目标数字进行0补齐处理后的结果
 */

baidu.number.extend({
    pad : function (length) {
        var source = this;
        var pre = "",
            negative = (source < 0),
            string = String(Math.abs(source));
    
        if (string.length < length) {
            pre = (new Array(length - string.length + 1)).join('0');
        }
    
        return (negative ?  "-" : "") + pre + string;
    }
});

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/date/format.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/04
 */




/**
 * @description 对目标日期对象进行格式化
 * @name baidu.date.format
 * @function
 * @grammar baidu.date.format(source, pattern)
 * @param {Date} source 目标日期对象
 * @param {string} pattern 日期格式化规则
 * @return {string} 格式化后的字符串
 */

/*
 * @remark
 * 
<b>格式表达式，变量含义：</b><br><br>
hh: 带 0 补齐的两位 12 进制时表示<br>
h: 不带 0 补齐的 12 进制时表示<br>
HH: 带 0 补齐的两位 24 进制时表示<br>
H: 不带 0 补齐的 24 进制时表示<br>
mm: 带 0 补齐两位分表示<br>
m: 不带 0 补齐分表示<br>
ss: 带 0 补齐两位秒表示<br>
s: 不带 0 补齐秒表示<br>
yyyy: 带 0 补齐的四位年表示<br>
yy: 带 0 补齐的两位年表示<br>
MM: 带 0 补齐的两位月表示<br>
M: 不带 0 补齐的月表示<br>
dd: 带 0 补齐的两位日表示<br>
d: 不带 0 补齐的日表示     
 *          
*/
baidu.date.format = function (source, pattern) {
    if ('string' != typeof pattern) {
        return source.toString();
    }

    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }
    
    var pad     = baidu.number.pad,
        year    = source.getFullYear(),
        month   = source.getMonth() + 1,
        date2   = source.getDate(),
        hours   = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();

    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);

    return pattern;
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/date/parse.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/04
 */



/**
 * @description 将目标字符串转换成日期对象
 * @name baidu.date.parse
 * @function
 * @grammar baidu.date.parse(source)
 * @param {string} source 目标字符串
 * @return {Date} 转换后的日期对象
 */
/*
 * 
对于目标字符串，下面这些规则决定了 parse 方法能够成功地解析： <br>
<ol>
<li>短日期可以使用“/”或“-”作为日期分隔符，但是必须用月/日/年的格式来表示，例如"7/20/96"。</li>
<li>以 "July 10 1995" 形式表示的长日期中的年、月、日可以按任何顺序排列，年份值可以用 2 位数字表示也可以用 4 位数字表示。如果使用 2 位数字来表示年份，那么该年份必须大于或等于 70。 </li>
<li>括号中的任何文本都被视为注释。这些括号可以嵌套使用。 </li>
<li>逗号和空格被视为分隔符。允许使用多个分隔符。 </li>
<li>月和日的名称必须具有两个或两个以上的字符。如果两个字符所组成的名称不是独一无二的，那么该名称就被解析成最后一个符合条件的月或日。例如，"Ju" 被解释为七月而不是六月。 </li>
<li>在所提供的日期中，如果所指定的星期几的值与按照该日期中剩余部分所确定的星期几的值不符合，那么该指定值就会被忽略。例如，尽管 1996 年 11 月 9 日实际上是星期五，"Tuesday November 9 1996" 也还是可以被接受并进行解析的。但是结果 date 对象中包含的是 "Friday November 9 1996"。 </li>
<li>JScript 处理所有的标准时区，以及全球标准时间 (UTC) 和格林威治标准时间 (GMT)。</li> 
<li>小时、分钟、和秒钟之间用冒号分隔，尽管不是这三项都需要指明。"10:"、"10:11"、和 "10:11:12" 都是有效的。 </li>
<li>如果使用 24 小时计时的时钟，那么为中午 12 点之后的时间指定 "PM" 是错误的。例如 "23:15 PM" 就是错误的。</li> 
<li>包含无效日期的字符串是错误的。例如，一个包含有两个年份或两个月份的字符串就是错误的。</li>
</ol>
        
 *         
*/
baidu.date.parse = function (source) {
    var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ('string' == typeof source) {
        if (reg.test(source) || isNaN(Date.parse(source))) {
            var d = source.split(/ |T/),
                d1 = d.length > 1 
                        ? d[1].split(/[^\d]/) 
                        : [0, 0, 0],
                d0 = d[0].split(/[^\d]/);
            return new Date(d0[0] - 0, 
                            d0[1] - 1, 
                            d0[2] - 0, 
                            d1[0] - 0, 
                            d1[1] - 0, 
                            d1[2] - 0);
        } else {
            return new Date(source);
        }
    }
    
    return new Date();
};





/**
 * @fileoverview
 * @author meizz
 * @create 2012-07-05
 * @modify
 */

/**
 * @description 通过 HTMLString 创建 DOM 对象
 *
 * @function
 * @name baidu.dom.createElements
 * @grammar baidu.dom.createElements(HTMLString)
 * @param   {HTMLString}    htmlstring HTMLString
 * @return  {$DOM}          new TangramDom
 */
baidu.dom.createElements = function() {
    var tagReg  = /<(\w+)/i,
        rhtml = /<|&#?\w+;/,
        tagMap  = {
            area    : [1, "<map>", "</map>"],
            col     : [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
            legend  : [1, "<fieldset>", "</fieldset>"],
            option  : [1, "<select multiple='multiple'>", "</select>"],
            td      : [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            thead   : [1, "<table>", "</table>"],
            tr      : [2, "<table><tbody>", "</tbody></table>"],
            _default: [0, "", ""]
        };

    // 建立映射
    tagMap.optgroup = tagMap.option;
    tagMap.tbody = tagMap.tfoot = tagMap.colgroup = tagMap.caption = tagMap.thead;
    tagMap.th = tagMap.td;

    // 将<script>解析成正常可执行代码
    function parseScript ( box, doc ) {
        var list = box.getElementsByTagName("SCRIPT"),
            i, script, item;

        for ( i=list.length-1; i>=0; i-- ) {
            item = list[ i ];
            script = doc.createElement( "SCRIPT" );

            item.id && (script.id = item.id);
            item.src && (script.src = item.src);
            item.type && (script.type = item.type);
            script[ item.text ? "text" : "textContent" ] = item.text || item.textContent;

            item.parentNode.replaceChild( script, item );
        }
    }

    return function( htmlstring, doc ) {
        baidu.isNumber( htmlstring ) && ( htmlstring = htmlstring.toString() );
        doc = doc || document;

        var wrap, depth, box,
            hs  = htmlstring,
            n   = hs.length,
            div = doc.createElement("div"),
            df  = doc.createDocumentFragment(),
            result = [];

        if ( baidu.isString( hs ) ) {
            if(!rhtml.test(hs)){// TextNode
                result.push( doc.createTextNode( hs ) );
            }else {//htmlString
                wrap = tagMap[ hs.match( tagReg )[1].toLowerCase() ] || tagMap._default;

                div.innerHTML = "<i>mz</i>" + wrap[1] + hs + wrap[2];
                div.removeChild( div.firstChild );  // for ie (<script> <style>)
                parseScript(div, doc);

                depth = wrap[0];
                box = div;
                while ( depth -- ) { box = box.firstChild; };

                baidu.merge( result, box.childNodes );

                // 去除 item.parentNode
                baidu.forEach( result, function (dom) {
                    df.appendChild( dom );
                } );

                div = box = null;
            }
        }

        div = null;

        return result;
    };
}();








/**
 * @fileoverview
 * @name baidu.dom.add
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 给当前TangramDom对象添加新的DOM元素
 * @function
 * @name baidu.dom().add()
 * @grammar baidu.dom(args).add(selector)
 * @param   {String}    selector    CSS选择器
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
/**
 * @description 给当前TangramDom对象添加新的DOM元素
 * @function
 * @name baidu.dom().add()
 * @grammar baidu.dom(args).add(HTMLElement)
 * @param   {HTMLElement}    HTMLElement    DOM对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
/**
 * @description 给当前TangramDom对象添加新的DOM元素
 * @function
 * @name baidu.dom().add()
 * @grammar baidu.dom(args).add(HTMLString)
 * @param   {String}    HTMLString    HTML文本
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
/**
 * @description 给当前TangramDom对象添加新的DOM元素
 * @function
 * @name baidu.dom().add()
 * @grammar baidu.dom(args).add(TangramDom)
 * @param   {TangramDom}    TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    add : function (object, context) {
        var a = baidu.array(this.get());

        switch (baidu.type(object)) {
            case "HTMLElement" :
                a.push(object);
                break;

            case "$DOM" :
            case "array" :
                baidu.merge(a, object)
                break;

            // HTMLString or selector
            case "string" :
                baidu.merge(a, baidu.dom(object, context));
                break;
            // [TODO] case "NodeList" :
            default :
                if (typeof object == "object" && object.length) {
                    baidu.merge(a, object)
                }
        }
        return baidu.dom( a.unique() );
    }
});

// meizz 20120601 add方法可以完全使用 baidu.merge(this, baidu.dom(object, context)) 这一句代码完成所有功能，但为节约内存和提高效率的原因，将几个常用分支单独处理了

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 为每个匹配的元素添加指定的className
 * @function 
 * @name baidu.dom().addClass()
 * @grammar baidu.dom(args).addClass(className)
 * @param {String} className 为每个匹配元素所要增加的一个或多个class属性名(多个用空格分隔)。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example 
 该接口支持传入多个className，并且可以打乱顺序，会自动除重。
 示例代码：
 //HTML片段
 <div id='test-div' class="class3"></div>

 //单个className
 baidu('#test-div').addClass('class1');
 
 //多个className
 baidu('#test-div').addClass('class1 class2');

 //这个方法通常和.removeClass()一起使用用来切换元素的样式, 像这样：
 baidu('#test-div').removeClass("class3").addClass('class1 class2'); 

 */

/**
 * @description 为每个匹配的元素添加指定的className
 * @function 
 * @name baidu.dom().addClass()
 * @grammar baidu.dom(args).addClass(fn)
 * @param {Function} fn 这个函数返回一个或更多用空格隔开的要增加的样式名，接收元素的索引index和元素旧的样式名className作为参数。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的className和index（索引值），并且将函数返回值设置为对应的className；
 通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <div id='test-div1'></div>
 <div id='test-div2'></div>

 //迭代器方法
 //通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu('div').addClass(function(index,className){
    alert(index);
    alert(className);
    if(index==1){
       return "test-class"+index;
    }
 });

 */





baidu.dom.extend({
    addClass: function(value){
        
        //异常处理
        if(arguments.length <= 0 ){
            return this;
        };

        switch(typeof value){
            case 'string':

                //对输入进行处理
                value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
                
                var arr = value.split(' ');
                baidu.forEach(this, function(item, index){
                    var str = '';
                    if(item.className){
                        str = item.className;
                    };
                    for(var i = 0; i<arr.length; i++){
                        if((' '+str+' ').indexOf(' '+arr[i]+' ') == -1){
                            str += (' '+arr[i]);
                        };
                    };
                    item.className = str.replace(/^\s+/g,'') ;
                });

            break;
            case 'function':
                baidu.forEach(this, function(item, index){
                    baidu.dom(item).addClass(value.call(item, index, item.className));
                });

            break;
        };

        return this;
    }
});
/**
 * @author linlingyu
 */

/**
 * @description 取得匹配元素所属的document对象
 * @function 
 * @name baidu.dom().getDocument()
 * @grammar baidu.dom(args).getDocument()
 * @return {document} 返回一个document对象
 */
/**
 * @description 获取目标元素所属的document对象
 * @function 
 * @name baidu.dom.getDocument
 * @grammar baidu.dom.getDocument(element)
 * @param {String|Element} element 目标元素或目标元素的id
 * @return {document} 返回一个document对象
 */
baidu.dom.extend({
    getDocument: function(){
        if(this.size()<=0){return undefined;}
        var ele = this[0];
        return ele.nodeType == 9 ? ele : ele.ownerDocument || ele.document;
    }
});




baidu._util_.cleanData = function(array){
    var tangId;
    for(var i = 0, ele; ele = array[i]; i++){
        tangId = baidu.id(ele, 'get');
        if(!tangId){continue;}
        baidu._util_.eventBase.removeAll(ele);
        baidu.id(ele, 'remove');
    }
}
/**
 * @author linlingyu
 */



/**
 * @description 将匹配到的DOM元素的内部内容全部清空
 * @function 
 * @name baidu.dom().empty()
 * @grammar baidu.dom(args).empty()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该方法会移除掉匹配元素中的元素，但是该方法不会去移除已经绑定在元素上面的事件，
 如果要移除已经绑定的事件，使用.remove()方法。

 示例代码：
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>

 //清除div中的内容
 baidu('div').empty();

 //结果：
 <div>
 </div>

 */


baidu.dom.extend({
    empty: function(){
        for(var i = 0, item; item = this[i]; i++){
            item.nodeType === 1 && baidu._util_.cleanData(item.getElementsByTagName('*'));
            while(item.firstChild){
                item.removeChild(item.firstChild);
            }
        }
        return this;
    }
});


/**
 * @author linlingyu
 */




/**
 * @description 在匹配的每个DOM元素内部的末端插入内容
 * @function 
 * @name baidu.dom().append()
 * @grammar baidu.dom(args).append(content1[,content2])
 * @param {HTMLString|Element|TangramDom} content1 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content2 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 .append()函数将特定内容插入到每个匹配元素里面的最后面，作为它的最后一个子元素（last child）, 
 如果要作为第一个子元素 （first child），用.prepend()或.prependTo()
 
 .append() 和.appendTo()实现同样的功能，主要的不同是语法——内容和目标的位置不同。
 对于.append()，选择表达式在函数的前面，参数是将要插入的内容。
 对于.appendTo()刚好相反，内容在方法前面，它将被放在参数里元素的末尾。

 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素后面
 baidu('#body').append('<h2>footer</h2>');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素后面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('#body').append(baidu('h2'));  //结果同上

 */

/**
 * @description 在匹配的每个DOM元素内部的末端插入内容
 * @function 
 * @name baidu.dom().append()
 * @grammar baidu.dom(args).append(fn)
 * @param {Function} fn 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom(args).append(function(index,html){})
 */

baidu.dom.extend({
    append: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.append');
        baidu._util_.smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.appendChild(child);
        });
        return this;
    }
});
/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 从匹配的第一个元素中获取HTML内容。
 * @function 
 * @name baidu.dom().html()
 * @grammar baidu.dom(args).html()
 * @return {String|Undefined} HTML内容
 * @example
 在一个HTML文档中，我们可以使用.html()方法来获取任意一个元素的内容。
 如果选择器匹配多于一个的元素，那么只有第一个匹配元素的 HTML 内容会被获取。

 示例代码：
 //HTML代码片段
 <div>
   <h1>title</h1>
   <p>content</p>
 </div>

 //获取HTML
 baidu('div').html();  //得到 <h1>title</h1><p>content</p>

 */
 /**
 * @description 设置每一个匹配元素的html内容。
 * @function 
 * @name baidu.dom().html()
 * @grammar baidu.dom(args).html(htmlString)
 * @param {String} htmlString 用来设置每个匹配元素的一个HTML 字符串。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 我们可以使用.html()来设置元素的内容，在这些元素的任何内容完全被新的内容取代。
 如果匹配多个元素，则将会改变所有的HTML，符合get first set all原则。

 示例代码：
 //HTML代码片段
 <div>
   <h1>title</h1>
   <p>content</p>
 </div>

 //重置HTML
 baidu('div').html('<input>');
 
 //生成代码
 <div>
   <input>
 </div>
 
 */
 /**
 * @description 设置每一个匹配元素的html内容。
 * @function 
 * @name baidu.dom().html()
 * @grammar baidu.dom(args).html(fn)
 * @param {Function} fn 用来返回设置HTML内容的一个函数。接收元素的索引位置和元素旧的HTML作为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom(args).html(function(index, html))
 */








baidu.dom.extend({
    html: function(value){

        var bd = baidu.dom,
            bt = baidu._util_,
            me = this,
            isSet = false,
            result;

        //当dom选择器为空时
        if(this.size()<=0){
            switch(typeof value){
                case 'undefined':
                    return undefined;
                break;
                default:
                    return me;
                break;
            }            
        }
        
        var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
        "header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            rnoInnerhtml = /<(?:script|style|link)/i,
            rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
            rleadingWhitespace = /^\s+/,
            rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            wrapMap = {
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                legend: [ 1, "<fieldset>", "</fieldset>" ],
                thead: [ 1, "<table>", "</table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                area: [ 1, "<map>", "</map>" ],
                _default: [ 0, "", "" ]
            };
        wrapMap.optgroup = wrapMap.option;
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
        wrapMap.th = wrapMap.td;

        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
        // unless wrapped in a div with non-breaking characters in front of it.
        if ( !baidu.support.htmlSerialize ) {
            wrapMap._default = [ 1, "X<div>", "</div>" ];
        }

        baidu.forEach(me,function(elem, index){
            
            if(result){
                return;
            };
            var tangramDom = bd(elem);
            switch(typeof value){
                case 'undefined':
        
                    //get first
                    result = ( elem.nodeType === 1 ? elem.innerHTML : undefined );
                    return result;

                break;

                case 'number':
                    value = String(value);
                case 'string':

                    //set all
                    isSet = true;

                    // See if we can take a shortcut and just use innerHTML
                    if ( !rnoInnerhtml.test( value ) &&
                        ( baidu.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
                        ( baidu.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
                        !wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

                        value = value.replace( rxhtmlTag, "<$1></$2>" );

                        try {

                            // Remove element nodes and prevent memory leaks
                            if ( elem.nodeType === 1 ) {
                                tangramDom.empty();
                                elem.innerHTML = value;
                            }

                            elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                        } catch(e) {}
                    }

                    if ( elem ) {
                        me.empty().append( value );
                    }

                break;

                case 'function':

                    //set all
                    isSet = true;
                    tangramDom.html(value.call(elem, index, tangramDom.html()));
                break;
            };
        });
        
        return isSet?me:result;
    }
});
/**
 * @author linlingyu
 */








baidu._util_.smartInsert = function(tang, args, callback){
    if(args.length <= 0 || tang.size() <= 0){return;}
    if(baidu.type(args[0]) === 'function'){
        var fn = args[0],
            tangItem;
        return baidu.forEach(tang, function(item, index){
            tangItem = baidu.dom(item);
            args[0] = fn.call(item, index, tangItem.html());
            baidu._util_.smartInsert(tangItem, args, callback);
        });
    }
    var doc = tang.getDocument() || document,
        fragment = doc.createDocumentFragment(),
        len = tang.length - 1,
        firstChild;
    for(var i = 0, item; item = args[i]; i++){
        if(item.nodeType){
            fragment.appendChild(item);
        }else{
            baidu.forEach(~'string|number'.indexOf(baidu.type(item)) ?
                baidu.dom.createElements(item, doc)
                    : item, function(ele){
                        fragment.appendChild(ele);
                    });
        }
    }
    if(!(firstChild = fragment.firstChild)){return;}
    baidu.forEach(tang, function(item, index){
        callback.call(item.nodeName.toLowerCase() === 'table'
            && firstChild.nodeName.toLowerCase() === 'tr' ?
                item.tBodies[0] || item.appendChild(item.ownerDocument.createElement('tbody'))
                    : item, index < len ? fragment.cloneNode(true) : fragment);
    });
};
/**
 * @author linlingyu
 */





/**
 * @description 在匹配的每个DOM元素后面插入新的内容
 * @function 
 * @name baidu.dom().after()
 * @grammar baidu.dom(args).after(content1[, content2])
 * @param {HTMLString|Element|TangramDom} content1 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content2 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口是在匹配的每个DOM元素后面插入新的内容。
 
 其实.after()和.insertAfter()实现同样的功能，主要的不同是语法——特别是内容和目标的位置。 
 对于 .after()，选择表达式在函数的前面，参数是将要插入的内容，
 对于.insertAfter()，刚好相反，内容在方法前面，它将被放在参数里元素的后面。
 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面。 

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素后面
 baidu('.content').after('<h2>footer</h2>');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素后面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('.content').after(baidu('h2'));  //结果同上
 */

/**
 * @description 在匹配的每个DOM元素后面插入新的内容
 * @function 
 * @name baidu.dom().after()
 * @grammar baidu.dom(args).after(fn)
 * @param {Function} fn 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom(args).after(function(index,html))
 */
baidu.dom.extend({
    after: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.after');
        var parentNode = this[0] && this[0].parentNode,
            array = !parentNode && [];
        baidu._util_.smartInsert(this, arguments, function(node){
            parentNode ? parentNode.insertBefore(node, this.nextSibling)
                : baidu.merge(array, node.childNodes);
        });
        array && baidu.merge(this, array);
        return this;
    }
});



/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之前所有的同辈元素，直到遇到匹配的那个元素为止
 *
 * @function
 * @name baidu.dom().map()
 * @grammar baidu.dom(args).map(iterator)
 * @param   {Function}            iterator    遍历函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象        old TangramDom
 */
baidu.dom.extend({
    map : function (iterator) {
        baidu.check("function","baidu.dom.map");
        var me = this,
            td = baidu.dom();

        baidu.forEach(this, function( dom, index ){
            td[td.length ++] = iterator.call( dom, index, dom, dom );
        });

        return td;
    }
});

//Sizzle.isXML

baidu._util_.isXML = function(ele) {
    var docElem = (ele ? ele.ownerDocument || ele : 0).documentElement;
    return docElem ? docElem.nodeName !== 'HTML' : false;
};

/**
 * @author linlingyu
 */






/**
 * @description 对匹配元素进行深度克隆
 * @function 
 * @name baidu.dom().clone()
 * @grammar baidu.dom(args).clone([withDataAndEvents[,deepWithDataAndEvents]])
 * @param {Boolean} withDataAndEvents 一个可选的布尔值参数，当参数为true时，表示当次克隆需要将该匹配元素的数据和事件也做克隆
 * @param {Boolean} deepWithDataAndEvents 一个可选的布尔值参数，当参数为true时，表示当次克隆需要将该匹配元素的所有子元素的数据和事件也做克隆
 * @return {TangramDom} 接口最终返回一个TangramDom对象，该对象包装了克隆的节点
 * @example
 .clone()方法深度复制所有匹配的元素，包括所有匹配元素、匹配元素的下级元素、文字节点。
 当和插入方法联合使用时，.clone()对于复制页面上的元素很方便。
 
 注意：如果也要克隆事件，需要传入参数。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>
 <h2>footer</h2>

 //通常我们将页面上一个元素插入到DOM里另立个地方，它会被从老地方移走：
 baidu('h2').appendTo(baidu('#body'));

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>

 //但是我们如果需要的是复制而不是移除，我们可以像下面这样写代码：
 baidu('h2').clone().appendTo(baidu('#body'));

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>
 <h2>footer</h2>

 //仅克隆当前节点的事件
 baidu('h2').clone(true);

 //克隆当前节点及所有子节点的全部事件
 baidu('h2').clone(true,true);

 */

baidu.dom.extend({
    clone: function(){
        var event = baidu._util_.eventBase;
        //
        function getAll(ele){
            return ele.getElementsByTagName ? ele.getElementsByTagName('*')
                : (ele.querySelectorAll ? ele.querySelectorAll('*') : []);
        }
        //
        function cloneFixAttributes(src, dest){
            dest.clearAttributes && dest.clearAttributes();
            dest.mergeAttributes && dest.mergeAttributes(src);
            switch(dest.nodeName.toLowerCase()){
                case 'object':
                    dest.outerHTML = src.outerHTML;
                    break;
                case 'textarea':
                case 'input':
                    if(~'checked|radio'.indexOf(src.type)){
                        src.checked && (dest.defaultChecked = dest.checked = src.checked);
                        dest.value !== src.value && (dest.value = src.value);
                    }
                    dest.defaultValue = src.defaultValue;
                    break;
                case 'options':
                    dest.selected = src.defaultSelected;
                    break;
                case 'script':
                    dest.text !== src.text && (dest.text = src.text);
                    break;
            }
            dest[baidu.key] && dest.removeAttribute(baidu.key);
        }
        //
        function cloneCopyEvent(src, dest){
            if(dest.nodeType !== 1 || !baidu.id(src, 'get')){return;}
            var defaultEvents = event.get(src);
            for(var i in defaultEvents){
                for(var j = 0, handler; handler = defaultEvents[i][j]; j++){
                    event.add(dest, i, handler);
                }
            }
        }
        //
        function clone(ele, dataAndEvents, deepDataAndEvents){
            var cloneNode = ele.cloneNode(true),
                srcElements, destElements, len;
            //IE
            if((!baidu.support.noCloneEvent || !baidu.support.noCloneChecked)
                && (ele.nodeType === 1 || ele.nodeType === 11) && !baidu._util_.isXML(ele)){
                    cloneFixAttributes(ele, cloneNode);
                    srcElements = getAll( ele );
                    destElements = getAll( cloneNode );
                    len = srcElements.length;
                    for(var i = 0; i < len; i++){
                        destElements[i] && cloneFixAttributes(srcElements[i], destElements[i]);
                    }
            }
            if(dataAndEvents){
                cloneCopyEvent(ele, cloneNode);
                if(deepDataAndEvents){
                    srcElements = getAll( ele );
                    destElements = getAll( cloneNode );
                    len = srcElements.length;
                    for(var i = 0; i < len; i++){
                        cloneCopyEvent(srcElements[i], destElements[i]);
                    }
                }
            }
            return cloneNode;
        }
        //
        return function(dataAndEvents, deepDataAndEvents){
            dataAndEvents = !!dataAndEvents;
            deepDataAndEvents = !!deepDataAndEvents;
            return this.map(function(){
                return clone(this, dataAndEvents, deepDataAndEvents);
            });
        }
    }()
});

/**
 * @author linlingyu
 */









baidu._util_.smartInsertTo = function(tang, target, callback, orie){
    var insert = baidu.dom(target),
        first = insert[0],
        tangDom;
        
    if(orie && first && (!first.parentNode || first.parentNode.nodeType === 11)){
        orie = orie === 'before';
        tangDom = baidu.merge(orie ? tang : insert, !orie ? tang : insert);
        if(tang !== tangDom){
            tang.length = 0;
            baidu.merge(tang, tangDom);
        }
    }else{
        for(var i = 0, item; item = insert[i]; i++){
            baidu._util_.smartInsert(baidu.dom(item), i > 0 ? tang.clone(true) : tang, callback);
        }
    }
};

/**
 * @author linlingyu
 */



/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素内部的末端
 * @function 
 * @name baidu.dom().appendTo()
 * @grammar baidu.dom(args).appendTo(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 .appendTo()函数将特定内容插入到每个匹配元素里面的最后面，作为它的最后一个子元素（last child）, 
 如果要作为第一个子元素 （first child），用.prepend()或.prependTo()
 
 .append() 和.appendTo()实现同样的功能，主要的不同是语法——内容和目标的位置不同。
 对于.append()，选择表达式在函数的前面，参数是将要插入的内容。
 对于.appendTo()刚好相反，内容在方法前面，它将被放在参数里元素的末尾。

 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素后面
 baidu('<h2>footer</h2>').appendTo(baidu('#body'));

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素后面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('h2').after(baidu('#body'));  //结果同上

 */
baidu.dom.extend({
    appendTo: function(target){
        baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.appendTo');
        baidu._util_.smartInsertTo(this, target, function(child){
            this.appendChild(child);
        });
        return this;
    }
});
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */






baidu.extend(baidu._util_,{
    rfocusable:/^(?:button|input|object|select|textarea)$/i,
    rclickable:/^a(?:rea)?$/i,
    rboolean:/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    propFix:{
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    },
    propHooks: {
        tabIndex:{
            get: function( elem ) {

                var bu = baidu._util_;
                // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                var attributeNode = elem.getAttributeNode("tabindex");

                return attributeNode && attributeNode.specified ?
                    parseInt( attributeNode.value, 10 ) :
                    bu.rfocusable.test( elem.nodeName ) || bu.rclickable.test( elem.nodeName ) && elem.href ?
                        0 :
                        undefined;
            }
        }
    }
});

// IE6/7 call enctype encoding
if ( !baidu.support.enctype ) {
    var bu = baidu._util_;
    bu.propFix.enctype = "encoding";
};

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !baidu.support.optSelected ) {
    var bu = baidu._util_;
    bu.propHooks.selected = baidu.extend( bu.propHooks.selected, {
        get: function( elem ) {
            var parent = elem.parentNode;

            if ( parent ) {
                parent.selectedIndex;

                // Make sure that it also works with optgroups, see #5701
                if ( parent.parentNode ) {
                    parent.parentNode.selectedIndex;
                }
            }
            return null;
        }
    });
};

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */






baidu.extend(baidu,{
    _error : function( msg ) {
        throw new Error( msg );
    },
    _nodeName : function( elem, name ) {
        return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
    }    
});

baidu.extend(baidu._util_,{
    rfocusable : /^(?:button|input|object|select|textarea)$/i,
    rtype : /^(?:button|input)$/i,
    rclickable : /^a(?:rea)?$/i,
    nodeHook:{},
    attrHooks: {
        type: {
            set: function( elem, value ) {
                var bu = baidu._util_;
                // We can't allow the type property to be changed (since it causes problems in IE)
                if ( bu.rtype.test( elem.nodeName ) && elem.parentNode ) {
                    baidu._error( "type property can't be changed" );
                } else if ( !baidu.support.radioValue && value === "radio" && baidu._nodeName(elem, "input") ) {
                    // Setting the type on a radio button after the value resets the value in IE6-9
                    // Reset value to it's default in case type is set after value
                    // This is for element creation
                    var val = elem.value;
                    elem.setAttribute( "type", value );
                    if ( val ) {
                        elem.value = val;
                    }
                    return value;
                }
            }
        },
        // Use the value property for back compat
        // Use the nodeHook for button elements in IE6/7 (#1954)
        value: {
            get: function( elem, name ) {
                var bu = baidu._util_;
                if ( bu.nodeHook && baidu._nodeName( elem, "button" ) ) {
                    return bu.nodeHook.get( elem, name );
                }
                return name in elem ?
                    elem.value :
                    null;
            },
            set: function( elem, value, name ) {
                if ( bu.nodeHook && baidu._nodeName( elem, "button" ) ) {
                    return bu.nodeHook.set( elem, value, name );
                }
                // Does not return so that setAttribute is also used
                elem.value = value;
            }
        }
    },
    // Hook for boolean attributes
    boolHook : {
        get: function( elem, name ) {
            // Align boolean attributes with corresponding properties
            // Fall back to attribute presence where some booleans are not supported
            var attrNode,
                property = baidu(elem).prop( name );
            return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
                name.toLowerCase() :
                undefined;
        },
        set: function( elem, value, name ) {
            var propName;
            if ( value === false ) {
                // Remove boolean attributes when set to false
                baidu(elem).removeAttr( name );
            } else {
                // value is true since we know at this point it's type boolean and not false
                // Set boolean attributes to the same name and set the DOM property
                propName = baidu._util_.propFix[ name ] || name;
                if ( propName in elem ) {
                    // Only set the IDL specifically if it already exists on the element
                    elem[ propName ] = true;
                }

                elem.setAttribute( name, name.toLowerCase() );
            }
            return name;
        }
    }
});

// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
baidu._util_.attrHooks.tabindex = baidu._util_.propHooks.tabIndex;

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !baidu.support.getSetAttribute ) {

    var bu = baidu._util_,
        fixSpecified = {
            name: true,
            id: true,
            coords: true
        };

    // Use this for any attribute in IE6/7
    // This fixes almost every IE6/7 issue
    bu.nodeHook = {
        get: function( elem, name ) {
            var ret;
            ret = elem.getAttributeNode( name );
            return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
                ret.nodeValue :
                undefined;
        },
        set: function( elem, value, name ) {
            // Set the existing or create a new attribute node
            var ret = elem.getAttributeNode( name );
            if ( !ret ) {
                ret = document.createAttribute( name );
                elem.setAttributeNode( ret );
            }
            return ( ret.nodeValue = value + "" );
        }
    };

    // Apply the nodeHook to tabindex
    bu.attrHooks.tabindex.set = bu.nodeHook.set;

    // Set width and height to auto instead of 0 on empty string( Bug #8150 )
    // This is for removals
    baidu.forEach([ "width", "height" ], function( name ) {
        bu.attrHooks[ name ] = baidu.extend( bu.attrHooks[ name ], {
            set: function( elem, value ) {
                if ( value === "" ) {
                    elem.setAttribute( name, "auto" );
                    return value;
                }
            }
        });
    });

    // Set contenteditable to false on removals(#10429)
    // Setting to empty string throws an error as an invalid value
    bu.attrHooks.contenteditable = {
        get: bu.nodeHook.get,
        set: function( elem, value, name ) {
            if ( value === "" ) {
                value = "false";
            }
            bu.nodeHook.set( elem, value, name );
        }
    };
};

// Some attributes require a special call on IE
if ( !baidu.support.hrefNormalized ) {
    var bu = baidu._util_;
    baidu.forEach([ "href", "src", "width", "height" ], function( name ) {
        bu.attrHooks[ name ] = baidu.extend( bu.attrHooks[ name ], {
            get: function( elem ) {
                var ret = elem.getAttribute( name, 2 );
                return ret === null ? undefined : ret;
            }
        });
    });
};

if ( !baidu.support.style ) {
    var bu = baidu._util_;
    bu.attrHooks.style = {
        get: function( elem ) {
            // Return undefined in the case of empty string
            // Normalize to lowercase since IE uppercases css property names
            return elem.style.cssText.toLowerCase() || undefined;
        },
        set: function( elem, value ) {
            return ( elem.style.cssText = "" + value );
        }
    };
};


/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 取得第一个匹配元素对应的属性值。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(Property)
 * @param {String} Property 要获取的值的对应属性名
 * @return {String|undefined} 只获取第一个匹配元素的属性值，当属性没有被设置时候，.prop()方法将返回undefined。
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 当属性没有被设置时候，.prop()方法将返回undefined；
 可以用在普通的对象，数组，窗口（window）或文件（document）上，可以检索和更改DOM属性。

 attributes和properties之间的差异在特定情况下是很重要。
 .prop方法无法取出自定义属性的值，都会返回undefined，这时要使用attr()接口。
 
 例如，考虑一个DOM元素的HTML标记中定义的<input type="checkbox" checked="checked" /> ，并假设它是一个JavaScript变量命名的elem ：
 
 elem.checked    返回 true (Boolean)
 baidu(elem).prop("checked")  返回 true (Boolean)
 elem.getAttribute("checked")  返回 "checked" (String)
 baidu(elem).attr("checked")  返回 "checked" (String)
 baidu(elem).attr("checked")  返回  true (Boolean)

 示例代码：
 //HTML片段
 <input type="checkbox" checked="checked" />

 //取得checked属性
 baidu("input").prop("checked");  //true

 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(property,value)
 * @param {String} property 要设置值的属性名
 * @param {String} value 这个属性设置的值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。

 示例代码：
 //HTML片段
 <input type="checkbox"/>

 //设置checked属性
 baidu("input").prop("checked"，true);

 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(object)
 * @param {Object} object 一个配对的属性值的object对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 支持传入一个Object类型，来设置多个值。
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 当属性没有被设置时候，.attr()方法将返回undefined；
 另外，.attr()不应该用在普通的对象，数组，窗口（window）或文件（document）上。若要检索和更改DOM属性请使用.prop()方法。
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。
 示例代码：
 //HTML片段
 <input type="checkbox"/>

 //设置checked属性
 baidu("input").prop("checked"，true);

 */
 /**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().prop()
 * @grammar baidu.dom(args).prop(Property,fn)
 * @param {String} Property 要设置值的属性名.
 * @param {Function} fn 这个函数返回用来设置的值，this 是当前的元素，接收元素的索引位置index和元素旧的样属性值prop为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的属性和index（索引值），并且将函数返回值设置为对应的属性；
 通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <input type="checkbox"/>
 <input type="checkbox"/>

 //迭代器方法
 //通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu("input").prop("checked",function(index,prop){
    alert(index);
    alert(prop);
    if(index==1){
      return "checked";
    }
 });
 */







baidu.dom.extend({
    prop:function(name,value){

        //异常处理
        if(arguments.length <= 0 || typeof name === 'function'){
            return this;
        };

        //返回结果
        var result,
        me = this,
        isSet = false;

        //当dom选择器为空时
        if(this.size()<=0){
            if(name&&value){
                return me;
            }else if(name&&!value){
                return undefined;
            }else{
                return me;
            }
        }
        
        baidu.forEach(this, function(item,index){

            if(result){
                return;
            };
            
            var ret, 
                hooks, 
                notxml,
                bd = baidu.dom,
                bu = baidu._util_,
                nType = item.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if ( !item || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            };

            notxml = nType !== 1 || !baidu._util_.isXML( item );

            if ( notxml ) {
                // Fix name and attach hooks
                name = bu.propFix[ name ] || name;
                hooks = bu.propHooks[ name ];
            };
            switch(typeof name){
                case 'string':
                    if( typeof value === 'undefined' ){
                        //get first
                        if ( hooks && "get" in hooks && (ret = hooks.get( item, name )) !== null ) {
                            //return ret;
                            result = ret ;

                        } else {
                            //return item[ name ];
                            result = item[name];
                        };

                    }else if( typeof value === 'function' ){
                        
                        isSet = true;
                        var ele = bd(item);
                        ele.prop( name, value.call(item, index, ele.prop(name)));

                    }else{
                        
                        //set all
                        isSet = true;
                        if ( hooks && "set" in hooks && (ret = hooks.set( item, value, name )) !== undefined ) {
                            return ret;

                        } else {
                            item[ name ] = value;
                        };
                    };

                break;
                case 'object':

                    //set all
                    isSet = true;
                    var ele = bd(item);
                    for(key in name){
                        ele.prop(key,name[key]);
                    };

                break;
                default:
                    result = me;
                break;
            };
        });

        return isSet?this:result;
    }
});
/**
 * @author linlingyu
 */



/**
 * @description 转换一个类似数组的对象成为真正的JavaScript数组
 * @function 
 * @name baidu.makeArray
 * @grammar baidu.makeArray(obj)
 * @param {Object} obj 转换成一个原生数组的任何对象
 * @return {Array} 一个转换后的数组
 */
baidu.makeArray = function(array, results){
    var ret = results || [];
    if(!array){return ret;}
    array.length == null || ~'string|function|regexp'.indexOf(baidu.type(array)) ?
        Array.prototype.push.call(ret, array) : baidu.merge(ret, array);
    return ret;
}
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */









baidu.extend(baidu._util_,{

    nodeName: function( elem, name ) {
        return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
    },

    valHooks: {
        option: {
            get: function( elem ) {
                // attributes.value is undefined in Blackberry 4.7 but
                // uses .value. See #6932
                var val = elem.attributes.value;
                return !val || val.specified ? elem.value : elem.text;
            }
        },
        select: {
            get: function( elem ) {
                var value, i, max, option,
                    index = elem.selectedIndex,
                    values = [],
                    options = elem.options,
                    one = elem.type === "select-one";

                // Nothing was selected
                if ( index < 0 ) {
                    return null;
                }

                // Loop through all the selected options
                i = one ? index : 0;
                max = one ? index + 1 : options.length;
                for ( ; i < max; i++ ) {
                    option = options[ i ];

                    // Don't return options that are disabled or in a disabled optgroup
                    if ( option.selected && (baidu.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                            (!option.parentNode.disabled || !baidu._util_.nodeName( option.parentNode, "optgroup" )) ) {

                        // Get the specific value for the option
                        value = baidu.dom( option ).val();

                        // We don't need an array for one selects
                        if ( one ) {
                            return value;
                        }

                        // Multi-Selects return an array
                        values.push( value );
                    }
                }

                // Fixes Bug #2551 -- select.val() broken in IE after form.reset()
                if ( one && !values.length && options.length ) {
                    return baidu( options[ index ] ).val();
                }

                return values;
            },

            set: function( elem, value ) {
                var values = baidu.makeArray( value );

                baidu(elem).find("option").each(function() {
                    this.selected = baidu.array(values).indexOf( baidu(this).val()) >= 0;
                });

                if ( !values.length ) {
                    elem.selectedIndex = -1;
                }
                return values;
            }
        }
    }
//    
});


// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !baidu.support.getSetAttribute ) {

    var fixSpecified = {
        name: true,
        id: true,
        coords: true
    };

    // Use this for any attribute in IE6/7
    // This fixes almost every IE6/7 issue
    baidu._util_.valHooks.button = {
        get: function( elem, name ) {
            var ret;
            ret = elem.getAttributeNode( name );
            return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
                ret.value :
                undefined;
        },
        set: function( elem, value, name ) {
            // Set the existing or create a new attribute node
            var ret = elem.getAttributeNode( name );
            if ( !ret ) {
                ret = document.createAttribute( name );
                elem.setAttributeNode( ret );
            }
            return ( ret.value = value + "" );
        }
    };
}

// Radios and checkboxes getter/setter
if ( !baidu.support.checkOn ) {
    baidu.forEach([ "radio", "checkbox" ], function() {
        baidu._util_.valHooks[ this ] = {
            get: function( elem ) {
                // Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
                return elem.getAttribute("value") === null ? "on" : elem.value;
            }
        };
    });
}

baidu.forEach([ "radio", "checkbox" ], function(item) {
    baidu._util_.valHooks[ item ] = baidu.extend( baidu._util_.valHooks[ item ], {
        set: function( elem, value ) {
            if ( baidu.isArray( value ) ) {
                return ( elem.checked = baidu.array(value).indexOf(baidu(elem).val()) >= 0 );
            }
        }
    });
});

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
 /**
 * @description 获取匹配的元素集合中第一个元素的当前值。
 * @function 
 * @name baidu.dom().val()
 * @grammar baidu.dom(args).val()
 * @return {String|Number|Undefined} 获取匹配的元素集合中第一个元素的当前值。
 * @example
 .val()方法主要用于获取表单元素的值，下拉框（select）和复选框（checkbox），
 你也可以使用:selected和:checked选择器来获取值，举个例子：

 baidu('select.foo option:selected').val();    // 从下拉框中获取值
 baidu('select.foo').val();                    // 从一个或更多的下拉框中获取值
 baidu('input:checkbox:checked').val();        // 从选中的复选框中获取值
 baidu('input:radio[name=bar]:checked').val(); // 从单选选框中获取值

 示例代码：
 //HTML代码片段
 <input type='text' value='baidu'>

 //获取value
 baidu('input').val();

 */
/**
 * @description 设置匹配的元素集合中每个元素的value值。
 * @function 
 * @name baidu.dom().val()
 * @grammar baidu.dom(args).val(value)
 * @param {String} value 一个文本字符串来设定每个匹配元素的值。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 这个方法通常是用来设置表单域的值。

 示例代码：
 //HTML代码片段
 <input type='text' value='google'>

 //获取value
 baidu('input').val('baidu');

 */
/**
 * @description 设置匹配的元素集合中每个元素的value值。
 * @function 
 * @name baidu.dom().val()
 * @grammar baidu.dom(args).val(fn)
 * @param {Function} fn 一个用来返回设置value值的函数。接收元素的索引位置和元素旧的value值作为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").val(function(index, value){});
 */ 






baidu.dom.extend({
    val: function(value){
        var bd = baidu.dom,
            bu = baidu._util_,
            me = this,
            isSet = false,
            result;

        //当dom选择器为空时
        if(this.size()<=0){
            switch(typeof value){
                case 'undefined':
                    return undefined;
                break;
                default:
                    return me;
                break;
            }            
        }
                
        baidu.forEach(me,function(elem, index){
            
            var hooks,
                rreturn = /\r/g;

            if(result){
                return;
            }

            switch(typeof value){
                case 'undefined':
        
                    //get first
                    if ( elem ) {
                        hooks = bu.valHooks[ elem.type ] || bu.valHooks[ elem.nodeName.toLowerCase() ];
                        if ( hooks && "get" in hooks && (result = hooks.get( elem, "value" )) !== undefined ) {
                            return result;
                        }
                        result = elem.value;

                        return typeof result === "string" ?
                        
                        // handle most common string cases
                        result.replace(rreturn, "") :
                        
                        // handle cases where value is null/undef or number
                        result == null ? "" : result;
                    }
                
                    return result;

                break;

                case 'function':

                    //set all
                    isSet = true;
                    var tangramDom = bd(elem);
                    tangramDom.val(value.call(elem, index, tangramDom.val()));

                break;

                default:

                    //set all
                    isSet = true;

                    if ( elem.nodeType !== 1 ) {
                        return;
                    }

                    // Treat null/undefined as ""; convert numbers to string
                    if ( value == null ) {
                        value = "";
                    } else if ( typeof value === "number" ) {
                        value += "";
                    } else if ( baidu.isArray( value ) ) {
                        value = baidu.forEach(value,function ( value, index ) {
                            return value == null ? "" : value + "";
                        });
                    }

                    hooks = bu.valHooks[ elem.type ] || bu.valHooks[ elem.nodeName.toLowerCase() ];

                    // If set returns undefined, fall back to normal setting
                    if ( !hooks || !("set" in hooks) || hooks.set( elem, value, "value" ) === undefined ) {
                        elem.value = value;
                    }

                break;
            };
        });

        return isSet?me:result;
    }
});

/**
 * @author linlingyu
 */




baidu._util_.access = function(key, value, callback){
    if( this.size()<=0 ){
        return this;
    };
    switch(baidu.type(key)){
        case 'string'://高频
            if(value === undefined){
                return callback.call(this, this[0], key);
            }else{
                for(var i = 0, ele; ele = this[i]; i++){
                    callback.call(this, ele, key,
                        baidu.type(value) === 'function' ? value.call(ele, i, callback.call(this, ele, key)) : value);
                }
            }
            break;
        case 'object':
            for(var i in key){
                baidu._util_.access.call(this, i, key[i], callback);
            }
            break;
    }
    return this;
};
/**
 * @author linlingyu
 */

/**
 * @description 取得第一个匹配元素的computed style值。如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
 * @function 
 * @name baidu.dom().getComputedStyle()
 * @grammar baidu.dom(args).getComputedStyle(key)
 * @param {String} key 参数是一个css的属性名称，通过该属性名称取得第一个匹配元素的computed style值
 * @return {String} 返回一个字符串的computed style值
 */
/**
 * @description 取得第一个匹配元素的computed style值。如果元素的样式值不能被浏览器计算，则会返回空字符串（IE）
 * @function 
 * @name baidu.dom.getComputedStyle
 * @grammar baidu.dom.getComputedStyle(element, key)
 * @param {String|Element} element 目标元素或目标元素的id
 * @param {String} key 参数是一个css的属性名称，通过该属性名称取得第一个匹配元素的computed style值
 * @return {String} 返回一个字符串的computed style值
 */
baidu.dom.extend({
    getComputedStyle: function(key){
        var defaultView = this[0].ownerDocument.defaultView,
            computedStyle = defaultView && defaultView.getComputedStyle
                && defaultView.getComputedStyle(this[0], null),
            val = computedStyle ? (computedStyle.getPropertyValue(key) || computedStyle[key]) : '';
        return val || this[0].style[key];
    }
});
/**
 * @author linlingyu
 */

/**
 * @description 取得第一个匹配元素的 currentStyle 值，兼容非IE浏览器某些样式名称或者值需要hack的话，需要别外处理
 * @function 
 * @name baidu.dom().getCurrentStyle()
 * @grammar baidu.dom(args).getCurrentStyle(key)
 * @param {String} key 参数是一个css的属性名称，通过该属性名称取得第一个匹配元素的 currentStyle 值
 * @return {String} 返回一个字符串的 currentStyle 值
 */
/**
 * @description 取得第一个匹配元素的 currentStyle 值，兼容非IE浏览器某些样式名称或者值需要hack的话，需要别外处理
 * @function 
 * @name baidu.dom.getCurrentStyle
 * @grammar baidu.dom.getCurrentStyle(element, key)
 * @param {String|Element} element 目标元素或目标元素的id
 * @param {String} key 参数是一个css的属性名称，通过该属性名称取得第一个匹配元素的 currentStyle 值
 * @return {String} 返回一个字符串的 currentStyle 值
 */
baidu.dom.extend({
    getCurrentStyle: function(){
        var css = document.documentElement.currentStyle ?
            function(key){return this[0].currentStyle ? this[0].currentStyle[key] : this[0].style[key];}
                : function(key){return this.getComputedStyle(key);}
        return function(key){
            return css.call(this, key);
        }
    }()
});
/**
 * @author linlingyu
 */





baidu._util_.getWidthOrHeight = function(){
    var ret = {},
        cssShow = {position: 'absolute', visibility: 'hidden', display: 'block'};
    function swap(ele, options){
        var defaultVal = {};
        for(var i in options){
            defaultVal[i] = ele.style[i];
            ele.style[i] = options[i];
        }
        return defaultVal;
    }
    baidu.forEach(['Width', 'Height'], function(item){
        var cssExpand = {Width: ['Right', 'Left'], Height: ['Top', 'Bottom']}[item];
        ret['get' + item] = function(ele, extra){
            var tang = baidu.dom(ele),
                rect = ele['offset' + item],
                defaultValue = rect === 0 && swap(ele, cssShow),
                delString = 'padding|border';
            defaultValue && (rect = ele['offset' + item]);
            extra && baidu.forEach(extra.split('|'), function(val){
                if(!~delString.indexOf(val)){//if val is margin
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[0])) || 0;
                    rect += parseFloat(tang.getCurrentStyle(val + cssExpand[1])) || 0;
                }else{//val is border or padding
                    delString = delString.replace(new RegExp('\\|?' + val + '\\|?'), '');
                }
            });
            delString && baidu.forEach(delString.split('|'), function(val){
                rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[0] + (val === 'border' ? 'Width' : ''))) || 0;
                rect -= parseFloat(tang.getCurrentStyle(val + cssExpand[1] + (val === 'border' ? 'Width' : ''))) || 0;
            });
            defaultValue && swap(ele, defaultValue);
            return rect;
        }
    });
    //
    return function(ele, key, extra){
        return ret[key === 'width' ? 'getWidth' : 'getHeight'](ele, extra);
    }
}();
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 将目标字符串进行驼峰化处理
 * @function 
 * @name baidu.string().toCamelCase()
 * @grammar baidu.string(str).toCamelCase()
 * @return {String} 驼峰化处理后的字符串
 */

/**
 * @description 将目标字符串进行驼峰化处理
 * @function 
 * @name baidu.string.toCamelCase
 * @grammar baidu.string.toCamelCase(str)
 * @param {String} str 目标字符串
 * @return {String} 驼峰化处理后的字符串
 */

 //支持单词以“-_”分隔
 //todo:考虑以后去掉下划线支持？
baidu.string.extend({
    toCamelCase : function () {
        var source = this.valueOf();
        //提前判断，提高getStyle等的效率 thanks xianwei
        if (source.indexOf('-') < 0 && source.indexOf('_') < 0) {
            return source;
        }
        return source.replace(/[-_][^-_]/g, function (match) {
            return match.charAt(1).toUpperCase();
        });
    }
});

/**
 * @author linlingyu
 */









baidu.dom.styleFixer = function(){
    var alpha = /alpha\s*\(\s*opacity\s*=\s*(\d{1,3})/i,
        nonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
        cssNumber = 'fillOpacity,fontWeight,opacity,orphans,widows,zIndex,zoom',
        cssProps = {
            'float': baidu.support.cssFloat ? 'cssFloat' : 'styleFloat'
        },
        cssMapping = {
            fontWeight: {normal: 400, bold: 700, bolder: 700, lighter: 100}
        },
        cssHooks = {
            opacity: {},
            width: {},
            height: {},
            fontWeight: {
                get: function(ele, key){
                    var ret = style.get(ele, key);
                    return cssMapping.fontWeight[ret] || ret;
                }
            }
        },
        style = {
            set: function(ele, key, val){ele.style[key] = val;}
        };
    baidu.extend(cssHooks.opacity, baidu.support.opacity ? {
        get: function(ele, key){
            var ret = baidu.dom(ele).getCurrentStyle(key);
            return ret === '' ? '1' : ret;
        }
    } : {
        get: function(ele){
            return alpha.test((ele.currentStyle || ele.style).filter || '') ? parseFloat(RegExp.$1) / 100 : '1';
        },
        set: function(ele, key, value){
            var filterString = (ele.currentStyle || ele.style).filter || '',
                opacityValue = value * 100;
                ele.style.zoom = 1;
                ele.style.filter = alpha.test(filterString) ? filterString.replace(alpha, 'Alpha(opacity=' + opacityValue)
                    : filterString + ' progid:dximagetransform.microsoft.Alpha(opacity='+ opacityValue +')';
        }
    });
    //
    baidu.forEach(['width', 'height'], function(item){
        cssHooks[item] = {
            get: function(ele){
                return baidu._util_.getWidthOrHeight(ele, item) + 'px';
            },
            set: function(ele, key, val){
                baidu.type(val) === 'number' && val < 0 && (val = 0);
                style.set(ele, key, val);
            }
        };
    });
    
    baidu.extend(style, document.documentElement.currentStyle? {
        get: function(ele, key){
            var val = baidu.dom(ele).getCurrentStyle(key),
                defaultLeft;
            if(nonpx.test(val)){
                defaultLeft = ele.style.left;
                ele.style.left = key === 'fontSize' ? '1em' : val;
                val = ele.style.pixelLeft + 'px';
                ele.style.left = defaultLeft;
            }
            return val;
        }
    } : {
        get: function(ele, key){
            return baidu.dom(ele).getCurrentStyle(key);
        }
    });
    
    //
    return function(ele, key, val){
        var origKey = baidu.string(key).toCamelCase(),
            method = val === undefined ? 'get' : 'set',
            origVal, hooks;
        origKey = cssProps[origKey] || origKey;
        origVal = baidu.type(val) === 'number' && !~cssNumber.indexOf(origKey) ? val + 'px' : val;
        hooks = cssHooks.hasOwnProperty(origKey) && cssHooks[origKey][method] || style[method];
        return hooks(ele, origKey, origVal);
    };
}();
/**
 * @author linlingyu
 */




/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(key)
 * @param {String} key 一个css的属性名称
 * @return {String} 返回取得的值的字符串
 * @example 
 .css()方法是为匹配的元素集合中获取第一个元素的样式属性值简单方法，
 特别是针对不同的浏览器能访问大多数的性质和不同类型的浏览器某几个属性，
 .css()方法解决了浏览器差异。

 示例代码：
 //HTML代码片段
 <div style="background-color:blue;"></div>

 //取得背景色
 baidu("div").css("background-color");  //blue

 */

/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(key, value)
 * @param {String} key 一个css的属性名称
 * @param {Number|String} value 一个对应key的css的属性值，通过key与value的键和值来设置匹配元素的css属性，当value是一个空字符串时，表示要删除当前属性
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 .css()方法使得设置元素的CSS属性快速而又简单。
 这个方法可以使用任何一个CSS属性名和用空格隔开的值，或者一个“名/值对”对象(JavaScript Object)作为参数。
 示例代码： //HTML代码片段
 <div style="background-color:blue;"></div>

 //取得背景色
 baidu("div").css("background-color","red");  //blue
 
 */

/**
 * @description 设置第一个匹配元素或是设置多个匹配元素的多个css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(map)
 * @param {Object} map 一个具有key-value键值对的json数据，通过该map可以一次设置匹配元素的多个css属性的值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 .css()方法使得设置元素的CSS属性快速而又简单。
 这个方法可以使用任何一个CSS属性名和用空格隔开的值，或者一个“名/值对”对象(JavaScript Object)作为参数。
 示例代码： //HTML代码片段
 <div style="position:absolute;left:20px;right:20px;background-color:blue;"></div>

 //设置css
 baidu("div").css({
     "background-color":"red",
     "left":"30px",
     "right":"40px"
 });
 
 */

/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的css属性
 * @function 
 * @name baidu.dom().css()
 * @grammar baidu.dom(args).css(key, fn)
 * @param {String} key 一个css的属性名称
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，value表示当前key的css属性对应的值，fn最终需要返回一个对应key的css属性值
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的对应css属性和index（索引值），并且将函数返回值设置为对应的css属性；
 通过使用一个函数来设置css属性，我们可以根据元素的css属性来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML代码片段
 <div style="background-color:blue;"></div>
 <div style="background-color:blue;"></div>

 //迭代器方法
 //通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu('div').css("background-color",function(index,css){
    alert(index);
    alert(css);
    if(index==1){
       return "red";
    }
 });

 */

baidu.dom.extend({
    css: function(key, value){
        baidu.check('^(?:(?:string(?:,(?:number|string|function))?)|object)$', 'baidu.dom.css');
        return baidu._util_.access.call(this, key, value, function(ele, key, val){
            var styleFixer = baidu.dom.styleFixer;
            return styleFixer ? styleFixer(ele, key, val)
                : (val === undefined ? this.getCurrentStyle(key) : ele.style[key] = val);
        });
    }
});
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description 得到匹配元素集合中每个元素的文本内容结合,包括他们的后代。
 * @function 
 * @name baidu.dom().text()
 * @grammar baidu.dom(args).text()
 * @param {Null} null 不传入参数
 * @return {String|Undefined} 得到匹配元素集合中每个元素的文本内容结合,包括他们的后代。
 * @example
 .text()方法的结果是由所有匹配元素包含的文本内容组合起来的文本，
 由于不同的浏览器对HTML分析器的不同，在返回的文本换行和其他空格可能会有所不同。

 另：.text() 方法不要使用在 input 元素上，输入的文本需要使用.val()方法。 

 示例代码： 
 //HTML代码片段
 <div>
  <h1>baidu</h1>
  <h2>js小组</h2>
 </div>

 //取得内容
 baidu('div').text(); //得到内容 baidu js小组

 */
/**
 * @description 设置匹配元素集合中每个元素的文本内容为指定的文本内容。
 * @function 
 * @name baidu.dom().text()
 * @grammar baidu.dom(args).text(text)
 * @param {String} text 用于设置匹配元素内容的文本
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 设置匹配的所有元素的文本内容，该方法参数中传入HTML字符串，会被自动转义。

 示例代码： 
 //HTML代码片段
 <div></div>

 //取得内容
 baidu('div').text('<p>baidu</p>'); 

 //得到内容
 <div>
   &lt;p&gt;This is a test.&lt;/p&gt;
 </div>
 
 */
/**
 * @description 设置匹配元素集合中每个元素的文本内容为指定的文本内容。
 * @function 
 * @name baidu.dom().text()
 * @grammar baidu.dom(args).text(fn)
 * @param {Function} fn 用来返回设置文本内容的一个函数。接收元素的索引位置和元素旧的文本值作为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").text(function(index, text))
 */








baidu.dom.extend({
    text: function(value){

        var bd = baidu.dom,
            me = this,
            isSet = false,
            result;

        //当dom选择器为空时
        if(this.size()<=0){
            switch(typeof value){
                case 'undefined':
                    return undefined;
                break;
                default:
                    return me;
                break;
            }            
        }

        /* Sizzle.getText
         * Utility function for retrieving the text value of an array of DOM nodes
         * @param {Array|Element} elem
         */
        var getText = function( elem ) {
            var node,
                ret = "",
                i = 0,
                nodeType = elem.nodeType;

            if ( nodeType ) {
                if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (see #11153)
                    if ( typeof elem.textContent === "string" ) {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                            ret += getText( elem );
                        }
                    }
                } else if ( nodeType === 3 || nodeType === 4 ) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes
            } else {

                // If no nodeType, this is expected to be an array
                for ( ; (node = elem[i]); i++ ) {
                    // Do not traverse comment nodes
                    ret += getText( node );
                }
            }
            return ret;
        };

        baidu.forEach(me,function(elem, index){
            
            var tangramDom = bd(elem);
            if(result){
                return;
            };

            switch(typeof value){
                case 'undefined':
        
                    //get first
                    result = getText(elem);
                    return result;

                break;

                case 'number':
                    value = String(value);
                case 'string':

                    //set all
                    isSet = true;
                    tangramDom.empty().append( ( elem && elem.ownerDocument || document ).createTextNode( value ) );
                break;

                case 'function':

                    //set all
                    isSet = true;
                    tangramDom.text(value.call(elem, index, tangramDom.text()));

                break;
            };
        });

        return isSet?me:result;
    }
});

/**
 * @author linlingyu
 */






baidu._util_.getWindowOrDocumentWidthOrHeight = baidu._util_.getWindowOrDocumentWidthOrHeight || function(){
    var ret = {'window': {}, 'document': {}};
    baidu.forEach(['Width', 'Height'], function(item){
        var clientProp = 'client' + item,
            offsetProp = 'offset' + item,
            scrollProp = 'scroll' + item;
        ret['window']['get' + item] = function(ele){
            var doc = ele.document,
                rectValue = doc.documentElement[clientProp];
            return baidu.browser.isStrict && rectValue
                || doc.body && doc.body[clientProp] || rectValue;
        };
        ret['document']['get' + item] = function(ele){
            var doc = ele.documentElement;
            return doc[clientProp] >= doc[scrollProp] ? doc[clientProp]
                : Math.max(ele.body[scrollProp], doc[scrollProp], ele.body[offsetProp], doc[offsetProp]);
        }
    });
    return function(ele, type, key){
        return ret[type][key === 'width' ? 'getWidth' : 'getHeight'](ele);
    }
}();
/**
 * @author linlingyu
 */





/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的宽度，该宽度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().width()
 * @grammar baidu.dom(args).width()
 * @return {Number} 返回一个宽度数值
 * @example 
 .width()和.css('width')之间的区别是.width()返回一个没有单位的数值（例如，400），
 .css('width')是返回带有完整单位的字符串（例如，400px）。

 当一个元素的宽度需要数学计算的时候推荐使用.width()方法 。

 注意.width()总是返回内容宽度,不管CSS box-sizing属性值，
 也就是说，返回的是宽度不会包括padding，border，margin的宽度值。

 这个方法可以计算window（浏览器可视宽度）和document（HTML文档）的宽度。
 $(window).width(); 
 $(document).width();

 示例代码：
 //HTML代码片段
 <div style='width:250px;width:250px;'>
 <div>

 //获取宽度
 baidu('div').height(); //250
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的宽度，该宽度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().width()
 * @grammar baidu.dom(args).width(value)
 * @param {Number|String} value （参数支持整型数据，字符串数据，带单位的字符串数值），接口设置所有匹配元素的宽度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 当调用.width(value)方法的时候，这个“value”参数可以是一个字符串（数字加单位）或者是一个数字。
 如果这个“value”参数只提供一个数字，会被自动加上单位px；
 如果只提供一个字符串，任何有效的CSS尺寸都可以为宽度赋值（如：100px，50%，或者 auto）。
 如果没有给定明确的单位（像'em' 或者 '%'），那么默认情况下"px"会被直接添加上去（也理解为"px"是默认单位）。

 注意在现代浏览器中，CSS宽度属性不包含padding，border，margin的宽度。

 示例代码：
 //HTML代码片段
 <div style='height:250px;width:250px;'>
 <div>

 //获取宽度
 baidu('div').width('300px');

 //结果
 <div style='height:300px;width:250px;'>
 <div>
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的宽度，该宽度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().width()
 * @grammar baidu.dom(args).width(fn)
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，width表示匹配元素的宽度，fn最终需要返回合法的数值来设置宽度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").width(function(index, width){});
 */
baidu.dom.extend({
    width: function(value){
        return baidu._util_.access.call(this, 'width', value, function(ele, key, val){
            var hasValue = val !== undefined,
                parseValue = hasValue && parseFloat(val),
                type = ele != null && ele == ele.window ? 'window'
                    : (ele.nodeType === 9 ? 'document' : false);
            if(hasValue && parseValue < 0 || isNaN(parseValue)){return;}
            hasValue && /^(?:\d*\.)?\d+$/.test(val += '') && (val += 'px');
            return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, key)
                : (hasValue ? ele.style.width = val : baidu._util_.getWidthOrHeight(ele, key));
        });
    }
});
/**
 * @author linlingyu
 */




/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的高度，该高度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().height()
 * @grammar baidu.dom(args).height()
 * @return {Number} 返回一个高度数值
 * @example 
 .height()和.css('height')之间的区别是.height()返回一个没有单位的数值（例如，400），
 .css('height')是返回带有完整单位的字符串（例如，400px）。

 当一个元素的高度需要数学计算的时候推荐使用.height()方法 。

 注意.height()总是返回内容宽度,不管CSS box-sizing属性值，
 也就是说，返回的是高度不会包括padding，border，margin的宽度值。

 这个方法可以计算window（浏览器可视高度）和document（HTML文档）的高度。
 $(window).height(); 
 $(document).height();

 示例代码：
 //HTML代码片段
 <div style='height:250px;width:250px;'>
 <div>

 //获取高度
 baidu('div').height(); //250
 */ 

/**
 * @description 设置匹配元素或是设置多个匹配元素的高度，该高度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().height()
 * @grammar baidu.dom(args).height(value)
 * @param {Number|String} value （参数支持整型数据，字符串数据，带单位的字符串数值），接口设置所有匹配元素的高度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 当调用.height(value)方法的时候，这个“value”参数可以是一个字符串（数字加单位）或者是一个数字。
 如果这个“value”参数只提供一个数字，会被自动加上单位px；
 如果只提供一个字符串，任何有效的CSS尺寸都可以为高度赋值（如：100px，50%，或者 auto）。
 如果没有给定明确的单位（像'em' 或者 '%'），那么默认情况下"px"会被直接添加上去（也理解为"px"是默认单位）。

 注意在现代浏览器中，CSS高度属性不包含padding，border，margin的宽度。

 示例代码：
 //HTML代码片段
 <div style='height:250px;width:250px;'>
 <div>

 //获取高度
 baidu('div').height('300px');

 //结果
 <div style='height:300px;width:250px;'>
 <div>

 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的高度，该高度忽略margin, border, padding的计算
 * @function 
 * @name baidu.dom().height()
 * @grammar baidu.dom(args).height(fn)
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，height表示匹配元素的高度，fn最终需要返回合法的数值来设置高度
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").height(function(index, height){})
 */
baidu.dom.extend({
    height: function(value){
        return baidu._util_.access.call(this, 'height', value, function(ele, key, val){
            var hasValue = val !== undefined,
                parseValue = hasValue && parseFloat(val),
                type = ele != null && ele == ele.window ? 'window'
                    : (ele.nodeType === 9 ? 'document' : false);
            if(hasValue && parseValue < 0 || isNaN(parseValue)){return;}
            hasValue && /^(?:\d*\.)?\d+$/.test(val += '') && (val += 'px');
            return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, key)
                : (hasValue ? ele.style.height = val : baidu._util_.getWidthOrHeight(ele, key));
        });
    }
});
/**
 * @author linlingyu
 */



/**
 * @description 取得匹配元素所属的window对象
 * @function 
 * @name baidu.dom().getWindow()
 * @grammar baidu.dom(args).getWindow()
 * @return {window} 返回匹配元素所属的window对象
 */
/**
 * @description 获取目标元素所属的window对象
 * @function 
 * @name baidu.dom.getWindow
 * @grammar baidu.dom.getWindow(element)
 * @param {String|Element} element 目标元素或目标元素的id
 * @return {window} 目标元素所属的window对象
 */
baidu.dom.extend({
    getWindow: function(){
        var doc = this.getDocument();
        return (this.size()<=0)? undefined :(doc.parentWindow || doc.defaultView);
    }
});
/**
 * @author linlingyu
 */







/**
 * @description 取得第一个匹配元素或是设置多个匹配元素相对于文档的偏移量
 * @function 
 * @name baidu.dom().offset()
 * @grammar baidu.dom(args).offset()
 * @return {Object} 返回一个包含left和top键名的json来标示元素的偏移量
 * @example 
 
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素相对于文档的偏移量
 * @function 
 * @name baidu.dom().offset()
 * @grammar baidu.dom(args).offset([coordinates])
 * @param {Object} coordinates 参数格式形式是{left: val, top: val}，(val可以是一个整型或是字符串型的数值)通过一个json来设置第一个匹配元素相对于文档的偏移量，同时该匹配元素的position属性将被更改为relative
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素相对于文档的偏移量
 * @function 
 * @name baidu.dom().offset()
 * @grammar baidu.dom(args).offset([fn(index, coordinates)])
 * @param {function} fn 接收两个参数，index参数表示匹配元素在集合中的索引，coordinates表示匹配元素的坐标，fn最终需要返回一个格式为{left: val, top: val}的json
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

baidu.dom.extend({
    offset: function(){
        var offset = {
            getDefaultOffset: function(ele, doc){
                var docElement = doc.documentElement,
                    body = doc.body,
                    defaultView = doc.defaultView,
                    computedStyle = defaultView ? defaultView.getComputedStyle(ele, null) : ele.currentStyle,
                    patrn = /^t(?:able|h|d)/i,
                    offsetParent = ele.offsetParent,
                    l = ele.offsetLeft,
                    t = ele.offsetTop;
                //
                while((ele = ele.parentNode) && ele !== body && ele !== docElement){
                    if(baidu.support.fixedPosition && computedStyle.position === 'fixed'){break;}
                    computedStyle = defaultView ? defaultView.getComputedStyle(ele, null) : ele.currentStyle;
                    l -= ele.scrollLeft;
                    t -= ele.scrollTop;
                    if(ele === offsetParent){
                        l += ele.offsetLeft;
                        t += ele.offsetTop;
                        //当浏览器不会自动包含元素的border运算时
                        if(!baidu.support.hasBorderWidth
                            && !(baidu.support.hasTableCellBorderWidth && patrn.test(ele.nodeName))){
                                l += parseFloat(computedStyle.borderLeftWidth) || 0;
                                t += parseFloat(computedStyle.borderTopWidth) || 0;
                        }
                        offsetParent = ele.offsetParent;
                    }
                }
                if(~'static,relative'.indexOf(computedStyle.position)){
                    l += body.offsetLeft;
                    t += body.offsetTop;
                }
                if(baidu.support.fixedPosition && computedStyle.position === 'fixed'){
                    l += Math.max(docElement.scrollLeft, body.scrollLeft);
                    t += Math.max(docElement.scrollTop, body.scrollTop);
                }
                return {left: l, top: t};
            },
            //
            setOffset: function(ele, options, index){
                var tang = baidu.dom(ele),
                    type = baidu.type(options),
                    currOffset = tang.offset(),
                    currLeft = tang.getCurrentStyle('left'),
                    currTop = tang.getCurrentStyle('top');
                type === 'function' && (options = options.call(ele, index, currOffset));
                // TODO
                if(!options || options.left === undefined
                    && options.top === undefined){
                        return;
                }
                currLeft = parseFloat(currLeft) || 0;
                currTop = parseFloat(currTop) || 0;
                options.left != undefined && (ele.style.left = options.left - currOffset.left + currLeft + 'px');
                options.top != undefined && (ele.style.top = options.top - currOffset.top + currTop + 'px');
                tang.getCurrentStyle('position') === 'static'
                    && (ele.style.position = 'relative');
            },
            //
            bodyOffset: function(body){
                var tang = baidu.dom(body);
                return {
                    left: body.offsetLeft + parseFloat(tang.getCurrentStyle('marginLeft')) || 0,
                    top: body.offsetTop + parseFloat(tang.getCurrentStyle('marginTop')) || 0
                }
            }
        };
        
        offset.getOffset = 'getBoundingClientRect' in document.documentElement ?
            function(ele, doc){
                //IE6有时会出现找不到方法的奇葩现像
                if(!ele.getBoundingClientRect){return offset.getDefaultOffset(ele, doc);}
                var rect = ele.getBoundingClientRect(),
                    win = baidu.dom(doc).getWindow(),
                    docElement = doc.documentElement,
                    body = doc.body;
                return {
                    left: rect.left + (win.pageXOffset || Math.max(docElement.scrollLeft, body.scrollLeft)) - (docElement.clientLeft || body.clientLeft),
                    top: rect.top + (win.pageYOffset || Math.max(docElement.scrollTop, body.scrollTop)) - (docElement.clientTop || body.clientTop)
                };
            } : offset.getDefaultOffset;
        
        
        
        return function(options){
            if(!options){
                var ele = this[0],
                    doc = baidu.dom(ele).getDocument();
                return offset[ele === doc.body ? 'bodyOffset' : 'getOffset'](ele, doc);
            }else{
                baidu.check('^(?:object|function)$', 'baidu.dom.offset');
                for(var i = 0, item; item = this[i]; i++){
                    offset.setOffset(item, options, i);
                }
                return this;
           }
        }
    }()
});

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
 
/**
 * @description 为匹配的元素删除设置的属性。
 * @function 
 * @name baidu.dom().removeAttr()
 * @grammar baidu.dom(args).removeAttr(attributeName);
 * @param {String} attributeName 要设置属性的名称，它可以是一个空格分隔的属性列表;
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 .removeAttr() 方法使用原生的 JavaScript removeAttribute() 函数,
 但是它的优点是能够直接被TangramDom对象访问调用，可以链式的继续调用下去，
 而且具有良好的浏览器兼容性。

 示例代码： 
 //HTML代码片段
 <input type='text' value='123' data1='baidu' data2='google'/>

 //清除一个属性
 baidu("input").removeAttr("value");

 //清除个属性
 baidu("input").removeAttr("value data1 google");

 */






baidu.dom.extend({
    removeAttr: function(value){

        //异常处理
        if(arguments.length <= 0 || !value || typeof value !== 'string'){
            return this;
        };

        baidu.forEach(this, function(item){
            var propName, attrNames, name, l, isBool, i = 0;

            if ( item.nodeType === 1 ) {
                var bd = baidu.dom,
                    bu = baidu._util_;

                attrNames = value.toLowerCase().split(/\s+/);
                l = attrNames.length;

                for ( ; i < l; i++ ) {
                    name = attrNames[ i ];

                    if ( name ) {
                        propName = bu.propFix[ name ] || name;
                        isBool = bu.rboolean.test( name );

                        // See #9699 for explanation of this approach (setting first, then removal)
                        // Do not do this for boolean attributes (see #10870)
                        if ( !isBool ) {
                            bd(item).attr(name,"");
                        }
                        item.removeAttribute( baidu.support.getSetAttribute ? name : propName );

                        // Set corresponding property to false for boolean attributes
                        if ( isBool && propName in item ) {
                            item[ propName ] = false;
                        }
                    }
                }
            }
        });
        
        return this;
    }
});

/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 取得第一个匹配元素对应的属性值。
 * @function 
 * @name baidu.dom().attr()
 * @grammar baidu.dom(args).attr(attributeName)
 * @param {String} attributeName 要获取的值的对应属性名
 * @return {String|undefined} 只获取第一个匹配元素的属性值，当属性没有被设置时候，.attr()方法将返回undefined。
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 当属性没有被设置时候，.attr()方法将返回undefined；
 另外，.attr()不应该用在普通的对象，数组，窗口（window）或文件（document）上。若要检索和更改DOM属性请使用.prop()方法。

 示例代码：
 //HTML片段
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="这是百度logo" />

 //取得src属性
 baidu("img").attr("src");

 */

/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().attr()
 * @grammar baidu.dom(args).attr(attributeName,value)
 * @param {String} attributeName 要设置值的属性名;
 * @param {String} value 这个属性设置的值;
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 另外，.attr()不应该用在普通的对象，数组，窗口（window）或文件（document）上。若要检索和更改DOM属性请使用.prop()方法。
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。

 示例代码：
 //HTML片段
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="这是百度logo" />

 //改变alt属性
 baidu("img").attr("alt","猜猜这是神马图片");

 */

/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().attr();
 * @grammar baidu.dom(args).attr(object);
 * @param {Object} object 一个配对的属性值的object对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 支持传入一个Object类型，来设置多个值。
 该接口符合“get first set all”原则，即只会获取第一个匹配元素的属性值或设置全部元素的属性值；
 当属性没有被设置时候，.attr()方法将返回undefined；
 另外，.attr()不应该用在普通的对象，数组，窗口（window）或文件（document）上。若要检索和更改DOM属性请使用.prop()方法。
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。
 示例代码：
 //HTML片段
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="这是百度logo" />

 //改变alt属性
 baidu("img").attr({
    "alt":"猜猜这是神马图片",
    "src":"http://img.baidu.com/img/image/ilogob.gif"
 });

 */

 /**
 * @description 设置指定元素属性的迭代器方法。
 * @function 
 * @name baidu.dom().attr();
 * @grammar baidu.dom(args).attr(attributeName,fn);
 * @param {String} attributeName 要设置值的属性名.
 * @param {Function} fn 这个函数返回用来设置的值，this 是当前的元素，接收元素的索引位置index和元素旧的样属性值attr为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的属性和index（索引值），并且将函数返回值设置为对应的属性；
 通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="图片1" />
 <img src="http://www.baidu.com/img/baidu_sylogo1.gif" alt="图片2" />

 //迭代器方法
 //通过使用一个函数来设置属性， 我们可以根基元素的其他属性来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu("img").attr("alt",function(index,attr){
    alert(index);
    alert(attr);
    if(index==1){
      return "test";
    }
 });
 */



















baidu.dom.extend({
    attr:function(name,value){

        //异常处理
        if(arguments.length <= 0 || typeof name === 'function'){
            return this;
        };

        //返回结果
        var result,
            me = this,
            isSet = false;

        //当dom选择器为空时
        if(this.size()<=0){
            if(name&&value){
                return me;
            }else if(name&&!value){
                return undefined;
            }else{
                return me;
            }
        }

        baidu.forEach(this, function(item, index){

            if(result){
                return;
            };

            var ret, 
                hooks, 
                notxml,
                bd = baidu.dom,
                bu = baidu._util_,
                nType = item.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if ( !item || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            };

            // Fallback to prop when attributes are not supported
            if ( typeof item.getAttribute === "undefined" ) {
                var ele = bd(item); 
                result = ele.prop( name, value );
                
            };

            switch(typeof name){
                case 'string':
                    notxml = nType !== 1 || !baidu._util_.isXML( item );

                    // All attributes are lowercase
                    // Grab necessary hook if one is defined
                    if ( notxml ) {
                        name = name.toLowerCase();
                        hooks = bu.attrHooks[ name ] || ( bu.rboolean.test( name ) ? bu.boolHook : bu.nodeHook );
                    };

                    if( typeof value === 'undefined' ){
                        
                        //get first
                        if ( hooks && "get" in hooks && notxml && (ret = hooks.get( item, name )) !== null ) {
                            //return ret;
                            result = ret;
                        } else {

                            ret = item.getAttribute( name );

                            // Non-existent attributes return null, we normalize to undefined
                            //return ret === null ? undefined : ret;
                            result = ret === null ? undefined : ret;
                        };

                    }else if( typeof value === 'function' ){

                        isSet = true;
                        var ele = bd(item);
                        ele.attr(name,value.call(item, index, ele.attr(name)));
                    
                    }else{
                        
                        //set all
                        isSet = true;
                        var attrFn = {
                            val: true,
                            css: true,
                            html: true,
                            text: true,
                            //data: true,
                            width: true,
                            height: true,
                            offset: true
                        };

                        if ( name in attrFn ) {
                            result = bd( item )[ name ]( value );
                            return;
                        };

                        if ( value === null ) {
                            bd(item).removeAttr( name );
                            return;

                        } else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( item, value, name )) !== undefined ) {
                            return ret;

                        } else {
                            item.setAttribute( name, "" + value );
                            return value;
                        };
                    };

                break;
                case 'object':

                    //set all
                    isSet = true;
                    var ele = bd(item);
                    for(key in name){
                        ele.attr(key,name[key]);
                    };

                break;
                default:
                    result = me;
                break;
            };
        });
    
        return isSet?this:result;
    }
});
/**
 * @author linlingyu
 */



/**
 * @description 在匹配的每个DOM元素前面插入新的内容
 * @function 
 * @name baidu.dom().before()
 * @grammar baidu.dom(args).before(content[, content])
 * @param {HTMLString|Element|TangramDom} content 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口是在匹配的每个DOM元素前面插入新的内容。
 
 其实.before()和.insertBefore()实现同样的功能，主要的不同是语法——特别是内容和目标的位置。 
 对于 .before()，选择表达式在函数的前面，参数是将要插入的内容，
 对于.insertBefore()，刚好相反，内容在方法前面，它将被放在参数里元素的前面。

 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素前面
 baidu('.content').before('<h2>test2</h2>');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <h2>test2</h2>
   <div class='content'></div>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素前面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('.content').before(baidu('h2'));  //结果同上
 */
/**
 * @description 在匹配的每个DOM元素前面插入新的内容
 * @function 
 * @name baidu.dom().before()
 * @grammar baidu.dom(args).before(fn)
 * @param {function} fn 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").before(function(index,html));
 */
baidu.dom.extend({
    before: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.before');
        var parentNode = this[0] && this[0].parentNode,
            array = !parentNode && [], set;
        
        baidu._util_.smartInsert(this, arguments, function(node){
            parentNode ? parentNode.insertBefore(node, this)
                : baidu.merge(array, node.childNodes);
        });
        if(array){
            array = baidu.merge(array, this);
            this.length = 0;
            baidu.merge(this, array);
        }
        return this;
    }
});
/**
 * @author dron
 */



/**
 * @description 对指定的TangramDom集合绑定一个自定义事件
 * @function 
 * @name baidu.dom().bind()
 * @grammar baidu.dom(args).bind(type[,data],fn)
 * @param {String} type 事件名称
 * @param Object data 触发事件时在 event.data 对象上携带的数据
 * @param Function fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
} */

baidu.dom.extend({
    bind: function(type, data, fn){
        return this.on(type, undefined, data, fn);
    }
});






/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-12
 * @modify
 */

/**
 * @description 所有子元素的集合
 * @function
 * @name baidu.dom().children()
 * @grammar baidu.dom(args).children(selector)
 * @param   {Object}            selector    选择器
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    children : function (selector) {
        var result, a = [];

        this.each(function(index){
            baidu.forEach(this.children || this.childNodes, function(dom){
                dom.nodeType == 1 && a.push(dom);
            });
        });

        return baidu.dom( baidu.dom.match(a, selector) );
    }
});



/**
 * @author linlingyu
 */


/**
 * @description 取得匹配元素内部第一级的子节点，包括文本节点等，如果匹配元素是一个iframe，并且同域，则可以返回iframe的文档
 * @function 
 * @name baidu.dom().contents()
 * @grammar baidu.dom(args).contents()
 * @return {TangramDom} 接口最终返回一个匹配元素的内部所有内容的TangramDom对象
 */
baidu.dom.extend({
    contents: function(){
        var ret = [], nodeName;
        for(var i = 0, ele; ele = this[i]; i++){
            nodeName = ele.nodeName;
            ret.push.apply(ret, baidu.makeArray(nodeName && nodeName.toLowerCase() === 'iframe' ?
                ele.contentDocument || ele.contentWindow.document
                    : ele.childNodes));
        }
        this.length = 0;
        return baidu.merge(this, ret);
    }
});
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_NAME_ATTRS.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/2
 */




/**
 * 提供给setAttr与getAttr方法作名称转换使用
 * ie6,7下class要转换成className
 * @meta standard
 */

baidu.dom._NAME_ATTRS = (function () {
    var result = {
        'cellpadding': 'cellPadding',
        'cellspacing': 'cellSpacing',
        'colspan': 'colSpan',
        'rowspan': 'rowSpan',
        'valign': 'vAlign',
        'usemap': 'useMap',
        'frameborder': 'frameBorder'
    };
    
    if (baidu.browser.ie < 8) {
        result['for'] = 'htmlFor';
        result['class'] = 'className';
    } else {
        result['htmlFor'] = 'for';
        result['className'] = 'class';
    }
    
    return result;
})();
/// support magic - Tangram 1.x Code End











/**
 * @fileoverview
 * @name baidu.dom.data
 * @create 2012-07-13
 * @author meizz
 * @modify
 */

/**
 * 在 DOM 对象上存储数据
 * @grammar TangramDom.data([key[, value]])
 * @param
 * @return
 */
baidu.dom.extend({
    data : function () {
        var   guid = baidu.key
            , maps = baidu.global("_maps_HTMLElementData");

        return function( key, value ) {
            baidu.forEach( this, function( dom ) {
                !dom[ guid ] && ( dom[ guid ] = baidu.id() );
            });

            if ( baidu.isString(key) ) {

                // get first
                if ( typeof value == "undefined" ) {
                    var data,result;
                    result = this[0] && (data = maps[ this[0][guid] ]) && data[ key ];
                    if(result){
                        return result;
                    }else{

                        //取得自定义属性
                        var attr = this[0].getAttribute('data-'+key);
                        return (String(attr).indexOf('{') == -1)?attr:Function("return "+attr)();
                    }
                }

                // set all
                baidu.forEach(this, function(dom){
                    var data = maps[ dom[ guid ] ] = maps[ dom[ guid ] ] || {};
                    data[ key ] = value;
                });
            
            // json
            } else if ( baidu.type(key) == "object") {

                // set all
                baidu.forEach(this, function(dom){
                    var data = maps[ dom[ guid ] ] = maps[ dom[ guid ] ] || {};

                    baidu.forEach( key , function(item) {
                        data[ item ] = key[ item ];
                    });
                });
            }

            return this;
        }
    }()
});

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/Class.js
 * author: meizz, erik
 * version: 1.1.0
 * date: 2009/12/1
 */




/**
 * @description Tangram继承机制提供的一个基类，用户可以通过继承baidu.lang.Class来获取它的属性及方法。
 * @class
 * @name baidu.lang.Class
 * @grammar baidu.lang.Class(guid)
 * @param {string} guid 对象的唯一标识
 * @meta standard
 * @remark baidu.lang.Class和它的子类的实例均包含一个全局唯一的标识guid。guid是在构造函数中生成的，因此，继承自baidu.lang.Class的类应该直接或者间接调用它的构造函数。<br>baidu.lang.Class的构造函数中产生guid的方式可以保证guid的唯一性，及每个实例都有一个全局唯一的guid。
 * @see baidu.lang.inherits,baidu.lang.Event
 */
baidu.lang.Class = function() {
    this.guid = baidu.id( this );
};

/**
 * @description 释放对象所持有的资源，主要是自定义事件。
 * @name obj.dispose
 * @function 
 * @grammar obj.dispose()
 * TODO: 将_listeners中绑定的事件剔除掉
 */
baidu.lang.Class.prototype.dispose = function(){
    baidu.id( this.guid, "delete" );

    // this.__listeners && (for (var i in this.__listeners) delete this.__listeners[i]);

    for(var property in this){
        typeof this[property] != "function" && delete this[property];
    }
    this.disposed = true;   // 20100716
};

/*
 * 重载了默认的toString方法，使得返回信息更加准确一些。
 * 20111219 meizz 为支持老版本的className属性，以后统一改成 __type
 * @return {string} 对象的String表示形式
 */
baidu.lang.Class.prototype.toString = function(){
    return "[object " + (this._type_ || this.__type || this._className || "Object") + "]";
};

/*
 * 按唯一标识guid字符串取得实例对象
 *
 * @param   {String}    guid
 * @return  {object}            实例对象
 */
 window["baiduInstance"] = function(guid) {
     return baidu.id( guid );
 }

//  2011.11.23  meizz   添加 baiduInstance 这个全局方法，可以快速地通过guid得到实例对象
//  2011.11.22  meizz   废除创建类时指定guid的模式，guid只作为只读属性
//  2011.11.22  meizz   废除 baidu.lang._instances 模块，由统一的global机制完成；

/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/Class/removeEventListener.js
 * author: meizz
 * version: 1.6.0
 * date: 2011/11/23
 * modify: 2011/11/23
 */



 
/**
 * 移除对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
 * 事件移除操作是一个不常用的方法，如果你有需求再import调入，可以节约代码
 * 可能通过参数走不同的分支：不传handler会移除某类事件监听；如果连type都不传那就移除当前实例的全部事件监听
 *
 * @grammar obj.removeEventListener(type, handler)
 * @param {string}   type     事件类型
 * @param {Function} handler  要移除的事件监听函数或者监听函数的key
 * @remark     如果第二个参数handler没有被绑定到对应的自定义事件中，什么也不做。
 */
baidu.lang.Class.prototype.un =
baidu.lang.Class.prototype.removeEventListener = function (type, handler) {
    var i,
        t = this.__listeners;
    if (!t) return;

    // remove all event listener
    if (typeof type == "undefined") {
        for (i in t) {
            delete t[i];
        }
        return;
    }

    type.indexOf("on") && (type = "on" + type);

    // 移除某类事件监听
    if (typeof handler == "undefined") {
        delete t[type];
    } else if (t[type]) {
        // [TODO delete 2013] 支持按 key 删除注册的函数
        typeof handler=="string" && (handler=t[type][handler]) && delete t[type][handler];

        for (i = t[type].length - 1; i >= 0; i--) {
            if (t[type][i] === handler) {
                t[type].splice(i, 1);
            }
        }
    }
};

// 2011.12.19 meizz 为兼容老版本的按 key 删除，添加了一行代码
/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/guid.js
 * author: meizz
 * version: 1.1.0
 * date: 2010/02/04
 */




/**
 * @description 返回一个当前页面的唯一标识字符串。
 * @name baidu.lang.guid
 * @function
 * @grammar baidu.lang.guid()
 * @version 1.1.1
 * @meta standard
 *             
 * @return {String} 当前页面的唯一标识字符串
 */
baidu.lang.guid = function() {
    return baidu.id();
};

//不直接使用window，可以提高3倍左右性能
//baidu.$$._counter = baidu.$$._counter || 1;


// 20111129    meizz    去除 _counter.toString(36) 这步运算，节约计算量
/// support magic - Tangram 1.x Code End
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isString.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 * modify: 2012/6/29 mz
 */




/**
 * @description 判断目标参数是否string类型或String对象
 * @name baidu.lang.isString
 * @function
 * @grammar baidu.lang.isString(source)
 * @param {Any} source 目标参数
 * @shortcut isString
 * @meta standard
 * @see baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @return {boolean} 类型判断结果
 */
//baidu.lang.isString = function (source) {
//    return '[object String]' == Object.prototype.toString.call(source);
//};
baidu.lang.isString = baidu.isString;
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/Event.js
 * author: meizz, erik, berg
 * version: 1.6.0
 * date: 2009/11/24
 * modify: 2011/11/24 meizz
 */





/**
 * @description 自定义的事件对象。
 * @class
 * @name     baidu.lang.Event
 * @grammar baidu.lang.Event(type[, target])
 * @param     {string} type     事件类型名称。为了方便区分事件和一个普通的方法，事件类型名称必须以"on"(小写)开头。
 * @param     {Object} [target]触发事件的对象
 * @meta standard
 * @remark 引入该模块，会自动为Class引入3个事件扩展方法：addEventListener、removeEventListener和dispatchEvent。
 * @meta standard
 * @see baidu.lang.Class
 */
baidu.lang.Event = function (type, target) {
    this.type = type;
    this.returnValue = true;
    this.target = target || null;
    this.currentTarget = null;
};
 
/**
 * @description 派发自定义事件，使得绑定到自定义事件上面的函数都会被执行。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
 * @name obj.dispatchEvent
 * @grammar obj.dispatchEvent(event, options)
 * @param {baidu.lang.Event|String} event     Event对象，或事件名称(1.1.1起支持)
 * @param {Object}                     options 扩展参数,所含属性键值会扩展到Event对象上(1.2起支持)
 * @remark 处理会调用通过addEventListenr绑定的自定义事件回调函数之外，还会调用直接绑定到对象上面的自定义事件。例如：<br>
myobj.onMyEvent = function(){}<br>
myobj.addEventListener("onMyEvent", function(){});
 */
baidu.lang.Class.prototype.fire =
baidu.lang.Class.prototype.dispatchEvent = function (event, options) {
    baidu.lang.isString(event) && (event = new baidu.lang.Event(event));

    !this.__listeners && (this.__listeners = {});

    // 20100603 添加本方法的第二个参数，将 options extend到event中去传递
    options = options || {};
    for (var i in options) {
        event[i] = options[i];
    }

    var i, n, me = this, t = me.__listeners, p = event.type;
    event.target = event.target || (event.currentTarget = me);

    // 支持非 on 开头的事件名
    p.indexOf("on") && (p = "on" + p);

    typeof me[p] == "function" && me[p].apply(me, arguments);

    if (typeof t[p] == "object") {
        for (i=0, n=t[p].length; i<n; i++) {
            t[p][i] && t[p][i].apply(me, arguments);
        }
    }
    return event.returnValue;
};

/**
 * @description 注册对象的事件监听器。引入baidu.lang.Event后，Class的子类实例才会获得该方法。
 * @name obj.addEventListener
 * @grammar obj.addEventListener(type, handler[, key])
 * @param   {string}   type         自定义事件的名称
 * @param   {Function} handler      自定义事件被触发时应该调用的回调函数
 * @return  {Function}              将用户注入的监听函数返回，以便移除事件监听，特别适用于匿名函数。
 * @remark  事件类型区分大小写。如果自定义事件名称不是以小写"on"开头，该方法会给它加上"on"再进行判断，即"click"和"onclick"会被认为是同一种事件。 
 */
baidu.lang.Class.prototype.on =
baidu.lang.Class.prototype.addEventListener = function (type, handler, key) {
    if (typeof handler != "function") {
        return;
    }

    !this.__listeners && (this.__listeners = {});

    var i, t = this.__listeners;

    type.indexOf("on") && (type = "on" + type);

    typeof t[type] != "object" && (t[type] = []);

    // 避免函数重复注册
    for (i = t[type].length - 1; i >= 0; i--) {
        if (t[type][i] === handler) return handler;
    };

    t[type].push(handler);

    // [TODO delete 2013] 2011.12.19 兼容老版本，2013删除此行
    key && typeof key == "string" && (t[type][key] = handler);

    return handler;
};

//  2011.12.19  meizz   很悲剧，第三个参数 key 还需要支持一段时间，以兼容老版本脚本
//  2011.11.24  meizz   事件添加监听方法 addEventListener 移除第三个参数 key，添加返回值 handler
//  2011.11.23  meizz   事件handler的存储对象由json改成array，以保证注册函数的执行顺序
//  2011.11.22  meizz   将 removeEventListener 方法分拆到 baidu.lang.Class.removeEventListener 中，以节约主程序代码

/// support magic - Tangram 1.x Code End



/**
 * @author dron
 */



/**
 * @description 对指定的TangramDom集合添加事件代理
 * @function 
 * @name baidu.dom().delegate()
 * @grammar baidu.dom(args).delegate(selector,type[,data],fn)
 * @param {String} selector 选择器表达式，用于约定响应事件的标签类型
 * @param {String} type 事件名称，如果是多个事件名称，可用半角逗号或空格隔开
 * @param {Object} data 事件函数触发时，附带在 event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

baidu.dom.extend({
    delegate: function( selector, type, data, fn ){
        if( typeof data == "function" )
            fn = data,
            data = null;
        return this.on( type, selector, data, fn );
    }
});



/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 对 TangramDom 里的所有元素进行筛选
 * @function
 * @name baidu.dom().filter()
 * @grammar TangramDom.filter(selector|tangramDom|HTMLElement|fn)
 * @param   {String}        selector    CSS选择器
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
/**
 * @description 对 TangramDom 里的所有元素进行筛选
 * @function
 * @name baidu.dom().filter()
 * @grammar TangramDom.filter(selector|tangramDom|HTMLElement|fn)
 * @param   {TangramDom}    tangramDom 对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
/**
 * @description 对 TangramDom 里的所有元素进行筛选
 * @function
 * @name baidu.dom().filter()
 * @grammar TangramDom.filter(selector|tangramDom|HTMLElement|fn)
 * @param   {HTMLElement}   HTMLElement对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
/**
 * @description 对 TangramDom 里的所有元素进行筛选
 * @function
 * @name baidu.dom().filter()
 * @grammar TangramDom.filter(selector|tangramDom|HTMLElement|fn)
 * @param   {Function}   fn   筛选的指定方法
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */

baidu.dom.extend({
    filter : function (selector) {
        return baidu.dom(baidu.dom.match(this, selector));
    }
});

/**
 * @author linlingyu
 */
 


/**
 * @description 将匹配到的DOM元素从文档中移除，并移除对应的DOM元素的事件
 * @function 
 * @name baidu.dom().remove()
 * @grammar baidu.dom(args).remove([selector])
 * @param {String} selector 一个字符串的选择器，对前面匹配到的DOM元素再做进一步的过滤
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example
 该方法会移除掉匹配元素及其子元素，并且移除已经绑定在元素上面的事件。

 示例代码：
 //HTML代码片段
 <div>
    <h1>test1</h1>
    <h2>test2</h2>
 </div>

 //清除div中的内容
 baidu('div').remove('h1');

 //结果：
 <div>
    <h2>test2</h2>
 </div>

 */

/**
 * @description 从DOM树上移除目标元素
 * @function 
 * @name baidu.dom.remove
 * @grammar baidu.dom.remove(element)
 * @param {String|Element} element 需要移除的元素或元素的id
 * @return {Element} 被移除的DOM元素
 */
baidu.dom.extend({
    remove: function(selector, keepData){
        arguments.length > 0
            && baidu.check('^string(?:,boolean)?$', 'baidu.dom.remove');
        var array = selector ? this.filter(selector) : this;
        for(var i = 0, ele; ele = array[i]; i++){
           if(!keepData && ele.nodeType === 1){
               baidu._util_.cleanData(ele.getElementsByTagName('*'));
               baidu._util_.cleanData([ele]);
            }
            ele.parentNode && ele.parentNode.removeChild(ele);
        }
        return this;
    }
});
/**
 * @author linlingyu
 */

/**
 * @description 将匹配到的DOM元素从文档中移除，并不移除对应的DOM元素的事件
 * @function 
 * @name baidu.dom().detach()
 * @grammar baidu.dom(args).detach([selector])
 * @param {String} selector 一个字符串的选择器，对前面匹配到的DOM元素再做进一步的过滤
 * @return {TangramDom} TangramDom 接口最终返回之前匹配元素的TangramDom对象
 * @example
 .detach()和.remove()都会移除匹配到的dom元素，但是.detach()不会移除dom上面匹配到的事件，
 当需要移走一个元素，不久又将该元素插入DOM时，这种方法很有用。

 注意：如果移除元素后，并不会再次插入，建议使用.remove()方法，以防止可能存在的内存泄露。

 示例代码：
 //HTML代码片段
 <div id="body">
   <h1>test</h1>
 </div>

 //移除<h1>，如果有绑定事件，此时事件并没有移除。
 //如果立刻还会添加该元素，则效率较高；
 //如果不会再次添加该元素，遗留的事件绑定可能会造成内存泄露，实现移除元素和事件使用.remove()；
 baidu('#body').detach('h1');

 */

baidu.dom.extend({
    detach: function(selector){
        selector && baidu.check('^string$', 'baidu.dom.detach');
        return this.remove(selector, true);
    }
});
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFixer.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFixer = baidu.dom._styleFixer || {};
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFilters.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 提供给setStyle与getStyle使用
 */
baidu.dom._styleFilter = baidu.dom._styleFilter || [];
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/dom/_styleFilter/filter.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/02
 */



/**
 * 为获取和设置样式的过滤器
 * @private
 * @meta standard
 */
baidu.dom._styleFilter.filter = function (key, value, method) {
    for (var i = 0, filters = baidu.dom._styleFilter, filter; filter = filters[i]; i++) {
        if (filter = filter[method]) {
            value = filter(key, value);
        }
    }

    return value;
};
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */







/**
 * 获取目标元素的样式值
 * @name baidu.dom.getStyle
 * @function
 * @grammar baidu.dom.getStyle(element, key)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} key 要获取的样式名
 * @remark
 * 
 * 为了精简代码，本模块默认不对任何浏览器返回值进行归一化处理（如使用getStyle时，不同浏览器下可能返回rgb颜色或hex颜色），也不会修复浏览器的bug和差异性（如设置IE的float属性叫styleFloat，firefox则是cssFloat）。<br />
 * baidu.dom._styleFixer和baidu.dom._styleFilter可以为本模块提供支持。<br />
 * 其中_styleFilter能对颜色和px进行归一化处理，_styleFixer能对display，float，opacity，textOverflow的浏览器兼容性bug进行处理。    
 * @shortcut getStyle
 * @meta standard
 * @see baidu.dom.setStyle,baidu.dom.setStyles, baidu.dom.getComputedStyle
 *             
 * @return {string} 目标元素的样式值
 */
// TODO
// 1. 无法解决px/em单位统一的问题（IE）
// 2. 无法解决样式值为非数字值的情况（medium等 IE）
baidu.dom.getStyle = function (element, key) {
    var dom = baidu.dom;

    element = dom.g(element);
    key = baidu.string.toCamelCase(key);
    //computed style, then cascaded style, then explicitly set style.
    var value = element.style[key] ||
                (element.currentStyle ? element.currentStyle[key] : "") || 
                dom.getComputedStyle(element, key);

    // 在取不到值的时候，用fixer进行修正
    if (!value || value == 'auto') {
        var fixer = dom._styleFixer[key];
        if(fixer){
            value = fixer.get ? fixer.get(element, key, value) : baidu.dom.getStyle(element, fixer);
        }
    }
    
    /* 检查结果过滤器 */
    if (fixer = dom._styleFilter) {
        value = fixer.filter(key, value, 'get');
    }

    return value;
};

/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start

/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */


/**
 * @description 对页面层面的封装，包括页面的高宽属性、以及外部css和js的动态添加
 * @namespace
 * @name baidu.page
 */
baidu.page = baidu.page || {};

/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getScrollTop.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * @description 获取纵向滚动量
 * @name baidu.page.getScrollTop
 * @function
 * @grammar baidu.page.getScrollTop()
 * @see baidu.page.getScrollLeft
 * @meta standard
 * @return {number} 纵向滚动量
 */
baidu.page.getScrollTop = function () {
    var d = document;
    return window.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
};
/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/**
 * @description 获取横向滚动量
 * @name baidu.page.getScrollLeft
 * @function
 * @grammar baidu.page.getScrollLeft()
 * @see baidu.page.getScrollTop
 *             
 * @return {number} 横向滚动量
 */
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getScrollLeft.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/*
 * @description 获取横向滚动量
 * 
 * @return {number} 横向滚动量
 */
baidu.page.getScrollLeft = function () {
    var d = document;
    return window.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
};
/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 获得页面里的目前鼠标所在的坐标
 * @name baidu.page.getMousePosition
 * @function
 * @grammar baidu.page.getMousePosition()
 * @version 1.2
 *             
 * @return {object} 鼠标坐标值{x:[Number], y:[Number]}
 */





/*
 * 取得当前页面里的目前鼠标所在的坐标（x y）
 * @return  {JSON}  当前鼠标的坐标值({x, y})
 */
(function(){

 baidu.page.getMousePosition = function(){
     return {
        x : baidu.page.getScrollLeft() + xy.x,
        y : baidu.page.getScrollTop() + xy.y
     };
 };

 var xy = {x:0, y:0};

 // 监听当前网页的 mousemove 事件以获得鼠标的实时坐标
 baidu.event.on(document, "onmousemove", function(e){
    e = window.event || e;
    xy.x = e.clientX;
    xy.y = e.clientY;
 });

})();
/// support magic - Tangram 1.x Code End
/**
 * @fileOverview 对当前 TangramDom 集合解除事件监听
 * @author dron
 */




/**
 * @description 对当前 TangramDom 集合解除事件监听
 * @function 
 * @name baidu.dom().off()
 * @grammar baidu.dom(args).off(events[,selector],fn)
 * @param {String} events 事件名称，如果是多个事件，可用空格或半角逗号隔开
 * @param {String} selector 用于限制事件源的选择器表达式，此参数可选。
 * @param {Function} fn 事件触发函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

/**
 * @description 对当前 TangramDom 集合解除事件监听
 * @function 
 * @name baidu.dom().off()
 * @grammar baidu.dom(args).off(eventMap[,selector],fn)
 * @param {Object} eventMap 一个以 eventName:eventFn 键值对表示的 JSON 格式对象
 * @param {String} selector 用于限制事件源的选择器表达式，此参数可选。
 * @param {Function} fn 事件触发函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    off: function( events, selector, fn ){
        var eb = baidu._util_.eventBase, me = this;
        if( !events )
            baidu.forEach( this, function( item ){
                eb.removeAll( item );
            } );
        else if( typeof events == "string" ){
            if( typeof selector == "function" )
                fn = selector,
                selector = null;
            events = events.split(/[ ,]/);
            baidu.forEach( this, function( item ){
                baidu.forEach( events, function( event ){
                    eb.remove( item, event, fn, selector );
                });
            });
        }else if( typeof events == "object" )
            baidu.forEach( events, function(fn, event){
                me.off( event, selector, fn );
            } );

        return this;
    }
});

/// support - magic Tangram 1.x Code Start

baidu.event.un = baidu.un = function(element, evtName, handler){
    element = baidu.dom.g(element);
    baidu.dom(element).off(evtName.replace(/^\s*on/, ''), handler);
    return element;
 };
 /// support - magic Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/event/preventDefault.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/23
 */



/**
 * 阻止事件的默认行为
 * @name baidu.event.preventDefault
 * @function
 * @grammar baidu.event.preventDefault(event)
 * @param {Event} event 事件对象
 * @meta standard
 * @see baidu.event.stop,baidu.event.stopPropagation
 */
baidu.event.preventDefault = function (event) {
    event.originalEvent && (event = event.originalEvent);
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
};
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 *
 * path: baidu/dom/drag.js
 * author: meizz
 * modify: linlingyu
 * version: 1.1.0
 * date: 2010/06/02
 */

/**
 * 拖动指定的DOM元素
 * @name baidu.dom.drag
 * @function
 * @grammar baidu.dom.drag(element, options)
 * @param {HTMLElement|string} element 元素或者元素的id.
 * @param {Object} options 拖曳配置项.

 * @param {Array} options.range 限制drag的拖拽范围，数组中必须包含四个值，分别是上、右、下、左边缘相对上方或左方的像素距离。默认无限制.
 * @param {Number} options.interval 拖曳行为的触发频度（时间：毫秒）.
 * @param {Boolean} options.capture 鼠标拖曳粘滞.
 * @param {Object} options.mouseEvent 键名为clientX和clientY的object，若不设置此项，默认会获取当前鼠标位置.
 * @param {Function} options.ondragstart drag开始时触发.
 * @param {Function} options.ondrag drag进行中触发.
 * @param {Function} options.ondragend drag结束时触发.
 * @param {function} options.autoStop 是否在onmouseup时自动停止拖拽。默认为true.
 * @version 1.2
 * @remark
 * 要拖拽的元素必须事先设定样式的postion值，如果postion为absloute，并且没有设定top和left，拖拽开始时，无法取得元素的top和left值，这时会从[0,0]点开始拖拽

 * @see baidu.dom.draggable
 */












(function(){
    var dragging = false,
        target, // 被拖曳的DOM元素
        op, ox, oy, timer, left, top, lastLeft, lastTop, mozUserSelect;
    baidu.dom.drag = function(element, options){
        if(!(target = baidu.dom.g(element))){return false;}
        op = baidu.object.extend({
            autoStop: true, // false 用户手动结束拖曳 ｜ true 在mouseup时自动停止拖曳
            capture: true,  // 鼠标拖曳粘滞
            interval: 16    // 拖曳行为的触发频度（时间：毫秒）
        }, options);
        lastLeft = left = parseInt(baidu.dom.getStyle(target, 'left')) || 0;
        lastTop = top = parseInt(baidu.dom.getStyle(target, 'top')) || 0;
        dragging = true;
        setTimeout(function(){
            var mouse = baidu.page.getMousePosition();  // 得到当前鼠标坐标值
            ox = op.mouseEvent ? (baidu.page.getScrollLeft() + op.mouseEvent.clientX) : mouse.x;
            oy = op.mouseEvent ? (baidu.page.getScrollTop() + op.mouseEvent.clientY) : mouse.y;
            clearInterval(timer);
            timer = setInterval(render, op.interval);
        }, 1);
        // 这项为 true，缺省在 onmouseup 事件终止拖曳
        var tangramDom = baidu.dom(document);
        op.autoStop && tangramDom.on('mouseup', stop);
        // 在拖曳过程中页面里的文字会被选中高亮显示，在这里修正
        tangramDom.on('selectstart', unselect);
        // 设置鼠标粘滞
        if (op.capture && target.setCapture) {
            target.setCapture();
        } else if (op.capture && window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        }
        // fixed for firefox
        mozUserSelect = document.body.style.MozUserSelect;
        document.body.style.MozUserSelect = 'none';
        baidu.isFunction(op.ondragstart)
            && op.ondragstart(target, op);
        return {
            stop: stop, dispose: stop,
            update: function(options){
                baidu.object.extend(op, options);
            }
        }
    }
    // 停止拖曳
    function stop() {
        dragging = false;
        clearInterval(timer);
        // 解除鼠标粘滞
        if (op.capture && target.releaseCapture) {
            target.releaseCapture();
        } else if (op.capture && window.captureEvents) {
            window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
        }
        // 拖曳时网页内容被框选
        document.body.style.MozUserSelect = mozUserSelect;
        var tangramDom = baidu.dom(document);
        tangramDom.off('selectstart', unselect);
        op.autoStop && tangramDom.off('mouseup', stop);
        // ondragend 事件
        baidu.isFunction(op.ondragend)
            && op.ondragend(target, op, {left: lastLeft, top: lastTop});
    }
    // 对DOM元素进行top/left赋新值以实现拖曳的效果
    function render(e) {
        if(!dragging){
            clearInterval(timer);
            return;
        }
        var rg = op.range || [],
            mouse = baidu.page.getMousePosition(),
            el = left + mouse.x - ox,
            et = top  + mouse.y - oy;

        // 如果用户限定了可拖动的范围
        if (baidu.isObject(rg) && rg.length == 4) {
            el = Math.max(rg[3], el);
            el = Math.min(rg[1] - target.offsetWidth, el);
            et = Math.max(rg[0], et);
            et = Math.min(rg[2] - target.offsetHeight, et);
        }
        target.style.left = el + 'px';
        target.style.top  = et + 'px';
        lastLeft = el;
        lastTop = et;
        baidu.isFunction(op.ondrag)
            && op.ondrag(target, op, {left: lastLeft, top: lastTop});
    }
    // 对document.body.onselectstart事件进行监听，避免拖曳时文字被选中
    function unselect(e) {
        return baidu.event.preventDefault(e, false);
    }
})();
// [TODO] 20100625 添加cursorAt属性，absolute定位的定位的元素在不设置top|left值时，初始值有问题，得动态计算
// [TODO] 20101101 在drag方法的返回对象中添加 dispose() 方法析构drag
/// support magic - Tangram 1.x Code End


/// support maigc - Tangram 1.x Code Start

/// support maigc - Tangram 1.x Code End










/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-06
 * @modify
 */

/**
 * @description 获取TangramDom里的第N个元素，返回新的TangramDom，可以传入负整数，反向取
 * @function
 * @name baidu.dom().eq()
 * @grammar baidu.dom(args).eq(index)
 * @param   {Number}        index|-index    指定的元素下标
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    eq : function (index) {
        baidu.check("number","baidu.dom.eq");
        return baidu.dom(this.get(index));
    }
});








/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-12
 * @modify
 */

/**
 * @description 按条件搜索目标元素集的所有子孙元素
 * @function
 * @name baidu.dom().find()
 * @grammar baidu.dom(args).find(selector)
 * @param   {Object}            selector    选择器
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    find : function (selector) {
        var a=[],
            expr,
            id = "__tangram__find__",
            td = baidu.dom();

        switch (baidu.type(selector)) {
        case "string" :
            this.each(function(){baidu.merge(td, baidu.query(selector, this));});
            break;
        case "HTMLElement" :
            expr = selector.tagName +"#"+ (selector.id ? selector.id : (selector.id = id));
            this.each(function(){if(baidu.query(expr, this).length > 0) a.push(selector);});
            selector.id == id && (selector.id = "");
            if (a.length > 0) baidu.merge(td, a);
            break;
        case "$DOM" :
            a = selector.get();
            this.each(function(){
                baidu.forEach(baidu.query("*", this), function(dom){
                    for (var i=0, n=a.length; i<n; i++) {
                        dom === a[i] && (td[td.length ++] = a[i]);
                    }
                });
            });
            break;        
        }
        return td;
    }
});





/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 当前集合第一个元素
 *
 * @function
 * @name baidu.dom().first()
 * @grammar baidu.dom(args).first()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    first : function () {
        return baidu.dom(this[0]);
    }
});

baidu.dom.first = function(e) {
    baidu.isString(e) && (e = "#"+ e);

    return baidu.dom(e).children()[0];
};






/// support magic - Tangram 1.x Code Start
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
/**
 * @description  获取目标元素的属性值
 * @function 
 * @name baidu.dom.getAttr
 * @grammar baidu.dom(args).getAttr(attributeName)
 * @param {String} attributeName  要获取的attribute键名
 * @return {string|null} 目标元素的attribute值，获取不到时返回null
 */
 /**
 * @description  获取目标元素的属性值
 * @function 
 * @name baidu.dom.getAttr
 * @grammar baidu.dom.getAttr(element,attributeName)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {String} attributeName  要获取的attribute键名
 * @return {string|null} 目标元素的attribute值，获取不到时返回null
 */





baidu.dom.extend({
    getAttr: function (key) {
        element = this[0];
        if ('style' == key){
            return element.style.cssText;
        };
        key = baidu.dom._NAME_ATTRS[key] || key;
        return element.getAttribute(key);
    }
});

/// support magic - Tangram 1.x Code End








/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前集合匹配条件的元素
 *
 * @function
 * @name baidu.dom().has()
 * @grammar baidu.dom(args).has(selector)
 * @param   {Object}            selector    选择器
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    has: function (selector) {
        var a = []
            ,td = baidu.dom(document.body);

        baidu.forEach(this, function(dom){
            td[0] = dom;
            td.find(selector).length && a.push(dom);
        });

        return baidu.dom(a);
    }
});



/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
 
/**
 * @description 检查匹配的元素是否含有某个特定的className
 * @function 
 * @name baidu.dom().hasClass()
 * @grammar baidu.dom(args).hasClass(className)
 * @param {string} className 要查询的className名，多个用空格分隔。
 * @return {Boolean} 同时存在返回true，不存在返回false。
 * @example
 该接口支持传入多个className，并且可以打乱顺序。
 如果是多个，同时存在返回true，有一个不存在就返回false。
 示例代码：
 //HTML片段
 <div id='test-div' class='class1 class2'></div>

 //单个className
 baidu('#test-div').hasClass('class1');  //true
 
 //多个className
 baidu('#test-div').hasClass('class1 class2');  //true
 
 //多个className，顺序可以打乱
 baidu('#test-div').hasClass('class2 class1');  //true
 
 //多个className，有一个不存在则返回false
 baidu('#test-div').hasClass('class1 class2 class4');  //false

 */





baidu.dom.extend({
    hasClass: function(value){
        //异常处理
        if(arguments.length <= 0 || typeof value === 'function'){
            return this;
        };
        
        if(this.size()<=0){
            return false;
        };

        //对输入进行处理
        value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
        var arr = value.split(' ');
        var result;
        baidu.forEach(this, function(item){
            var str = item.className;
            for(var i = 0;i<arr.length;i++){
                if((' '+str+' ').indexOf(' '+arr[i]+' ') == -1){
                    //有一个不含有
                    result = false;
                    return;
                };
            };
            if(result!==false){
                result = true;
                return;
            };
        });
        return result;
    }
});

/*
 * tangram
 * copyright 2011 baidu inc. all rights reserved.
 *
 * path: baidu/object/isEmpty.js
 * author: leeight
 * version: 1.1.0
 * date: 2011/04/30
 */



/**
 * @description 检测一个对象是否是空的，需要注意的是：如果污染了Object.prototype或者Array.prototype，那么baidu.object.isEmpty({})或者baidu.object.isEmpty([])可能返回的就是false.
 * @name baidu.object.isEmpty
 * @function
 * @grammar baidu.object.isEmpty(obj)
 * @param {Object} obj 需要检测的对象.
 * @return {boolean} 如果是空的对象就返回true.
 */
baidu.object.isEmpty = function(obj) {
    var ret = true;
    if('[object Array]' === Object.prototype.toString.call(obj)){
        ret = !obj.length;
    }else{
        obj = new Object(obj);
        for(var key in obj){
            return false;
        }
    }
    return ret;
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/02
 */


/**
 * @description 操作json对象的方法
 * @name baidu.json
 * @namespace
 */
baidu.json = baidu.json || {};


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/parse.js
 * author: erik, berg
 * version: 1.2
 * date: 2009/11/23
 */



/**
 * @description 将字符串解析成json对象。注：不会自动祛除空格
 * @name baidu.json.parse
 * @function
 * @grammar baidu.json.parse(data)
 * @param {string} data 需要解析的字符串
 * @remark
 * 该方法的实现与ecma-262第五版中规定的JSON.parse不同，暂时只支持传入一个参数。后续会进行功能丰富。
 * @meta standard
 * @see baidu.json.stringify,baidu.json.decode
 *             
 * @return {JSON} 解析结果json对象
 */
baidu.json.parse = function (data) {
    //2010/12/09：更新至不使用原生parse，不检测用户输入是否正确
    return (new Function("return (" + data + ")"))();
};


/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */











;(function(){

var rbrace = /^(?:\{.*\}|\[.*\])$/,
    rmultiDash = /([A-Z])/g,

    // Matches dashed string for camelizing
    rmsPrefix = /^-ms-/,
    rdashAlpha = /-([\da-z])/gi,

    fcamelCase = function( all, letter ) {
        return ( letter + "" ).toUpperCase();
    };

baidu.extend(baidu._util_,{

    // Convert dashed to camelCase; used by the css and data modules
    // Microsoft forgot to hump their vendor prefix (#9572)
    camelCase: function( string ) {
        return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
    }
});

//Copy from jQuery 1.8 , thank you for jQuery 
baidu.extend(baidu._util_,{
    cache: {},

    deletedIds: [],

    // Please use with caution
    uuid: 0,

    // Unique for each copy of baidu on the page
    // Non-digits removed to match rinlinebaidu
    expando: "baidu" + ( '2.0.0' + Math.random() ).replace( /\D/g, "" ),

    // The following elements throw uncatchable exceptions if you
    // attempt to add expando properties to them.
    noData: {
        "embed": true,
        // Ban all objects except for Flash (which handle expandos)
        "object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
        "applet": true
    },

    hasData: function( elem ) {
        elem = elem.nodeType ? baidu._util_.cache[ elem[baidu._util_.expando] ] : elem[ baidu._util_.expando ];
        return !!elem && !isEmptyDataObject( elem );
    },

    data: function( elem, name, data, pvt /* Internal Use Only */ ) {
        if ( !baidu._util_.acceptData( elem ) ) {
            return;
        }

        var thisCache, ret,
            internalKey = baidu._util_.expando,
            getByName = typeof name === "string",

            // We have to handle DOM nodes and JS objects differently because IE6-7
            // can't GC object references properly across the DOM-JS boundary
            isNode = elem.nodeType,

            //这部分为jQuery全局的缓存设计，目前tangram2.0中没有设计该部分功能，但是使用涉及到这部分的接口全部正常。
            // Only DOM nodes need the global baidu cache; JS object data is
            // attached directly to the object so GC can occur automatically
            cache = isNode ? baidu._util_.cache : elem,

            // Only defining an ID for JS objects if its cache already exists allows
            // the code to shortcut on the same path as a DOM node with no cache
            id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && getByName && data === undefined ) {
            return;
        }

        if ( !id ) {
            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if ( isNode ) {
                elem[ internalKey ] = id = baidu._util_.deletedIds.pop() || ++baidu._util_.uuid;
            } else {
                id = internalKey;
            }
        }

        if ( !cache[ id ] ) {
            cache[ id ] = {};

            // Avoids exposing baidu metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            if ( !isNode ) {
                cache[ id ].toJSON = function() {};
            }
        }

        // An object can be passed to baidu.dom.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if ( typeof name === "object" || typeof name === "function" ) {
            if ( pvt ) {
                cache[ id ] = baidu.extend( cache[ id ], name );
            } else {
                cache[ id ].data = baidu.extend( cache[ id ].data, name );
            }
        }

        thisCache = cache[ id ];

        // baidu data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if ( !pvt ) {
            if ( !thisCache.data ) {
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if ( data !== undefined ) {
            thisCache[ baidu._util_.camelCase( name ) ] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if ( getByName ) {

            // First Try to find as-is property data
            ret = thisCache[ name ];

            // Test for null|undefined property data
            if ( ret == null ) {

                // Try to find the camelCased property
                ret = thisCache[ baidu._util_.camelCase( name ) ];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    },

    removeData: function( elem, name, pvt /* Internal Use Only */ ) {
        if ( !baidu._util_.acceptData( elem ) ) {
            return;
        }

        var thisCache, i, l,

            isNode = elem.nodeType,

            cache = isNode ? baidu._util_.cache : elem,
            id = isNode ? elem[ baidu._util_.expando ] : baidu._util_.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if ( !cache[ id ] ) {
            return;
        }

        if ( name ) {

            thisCache = pvt ? cache[ id ] : cache[ id ].data;

            if ( thisCache ) {

                // Support array or space separated string names for data keys
                if ( !baidu.isArray( name ) ) {

                    // try the string as a key before any manipulation
                    if ( name in thisCache ) {
                        name = [ name ];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = baidu._util_.camelCase( name );
                        if ( name in thisCache ) {
                            name = [ name ];
                        } else {
                            name = name.split(" ");
                        }
                    }
                }

                for ( i = 0, l = name.length; i < l; i++ ) {
                    delete thisCache[ name[i] ];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if ( !( pvt ? isEmptyDataObject : baidu.object.isEmpty )( thisCache ) ) {
                    return;
                }
            }
        }

        if ( !pvt ) {
            delete cache[ id ].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if ( !isEmptyDataObject( cache[ id ] ) ) {
                return;
            }
        }

        // Destroy the cache
        if ( isNode ) {
            baidu._util_.cleanData( [ elem ], true );

        // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
        } else if ( baidu.support.deleteExpando || cache != cache.window ) {
            delete cache[ id ];

        // When all else fails, null
        } else {
            cache[ id ] = null;
        }
    },

    // For internal use only.
    _data: function( elem, name, data ) {
        return baidu._util_.data( elem, name, data, true );
    },

    // A method for determining if a DOM node can handle the data expando
    acceptData: function( elem ) {
        var noData = elem.nodeName && baidu._util_.noData[ elem.nodeName.toLowerCase() ];

        // nodes accept data unless otherwise specified; rejection can be conditional
        return !noData || noData !== true && elem.getAttribute("classid") === noData;
    }
});

//TODO data的入口

function dataAttr( elem, key, data ) {
    // If nothing was found internally, try to fetch any
    // data from the HTML5 data-* attribute
    if ( data === undefined && elem.nodeType === 1 ) {

        var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

        data = elem.getAttribute( name );

        if ( typeof data === "string" ) {
            try {
                data = data === "true" ? true :
                data === "false" ? false :
                data === "null" ? null :
                baidu.isNumber( data ) ? +data :
                    rbrace.test( data ) ? baidu.json.parse( data ) :
                    data;
            } catch( e ) {}

            // Make sure we set the data so it isn't changed later
            baidu._util_.data( elem, key, data );

        } else {
            data = undefined;
        }
    }

    return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
    var name;
    for ( name in obj ) {

        // if the public data object is empty, the private is still empty
        if ( name === "data" && baidu.object.isEmpty( obj[name] ) ) {
            continue;
        }
        if ( name !== "toJSON" ) {
            return false;
        }
    }

    return true;
}


//
})();



/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */











(function(){

var iframeDoc,
    iframe,
    curCSS,
    rmargin = /^margin/,
    rnumnonpx = /^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,
    rposition = /^(top|right|bottom|left)$/,
    elemdisplay = {};

baidu.extend(baidu._util_,{
    showHide:function( elements, show){
        var elem, display,
            values = [],
            index = 0,
            length = elements.length;

        for ( ; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }
            values[ index ] = baidu._util_._data( elem, "olddisplay" );
            if ( show ) {
                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if ( !values[ index ] && elem.style.display === "none" ) {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if ( (elem.style.display === "" && curCSS( elem, "display" ) === "none") ||
                    !baidu.dom.contains( elem.ownerDocument.documentElement, elem ) ) {
                    values[ index ] = baidu._util_._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
                }
            } else {
                display = curCSS( elem, "display" );

                if ( !values[ index ] && display !== "none" ) {
                    baidu._util_._data( elem, "olddisplay", display );
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for ( index = 0; index < length; index++ ) {
            elem = elements[ index ];
            if ( !elem.style ) {
                continue;
            }
            if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
                elem.style.display = show ? values[ index ] || "" : "none";
            }
        }

        return elements;
    }
});

// NOTE: To any future maintainer, we've used both window.getComputedStyle
// and getComputedStyle here to produce a better gzip size
if ( window.getComputedStyle ) {
    curCSS = function( elem, name ) {
        var ret, width,
            computed = getComputedStyle( elem, null ),
            style = elem.style;

        if ( computed ) {

            ret = computed[ name ];
            if ( ret === "" && !baidu.dom.contains( elem.ownerDocument.documentElement, elem ) ) {
                ret = baidu.dom(elem).css( name );
            }

            // A tribute to the "awesome hack by Dean Edwards"
            // WebKit uses "computed value (percentage if specified)" instead of "used value" for margins
            // which is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
            if ( !baidu.support.pixelMargin && rmargin.test( name ) && rnumnonpx.test( ret ) ) {
                width = style.width;
                style.width = ret;
                ret = computed.width;
                style.width = width;
            }
        }

        return ret;
    };
} else if ( document.documentElement.currentStyle ) {
    curCSS = function( elem, name ) {
        var left, rsLeft,
            ret = elem.currentStyle && elem.currentStyle[ name ],
            style = elem.style;

        // Avoid setting ret to empty string here
        // so we don't default to auto
        if ( ret == null && style && style[ name ] ) {
            ret = style[ name ];
        }

        // From the awesome hack by Dean Edwards
        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

        // If we're not dealing with a regular pixel number
        // but a number that has a weird ending, we need to convert it to pixels
        // but not position css attributes, as those are proportional to the parent element instead
        // and we can't measure the parent instead because it might trigger a "stacking dolls" problem
        if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

            // Remember the original values
            left = style.left;
            rsLeft = elem.runtimeStyle && elem.runtimeStyle.left;

            // Put in the new values to get a computed value out
            if ( rsLeft ) {
                elem.runtimeStyle.left = elem.currentStyle.left;
            }
            style.left = name === "fontSize" ? "1em" : ret;
            ret = style.pixelLeft + "px";

            // Revert the changed values
            style.left = left;
            if ( rsLeft ) {
                elem.runtimeStyle.left = rsLeft;
            }
        }

        return ret === "" ? "auto" : ret;
    };
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
    if ( elemdisplay[ nodeName ] ) {
        return elemdisplay[ nodeName ];
    }

    var elem = baidu.dom( "<" + nodeName + ">" ).appendTo( document.body ),
        display = elem.css("display");
    elem.remove();

    // If the simple way fails,
    // get element's real default display by attaching it to a temp iframe
    if ( display === "none" || display === "" ) {
        // Use the already-created iframe if possible
        iframe = document.body.appendChild(
            iframe || baidu.extend( document.createElement("iframe"), {
                frameBorder: 0,
                width: 0,
                height: 0
            })
        );

        // Create a cacheable copy of the iframe document on first call.
        // IE and Opera will allow us to reuse the iframeDoc without re-writing the fake HTML
        // document to it; WebKit & Firefox won't allow reusing the iframe document.
        if ( !iframeDoc || !iframe.createElement ) {
            iframeDoc = ( iframe.contentWindow || iframe.contentDocument ).document;
            iframeDoc.write("<!doctype html><html><body>");
            iframeDoc.close();
        }

        elem = iframeDoc.body.appendChild( iframeDoc.createElement(nodeName) );

        display = curCSS( elem, "display" );
        document.body.removeChild( iframe );
    }

    // Store the correct default display
    elemdisplay[ nodeName ] = display;

    return display;
}



})();



/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */




/**
 * @description 隐藏匹配的元素
 * @function 
 * @name baidu.dom().hide()
 * @grammar baidu.dom(args).hide()
 * @return {TangramDom} 之前匹配的TangramDom对象
 * @example 
 show和hide方法是最简单的显示或者隐藏一个元素的方法

 示例代码：
 //HTML片段
 <div>元素</div>

 //隐藏一个元素
 baidu("div").hide();
 */

baidu.dom.extend({
    hide: function() {
        baidu._util_.showHide( this );
        return this;
    }
});
/**
 * @author linlingyu
 */




/**
 * @description 取得第一个匹配元素的高度，该高度忽略margin, border的计算，但包含padding的计算
 * @function 
 * @name baidu.dom().innerHeight()
 * @grammar baidu.dom(args).innerHeight()
 * @return {Number} 返回一个整型的高度值
 */
baidu.dom.extend({
    innerHeight: function(){
        if(this.size()<=0){
            return 0;
        }
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'height')
            : baidu._util_.getWidthOrHeight(ele, 'height', 'padding');
    }
});
/**
 * @author linlingyu
 */



/**
 * @description 取得第一个匹配元素的宽度，该宽度忽略margin, border的计算，但包含padding的计算
 * @function 
 * @name baidu.dom().innerWidth()
 * @grammar baidu.dom(args).innerWidth()
 * @return {Number} 返回一个整型的宽度值
 */
baidu.dom.extend({
    innerWidth: function(){
        if(this.size()<=0){return 0;}
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'width')
            : baidu._util_.getWidthOrHeight(ele, 'width', 'padding');
    }
});
/**
 * @author linlingyu
 */




/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素的后面
 * @function 
 * @name baidu.dom().insertAfter()
 * @grammar baidu.dom(args).insertAfter(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口是将匹配的内容，插入到每个DOM元素的后面。
 
 其实.after()和.insertAfter()实现同样的功能，主要的不同是语法——特别是内容和目标的位置。 
 对于 .after()，选择表达式在函数的前面，参数是将要插入的内容，
 对于.insertAfter()，刚好相反，内容在方法前面，它将被放在参数里元素的后面。
 
 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素后面
 baidu('<h2>footer</h2>').insertAfter('.content');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
   <h2>footer</h2>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素后面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('h2').insertAfter('.content');  //结果同上
 */

baidu.dom.extend({
    insertAfter: function(target){
        baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.insertAfter');
        baidu._util_.smartInsertTo(this, target, function(node){
            this.parentNode.insertBefore(node, this.nextSibling);
        }, 'after');
        return this;
    }
});



/**
 * @author linlingyu
 */





/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素的前面
 * @function 
 * @name baidu.dom().insertBefore()
 * @grammar baidu.dom(args).insertBefore(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 该接口是将匹配到的DOM元素插入到参数指定的DOM元素的前面。
 
 其实.before()和.insertBefore()实现同样的功能，主要的不同是语法——特别是内容和目标的位置。 
 对于 .before()，选择表达式在函数的前面，参数是将要插入的内容，
 对于.insertBefore()，刚好相反，内容在方法前面，它将被放在参数里元素的前面。

 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素前面
 baidu('<h2>test2</h2>').insertBefore('.content');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <h2>test2</h2>
   <div class='content'></div>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素前面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('h2').insertBefore('.content');  //结果同上 
*/

baidu.dom.extend({
    insertBefore: function(target){
        baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.insertBefore');
        baidu._util_.smartInsertTo(this, target, function(node){
            this.parentNode.insertBefore(node, this);
        }, 'before');
        return this;
    }
});




/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */




/**
 * @description 在目标元素的指定位置插入HTML代码
 * @name baidu.dom().insertHTML()
 * @function
 * @grammar baidu.dom(args).insertHTML( position, html)
 * @param {string} position  插入html的位置信息，取值为beforeBegin,afterBegin,beforeEnd,afterEnd
 * @param {string} html 要插入的html
 * @return {HTMLElement} 目标元素
 */


/**
 * @description 在目标元素的指定位置插入HTML代码
 * @name baidu.dom.insertHTML
 * @function
 * @grammar baidu.dom.insertHTML(element, position, html)
 * @param {HTMLElement|string} element 目标元素或目标元素的id
 * @param {string} position  插入html的位置信息，取值为beforeBegin,afterBegin,beforeEnd,afterEnd
 * @param {string} html 要插入的html
 * @remark
 * 
 * 对于position参数，大小写不敏感<br>
 * 参数的意思：beforeBegin&lt;span&gt;afterBegin   this is span! beforeEnd&lt;/span&gt; afterEnd <br />
 * 此外，如果使用本函数插入带有script标签的HTML字符串，script标签对应的脚本将不会被执行。
 * 
 * @shortcut insertHTML
 * @meta standard
 *             
 * @return {HTMLElement} 目标元素
 */

baidu.dom.extend({
    insertHTML: function ( position, html) {
        element = this[0];
        var range,begin;
    
        //在opera中insertAdjacentHTML方法实现不标准，如果DOMNodeInserted方法被监听则无法一次插入多element
        //by lixiaopeng @ 2011-8-19
        if (element.insertAdjacentHTML && !baidu.browser.opera) {
            element.insertAdjacentHTML(position, html);
        } else {
            // 这里不做"undefined" != typeof(HTMLElement) && !window.opera判断，其它浏览器将出错？！
            // 但是其实做了判断，其它浏览器下等于这个函数就不能执行了
            range = element.ownerDocument.createRange();
            // FF下range的位置设置错误可能导致创建出来的fragment在插入dom树之后html结构乱掉
            // 改用range.insertNode来插入html, by wenyuxiang @ 2010-12-14.
            position = position.toUpperCase();
            if (position == 'AFTERBEGIN' || position == 'BEFOREEND') {
                range.selectNodeContents(element);
                range.collapse(position == 'AFTERBEGIN');
            } else {
                begin = position == 'BEFOREBEGIN';
                range[begin ? 'setStartBefore' : 'setEndAfter'](element);
                range.collapse(begin);
            }
            range.insertNode(range.createContextualFragment(html));
        }
        return element;
    }
});



/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 当前集合最后一个对象
 *
 * @function
 * @name baidu.dom().last()
 * @grammar baidu.dom(args).last()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    last : function () {
        return baidu.dom(this.get(-1));
    }
});





/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-11
 * @modify
 */

/**
 * @description 取得一个包含匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合
 * @function
 * @name baidu.dom().next()
 * @grammar baidu.dom(args).next([filter])
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    next : function (filter) {
        var td = baidu.dom();

        baidu.forEach(this, function(dom){
            while((dom = dom.nextSibling) && dom && dom.nodeType != 1);
            dom && (td[td.length ++] = dom);
        });

        return filter ? td.filter(filter) : td;
    }
});





/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-11
 * @modify
 */

/**
 * @description 查找当前元素之后所有的同辈元素
 * @function
 * @name baidu.dom().nextAll()
 * @grammar baidu.dom(args).nextAll([filter])
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    nextAll : function (selector) {
        var array = [];

        baidu.forEach(this, function(dom){
            while(dom = dom.nextSibling) {
                dom && (dom.nodeType == 1) && array.push(dom);
            };
        });

        return baidu.dom( baidu.dom.match(array, selector) );
    }
});






/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之后所有的同辈元素，直到遇到匹配的那个元素为止
 * @function
 * @name baidu.dom().nextUntil()
 * @grammar baidu.dom(args).nextUntil(selector[, filter])
 * @param   {Object}            selector    选择器
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    nextUntil : function (selector, filter) {
        var array = baidu.array();

        baidu.forEach(this, function(dom){
            var a = baidu.array();

            while(dom = dom.nextSibling) {
                dom && (dom.nodeType == 1) && a.push(dom);
            };

            if (selector && a.length) {
                var b = baidu.dom.match(a, selector);
                // 有符合 selector 的目标存在
                if (b.length) {
                    a = a.slice(0, a.indexOf(b[0]));
                }
            }
            baidu.merge(array, a);
        });

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});





/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 去除当前集合中符合再次输入的选择器的项
 *
 * @function
 * @name baidu.dom().not()
 * @grammar baidu.dom(args).not(selector)
 * @param   {Object}            selector    选择器
  
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 * @example 
 去除当前集合中符合再次输入的选择器的项
 
 示例代码：
 //HTML片段
 <div class="test">1</div>
 <div>2</div>
 <div>3</div>
 <div class="test">4</div>

 //去掉class为test的元素
 baidu('div').not('.test');

 //结果
 <div>2</div>
 <div>3</div>

 */
baidu.dom.extend({
    not : function (selector) {
        var i, j, n
            ,all= this.get()
            ,a  = baidu.isArray(selector) ? selector
                : baidu.dom.match(this, selector);

        for (i=all.length - 1; i>-1; i--) {
            for (j=0, n=a.length; j<n; j++) {
                a[j] === all[i] && all.splice(i, 1);
            }
        }

        return baidu.dom(all);
    }
});

/**
 * @author linlingyu
 */




/**
 * @description 取得元素的父元素
 * @function 
 * @name baidu.dom().offsetParent()
 * @grammar baidu.dom(args).offsetParent()
 * @return {TangramDom} 返回之前匹配的TangramDom对象
 */
baidu.dom.extend({
    offsetParent: function(){
        return this.map(function(){
            var offsetParent = this.offsetParent || document.body,
                exclude = /^(?:body|html)$/i;
            while(offsetParent && baidu.dom(offsetParent).getCurrentStyle('position') === 'static'
                && !exclude.test(offsetParent.nodeName)){
                    offsetParent = offsetParent.offsetParent;
            }
            return offsetParent;
        });
    }
});

/**
 * @author dron
 */






/**
 * @description 对当前 TangramDom 集合添加一次性事件监听
 * @function 
 * @name baidu.dom().one()
 * @grammar baidu.dom(args).one(type[,data][,fn])
 * @param {String} type 事件名称，如果是多个事件，以空格或半角逗号隔开
 * @param {Object} data 事件触发时携带的数据，JSON 格式，此参数可选。
 * @param {Function} fn 事件触发函数，fn 接受一个参数 e，为 baidu.event() 事件对象实例
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    one: function( type, data, fn ){
        var me = this;

        if( typeof data == "function" )
            fn = data,
            data = undefined;

        if( typeof type == "object" && type ){
            baidu.forEach( type, function( fn, type ){
                this.one( type, data, fn );
            }, this );
            return this;
        }

        var newfn = function(){
            baidu.dom( this ).off( type, newfn );
            return fn.apply( me, arguments );
        };

        this.each( function(){
            var id = baidu.id( this );
            fn[ "_" + id + "_" + type ] = newfn;
        } );

        return this.on( type, data, newfn );
    }
});


/**
 * @author linlingyu
 */



/**
 * @description 取得第一个匹配元素的高度，该高度包含border, padding的计算并通过参数来加入对margin的计算
 * @function 
 * @name baidu.dom().outerHeight()
 * @grammar baidu.dom(args).outerHeight([margin])
 * @param {Boolean} margin 参数传递一个布尔值为true时，该接口取得第一个匹配元素相的高度值，该高度值包含对margin, border, padding的计算
 * @return {Number} 返回一个整型的高度值
 */
baidu.dom.extend({
    outerHeight: function(margin){
        if(this.size()<=0){return 0;}
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'height')
            : baidu._util_.getWidthOrHeight(ele, 'height', 'padding|border' + (margin ? '|margin' : ''));
    }
});
/**
 * @author linlingyu
 */



/**
 * @description 取得第一个匹配元素的宽度，该宽度包含border, padding的计算并通过参数来加入对margin的计算
 * @function 
 * @name baidu.dom().outerWidth()
 * @grammar baidu.dom(args).outerWidth([margin])
 * @param {Boolean} margin 参数传递一个布尔值为true时，该接口取得第一个匹配元素相的宽度值，该宽度值包含对margin, border, padding的计算
 * @return {Number} 返回一个整型的宽度值
 */
baidu.dom.extend({
    outerWidth: function(margin){
        if(this.size()<=0){return 0;}     
        var ele = this[0],
            type = ele != null && ele === ele.window ? 'window'
                : (ele.nodeType === 9 ? 'document' : false);
        return type ? baidu._util_.getWindowOrDocumentWidthOrHeight(ele, type, 'width')
            : baidu._util_.getWidthOrHeight(ele, 'width', 'padding|border' + (margin ? '|margin' : ''));
    }
});




/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 取得一个包含着所有匹配元素的唯一父元素的元素集合
 *
 * @function
 * @name baidu.dom().parent()
 * @grammar baidu.dom(args).parent([filter])
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    parent : function (filter) {
        var array = [];

        baidu.forEach(this, function(dom) {
            (dom = dom.parentNode) && dom.nodeType == 1 && array.push(dom);
        });

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});






/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 取得一个包含着所有匹配元素的祖先元素的元素集合（不包含根元素）。可以通过一个可选的表达式进行筛选。
 *
 * @function
 * @name baidu.dom().parents()
 * @grammar baidu.dom(args).parents([filter])
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    parents : function (filter) {
        var array = [];

        baidu.forEach(this, function(dom) {
            var a = [];

            while ((dom = dom.parentNode) && dom.nodeType == 1) a.push(dom);

            baidu.merge(array, a);
        });

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});






/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素的所有的父辈元素，直到遇到匹配的那个元素为止
 *
 * @function
 * @name baidu.dom().parentsUntil()
 * @grammar baidu.dom(args).parentsUntil(selector[, filter])
 * @param   {Object}            selector    选择器
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    parentsUntil : function (selector, filter) {
        baidu.check("(string|HTMLElement)(,.+)?","baidu.dom.parentsUntil");
        var array = [];

        baidu.forEach(this, function(dom){
            var a = baidu.array();

            while ((dom = dom.parentNode) && dom.nodeType == 1) a.push(dom);

            if (selector && a.length) {
                var b = baidu.dom.match(a, selector);
                // 有符合 selector 的目标存在
                if (b.length) {
                    a = a.slice(0, a.indexOf(b[0]));
                }
            }
            baidu.merge(array, a);
        });

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});

/**
 * @author linlingyu
 */




/**
 * @description 取得第一个匹配元素相对于父元素的偏移量
 * @function 
 * @name baidu.dom().position()
 * @grammar baidu.dom(args).position()
 * @return {Object} 返回一个包含left和top键名的json来标示元素相对于父元素的偏移量
 */
baidu.dom.extend({
    position: function(){
        if(this.size()<=0){return 0;}        
        var patrn = /^(?:body|html)$/i,
            coordinate = this.offset(),
            offsetParent = this.offsetParent(),
            parentCoor = patrn.test(offsetParent[0].nodeName) ? {left: 0, top: 0}
                : offsetParent.offset();
        coordinate.left -= parseFloat(this.getCurrentStyle('marginLeft')) || 0;
        coordinate.top -= parseFloat(this.getCurrentStyle('marginTop')) || 0;
        parentCoor.left += parseFloat(offsetParent.getCurrentStyle('borderLeftWidth')) || 0;
        parentCoor.top += parseFloat(offsetParent.getCurrentStyle('borderTopWidth')) || 0;
        return {
            left: coordinate.left - parentCoor.left,
            top: coordinate.top - parentCoor.top
        }
    }
});
/**
 * @author linlingyu
 */

/**
 * @description 在匹配的每个DOM元素内部的前端插入内容
 * @function 
 * @name baidu.dom().prepend()
 * @grammar baidu.dom(args).prepend(content1[, content2])
 * @param {HTMLString|Element|TangramDom} content1 支持一个DOM元素或是一段HTMLString或是一个TangramDom对象
 * @param {HTMLString|Array|Element|TangramDom} content2 支持一个或多个DOM元素或是DOM元素的数组或是一段HTMLString或是一个TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 .prepend()方法将指定元素插入到匹配元素里面作为它的第一个子元素，如果要作为最后一个子元素插入用.append()。
 .prepend()和.prependTo()实现同样的功能，主要的不同时语法，插入的内容和目标的位置不同。 
 对于.prepend()，函数前面的是插入的容器，参数是内容；而.prependTo()函数前面的是内容，参数是容器。

 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素后面
 baidu('#body').prepend('<h1>test1</h1>');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素的里面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('#body').append(baidu('h1'));  //结果同上
 */
/**
 * @description 在匹配的每个DOM元素内部的前端插入内容
 * @function 
 * @name baidu.dom().prepend()
 * @grammar baidu.dom(args).prepend(fn)
 * @param {function} fn 支持一个函数作为参数，函数最终需要返回一个HTMLString|Element|TangramDom
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").prepend(function(index,html))
 */
baidu.dom.extend({
    prepend: function(){
        baidu.check('^(?:string|function|HTMLElement|\\$DOM)(?:,(?:string|array|HTMLElement|\\$DOM))*$', 'baidu.dom.prepend');
        baidu._util_.smartInsert(this, arguments, function(child){
            this.nodeType === 1 && this.insertBefore(child, this.firstChild);
        });
        return this;
    }
});
/**
 * @author linlingyu
 */


/**
 * @description 将匹配到的DOM元素插入到参数指定的DOM元素内部的开始
 * @function 
 * @name baidu.dom().prependTo()
 * @grammar baidu.dom(args).prependTo(target)
 * @param {HTMLString|selector|Element|TangramDom} target 一个HTMLString或是选择器字符串或是DOM元素或是TangramDom对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 .prependTo()方法将指定元素插入到匹配元素里面作为它的第一个子元素，如果要作为最后一个子元素插入用.append()。
 .prepend()和.prependTo()实现同样的功能，主要的不同时语法，插入的内容和目标的位置不同。 
 对于.prepend()，函数前面的是插入的容器，参数是内容；而.prependTo()函数前面的是内容，参数是容器。

 另，如果有多个目标元素，内容将被复制然后，被插入到每个目标后面；
 如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 示例代码：
 //HTML代码片段
 <div id='body'>
   <div class='content'></div>
 </div>

 //可以创建内容然后同时插在好几个元素后面
 baidu('<h1>test1</h1>').prependTo('#body');

 //插入后，得到新内容
 <div id='body'>
   <h1>test1</h1>
   <div class='content'></div>
 </div>

 //也可以在页面上选择一个元素然后插在另一个元素的里面，
 //如果一个被选中的元素被插在另外一个地方，这是移动而不是复制。

 baidu('h1').appendTo('#body');  //结果同上
 */
baidu.dom.extend({
    prependTo: function(target){
        baidu.check('^(?:string|HTMLElement|\\$DOM)$', 'baidu.dom.prependTo');
        baidu._util_.smartInsertTo(this, target, function(child){
            this.insertBefore(child, this.firstChild);
        });
        return this;
    }
});




/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 包含匹配的元素集合中每一个元素紧邻的前一个同辈元素的元素集合
 *
 * @function
 * @name baidu.dom().prev()
 * @grammar baidu.dom(args).prev(filter)
 * @param   {Object}        filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    prev : function (filter) {
        var array = [];

        baidu.forEach(this, function(dom) {
            while (dom = dom.previousSibling) {
                if (dom.nodeType == 1) {
                    array.push(dom);
                    break;
                }
            }
        });

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});







/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之前所有的同辈元素
 *
 * @function
 * @name baidu.dom().prevAll()
 * @grammar baidu.dom(args).prevAll(filter)
 * @param   {Object}        filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    prevAll : function (filter) {
        var array = baidu.array();

        baidu.forEach(this, function(dom) {
            var a = [];
            while (dom = dom.previousSibling) dom.nodeType == 1 && a.push(dom);

            baidu.merge(array, a.reverse());
        });

        return baidu.dom(typeof filter == "string" ? baidu.dom.match(array, filter) : array.unique());
    }
});






/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 查找当前元素之前所有的同辈元素，直到遇到匹配的那个元素为止
 * @function
 * @name baidu.dom().prevUntil()
 * @grammar baidu.dom(args).prevUntil(selector[, filter])
 * @param   {Object}            selector    选择器
 * @param   {String|Function}   filter      [可选]过滤函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    prevUntil : function (selector, filter) {
        baidu.check("(string|HTMLElement)(,.+)?", "baidu.dom.prevUntil");
        var array = [];

        baidu.forEach(this, function(dom) {
            var a = baidu.array();

            while(dom = dom.previousSibling) {
                dom && (dom.nodeType == 1) && a.push(dom);
            };

            if (selector && a.length) {
                var b = baidu.dom.match(a, selector);
                // 有符合 selector 的目标存在
                if (b.length) {
                    a = a.slice(0, a.indexOf(b[0]));
                }
            }

            baidu.merge(array, a);
        });

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 将目标字符串中可能会影响正则表达式构造的字符串进行转义
 * @function 
 * @name baidu.string().escapeReg()
 * @grammar baidu.string(str).escapeReg()
 * @return {String} 转义后的字符串
 */

/**
 * @description 将目标字符串中可能会影响正则表达式构造的字符串进行转义
 * @function 
 * @name baidu.string.escapeReg
 * @grammar baidu.string.escapeReg(str)
 * @param {String} str 目标字符串
 * @return {String} 转义后的字符串
 */

baidu.string.extend({
    escapeReg : function () {
        return this.replace(new RegExp("([.*+?^=!:\x24{}()|[\\]\/\\\\])", "g"), '\\\x241');
    }
});





/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 移除每个匹配元素的一个，多个或全部样式。
 * @function 
 * @name baidu.dom().removeClass()
 * @grammar baidu.dom(args).removeClass([className])
 * @param {String}  className 所要移除的一个或多个class属性名(多个用空格分隔)，不填全部删除。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example 
 该接口支持传入多个className，并且可以打乱顺序，多个用空格分隔。
 示例代码：
 //HTML片段
 <div id='test-div' class="class1 class2"></div>

 //单个className
 baidu('#test-div').removeClass('class1');
 
 //多个className
 baidu('#test-div').addClass('class1 class2');

 //这个方法通常和.removeClass()一起使用用来切换元素的样式, 像这样：
 baidu('#test-div').removeClass("class1").addClass('class2 class3'); 

 */

/**
 * @description 移除每个匹配元素的一个，多个或全部样式。
 * @function 
 * @name baidu.dom().removeClass()
 * @grammar baidu.dom(args).removeClass(fn)
 * @param {Function}  fn(index,className)  这个函数返回一个或更多用空格隔开的要增加的样式名。接收元素的索引index和元素旧的样式名className作为参数。
 * @return {TangramDom} 接口最终返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的className和index（索引值），并且删除将函数返回值为对应的className；
 通过使用一个函数来删除className，我们可以根据元素的className来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <div class='test-div1'></div>
 <div class='test-div2'></div>

 //迭代器方法
 //通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu('div').removeClass(function(index,className){
    alert(index);
    alert(className);
    if(index==1){
       return className;
    }
 });

 */





baidu.dom.extend({
    removeClass: function(value){
        if(arguments.length <= 0 ){
            baidu.forEach(this, function(item){
                item.className = '';
            });
        };
        switch(typeof value){
            case 'string':
                //对输入进行处理
                value = String(value).replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');
                var arr = value.split(' ');
                baidu.forEach(this, function(item){
                    var str = item.className ;
                    for(var i = 0;i<arr.length;i++){
                        while((' '+str+' ').indexOf(' '+arr[i]+' ') >= 0){
                           str = (' '+str+' ').replace(' '+arr[i]+' ',' ');
                        };
                    };
                    item.className = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
                });
            break;
            case 'function':
                baidu.forEach(this, function(item, index ,className){
                    baidu.dom(item).removeClass(value.call(item, index, item.className));
                });
            break;
        };

        return this;
    }
});






/**
 * @fileoverview
 * @name baidu.dom.removeData
 * @create 2012-07-13
 * @author meizz
 * @modify
 */

/**
 * 在 DOM 对象上存储数据
 * @grammar TangramDom.data([key[, value]])
 * @param
 * @return
 */
baidu.dom.extend({
    removeData : function () {
        var   guid = baidu.key
            , maps = baidu.global("_maps_HTMLElementData");

        return function( key ) {
            baidu.forEach( this, function( dom ) {
                !dom[ guid ] && ( dom[ guid ] = baidu.id() );
            });

            // set all
            baidu.forEach(this, function(dom){
                var map = maps[dom[ guid ]];

                if (typeof key == "string") {
                    map && delete map[ key ];

                } else if (baidu.type( key) == "array") {
                    baidu.forEach( key, function(i) {
                        map && delete map[ i ];
                    });
                }
            });

            return this;
        }
    }()
});

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 为匹配的元素删除设置的属性。
 * @function 
 * @name baidu.dom().removeProp()
 * @grammar baidu.dom(args).removeProp(property)
 * @param {String} property 要删除的属性名称（不支持多个）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
  * @example 
 .removeProp()返回TangramDom对象，可以链式的继续调用下去，
 而且具有良好的浏览器兼容性。不支持自定义属性，不支持一次删除多个。
 注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。

 示例代码：
 //HTML代码片段
 <input type='text' value='123'/>

 //清除一个属性
 baidu("input").removeProp("value");

 //清除个属性，可以使用链式。注意: Internet Explorer不会允许你改变<input>或者<button>元素的type属性。
 baidu("input").removeProp("value").removeProp("type");

*/







baidu.dom.extend({
    removeProp: function(value){

        //异常处理
        if(arguments.length <= 0 || !value || typeof value !== 'string'){
            return this;
        };

        var bd = baidu.dom,
            bu = baidu._util_;

        value = bu.propFix[ value ] || value;
        baidu.forEach(this, function(item){
            // try/catch handles cases where IE balks (such as removing a property on window)
            try {
                item[ value ] = undefined;
                delete item[ value ];
            } catch( e ) {

            };
        });

        return this;
    }
});


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/each.js
 * author: berg
 * version: 1.1.1
 * date: 2010-04-19
 */



/**
 * @description 遍历Object中所有元素，1.1.1增加
 * @name baidu.object.each
 * @function
 * @grammar baidu.object.each(source, iterator)
 * @param {Object} source 需要遍历的Object
 * @param {Function} iterator 对每个Object元素进行调用的函数，function (item, key)
 * @version 1.1.1
 *             
 * @return {Object} 遍历的Object
 */
baidu.object.each = function (source, iterator) {
    var returnValue, key, item; 
    if ('function' == typeof iterator) {
        for (key in source) {
            if (source.hasOwnProperty(key)) {
                item = source[key];
                returnValue = iterator.call(source, item, key);
        
                if (returnValue === false) {
                    break;
                }
            }
        }
    }
    return source;
};















/**
 * @author linlingyu
 */




baidu._util_.smartScroll = function(axis){
    var orie = {scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset'}[axis],
        is = axis === 'scrollLeft',
        ret = {};
    function isDocument(ele){
        return ele && ele.nodeType === 9;
    }
    function getWindow(ele){
        return baidu.type(ele) == "Window" ? ele
            : isDocument(ele) ? ele.defaultView || ele.parentWindow : false;
    }
    return {
        get: function(ele){
            var win = getWindow(ele);
            return win ? (orie in win) ? win[orie]
                : baidu.browser.isStrict && win.document.documentElement[axis]
                    || win.document.body[axis] : ele[axis];
        },
        
        set: function(ele, val){
            if(!ele){return;}
            var win = getWindow(ele);
            win ? win.scrollTo(is ? val : this.get(ele), !is ? val : this.get(ele))
                : ele[axis] = val;
        }
    };
};
/**
 * @author linlingyu
 */


/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的横向滚动条的滚动位置
 * @function 
 * @name baidu.dom().scrollLeft()
 * @grammar baidu.dom(args).scrollLeft()
 * @return {Number} 返回一个整型的位置数值
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的横向滚动条的滚动位置
 * @function 
 * @name baidu.dom().scrollLeft()
 * @grammar baidu.dom(args).scrollLeft(value)
 * @param {Number|String} value 参数传递一个整型数据或是字符串数值时，接口设置所有匹配元素的横向滚动条的滚动位置
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.dom.extend({
    scrollLeft: function(){
        var ret = baidu._util_.smartScroll('scrollLeft');
        return function(value){
            value && baidu.check('^(?:number|string)$', 'baidu.dom.scrollLeft');
            if(this.size()<=0){
                return value === undefined ? 0 : this;
            };
            return value === undefined ? ret.get(this[0])
                : ret.set(this[0], value) || this;
        }
    }()
});
/**
 * @author linlingyu
 */



/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的竖向滚动条的滚动位置
 * @function 
 * @name baidu.dom().scrollTop()
 * @grammar baidu.dom(args).scrollTop()
 * @return {Number} 返回一个整型的位置数值
 */
/**
 * @description 取得第一个匹配元素或是设置多个匹配元素的竖向滚动条的滚动位置
 * @function 
 * @name baidu.dom().scrollTop()
 * @grammar baidu.dom(args).scrollTop(value)
 * @param {Number|String} value 参数传递一个整型数据或是字符串数值时，接口设置所有匹配元素的竖向滚动条的滚动位置
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
baidu.dom.extend({
    scrollTop: function(){
        var ret = baidu._util_.smartScroll('scrollTop');
        return function(value){
            value && baidu.check('^(?:number|string)$', 'baidu.dom.scrollTop');
            if(this.size()<=0){
                return value === undefined ? 0 : this;
            };
            return value === undefined ? ret.get(this[0])
                : ret.set(this[0], value) || this;
        }
    }()
});


/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2011 Baidu Inc. All rights reserved.
 *
 * author: meizz
 * create: 2011-12-14
 */




/**
 * 给元素样式（比如width）赋值时，如果是数字则添加单位(px)，如果是其它值直接赋
 * @grammar baidu.dom.setPixel(el, style, n)
 * @param    {HTMLElement}    el         DOM元素
 * @param     {String}        style     样式属性名
 * @param    {Number|String} n         被赋的值
 */
baidu.dom.setPixel = function (el, style, n) {
    typeof n != "undefined" &&
    (baidu.dom.g(el).style[style] = n +(!isNaN(n) ? "px" : ""));
};
/// support magic - Tangram 1.x Code End



/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */




/**
 * @description 显示匹配的元素
 * @function 
 * @name baidu.dom().show()
 * @grammar baidu.dom(args).show()
 * @return {TangramDom} 之前匹配的TangramDom对象
 * @example 
 show和hide方法是最简单的显示或者隐藏一个元素的方法

 示例代码：
 //HTML片段
 <div>元素</div>

 //显示一个元素
 baidu("div").show();

 */

baidu.dom.extend({
    show : function() {
        baidu._util_.showHide( this, true );
        return this;
    }
});




/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 取得一个包含匹配的元素集合中每一个元素的所有唯一同辈元素的元素集合。可以用可选的表达式进行筛选
 * @function
 * @name baidu.dom().siblings()
 * @grammar baidu.dom(args).siblings(filter)
 * @param   {Function}      fn(a,b)    [可选]
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    siblings : function (filter) {
        var array = [];

        baidu.forEach(this, function(dom){
            var p = [], n = [], t = dom;

            while(t = t.previousSibling) t.nodeType == 1 && p.push(t);
            while(dom = dom.nextSibling) dom.nodeType==1 && n.push(dom);

            baidu.merge(array, p.reverse().concat(n));
        });

        return baidu.dom( baidu.dom.match(array, filter) );
    }
});



/**
 * @fileoverview
 * @author meizz
 * @create 2012-06-01
 * @modify 2012-07-27 meizz end为undefined时在IE浏览器里出错
 */

/**
 * @description 截取一段DOM对象
 * @function
 * @name baidu.dom().slice()
 * @grammar baidu.dom(args).slice(start[, end])
 * @param   {Number}        start   起始位置
 * @param   {Number}        end     [可选]结束位置
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */

baidu.dom.extend({
    slice : function(){
        var slice = Array.prototype.slice;

        return function (start, end) {
            baidu.check("number(,number)?","baidu.dom.slice");

            // ie bug
            // return baidu.dom( this.toArray().slice(start, end) );
            return baidu.dom( slice.apply(this, arguments) );
        }
    }()
});



/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 在匹配的元素集合中的每个元素上添加或删除一个或多个className，如果存在就删除一个className，不存在就添加。
 * @function 
 * @name baidu.dom().toggleClass()
 * @grammar baidu.dom(args).toggleClass(className)
 * @param {String} className 要添加或者删除的className名（多个用空格间隔）
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类，取决于这个样式类是否存在或价值切换属性。
 即：如果存在就删除那个className；如果不存在就添加那个className。
 
 示例代码：
 //HTML片段
 <div id='test-div' class="class1 class3"></div>

 //单个className
 baidu('#test-div').toggleClass('class3').hasClass('class3'); //false
 
 //多个className
 baidu('#test-div').toggleClass('class1 class2').hasClass('class2'); //true

 */

/**
 * @description 在匹配的元素集合中的每个元素上添加或删除一个或多个className，如果存在就删除一个className，不存在就添加。
 * @function 
 * @name baidu.dom().toggleClass()
 * @grammar baidu.dom(args).toggleClass(className,switch)
 * @param {String} className 要添加或者删除的className名（多个用空格间隔）
 * @param {Boolean} switch 一个用来判断传入的className添加还是移除的 boolean 值。true则都添加，false则都删除。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example 
 在匹配的元素集合中的每个元素上添加或删除一个或多个样式类，取决于这个样式类是否存在或价值切换属性。
 .toggleClass()的第二个接口使用第二个参数判断样式类是否应该被添加或删除。
 
 如果这个参数的值是true，那么这个样式类将被添加;
 如果这个参数的值是false，那么这个样式类将被移除。
 本质上是这样的（伪代码）: 
 
 if(true){
   addClass(className) 
 }else{
   removeClass(className) 
 };
 
 示例代码：
 //HTML片段
 <div class="class1 class2 class3"></div>

 //清除className
 baidu('div').toggleClass('class2 class3',false);

 */
/**
 * @description 在匹配的元素集合中的每个元素上添加或删除一个或多个className，如果存在就删除一个className，不存在就添加。
 * @function 
 * @name baidu.dom().toggleClass()
 * @grammar baidu.dom(args).toggleClass(fn[,switch])
 * @param {Function} fn 用来返回在匹配的元素集合中的每个元素上用来切换的className的一个函数。接收元素的索引位置和元素旧的className作为参数。
 * @param {Boolean} switch 一个用来判断传入的className添加还是移除的 boolean 值。true则都添加，false则都删除。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 该接口为迭代器方法，可以获取每个匹配元素的className和index（索引值），并且将函数返回值设置为对应的className；
 通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。

 示例代码：
 //HTML片段
 <div id='test-div1'></div>
 <div id='test-div2'></div>

 //迭代器方法
 //通过使用一个函数来设置className，我们可以根据元素的className来计算值。
 //举个例子，我们可以把新的值与现有的值联系在一起，允许我们通过函数来传递改变新值。
 baidu('div').toggleClass(function(index,className){
    alert(index);
    alert(className);
    if(index==1){
       return "test-class"+index;
    }
 });

 */





baidu.dom.extend({
    toggleClass: function(value,status){
        var type = typeof value;
        var status = (typeof status === 'undefined')? status : Boolean(status);

        if(arguments.length <= 0 ){
            baidu.forEach(this,function(item){
                item.className = '';
            });
        };

        switch(typeof value){
            case 'string':

                //对输入进行处理
                value = value.replace(/^\s+/g,'').replace(/\s+$/g,'').replace(/\s+/g,' ');

                var arr = value.split(' ');
                baidu.forEach(this, function(item){
                    var str = item.className;
                    for(var i = 0;i<arr.length;i++){

                        //有这个className
                        if(((' '+str+' ').indexOf(' '+arr[i]+' ') > -1)&&(typeof status === 'undefined')){
                            str = (' '+str+' ').replace(' '+arr[i]+' ',' ');
                            
                        }else if(((' '+str+' ').indexOf(' '+arr[i]+' ') === -1)&&(typeof status === 'undefined')){
                            str += ' '+arr[i];

                        }else if(((' '+str+' ').indexOf(' '+arr[i]+' ') === -1)&&(status === true)){
                            str += ' '+arr[i];

                        }else if(((' '+str+' ').indexOf(' '+arr[i]+' ') > -1)&&(status === false)){
                            str = str.replace(arr[i],'');
                        };
                    };
                    item.className = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
                });
            break;
            case 'function':

                baidu.forEach(this, function(item, index){
                    baidu.dom(item).toggleClass(value.call(item, index, item.className),status);
                });

            break;
        };

        return this;
    }
});



/**
 * @author dron
 */






/**
 * @description 对指定的 TangramDom 集合派发指定的事件，并触发事件默认行为
 * @function 
 * @name baidu.dom().trigger()
 * @grammar baidu.dom(args).trigger(type[,data])
 * @param {String} type 事件类型
 * @param {Array} data 触发事件函数时携带的参数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    trigger: function(){

        var eb = baidu._util_.eventBase;

        var ie = /msie/i.test(navigator.userAgent);

        var keys = { keydown: 1, keyup: 1, keypress: 1 };
        var mouses = { click: 1, dblclick: 1, mousedown: 1, mousemove: 1, mouseup: 1, mouseover: 1, mouseout: 1, mouseenter: 1, mouseleave: 1, contextmenu: 1 };
        var htmls = { abort: 1, blur: 1, change: 1, error: 1, focus: 1, focusin: 1, focusout: 1, load: 1, unload: 1, reset: 1, resize: 1, scroll: 1, select: 1, submit: 1 };
        
        var bubblesEvents = { scroll : 1, resize : 1, reset : 1, submit : 1, change : 1, select : 1, error : 1, abort : 1 };

        var triggerEvents = { submit: 1 };

        var parameters = {
            "KeyEvents": ["bubbles", "cancelable", "view", "ctrlKey", "altKey", "shiftKey", "metaKey", "keyCode", "charCode"],
            "MouseEvents": ["bubbles", "cancelable", "view", "detail", "screenX", "screenY", "clientX", "clientY", "ctrlKey", "altKey", "shiftKey", "metaKey", "button", "relatedTarget"],
            "HTMLEvents": ["bubbles", "cancelable"],
            "UIEvents": ["bubbles", "cancelable", "view", "detail"],
            "Events": ["bubbles", "cancelable"]
        };

        baidu.extend( bubblesEvents, keys );
        baidu.extend( bubblesEvents, mouses );

        var upp = function( str ){
            return str.replace( /^\w/, function( s ){
                return s.toUpperCase();
            } );
        };

        var values = function(source) {
            var result = [], resultLen = 0, k;
            for (k in source) {
                if (source.hasOwnProperty(k)) {
                    result[resultLen++] = source[k];
                }
            }
            return result;
        };

        var parse = function(array, source) {
            var i = 0, size = array.length, obj = {};
            for (; i < size; i++) {
                obj[array[i]] = source[array[i]];
                delete source[array[i]];
            }
            return obj;
        };

        var eventsHelper = function(type, eventType, options) {
            options = baidu.extend({}, options);

            var param = values(parse(parameters[eventType], options)),
                evnt = document.createEvent(eventType);

            param.unshift(type);

            switch(eventType){
                case "KeyEvents":
                    evnt.initKeyEvent.apply(evnt, param);    
                    break;
                case "MouseEvents":
                    evnt.initMouseEvent.apply(evnt, param);
                    break;
                case "UIEvents":
                    evnt.initUIEvent.apply(evnt, param);
                    break;
                default:
                    evnt.initEvent.apply(evnt, param);    
                    break;
            }

            if(options.triggerData)
                evnt.triggerData = options.triggerData;

            baidu.extend(evnt, options);
            return evnt;
        };

        var eventObject = function(options){
            var evnt;
            if(document.createEventObject){
                evnt = document.createEventObject();
                baidu.extend(evnt, options);
            }
            return evnt;
        };

        var keyEvents = function( type, options ){
            options = parse( parameters["KeyEvents"], options );
            var evnt;
            if( document.createEvent ){
                try{
                    evnt = eventsHelper( type, "KeyEvents", options );
                }catch(e){
                    try{
                        evnt = eventsHelper( type, "Events", options );
                    }catch(e){
                        evnt = eventsHelper( type, "UIEvents", options );
                    }
                }
            }else{
                options.keyCode = options.charCode > 0 ? options.charCode : options.keyCode;
                evnt = eventObject( options );
            }
            return evnt;
        };

        var mouseEvents = function( type, options ){
            options = parse( parameters["MouseEvents"], options );
            var evnt;
            if( document.createEvent ){
                evnt = eventsHelper( type, "MouseEvents", options );
                if( options.relatedTarget && !evnt.relatedTarget ){
                    if("mouseout" == type.toLowerCase()){
                        evnt.toElement = options.relatedTarget;
                    }else if("mouseover" == type.toLowerCase()){
                        evnt.fromElement = options.relatedTarget;
                    }
                }
            }else{
                options.button = options.button == 0 ? 1 : options.button == 1 ? 4 : baidu.lang.isNumber(options.button) ? options.button : 0;
                evnt = eventObject(options);
            }
            return evnt;
        };

        var htmlEvents = function(type, options){
            options.bubbles = bubblesEvents.hasOwnProperty( type );
            options = parse( parameters["HTMLEvents"], options );
            
            var evnt;
            if(document.createEvent){
                try{
                    evnt = eventsHelper( type, "HTMLEvents", options );
                }catch(e){
                    try{
                        evnt = eventsHelper( type, "UIEvents", options );
                    }catch(e){
                        evnt = eventsHelper( type, "Events", options );
                    }
                }
            }else{
                evnt = eventObject(options);
            }

            return evnt;
        };

        var fire = function( element, type, triggerData ){
            var evnt;

            var evnt = {
                bubbles: true, cancelable: true,
                view: window,
                detail: 1,
                screenX: 0, screenY: 0,
                clientX: 0, clientY: 0,
                ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
                keyCode: 0, charCode: 0,
                button: 0,
                relatedTarget: null
            };

            if( keys[type] )
                evnt = keyEvents( type, evnt );
            else if( mouses[type] )
                evnt = mouseEvents( type, evnt );
            else if( htmls[type] )
                evnt = htmlEvents( type, evnt );
            else
                return baidu( element ).triggerHandler( type, triggerData );

            if( evnt ){
                if( triggerData )
                    evnt.triggerData = triggerData;

                var eventReturn;
                if( element.dispatchEvent )
                    eventReturn = element.dispatchEvent( evnt );
                else if( element.fireEvent )
                    eventReturn = element.fireEvent( "on" + type, evnt );

                if( eventReturn !== false && triggerEvents[type] )
                    try{
                        if( element[type] )
                            element[type]();
                        else if( type = upp( type ), element[type] )
                            element[type]();
                    }catch(e){
                    }
            }
        };

        return function( type, triggerData ){
            this.each(function(){
                fire( this, type, triggerData );
            });
            return this;
        }
    }()
});
/**
 * @author dron
 */



/**
 * @description 对当前 TangramDom 集合解除自定义事件监听
 * @function 
 * @name baidu.dom().unbind()
 * @grammar baidu.dom(args).unbind(type,fn)
 * @param {String} type 事件名称，如果是多个事件，可用空格或半角逗号隔开
 * @param {Function} fn 事件触发函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    unbind: function(type, fn){
        return this.off(type, fn);
    }
});
/**
 * @author dron
 */




/**
 * @description 卸载事件代理
 * @function 
 * @name baidu.dom().undelegate()
 * @grammar baidu.dom(args).undelegate(selector,type,fn)
 * @param {String} selector 选择器表达式
 * @param String type 事件名称，多个事件请用半角逗号或半空隔开
 * @param Function fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象 
 */

baidu.dom.extend({
    undelegate: function(selector, type, fn){
        return this.off(type, selector, fn);
    }
});



/**
 * @fileoverview
 * @author meizz
 * @create 2012-05-28
 * @modify
 */

/**
 * @description 去重
 *
 * @function
 * @name baidu.unique
 * @grammar baidu.dom(args).unique([fn])
 * @param   {Function}      fn(a, b)    [可选]
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象    new TangramDom
 */
baidu.dom.extend({
    unique : function (fn) {
        return baidu.dom(baidu.array(this.toArray()).unique(fn));
    }
});















/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isArray.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 * modify: 2012/6/29 mz
 */




/**
 * @description 判断目标参数是否Array对象
 * @name baidu.lang.isArray
 * @function
 * @grammar baidu.lang.isArray(source)
 * @param {Any} source 目标参数
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @return {boolean} 类型判断结果
 */
//baidu.lang.isArray = function (source) {
//    return '[object Array]' == Object.prototype.toString.call(source);
//};
baidu.lang.isArray = baidu.isArray;

/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/toArray.js
 * author: berg
 * version: 1.0
 * date: 2010-07-05
 */




/**
 * @description 将一个变量转换成array
 * @name baidu.lang.toArray
 * @function
 * @grammar baidu.lang.toArray(source)
 * @param {mix} source 需要转换成array的变量
 * @version 1.3
 * @meta standard
 * @return {array} 转换后的array
 */
baidu.lang.toArray = function (source) {
    if (source === null || source === undefined)
        return [];
    if (baidu.lang.isArray(source))
        return source;

    // The strings and functions also have 'length'
    if (typeof source.length !== 'number' || typeof source === 'string' || baidu.lang.isFunction(source)) {
        return [source];
    }

    //nodeList, IE 下调用 [].slice.call(nodeList) 会报错
    if (source.item) {
        var l = source.length, array = new Array(l);
        while (l--)
            array[l] = source[l];
        return array;
    }

    return [].slice.call(source);
};


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */


/**
 * @description 包装函数的返回值，使其在能按照index指定的方式返回。如果其值为-1，直接返回返回值；如果其值为0，返回"返回值"的包装结果；如果其值大于0，返回第i个位置的参数的包装结果（从1开始计数）
 * @function 
 * @name baidu.fn().wrapReturnValue()
 * @grammar baidu.fn(func).wrapReturnValue(wrapper, mode)
 * @param {function} wrapper 包装器
 * @param {Number} mode 包装第几个参数
 * @return {function} 包装后的函数
 */
baidu.fn.extend({
    wrapReturnValue: function(wrapper, mode){
        var func = this.fn;
        mode = mode | 0;
        return function(){
            var ret = func.apply(this, arguments);
            if(!mode){return new wrapper(ret);}
            if(mode > 0){
                return new wrapper(arguments[mode - 1]);
            }
            return ret;
        }
    }
});


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * author: berg
 */



/**
 * @description 对函数进行集化，使其在第一个参数为array时，结果也返回一个数组
 * @function 
 * @name baidu.fn().multize()
 * @grammar baidu.fn(func).multize([recursive[, joinArray]])
 * @param {Boolean} recursive 是否递归包装（如果数组里面一项仍然是数组，递归）
 * @param {Boolean} joinArray 可选，将操作的结果展平后返回（如果返回的结果是数组，则将多个数组合成一个）
 * @return {function} 返回已集化的函数
 */
baidu.fn.extend({
    multize: function(recursive, joinArray){
        var func = this.fn;
        function newFunc(){
            var list = arguments[0],
                fn = recursive ? newFunc : func,
                ret = [],
                moreArgs = Array.prototype.slice.call(arguments, 0),
                result;
            
            if(list instanceof Array){
                for(var i = 0, item; item = list[i]; i++){
                    moreArgs[0] = item;
                    result = fn.apply(this, moreArgs);
                    if(joinArray){
                        //TODO: 需要去重吗？
                        result && (ret = ret.concat(result));
                    }else{
                        ret.push(result);
                    }
                }
                return ret;
            }else{
                return func.apply(this, arguments);
            }
        }
        return newFunc;
    }
});








/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/values.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * @description 获取目标对象的值列表
 * @name baidu.object.values
 * @function
 * @grammar baidu.object.values(source)
 * @param {Object} source 目标对象
 * @see baidu.object.keys
 *             
 * @return {Array} 值列表
 */
baidu.object.values = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = source[k];
        }
    }
    return result;
};






















/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */


/**
 * @description 为对象绑定方法和作用域
 * @function 
 * @name baidu.fn().bind()
 * @grammar baidu.fn(func).bind([scope[, args]])
 * @param {Object} scope 执行运行时this，如果不传入则运行时this为函数本身
 * @param {Any} args 函数执行时附加到执行时函数前面的参数（支持一个或多个参数）
 * @return {function} 封装后的函数
 */
baidu.fn.extend({
    bind: function(scope){
        var func = this.fn,
            xargs = arguments.length > 1 ? Array.prototype.slice.call(arguments, 1) : null;
        return function(){
            var fn = baidu.type(func) === 'string' ? scope[func] : func,
                args = xargs ? xargs.concat(Array.prototype.slice.call(arguments, 0)) : arguments;
            return fn.apply(scope || fn, args);
        }
    }
});








/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */


/**
 * 提供各种公共的动画功能
 * @namespace baidu.fx
 */
baidu.fx = baidu.fx || {} ;

/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/inherits.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/24
 */



/**
 * @description 为类型构造器建立继承关系
 * @name baidu.lang.inherits
 * @function
 * @grammar baidu.lang.inherits(subClass, superClass[, type])
 * @param {Function} subClass 子类构造器
 * @param {Function} superClass 父类构造器
 * @param {string} type 类名标识
 * @remark
 * 
使subClass继承superClass的prototype，因此subClass的实例能够使用superClass的prototype中定义的所有属性和方法。<br>
这个函数实际上是建立了subClass和superClass的原型链集成，并对subClass进行了constructor修正。<br>
<strong>注意：如果要继承构造函数，需要在subClass里面call一下，具体见下面的demo例子</strong>
    
 * @shortcut inherits
 * @meta standard
 * @see baidu.lang.Class
 */
baidu.lang.inherits = function (subClass, superClass, type) {
    var key, proto, 
        selfProps = subClass.prototype, 
        clazz = new Function();
        
    clazz.prototype = superClass.prototype;
    proto = subClass.prototype = new clazz();

    for (key in selfProps) {
        proto[key] = selfProps[key];
    }
    subClass.prototype.constructor = subClass;
    subClass.superClass = superClass.prototype;

    // 类名标识，兼容Class的toString，基本没用
    typeof type == "string" && (proto.__type = type);

    subClass.extend = function(json) {
        for (var i in json) proto[i] = json[i];
        return subClass;
    }
    
    return subClass;
};

//  2011.11.22  meizz   为类添加了一个静态方法extend()，方便代码书写
/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.Timeline
 * @create: 2010-01-23
 * @version: 2010-07-13
 */







/**
 * 提供一个按时间进程的时间线类
 *
 * 本类提供两个方法：
 *  cancel()    取消操作
 *  end()       直接结束
 *
 * 使用本类时需要实现五个接口：
 *  initialize()            用于类初始化时的操作
 *  transition(percent)    重新计算时间线进度曲线
 *  finish()                用于类结束时时的操作
 *  render(schedule)        每个脉冲在DOM上的效果展现
 *  restore()               效果被取消时作的恢复操作
 *
 * @config {Number} interval 脉冲间隔时间（毫秒）
 * @config {Number} duration 时间线总时长（毫秒）
 * @config {Number} percent  时间线进度的百分比
 */
 
 
 
/**
 * 提供一个按时间进程的时间线类
 * @class
 * @grammar new baidu.fx.Timeline(options)
 * @param {Object} options 参数
 * @config {Number} interval 脉冲间隔时间（毫秒）
 * @config {Number} duration 时间线总时长（毫秒）
 * @config {Number} percent  时间线进度的百分比
 */
baidu.fx.Timeline = function(options){
    baidu.lang.Class.call(this);

    this.interval = 16;
    this.duration = 500;
    this.dynamic  = true;

    baidu.object.extend(this, options);
};
baidu.lang.inherits(baidu.fx.Timeline, baidu.lang.Class, "baidu.fx.Timeline").extend({
/**
 *  @lends baidu.fx.Timeline.prototype
 */
    /**
     * 启动时间线
     * @return {instance} 类实例
     */
    launch : function(){
        var me = this;
        me.dispatchEvent("onbeforestart");

        /**
        * initialize()接口，当时间线初始化同步进行的操作
        */
        typeof me.initialize =="function" && me.initialize();

        me["\x06btime"] = new Date().getTime();
        me["\x06etime"] = me["\x06btime"] + (me.dynamic ? me.duration : 0);
        me["\x06pulsed"]();

        return me;
    }

    /**
     * 每个时间脉冲所执行的程序
     * @ignore
     * @private
     */
    ,"\x06pulsed" : function(){
        var me = this;
        var now = new Date().getTime();
        // 当前时间线的进度百分比
        me.percent = (now - me["\x06btime"]) / me.duration;
        me.dispatchEvent("onbeforeupdate");

        // 时间线已经走到终点
        if (now >= me["\x06etime"]){
            typeof me.render == "function" && me.render(me.transition(me.percent = 1));

            // [interface run] finish()接口，时间线结束时对应的操作
            typeof me.finish == "function" && me.finish();

            me.dispatchEvent("onafterfinish");
            me.dispose();
            return;
        }

        /**
        * [interface run] render() 用来实现每个脉冲所要实现的效果
        * @param {Number} schedule 时间线的进度
        */
        typeof me.render == "function" && me.render(me.transition(me.percent));
        me.dispatchEvent("onafterupdate");

        me["\x06timer"] = setTimeout(function(){me["\x06pulsed"]()}, me.interval);
    }
    /**
     * 重新计算 schedule，以产生各种适合需求的进度曲线
     * @function
     * @param {Function} percent 
     */
    ,transition: function(percent) {
        return percent;
    }

    /**
     * 撤销当前时间线的操作，并引发 restore() 接口函数的操作
     * @function
     */
    ,cancel : function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];

        // [interface run] restore() 当时间线被撤销时的恢复操作
        typeof this.restore == "function" && this.restore();
        this.dispatchEvent("oncancel");

        this.dispose();
    }

    /**
     * 直接将时间线运行到结束点
     */
    ,end : function() {
        this["\x06timer"] && clearTimeout(this["\x06timer"]);
        this["\x06etime"] = this["\x06btime"];
        this["\x06pulsed"]();
    }
});
/// support magic - Tangram 1.x Code End
/// support magic - support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.create
 * @version: 2010-01-23
 */




/**
 * 效果基类。
 * @function
 * @grammar baidu.fx.collapse(element, options, fxName)
 * @param     {HTMLElement}           element            添加效果的DOM元素
 * @param     {JSON}                  options            时间线的配置参数对象
 * @config    {Function}              transition         function(schedule){return schedule;},时间线函数
 * @config    {Function}              onbeforestart      function(){},//效果开始前执行的回调函数
 * @config    {Function}              onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config    {Function}              onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config    {Function}              onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config    {Function}              oncancel           function(){},//效果被撤销时的回调函数
 * @param     {String}                fxName             效果名（可选）
 * @return {baidu.fx.Timeline}  时间线类的一个实例
 */
baidu.fx.create = function(element, options, fxName) {
    var timeline = new baidu.fx.Timeline(options);

    timeline.element = element;
    timeline.__type = fxName || timeline.__type;
    timeline["\x06original"] = {};   // 20100708
    var catt = "baidu_current_effect";

    /**
     * 将实例的guid记录到DOM元素上，以便多个效果叠加时的处理
     */
    timeline.addEventListener("onbeforestart", function(){
        var me = this, guid;
        me.attribName = "att_"+ me.__type.replace(/\W/g, "_");
        guid = me.element.getAttribute(catt);
        me.element.setAttribute(catt, (guid||"") +"|"+ me.guid +"|", 0);

        if (!me.overlapping) {
            (guid = me.element.getAttribute(me.attribName)) 
                && window[baidu.guid]._instances[guid].cancel();

            //在DOM元素上记录当前效果的guid
            me.element.setAttribute(me.attribName, me.guid, 0);
        }
    });

    /**
     * 打扫dom元素上的痕迹，删除元素自定义属性
     */
    timeline["\x06clean"] = function(e) {
        var me = this, guid;
        if (e = me.element) {
            e.removeAttribute(me.attribName);
            guid = e.getAttribute(catt);
            guid = guid.replace("|"+ me.guid +"|", "");
            if (!guid) e.removeAttribute(catt);
            else e.setAttribute(catt, guid, 0);
        }
    };

    /**
     * 在时间线结束时净化对DOM元素的污染
     */
    timeline.addEventListener("oncancel", function() {
        this["\x06clean"]();
        this["\x06restore"]();
    });

    /**
     * 在时间线结束时净化对DOM元素的污染
     */
    timeline.addEventListener("onafterfinish", function() {
        this["\x06clean"]();
        this.restoreAfterFinish && this["\x06restore"]();
    });

    /**
     * 保存原始的CSS属性值 20100708
     */
    timeline.protect = function(key) {
        this["\x06original"][key] = this.element.style[key];
    };

    /**
     * 时间线结束，恢复那些被改过的CSS属性值
     */
    timeline["\x06restore"] = function() {
        var o = this["\x06original"],
            s = this.element.style,
            v;
        for (var i in o) {
            v = o[i];
            if (typeof v == "undefined") continue;

            s[i] = v;    // 还原初始值

            // [TODO] 假如以下语句将来达不到要求时可以使用 cssText 操作
            if (!v && s.removeAttribute) s.removeAttribute(i);    // IE
            else if (!v && s.removeProperty) s.removeProperty(i); // !IE
        }
    };

    return timeline;
};


/**
 * fx 的所有 【属性、方法、接口、事件】 列表
 *
 * property【七个属性】                 默认值 
 *  element             {HTMLElement}           效果作用的DOM元素
 *  interval            {Number}        16      脉冲间隔时间（毫秒）
 *  duration            {Number}        500     时间线总时长（毫秒）
 *  percent             {Number}                时间线进度的百分比
 *  dynamic             {Boolean}       true    是否渐进式动画还是直接显示结果
 *  overlapping         {Boolean}       false   效果是否允许互相叠加
 *  restoreAfterFinish  {Boolean}       false   效果结束后是否打扫战场
 *
 * method【三个方法】
 *  end()       直接结束
 *  cancel()    取消操作
 *  protect()   保存元素原始的CSS属性值，以便自动 restore 操作
 *
 * event【四个事件】
 *  onbeforestart()
 *  onbeforeupdate()
 *  onafterupdate()
 *  onafterfinish()
 *
 * interface【五个接口】
 *  initialize()            用于类初始化时的操作
 *  transition(percent)     重新计算时间线进度曲线
 *  finish()                用于类结束时时的操作
 *  restore()               效果结束后的恢复操作
 *  render(schedule)        每个脉冲在DOM上的效果展现
 */

/// support magic - support magic - Tangram 1.x Code End


/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @create: 2010-07-16
 * @namespace: baidu.fx.current
 */





/**
 * 获取DOM元素正在运行的效果实例列表
 * @function
 * @grammar baidu.fx.current(element)
 * @param     {string|HTMLElement}     element     被查询的DOM元素或元素id
 * @see baidu.fx.current
 * @returns {Array} 效果对象
 */
baidu.fx.current = function(element) {
    if (!(element = baidu.dom.g(element))) return null;
    var a, guids, reg = /\|([^\|]+)\|/g;

    // 可以向<html>追溯
    do {if (guids = element.getAttribute("baidu_current_effect")) break;}
    while ((element = element.parentNode) && element.nodeType == 1);

    if (!guids) return null;

    if ((a = guids.match(reg))) {
        //fix
        //在firefox中使用g模式，会出现ture与false交替出现的问题
        reg = /\|([^\|]+)\|/;
        
        for (var i=0; i<a.length; i++) {
            reg.test(a[i]);
//            a[i] = window[baidu.guid]._instances[RegExp["\x241"]];
            a[i] = baidu.lang.instance(RegExp["\x241"]);
        }
    }
    return a;
};

/// support magic - Tangram 1.x Code End





/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */




/**
 * @description 将各种浏览器里的颜色值转换成#RRGGBB的格式
 * @function 
 * @name baidu.string().formatColor()
 * @grammar baidu.string(str).formatColor()
 * @return {String} #RRGGBB格式的字符串或空
 */

/**
 * @description 将各种浏览器里的颜色值转换成#RRGGBB的格式
 * @function 
 * @name baidu.string.formatColor
 * @grammar baidu.string.formatColor(color)
 * @param {String} color 浏览器中的颜色值字符串
 * @return {String} #RRGGBB格式的字符串或空
 */



baidu.string.extend({
    formatColor: function(){
        // 将正则表达式预创建，可提高效率
        var reg1 = /^\#[\da-f]{6}$/i,
            reg2 = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/i,
            keyword = {
                black: '#000000',
                silver: '#c0c0c0',
                gray: '#808080',
                white: '#ffffff',
                maroon: '#800000',
                red: '#ff0000',
                purple: '#800080',
                fuchsia: '#ff00ff',
                green: '#008000',
                lime: '#00ff00',
                olive: '#808000',
                yellow: '#ffff0',
                navy: '#000080',
                blue: '#0000ff',
                teal: '#008080',
                aqua: '#00ffff'
            };
            
        return function(){
            var color = this.valueOf();
            if(reg1.test(color)) {
                // #RRGGBB 直接返回
                return color;
            } else if(reg2.test(color)) {
                // 非IE中的 rgb(0, 0, 0)
                for (var s, i=1, color="#"; i<4; i++) {
                    s = parseInt(RegExp["\x24"+ i]).toString(16);
                    color += ("00"+ s).substr(s.length);
                }
                return color;
            } else if(/^\#[\da-f]{3}$/.test(color)) {
                // 简写的颜色值: #F00
                var s1 = color.charAt(1),
                    s2 = color.charAt(2),
                    s3 = color.charAt(3);
                return "#"+ s1 + s1 + s2 + s2 + s3 + s3;
            }else if(keyword[color])
                return keyword[color];
            
            return '';
        }
    }()
});


/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.move
 * @version: 2010-06-04
 */







 
/**
 * 移动元素，将参数元素移动到指定位置。注意：对static定位的DOM元素无效。
 * @function
 * @grammar baidu.fx.move(element, options)
 * @param       {string|HTMLElement}      element           元素或者元素的ID
 * @param       {Object}                  options           选项。参数的详细说明如下表所示
 * @config      {Number}                  x                 0,//横坐标移动的偏移量，默认值为0px。
 * @config      {Number}                  y                 0,//纵坐标移动的偏移量，默认值为0px。
 * @config      {Number}                  duration          500,//效果持续时间，默认值为500ms。
 * @config      {Number}                  interval          16, //动画帧间隔时间，默认值为16ms。
 * @config      {Function}                transition        function(schedule){return schedule;},时间线函数
 * @config      {Function}                onbeforestart     function(){},//效果开始前执行的回调函数
 * @config      {Function}                onbeforeupdate    function(){},//每次刷新画面之前会调用的回调函数
 * @config      {Function}                onafterupdate     function(){},//每次刷新画面之后会调用的回调函数
 * @config      {Function}                onafterfinish     function(){},//效果结束后会执行的回调函数
 * @config      {Function}                oncancel          function(){},//效果被撤销时的回调函数
 * @remark
 * 1.0.0开始支持
 */
baidu.fx.move = function(element, options) {
    if (!(element = baidu.dom.g(element))
        || baidu.dom.getStyle(element, "position") == "static") return null;
    
    options = baidu.object.extend({x:0, y:0}, options || {});
    if (options.x == 0 && options.y == 0) return null;

    var fx = baidu.fx.create(element, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {
            this.protect("top");
            this.protect("left");

            this.originX = parseInt(baidu.dom.getStyle(element, "left"))|| 0;
            this.originY = parseInt(baidu.dom.getStyle(element, "top")) || 0;
        }

        //[Implement Interface] transition
        ,transition : function(percent) {return 1 - Math.pow(1 - percent, 2);}

        //[Implement Interface] render
        ,render : function(schedule) {
            element.style.top  = (this.y * schedule + this.originY) +"px";
            element.style.left = (this.x * schedule + this.originX) +"px";
        }
    }, options), "baidu.fx.move");

    return fx.launch();
};

/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.fx.moveTo
 * @version: 2010-06-07
 */






 
/**
 * 移动渐变效果，该效果使元素移动到指定的位置。注意：对static定位的DOM元素无效。
 * @function
 * @grammar baidu.fx.moveTo(element, point, options)
 * @param       {string|HTMLElement}      element               元素或者元素的ID
 * @param       {Array|Object}            point                 目标点坐标。若为数组，索引0为x方向，索引1为y方向；若为Object，键x为x方向，键y为y方向；单位：px，默认值：元素本来的坐标。
 * @param       {Object}                  options               选项。参数的详细说明如下表所示
 * @config      {Number}                  duration              500,//效果持续时间，默认值为500ms。
 * @config      {Number}                  interval              16, //动画帧间隔时间，默认值为16ms。
 * @config      {Function}                transition            function(schedule){return schedule;},时间线函数
 * @config      {Function}                onbeforestart         function(){},//效果开始前执行的回调函数
 * @config      {Function}                onbeforeupdate        function(){},//每次刷新画面之前会调用的回调函数
 * @config      {Function}                onafterupdate         function(){},//每次刷新画面之后会调用的回调函数
 * @config      {Function}                onafterfinish         function(){},//效果结束后会执行的回调函数
 * @config      {Function}                oncancel              function(){},//效果被撤销时的回调函数
 * @remark
 * 1.0.0开始支持
 * @see baidu.fx.moveTo
 */
baidu.fx.moveTo = function(element, point, options) {
    if (!(element = baidu.dom.g(element))
        || baidu.dom.getStyle(element, "position") == "static"
        || typeof point != "object") return null;

    var p = [point[0] || point.x || 0,point[1] || point.y || 0];
    var x = parseInt(baidu.dom.getStyle(element, "left")) || 0;
    var y = parseInt(baidu.dom.getStyle(element, "top"))  || 0;

    var fx = baidu.fx.move(element, baidu.object.extend({x: p[0]-x, y: p[1]-y}, options||{}));

    return fx;
};

/// support magic - Tangram 1.x Code End





/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @create: 2010-07-14
 * @namespace: baidu.fx.scrollBy
 * @version: 2010-07-14
 */





 
/**
 * 按指定量移动滚动条。
 * @function
 * @grammar baidu.fx.scrollBy(element, distance, options)
 * @param       {string|HTMLElement}      element               元素或者元素的ID
 * @param       {Array|JSON}              distance              移动的距离 [,] | {x,y}，支持数组与JSON格式
 * @param       {Object}                  options               选项。参数的详细说明如下表所示
 * @config      {Number}                  duration              500,//效果持续时间，默认值为500ms。
 * @config      {Number}                  interval              16, //动画帧间隔时间，默认值为16ms。
 * @config      {Function}                transition            function(schedule){return schedule;},时间线函数
 * @config      {Function}                onbeforestart         function(){},//效果开始前执行的回调函数
 * @config      {Function}                onbeforeupdate        function(){},//每次刷新画面之前会调用的回调函数
 * @config      {Function}                onafterupdate         function(){},//每次刷新画面之后会调用的回调函数
 * @config      {Function}                onafterfinish         function(){},//效果结束后会执行的回调函数
 * @config      {Function}                oncancel              function(){},//效果被撤销时的回调函数
 */
baidu.fx.scrollBy = function(element, distance, options) {
    if (!(element = baidu.dom.g(element)) || typeof distance != "object") return null;
    
    var d = {}, mm = {};
    d.x = distance[0] || distance.x || 0;
    d.y = distance[1] || distance.y || 0;

    var fx = baidu.fx.create(element, baidu.object.extend({
        //[Implement Interface] initialize
        initialize : function() {
            var t = mm.sTop   = element.scrollTop;
            var l = mm.sLeft  = element.scrollLeft;

            mm.sx = Math.min(element.scrollWidth - element.clientWidth - l, d.x);
            mm.sy = Math.min(element.scrollHeight- element.clientHeight- t, d.y);
        }

        //[Implement Interface] transition
        ,transition : function(percent) {return 1 - Math.pow(1 - percent, 2);}

        //[Implement Interface] render
        ,render : function(schedule) {
            element.scrollTop  = (mm.sy * schedule + mm.sTop);
            element.scrollLeft = (mm.sx * schedule + mm.sLeft);
        }

        ,restore : function(){
            element.scrollTop   = mm.sTop;
            element.scrollLeft  = mm.sLeft;
        }
    }, options), "baidu.fx.scroll");

    return fx.launch();
};

/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @create: 2010-07-14
 * @namespace: baidu.fx.scrollTo
 * @version: 2010-07-14
 */




 
/**
 * 滚动条滚动到指定位置。
 * @function
 * @grammar baidu.fx.scrollTo(element, point, options)
 * @param     {string|HTMLElement}    element            元素或者元素的ID
 * @param     {Array|JSON}            point              移动的距离 [,] | {x,y}，支持数组与JSON格式
 * @param     {Object}                options            选项。参数的详细说明如下表所示
 * @config    {Number}                duration           500,//效果持续时间，默认值为500ms。
 * @config    {Number}                interval           16, //动画帧间隔时间，默认值为16ms。
 * @config    {Function}              transition         function(schedule){return schedule;},时间线函数
 * @config    {Function}              onbeforestart      function(){},//效果开始前执行的回调函数
 * @config    {Function}              onbeforeupdate     function(){},//每次刷新画面之前会调用的回调函数
 * @config    {Function}              onafterupdate      function(){},//每次刷新画面之后会调用的回调函数
 * @config    {Function}              onafterfinish      function(){},//效果结束后会执行的回调函数
 * @config    {Function}              oncancel           function(){},//效果被撤销时的回调函数
 */
baidu.fx.scrollTo = function(element, point, options) {
    if (!(element = baidu.dom.g(element)) || typeof point != "object") return null;
    
    var d = {};
    d.x = (point[0] || point.x || 0) - element.scrollLeft;
    d.y = (point[1] || point.y || 0) - element.scrollTop;

    return baidu.fx.scrollBy(element, d, options);
};

/// support magic - Tangram 1.x Code End




baidu._util_.smartAjax = baidu._util_.smartAjax || function(method){
    return function(url, data, callback, type){
        if(baidu.type(data) === 'function'){
            type = type || callback;
            callback = data;
            data = undefined;
        }
        baidu.ajax({
            type: method,
            url: url,
            data: data,
            success: callback,
            dataType: type
        });
    };
}

/**
 * @description 通过服务器HTTP GET请求加载数据
 * @function 
 * @name baidu.get()
 * @grammar baidu.get(url[, data], [successtion], [dataType])
 * @param {String} url 一个包含发送请求的URL字符串
 * @param {String|Object} data 向服务器发送请求的Key/value参数
 * @param {function} success 当请求成功后执行的回调函数，函数接收三个参数data, textStatus, tangramAjax
 * @param {String} dataType 从服务器返回的预期的数据类型。默认：智能猜测（xml, json, script, or html）
 * @return {tangramAjax} 一个tangramAjax对象
 */
baidu.get = baidu.get || baidu._util_.smartAjax('get');

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * version: 1.4.0
 * date: 2011/07/05
 */



/**
 * @namespace baidu.global.get 取得global全局对象里存储的信息。
 * @author meizz
 *
 * @param   {string}    key     信息对应的 key 值
 * @return  {object}            信息
 */
baidu.global.get = function(key){
    return baidu.global(key);
}
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * version: 1.4.0
 * date: 2011/07/05
 */



/**
 * @namespace baidu.global.set 向global全局对象里存储信息。
 * @author meizz
 *
 * @param   {string}    key         信息对应的 key 值
 * @param   {object}    value       被存储的信息
 * @param   {boolean}   protected_  保护原值不被覆盖，默认值 false 可覆盖
 * @return  {object}                信息
 */
baidu.global.set = function(key, value, overwrite){
    return baidu.global(key, value, !overwrite);
}
/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2011 Baidu Inc. All rights reserved.
 * 
 * author: meizz
 * version: 2.0
 * date: 2011.12.22
 */





/**
 * @namespace baidu.global.getZIndex 全局统一管理 z-index。
 *
 * @param   {String}    key     信息对应的 key 值(popup | dialog)
 * @param   {Number}    step     z-index 增长的步长
 * @return  {Number}            z-index
 */
baidu.global.getZIndex = function(key, step) {
    var zi = baidu.global.get("zIndex");
    if (key) {
        zi[key] = zi[key] + (step || 1);
    }
    return zi[key];
};
baidu.global.set("zIndex", {popup : 50000, dialog : 1000}, true);
/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */

/**
 * 提供国际的一些接口
 * @namespace baidu.i18n
 */
baidu.i18n = baidu.i18n || {};
/// support magic - Tangram 1.x Code End
/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */

baidu.i18n.cultures = baidu.i18n.cultures || {};
/// support magic - Tangram 1.x Code End


/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



baidu.i18n.cultures['zh-CN'] = baidu.object.extend(baidu.i18n.cultures['zh-CN'] || {}, {
    calendar: {
        dateFormat: 'yyyy-MM-dd',
        titleNames: '#{yyyy}年&nbsp;#{MM}月',
        monthNames: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        monthNamesShort: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        dayNames: {mon: '一', tue: '二', wed: '三', thu: '四', fri: '五', sat: '六', sun: '日'}
    },
    
    timeZone: 8,
    whitespace: new RegExp("(^[\\s\\t\\xa0\\u3000]+)|([\\u3000\\xa0\\s\\t]+\x24)", "g"),
    
    number: {
        group: ",",
        groupLength: 3,
        decimal: ".",
        positive: "",
        negative: "-",

        _format: function(number, isNegative){
            return baidu.i18n.number._format(number, {
                group: this.group,
                groupLength: this.groupLength,
                decimal: this.decimal,
                symbol: isNegative ? this.negative : this.positive 
            });
        }
    },

    currency: {
        symbol: '￥'  
    },

    language: {
        ok: '确定',
        cancel: '取消',
        signin: '注册',
        signup: '登录'
    }
});

baidu.i18n.currentLocale = 'zh-CN';
/// support magic - Tangram 1.x Code End


/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */


/**
 * date
 * @name baidu.i18n.date
 * @Object
 * @grammar baidu.i18n.date
 */
baidu.i18n.date = baidu.i18n.date || /**@lends baidu.i18n.date.prototype*/{

    /**
     * 获取某年某个月的天数
     * @grammar baidu.i18n.date.getDaysInMonth(year, month)
     * @param {Number} year 年份.
     * @param {Number} month 月份.
     * @return {Number}
     */
    getDaysInMonth: function(year, month) {
        var days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        if (month == 1 && baidu.i18n.date.isLeapYear(year)) {
            return 29;
        }
        return days[month];
    },

    /**
     * 判断传入年份是否时润年
     * @grammar baidu.i18n.date.isLeapYear(year)
     * @param {Number} year 年份.
     * @return {Boolean}
     */
    isLeapYear: function(year) {
        return !(year % 400) || (!(year % 4) && !!(year % 100));
    },

    /**
     * 将传入的date对象转换成指定地区的date对象
     * @grammar baidu.i18n.date.toLocaleDate(dateObject, sLocale, tLocale)
     * @param {Date} dateObject
     * @param {String} sLocale dateObject 的地区标识，可选参数，不传则以dateObject中获取的为准
     * @param {String} tLocale 地区名称简写字符.
     * @return {Date}
     */
    toLocaleDate: function(dateObject, sLocale, tLocale) {
        return this._basicDate(dateObject, sLocale, tLocale || baidu.i18n.currentLocale);
    },

    /**
     * 本地日历和格力高利公历相互转换的基础函数
     * @private
     * @param {Date} dateObject 需要转换的日期函数.
     * @param {String} sLocale dateObject 的地区标识，可选参数，否则以dateObject中获取的为准
     * @param {String} tlocale 传入date的地区名称简写字符，不传入则从date中计算得出.
     */
    _basicDate: function(dateObject, sLocale, tLocale) {
        var tTimeZone = baidu.i18n.cultures[tLocale || baidu.i18n.currentLocale].timeZone,
            tTimeOffset = tTimeZone * 60,
            sTimeZone,sTimeOffset,
            millisecond = dateObject.getTime();

        if(sLocale){
            sTimeZone = baidu.i18n.cultures[sLocale].timeZone;
            sTimeOffset = sTimeZone * 60;
        }else{
            sTimeOffset = -1 * dateObject.getTimezoneOffset();
            sTimeZone = sTimeOffset / 60;
        }

        return new Date(sTimeZone != tTimeZone ? (millisecond  + (tTimeOffset - sTimeOffset) * 60000) : millisecond);
    },

    /*
     * @格式化日期显示
     * @param {Date} dateObject  日期对象(必须)
     * @param {String} tLocale 给定目标locale(可选)
     * @return {String}  格式化后的日期字符串
     */
    format: function(dateObject, tLocale) {
        // 拿到对应locale的format类型配置
        var c = baidu.i18n.cultrues[tLocale || baidu.i18n.currentLocale];
        return baidu.date.format(
            baidu.i18n.date.toLocaleDate(dateObject, "", tLocale),
            c.calendar.dateFormat);
    }
};
/// support magic -  Tangram 1.x Code End



/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/json/stringify.js
 * author: erik
 * version: 1.1.0
 * date: 2010/01/11
 */




/**
 * @description 将json对象序列化
 * @name baidu.json.stringify
 * @function
 * @grammar baidu.json.stringify(value)
 * @param {JSON} value 需要序列化的json对象
 * @remark
 * 该方法的实现与ecma-262第五版中规定的JSON.stringify不同，暂时只支持传入一个参数。后续会进行功能丰富。
 * @meta standard
 * @see baidu.json.parse,baidu.json.encode
 *             
 * @return {string} 序列化后的字符串
 */
baidu.json.stringify = (function () {
    /*
     * 字符串处理时需要转义的字符表
     * @private
     */
    var escapeMap = {
        "\b": '\\b',
        "\t": '\\t',
        "\n": '\\n',
        "\f": '\\f',
        "\r": '\\r',
        '"' : '\\"',
        "\\": '\\\\'
    };
    
    /*
     * 字符串序列化
     * @private
     */
    function encodeString(source) {
        if (/["\\\x00-\x1f]/.test(source)) {
            source = source.replace(
                /["\\\x00-\x1f]/g, 
                function (match) {
                    var c = escapeMap[match];
                    if (c) {
                        return c;
                    }
                    c = match.charCodeAt();
                    return "\\u00" 
                            + Math.floor(c / 16).toString(16) 
                            + (c % 16).toString(16);
                });
        }
        return '"' + source + '"';
    }
    
    /*
     * 数组序列化
     * @private
     */
    function encodeArray(source) {
        var result = ["["], 
            l = source.length,
            preComma, i, item;
            
        for (i = 0; i < l; i++) {
            item = source[i];
            
            switch (typeof item) {
            case "undefined":
            case "function":
            case "unknown":
                break;
            default:
                if(preComma) {
                    result.push(',');
                }
                result.push(baidu.json.stringify(item));
                preComma = 1;
            }
        }
        result.push("]");
        return result.join("");
    }
    
    /*
     * 处理日期序列化时的补零
     * @private
     */
    function pad(source) {
        return source < 10 ? '0' + source : source;
    }
    
    /*
     * 日期序列化
     * @private
     */
    function encodeDate(source){
        return '"' + source.getFullYear() + "-" 
                + pad(source.getMonth() + 1) + "-" 
                + pad(source.getDate()) + "T" 
                + pad(source.getHours()) + ":" 
                + pad(source.getMinutes()) + ":" 
                + pad(source.getSeconds()) + '"';
    }
    
    return function (value) {
        switch (typeof value) {
        case 'undefined':
            return 'undefined';
            
        case 'number':
            return isFinite(value) ? String(value) : "null";
            
        case 'string':
            return encodeString(value);
            
        case 'boolean':
            return String(value);
            
        default:
            if (value === null) {
                return 'null';
            } else if (baidu.type(value) === 'array') {
                return encodeArray(value);
            } else if (baidu.type(value) === 'date') {
                return encodeDate(value);
            } else {
                var result = ['{'],
                    encode = baidu.json.stringify,
                    preComma,
                    item;
                    
                for (var key in value) {
                    if (Object.prototype.hasOwnProperty.call(value, key)) {
                        item = value[key];
                        switch (typeof item) {
                        case 'undefined':
                        case 'unknown':
                        case 'function':
                            break;
                        default:
                            if (preComma) {
                                result.push(',');
                            }
                            preComma = 1;
                            result.push(encode(key) + ':' + encode(item));
                        }
                    }
                }
                result.push('}');
                return result.join('');
            }
        }
    };
})();




/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2010 Baidu Inc. All rights reserved.
 * 
 * @author: meizz
 * @namespace: baidu.lang.createClass
 * @version: 1.6.0
 * @modify: 2011.11.24 meizz
 */





/**
 * @description 创建一个类，包括创造类的构造器、继承基类Class
 * @name baidu.lang.createClass
 * @function
 * @grammar baidu.lang.createClass(constructor[, options])
 * @param {Function} constructor 类的构造器函数
 * @param {Object} [options] 
                
 * @param {string} [type] 类名
 * @param {Function} [superClass] 父类，默认为baidu.lang.Class
 * @version 1.2
 * @remark
 * 
            使用createClass能方便的创建一个带有继承关系的类。同时会为返回的类对象添加extend方法，使用obj.extend({});可以方便的扩展原型链上的方法和属性
        
 * @see baidu.lang.Class,baidu.lang.inherits
 *             
 * @return {Object} 一个类对象
 */

baidu.lang.createClass = /**@function*/function(constructor, options) {
    options = options || {};
    var superClass = options.superClass || baidu.lang.Class;

    // 创建新类的真构造器函数
    var fn = function(){
        var me = this;

        // 20101030 某类在添加该属性控制时，guid将不在全局instances里控制
        options.decontrolled && (me.__decontrolled = true);

        // 继承父类的构造器
        superClass.apply(me, arguments);

        // 全局配置
        for (i in fn.options) me[i] = fn.options[i];

        constructor.apply(me, arguments);

        for (var i=0, reg=fn["\x06r"]; reg && i<reg.length; i++) {
            reg[i].apply(me, arguments);
        }
    };

    // [TODO delete 2013] 放置全局配置，这个全局配置可以直接写到类里面
    fn.options = options.options || {};

    var C = function(){},
        cp = constructor.prototype;
    C.prototype = superClass.prototype;

    // 继承父类的原型（prototype)链
    var fp = fn.prototype = new C();

    // 继承传参进来的构造器的 prototype 不会丢
    for (var i in cp) fp[i] = cp[i];

    // 20111122 原className参数改名为type
    var type = options.className || options.type;
    typeof type == "string" && (fp.__type = type);

    // 修正这种继承方式带来的 constructor 混乱的问题
    fp.constructor = cp.constructor;

    // 给类扩展出一个静态方法，以代替 baidu.object.extend()
    fn.extend = function(json){
        for (var i in json) {
            fn.prototype[i] = json[i];
        }
        return fn;  // 这个静态方法也返回类对象本身
    };

    return fn;
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上

/// support magic - Tangram 1.x Code End





/// support maigc - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isDate.js
 * author: berg
 * version: 1.0.0
 * date: 2010/10/12 
 * modify: 2012/6/29 mz
 */




/**
 * @description 判断目标参数是否为Date对象
 * @name baidu.lang.isDate
 * @function
 * @grammar baidu.lang.isDate(source)
 * @param {Any} source 目标参数
 * @version 1.3
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isBoolean,baidu.lang.isElement
 *             
 * @return {boolean} 类型判断结果
 */
//baidu.lang.isDate = function(o) {
//    // return o instanceof Date;
//    return {}.toString.call(o) === "[object Date]" && o.toString() !== 'Invalid Date' && !isNaN(o);
//};

baidu.lang.isDate = baidu.isDate;
/// support maigc Tangram 1.x Code End
/// support maigc - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isElement.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 * modify: 2012/6/29 mz
 */




/**
 * @description 判断目标参数是否为Element对象
 * @name baidu.lang.isElement
 * @function
 * @grammar baidu.lang.isElement(source)
 * @param {Any} source 目标参数
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isObject,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @return {boolean} 类型判断结果
 */
//baidu.lang.isElement = function (source) {
//    return !!(source && source.nodeName && source.nodeType == 1);
//};
baidu.lang.isElement = baidu.isElement;
/// support maigc - Tangram 1.x Code End
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/isObject.js
 * author: erik
 * version: 1.1.0
 * date: 2009/12/30
 * modify: 2012/6/29 mz
 */




/**
 * @description 判断目标参数是否为Object对象
 * @name baidu.lang.isObject
 * @function
 * @grammar baidu.lang.isObject(source)
 * @param {Any} source 目标参数
 * @shortcut isObject
 * @meta standard
 * @see baidu.lang.isString,baidu.lang.isNumber,baidu.lang.isArray,baidu.lang.isElement,baidu.lang.isBoolean,baidu.lang.isDate
 *             
 * @return {boolean} 类型判断结果
 */
//baidu.lang.isObject = function (source) {
//    return 'function' == typeof source || !!(source && 'object' == typeof source);
//};
baidu.lang.isObject = baidu.isObject;



/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2011 Baidu Inc. All rights reserved.
 * 
 * path: baidu/lang/register.js
 * author: meizz, dron
 * version: 1.6.0
 * date: 2011/11/29
 */



/**
 * @description 向某个类注册插件
 * @name baidu.lang.register
 * @function
 * @grammar baidu.lang.register(Class, constructorHook, methods)
 * @param   {Class}     Class           接受注册的载体 类
 * @param   {Function}  constructorHook 运行在载体类构造器里钩子函数
 * @param    {Object}  methods   挂载到载体类原型链上的方法集，可选
 * @meta standard
 *             
 */
baidu.lang.register = function (Class, constructorHook, methods) {
    var reg = Class["\x06r"] || (Class["\x06r"] = []);
    reg[reg.length] = constructorHook;

    for (var method in methods) {
        Class.prototype[method] = methods[method];
    }
};

// 20111221 meizz   修改插件函数的存放地，重新放回类构造器静态属性上
// 20111129    meizz    添加第三个参数，可以直接挂载方法到目标类原型链上
/// support magic - Tangram 1.x Code End

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 为目标数字添加逗号分隔
 * @function 
 * @name baidu.number().comma()
 * @grammar baidu.number(num).comma([len])
 * @param {Number} len 两次逗号之间的数字位数，默认为3位
 * @return {String} 添加逗号分隔后的字符串
 */

/**
 * @description 为目标数字添加逗号分隔
 * @function 
 * @name baidu.number.comma
 * @grammar baidu.number.comma(num[, len])
 * @param {Number} num 需要处理的数字
 * @param {Number} len 两次逗号之间的数字位数，默认为3位
 * @return {String} 添加逗号分隔后的字符串
 */

baidu.number.extend({
    comma : function (length) {
        var source = this;
        if (!length || length < 1) {
            length = 3;
        }
    
        source = String(source).split(".");
        source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
        return source.join(".");
    }    
});

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 生成随机整数，范围是[min, max]
 * @function 
 * @name baidu.number.randomInt
 * @grammar baidu.number.randomInt(min, max)
 * @param {Number} min 随机整数的最小值
 * @param {Number} max 随机整数的最大值
 * @return {Number} 生成的随机整数
 */

baidu.number.randomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */





/**
 * @description 对一个object进行深度拷贝
 * @author berg
 * @name baidu.object.clone
 * @function
 * @grammar baidu.object.clone(source)
 * @param {Object} source 需要进行拷贝的对象
 * @remark
 * 对于Object来说，只拷贝自身成员，不拷贝prototype成员
 * @meta standard
 *             
 * @return {Object} 拷贝后的新对象
 */
baidu.object.clone  = function (source) {
    var result = source, i, len;
    if (!source
        || source instanceof Number
        || source instanceof String
        || source instanceof Boolean) {
        return result;
    } else if (baidu.lang.isArray(source)) {
        result = [];
        var resultLen = 0;
        for (i = 0, len = source.length; i < len; i++) {
            result[resultLen++] = baidu.object.clone(source[i]);
        }
    } else if (baidu.object.isPlain(source)) {
        result = {};
        for (i in source) {
            if (source.hasOwnProperty(i)) {
                result[i] = baidu.object.clone(source[i]);
            }
        }
    }
    return result;
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/keys.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/15
 */



/**
 * @description 获取目标对象的键名列表
 * @name baidu.object.keys
 * @function
 * @grammar baidu.object.keys(source)
 * @param {Object} source 目标对象
 * @see baidu.object.values
 *             
 * @return {Array} 键名列表
 */
baidu.object.keys = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = k;
        }
    }
    return result;
};


/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/object/map.js
 * author: berg
 * version: 1.1.0
 * date: 2010/12/14
 */



/**
 * @description 遍历object中所有元素，将每一个元素应用方法进行转换，返回转换后的新object。
 * @name baidu.object.map
 * @function
 * @grammar baidu.object.map(source, iterator)
 * 
 * @param     {Array}    source   需要遍历的object
 * @param     {Function} iterator 对每个object元素进行处理的函数
 * @return     {Array}             map后的object
 */
baidu.object.map = function (source, iterator) {
    var results = {};
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            results[key] = iterator(source[key], key);
        }
    }
    return results;
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */





/*
 * 默认情况下，所有在源对象上的属性都会被非递归地合并到目标对象上
 * 并且如果目标对象上已有此属性，不会被覆盖
 */
/**
 * @description 合并源对象的属性到目标对象。
 * @name baidu.object.merge
 * @function
 * @grammar baidu.object.merge(target, source[, opt_options])
 * @param {Function} target 目标对象.
 * @param {Function} source 源对象.
 * @param {Object} opt_options  optional merge选项.
 * @param {boolean} opt_options.overwrite   optional 如果为真，源对象属性会覆盖掉目标对象上的已有属性，默认为假.
 * @param {string[]} opt_options.whiteList   optional 白名单，默认为空，如果存在，只有在这里的属性才会被处理.
 * @param {boolean} opt_options.recursive    optional 是否递归合并对象里面的object，默认为否.
 * @return {object} merge后的object.
 * @see baidu.object.extend
 * @author berg
 */
(function() {
var isPlainObject = function(source) {
        return baidu.lang.isObject(source) && !baidu.lang.isFunction(source);
    };

function mergeItem(target, source, index, overwrite, recursive) {
    if (source.hasOwnProperty(index)) {
        if (recursive && isPlainObject(target[index])) {
            // 如果需要递归覆盖，就递归调用merge
            baidu.object.merge(
                target[index],
                source[index],
                {
                    'overwrite': overwrite,
                    'recursive': recursive
                }
            );
        } else if (overwrite || !(index in target)) {
            // 否则只处理overwrite为true，或者在目标对象中没有此属性的情况
            target[index] = source[index];
        }
    }
}

baidu.object.merge = function(target, source, opt_options) {
    var i = 0,
        options = opt_options || {},
        overwrite = options['overwrite'],
        whiteList = options['whiteList'],
        recursive = options['recursive'],
        len;

    // 只处理在白名单中的属性
    if (whiteList && whiteList.length) {
        len = whiteList.length;
        for (; i < len; ++i) {
            mergeItem(target, source, whiteList[i], overwrite, recursive);
        }
    } else {
        for (i in source) {
            mergeItem(target, source, i, overwrite, recursive);
        }
    }

    return target;
};
})();



/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getHeight.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/03
 */



/**
 * @description 获取页面高度
 * @name baidu.page.getHeight
 * @function
 * @grammar baidu.page.getHeight()
 * @see baidu.page.getWidth
 *             
 * @return {number} 页面高度
 */
baidu.page.getHeight = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
};
/// support magic - Tangram 1.x Code End

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
    var de = document.documentElement.clientHeight,
        db = document.body.clientHeight;
    return Math.min(de||db, db);
};
/// support magic - Tangram 1.x Code End

/// support magic - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getViewWidth.js
 * author: allstar
 * version: 1.1.0
 * date: 2009/11/20
 */



/**
 * @description 获取页面视觉区域宽度
 * @name baidu.page.getViewWidth
 * @function
 * @grammar baidu.page.getViewWidth()
 * @see baidu.page.getViewHeight
 *             
 * @return {number} 页面视觉区域宽度
 */
baidu.page.getViewWidth = function () {
    var doc = document,
        client = doc.compatMode == 'BackCompat' ? doc.body : doc.documentElement;

    return client.clientWidth;
};
/// support magic - Tangram 1.x Code End
/// support maigc - Tangram 1.x Code Start
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/page/getWidth.js
 * author: allstar, erik
 * version: 1.1.0
 * date: 2009/12/03
 */



/**
 * @description 获取页面宽度
 * @name baidu.page.getWidth
 * @function
 * @grammar baidu.page.getWidth()
 * @see baidu.page.getHeight
 * @meta standard
 * @return {number} 页面宽度
 */
baidu.page.getWidth = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
};
/// support maigc - Tangram 1.x Code End











/*
 * @fileoverview
 * @author meizz
 * @create 2012-05-30
 * @modify
 */

/**
 * @description 分析形参对象的类型，返回以逗号分隔的对象类型字符串
 * @function
 * @name baidu.param
 * @grammar baidu.param(arg)
 * @param   {Object}    arg     被分析的形参对象
 * @return  {String}            对象类型字符串，以逗号分隔
 */
baidu.param = function(arg) {
    arg = arg || arguments.callee.caller.arguments;

    var s = "",
        n = arg.length;

    for (var i = 0; i < n; i++) {
        s += "," + baidu.type(arg[i]);
    }

    return s ? s.substr(1) : "";
};

// [Notice] meizz callee等操作是一个低性能的处理，因此 arg 参数尽量传过来，尽管不传这个参数本方法也能正确执行
// [Notice] meizz 本方法是一个被其它方法调用的方法，在不传arg又不是被调用的状态下，本方法会报错
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */




/**
 * @description 判断平台类型和特性的属性
 * @name baidu.platform
 * @namespace
 * @author jz, meizz
 * @modify 2012.6.29 mz 将原 baidu.platform.* 接口全部集成到 baidu.platform.js 中
 */
baidu.platform = baidu.platform || function(){
    var ua = navigator.userAgent,
        result = function(){};

    baidu.forEach("Android iPad iPhone Linux Macintosh Windows X11".split(" "), function(item ) {
        var key = item.charAt(0).toUpperCase() + item.toLowerCase().substr( 1 );
        baidu[ "is" + key ] = result[ "is" + key ] = ua.indexOf( item ) > -1;//) && (result = item);
    });

    return result;
}();


/*
baidu.platform.isAndroid = /android/i.test(navigator.userAgent);
baidu.platform.isIpad = /ipad/i.test(navigator.userAgent);
baidu.platform.isIphone = /iphone/i.test(navigator.userAgent);
baidu.platform.isMacintosh = /macintosh/i.test(navigator.userAgent);
baidu.platform.isWindows = /windows/i.test(navigator.userAgent);
baidu.platform.isX11 = /x11/i.test(navigator.userAgent);
//*/
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * @description 判断是否为android平台
 * @property android 是否为android平台
 * @function
 * @name baidu.platform.isAndroid
 * @grammar baidu.platform.isAndroid
 * @meta standard
 * @see baidu.platform.x11,baidu.platform.windows,baidu.platform.macintosh,baidu.platform.iphone,baidu.platform.ipad
 * @return {Boolean} 布尔值
 * @author jz
 */
//baidu.platform.isAndroid = /android/i.test(navigator.userAgent);

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * @description 判断是否为ipad平台
 * @function
 * @name baidu.platform.isIpad 
 * @grammar baidu.platform.isIpad
 * @return {Boolean} 布尔值 
 */
//baidu.platform.isIpad = /ipad/i.test(navigator.userAgent);

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * @description 判断是否为iphone平台
 * @function
 * @name baidu.platform.isIphone
 * @property iphone 是否为isIphone平台
 * @grammar baidu.platform.isIphone
 * @meta standard
 * @see baidu.platform.x11,baidu.platform.windows,baidu.platform.macintosh,baidu.platform.ipad,baidu.platform.android
 * @return {Boolean} 布尔值
 * @author jz
 */
//baidu.platform.isIphone = /iphone/i.test(navigator.userAgent);

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * @description 判断是否为macintosh平台
 * @function
 * @name baidu.platform.isMacintosh
 * @property macintosh 是否为macintosh平台
 * @grammar baidu.platform.isMacintosh
 * @meta standard
 * @see baidu.platform.x11,baidu.platform.windows,baidu.platform.iphone,baidu.platform.ipad,baidu.platform.android
 * @return {Boolean} 布尔值 
 * @author jz
 */
//baidu.platform.isMacintosh = /macintosh/i.test(navigator.userAgent);

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * @description 判断是否为windows平台
 * @function
 * @name baidu.platform.isWindows
 * @grammar baidu.platform.isWindows
 * @return {Boolean} 布尔值 
 */
 
//baidu.platform.isWindows = /windows/i.test(navigator.userAgent);

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * @description 判断是否为x11平台
 * @function
 * @name baidu.platform.isX11
 * @property x11 是否为x11平台
 * @grammar baidu.platform.isX11
 * @meta standard
 * @see baidu.platform.windows,baidu.platform.macintosh,baidu.platform.iphone,baidu.platform.ipad,baidu.platform.android
 * @return {Boolean} 布尔值 
 * @author jz
 */
//baidu.platform.isX11 = /x11/i.test(navigator.userAgent);


/**
 * @description 通过服务器HTTP GET请求加载数据
 * @function 
 * @name baidu.post()
 * @grammar baidu.post(url[, data], [successtion], [dataType])
 * @param {String} url 一个包含发送请求的URL字符串
 * @param {String|Object} data 向服务器发送请求的Key/value参数
 * @param {function} success 当请求成功后执行的回调函数，函数接收三个参数data, textStatus, tangramAjax
 * @param {String} dataType 从服务器返回的预期的数据类型。默认：智能猜测（xml, json, script, or html）
 * @return {tangramAjax} 一个tangramAjax对象
 */
baidu.post = baidu.post || baidu._util_.smartAjax('post');




/*
 * @author meizz
 * @create 2012-11-09
 */

/**
 * @description 将所有的正则表达式对象进行预编译处理，存储到全局对象中，以便重复调用
 * @function 
 * @name baidu.regexp
 * @grammar baidu.regexp(reg[, modal])
 * @param {String} reg 正则表达式的文本
 * @param {String} modal 正则表匹配模式(mgi)
 * @return {RegExp} 返回一个正则表达式对象
 */
/**
 * @description 将所有的正则表达式对象进行预编译处理，存储到全局对象中，以便重复调用
 * @function 
 * @name baidu.regexp
 * @grammar baidu.regexp(reg)
 * @param {RegExp} reg 正则表达式对象
 * @return {RegExp} 返回一个正则表达式对象
 */
baidu.regexp = baidu.regexp || function(maps){
    var modalReg = /[^mig]/;

    return function(reg, modal){
        var key, result;

        if ( baidu.isString(reg) ) {
        
            modalReg.test(modal) && (modal = "");
            key = reg + "$$" + (modal || "");
            (result = maps[ key ]) || (result = maps[ key ] = new RegExp( reg, modal ));
        
        } else if ( baidu.isRegExp(reg) ) {
        
            modal = (reg.global ? "g" : "") + (reg.ignoreCase ? "i" : "") + (reg.multiline ? "m" : "");
            key = reg.source + "$$" + modal;
            result = maps[key] || (maps[key] = reg);
        }

        // 注意：加了这句代码之后，会对 g 模式的 lastIndex 赋值的情况产生影响
        (result || (result = reg)) && reg.lastIndex > 0 && ( reg.lastIndex = 0 );
        return result;
    }
}( baidu.global("_maps_RegExp") );


/*
 * @description 为当前的新链头对象赋加.getBack()方法
 * @author meizz
 * @create 2012-11-19
 *
 * @function
 * @name baidu.setBack
 * @grammar baidu.setBack(current, oldChain)
 * @param   {Object}    current     新链头对象
 * @param   {Object}    oldChain    老链头对象
 * @return  {Object}                current
 */
baidu.setBack = function(current, oldChain) {
    current._back_ = oldChain;
    current.getBack = function() {
        return this._back_;
    }
    return current;
};

/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */




/**
 * @description sio对象链式语法的链头，动态加载javascript
 * @function 
 * @name baidu.sio()
 * @grammar baidu.sio(url)
 * @param {String} url 一个能够访问javascript的字符串路径地址
 * @return {TangramSio} 返回一个TangramSio对象
 */


baidu.createChain("sio",

// 执行方法
function(url){
    switch (typeof url) {
        case "string" :
            return new baidu.sio.$Sio(url);
        break;
    };
},

// constructor
function(url){
    this.url = url;
});
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * 
 * @param {HTMLElement} src script节点
 * @param {String} url script节点的地址
 * @param {String} [charset] 编码
 */
baidu.sio._createScriptTag = function(scr, url, charset){
    scr.setAttribute('type', 'text/javascript');
    charset && scr.setAttribute('charset', charset);
    scr.setAttribute('src', url);
    document.getElementsByTagName('head')[0].appendChild(scr);
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 */



/**
 * 删除script的属性，再删除script标签，以解决修复内存泄漏的问题
 * 
 * @param {HTMLElement} src script节点
 */
baidu.sio._removeScriptTag = function(scr){
    if (scr.clearAttributes) {
        scr.clearAttributes();
    } else {
        for (var attr in scr) {
            if (scr.hasOwnProperty(attr)) {
                delete scr[attr];
            }
        }
    }
    if(scr && scr.parentNode){
        scr.parentNode.removeChild(scr);
    }
    scr = null;
};

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */





/**
 * @description 通过script标签加载数据，加载完成由浏览器端触发回调
 * @function 
 * @name baidu.sio().callByBrowser()
 * @grammar baidu.sio(url).callByBrowser(callback[, options])
 * @param {function} callback 数据加载结束时调用的函数或函数名
 * @param {Object} options 其他可选项
 * @param {String} options.charset [可选]script的字符集
 * @param {Number} options.timeOut [可选]超时时间，超过这个时间将不再响应本请求，并触发onfailure函数
 * @param {function} options.onfailure [可选]timeOut设定后才生效，到达超时时间时触发本函数
 */

/**
 * @description 通过script标签加载数据，加载完成由浏览器端触发回调
 * @function 
 * @name baidu.sio.callByBrowser
 * @grammar baidu.sio.callByBrowser(url, callback[, options])
 * @param {function} callback 元素的ID名称或者直接传入元素本身
 * @param {String} url 一个能够访问javascript的字符串路径地址
 * @param {Object} options 元素的ID名称或者直接传入元素本身
 * @param {String} options.charset [可选]script的字符集
 * @param {Number} options.timeOut [可选]超时时间，超过这个时间将不再响应本请求，并触发onfailure函数
 * @param {function} options.onfailure [可选]timeOut设定后才生效，到达超时时间时触发本函数
 */


/*
 * 1、与callByServer不同，callback参数只支持Function类型，不支持string。
 * 2、如果请求了一个不存在的页面，callback函数在IE/opera下也会被调用，因此使用者需要在onsuccess函数中判断数据是否正确加载。
 */
 
baidu.sio.extend({
    callByBrowser : function (opt_callback, opt_options) {
        var url = this.url ;
        var scr = document.createElement("SCRIPT"),
            scriptLoaded = 0,
            options = opt_options || {},
            charset = options['charset'],
            callback = opt_callback || function(){},
            timeOut = options['timeOut'] || 0,
            timer;
        
        // IE和opera支持onreadystatechange
        // safari、chrome、opera支持onload
        scr.onload = scr.onreadystatechange = function () {
            // 避免opera下的多次调用
            if (scriptLoaded) {
                return;
            };
            
            var readyState = scr.readyState;
            if ('undefined' == typeof readyState
                || readyState == "loaded"
                || readyState == "complete") {
                scriptLoaded = 1;
                try {
                    callback();
                    clearTimeout(timer);
                } finally {
                    scr.onload = scr.onreadystatechange = null;
                    baidu.sio._removeScriptTag(scr);
                }
            }
        };

        if( timeOut ){
            timer = setTimeout(function(){
                scr.onload = scr.onreadystatechange = null;
                baidu.sio._removeScriptTag(scr);
                options.onfailure && options.onfailure();
            }, timeOut);
        };
        baidu.sio._createScriptTag(scr, url, charset);
    } 
});


/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */








/**
 * @description 通过script标签加载数据，加载完成由服务器端触发回调
 * @function 
 * @name baidu.sio().callByServer()
 * @grammar baidu.sio(url).callByServer(callback[, options])
 * @param {function} callback 服务器端调用的函数或函数名。如果没有指定本参数，将在URL中寻找options['queryField']做为callback的方法名
 * @param {Object} options [可选]加载数据时的选项
 * @param {String} options.charset [可选]script的字符集
 * @param {String} options.queryField [可选]服务器端callback请求字段名，默认为callback
 * @param {Number} options.timeOut [可选]超时时间(单位：ms)，超过这个时间将不再响应本请求，并触发onfailure函数
 * @param {function} options.onfailure [可选]timeOut设定后才生效，到达超时时间时触发本函数
 */

/**
 * @description 通过script标签加载数据，加载完成由服务器端触发回调
 * @function 
 * @name baidu.sio.callByServer
 * @grammar baidu.sio.callByServer(url, callback[, options])
 * @param {String} url 一个能够访问javascript的字符串路径地址
 * @param {function} callback 服务器端调用的函数或函数名。如果没有指定本参数，将在URL中寻找options['queryField']做为callback的方法名
 * @param {Object} options [可选]加载数据时的选项
 * @param {String} options.charset [可选]script的字符集
 * @param {String} options.queryField [可选]服务器端callback请求字段名，默认为callback
 * @param {Number} options.timeOut [可选]超时时间(单位：ms)，超过这个时间将不再响应本请求，并触发onfailure函数
 * @param {function} options.onfailure [可选]timeOut设定后才生效，到达超时时间时触发本函数
 */
 
baidu.sio.extend({
    callByServer : function( callback, opt_options) {
        var url = this.url ;
        var scr = document.createElement('SCRIPT'),
            prefix = 'bd__cbs__',
            callbackName,
            callbackImpl,
            options = opt_options || {},
            charset = options['charset'],
            queryField = options['queryField'] || 'callback',
            timeOut = options['timeOut'] || 0,
            timer,
            reg = new RegExp('(\\?|&)' + queryField + '=([^&]*)'),
            matches;

        if (baidu.lang.isFunction(callback)) {
            callbackName = prefix + Math.floor(Math.random() * 2147483648).toString(36);
            window[callbackName] = getCallBack(0);
        } else if(baidu.lang.isString(callback)){
            // 如果callback是一个字符串的话，就需要保证url是唯一的，不要去改变它
            // TODO 当调用了callback之后，无法删除动态创建的script标签
            callbackName = callback;
        } else {
            if (matches = reg.exec(url)) {
                callbackName = matches[2];
            }
        }

        if( timeOut ){
            timer = setTimeout(getCallBack(1), timeOut);
        }

        //如果用户在URL中已有callback，用参数传入的callback替换之
        url = url.replace(reg, '\x241' + queryField + '=' + callbackName);
        
        if (url.search(reg) < 0) {
            url += (url.indexOf('?') < 0 ? '?' : '&') + queryField + '=' + callbackName;
        }
        baidu.sio._createScriptTag(scr, url, charset);

        /*
         * 返回一个函数，用于立即（挂在window上）或者超时（挂在setTimeout中）时执行
         */
        function getCallBack(onTimeOut){
            /*global callbackName, callback, scr, options;*/
            return function(){
                try {
                    if( onTimeOut ){
                        options.onfailure && options.onfailure();
                    }else{
                        callback.apply(window, arguments);
                        clearTimeout(timer);
                    }
                    window[callbackName] = null;
                    delete window[callbackName];
                } catch (exception) {
                    // ignore the exception
                } finally {
                    baidu.sio._removeScriptTag(scr);
                }
            }
        }
    }

});

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 通过请求一个图片的方式令服务器存储一条日志
 * @function 
 * @name baidu.sio().log()
 * @grammar baidu.sio(url).log()
 */

/**
 * @description 通过请求一个图片的方式令服务器存储一条日志
 * @function 
 * @name baidu.sio.log
 * @grammar baidu.sio.log(url)
 * @param {String} url 要发送的地址
 * @author: int08h,leeight
 */
 
baidu.sio.extend({
  log : function() {
    url = this.url ;
    var img = new Image(),
        key = 'tangram_sio_log_' + Math.floor(Math.random() *
              2147483648).toString(36);

    // 这里一定要挂在window下
    // 在IE中，如果没挂在window下，这个img变量又正好被GC的话，img的请求会abort
    // 导致服务器收不到日志
    window[key] = img;

    img.onload = img.onerror = img.onabort = function() {
      // 下面这句非常重要
      // 如果这个img很不幸正好加载了一个存在的资源，又是个gif动画
      // 则在gif动画播放过程中，img会多次触发onload
      // 因此一定要清空
      img.onload = img.onerror = img.onabort = null;

      window[key] = null;

      // 下面这句非常重要
      // new Image创建的是DOM，DOM的事件中形成闭包环引用DOM是典型的内存泄露
      // 因此这里一定要置为null
      img = null;
    };

    // 一定要在注册了事件之后再设置src
    // 不然如果图片是读缓存的话，会错过事件处理
    // 最后，对于url最好是添加客户端时间来防止缓存
    // 同时服务器也配合一下传递Cache-Control: no-cache;
    img.src = url;
  }
});




/*
 * @fileoverview
 * @name baidu.sizzle
 * @author meizz
 * @create 2012-05-30
 * @modify
 */
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function( window, undefined ) {


 //在用户选择使用 Sizzle 时会被覆盖原有简化版本的baidu.query方法

    baidu.query = function(selector, context, results) {
        return baidu.merge(results || [], baidu.sizzle(selector, context));
    };

var document = window.document,
    docElem = document.documentElement,

    expando = "sizcache" + (Math.random() + '').replace('.', ''),
    done = 0,

    toString = Object.prototype.toString,
    strundefined = "undefined",

    hasDuplicate = false,
    baseHasDuplicate = true,

    // Regex
    rquickExpr = /^#([\w\-]+$)|^(\w+$)|^\.([\w\-]+$)/,
    chunker = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,

    rbackslash = /\\/g,
    rnonWord = /\W/,
    rstartsWithWord = /^\w/,
    rnonDigit = /\D/,
    rnth = /(-?)(\d*)(?:n([+\-]?\d*))?/,
    radjacent = /^\+|\s*/g,
    rheader = /h\d/i,
    rinputs = /input|select|textarea|button/i,
    rtnfr = /[\t\n\f\r]/g,

    characterEncoding = "(?:[-\\w]|[^\\x00-\\xa0]|\\\\.)",
    matchExpr = {
        ID: new RegExp("#(" + characterEncoding + "+)"),
        CLASS: new RegExp("\\.(" + characterEncoding + "+)"),
        NAME: new RegExp("\\[name=['\"]*(" + characterEncoding + "+)['\"]*\\]"),
        TAG: new RegExp("^(" + characterEncoding.replace( "[-", "[-\\*" ) + "+)"),
        ATTR: new RegExp("\\[\\s*(" + characterEncoding + "+)\\s*(?:(\\S?=)\\s*(?:(['\"])(.*?)\\3|(#?" + characterEncoding + "*)|)|)\\s*\\]"),
        PSEUDO: new RegExp(":(" + characterEncoding + "+)(?:\\((['\"]?)((?:\\([^\\)]+\\)|[^\\(\\)]*)+)\\2\\))?"),
        CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
        POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/
    },

    origPOS = matchExpr.POS,

    leftMatchExpr = (function() {
        var type,
            // Increments parenthetical references
            // for leftMatch creation
            fescape = function( all, num ) {
                return "\\" + ( num - 0 + 1 );
            },
            leftMatch = {};

        for ( type in matchExpr ) {
            // Modify the regexes ensuring the matches do not end in brackets/parens
            matchExpr[ type ] = new RegExp( matchExpr[ type ].source + (/(?![^\[]*\])(?![^\(]*\))/.source) );
            // Adds a capture group for characters left of the match
            leftMatch[ type ] = new RegExp( /(^(?:.|\r|\n)*?)/.source + matchExpr[ type ].source.replace( /\\(\d+)/g, fescape ) );
        }

        // Expose origPOS
        // "global" as in regardless of relation to brackets/parens
        matchExpr.globalPOS = origPOS;

        return leftMatch;
    })(),

    // Used for testing something on an element
    assert = function( fn ) {
        var pass = false,
            div = document.createElement("div");
        try {
            pass = fn( div );
        } catch (e) {}
        // release memory in IE
        div = null;
        return pass;
    },

    // Check to see if the browser returns elements by name when
    // querying by getElementById (and provide a workaround)
    assertGetIdNotName = assert(function( div ) {
        var pass = true,
            id = "script" + (new Date()).getTime();
        div.innerHTML = "<a name ='" + id + "'/>";

        // Inject it into the root element, check its status, and remove it quickly
        docElem.insertBefore( div, docElem.firstChild );

        if ( document.getElementById( id ) ) {
            pass = false;
        }
        docElem.removeChild( div );
        return pass;
    }),

    // Check to see if the browser returns only elements
    // when doing getElementsByTagName("*")
    assertTagNameNoComments = assert(function( div ) {
        div.appendChild( document.createComment("") );
        return div.getElementsByTagName("*").length === 0;
    }),

    // Check to see if an attribute returns normalized href attributes
    assertHrefNotNormalized = assert(function( div ) {
        div.innerHTML = "<a href='#'></a>";
        return div.firstChild && typeof div.firstChild.getAttribute !== strundefined &&
            div.firstChild.getAttribute("href") === "#";
    }),

    // Determines a buggy getElementsByClassName
    assertUsableClassName = assert(function( div ) {
        // Opera can't find a second classname (in 9.6)
        div.innerHTML = "<div class='test e'></div><div class='test'></div>";
        if ( !div.getElementsByClassName || div.getElementsByClassName("e").length === 0 ) {
            return false;
        }

        // Safari caches class attributes, doesn't catch changes (in 3.2)
        div.lastChild.className = "e";
        return div.getElementsByClassName("e").length !== 1;
    });


// Check if the JavaScript engine is using some sort of
// optimization where it does not always call our comparision
// function. If that is the case, discard the hasDuplicate value.
//   Thus far that includes Google Chrome.
[0, 0].sort(function() {
    baseHasDuplicate = false;
    return 0;
});

var Sizzle = function( selector, context, results ) {
    results = results || [];
    context = context || document;
    var match, elem, contextXML,
        nodeType = context.nodeType;

    if ( nodeType !== 1 && nodeType !== 9 ) {
        return [];
    }

    if ( !selector || typeof selector !== "string" ) {
        return results;
    }

    contextXML = isXML( context );

    if ( !contextXML ) {
        if ( (match = rquickExpr.exec( selector )) ) {
            // Speed-up: Sizzle("#ID")
            if ( match[1] ) {
                if ( nodeType === 9 ) {
                    elem = context.getElementById( match[1] );
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    if ( elem && elem.parentNode ) {
                        // Handle the case where IE, Opera, and Webkit return items
                        // by name instead of ID
                        if ( elem.id === match[1] ) {
                            return makeArray( [ elem ], results );
                        }
                    } else {
                        return makeArray( [], results );
                    }
                } else {
                    // Context is not a document
                    if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( match[1] )) &&
                        contains( context, elem ) && elem.id === match[1] ) {
                        return makeArray( [ elem ], results );
                    }
                }

            // Speed-up: Sizzle("TAG")
            } else if ( match[2] ) {
                // Speed-up: Sizzle("body")
                if ( selector === "body" && context.body ) {
                    return makeArray( [ context.body ], results );
                }
                return makeArray( context.getElementsByTagName( selector ), results );
            // Speed-up: Sizzle(".CLASS")
            } else if ( assertUsableClassName && match[3] && context.getElementsByClassName ) {
                return makeArray( context.getElementsByClassName( match[3] ), results );
            }
        }
    }

    // All others
    return select( selector, context, results, undefined, contextXML );
};

var select = function( selector, context, results, seed, contextXML ) {
    var m, set, checkSet, extra, ret, cur, pop, i,
        origContext = context,
        prune = true,
        parts = [],
        soFar = selector;

    do {
        // Reset the position of the chunker regexp (start from head)
        chunker.exec( "" );
        m = chunker.exec( soFar );

        if ( m ) {
            soFar = m[3];

            parts.push( m[1] );

            if ( m[2] ) {
                extra = m[3];
                break;
            }
        }
    } while ( m );

    if ( parts.length > 1 && origPOS.exec( selector ) ) {

        if ( parts.length === 2 && Expr.relative[ parts[0] ] ) {
            set = posProcess( parts[0] + parts[1], context, seed, contextXML );

        } else {
            set = Expr.relative[ parts[0] ] ?
                [ context ] :
                Sizzle( parts.shift(), context );

            while ( parts.length ) {
                selector = parts.shift();

                if ( Expr.relative[ selector ] ) {
                    selector += parts.shift();
                }

                set = posProcess( selector, set, seed, contextXML );
            }
        }

    } else {
        // Take a shortcut and set the context if the root selector is an ID
        // (but not if it'll be faster if the inner selector is an ID)
        if ( !seed && parts.length > 1 && context.nodeType === 9 && !contextXML &&
                matchExpr.ID.test( parts[0] ) && !matchExpr.ID.test( parts[parts.length - 1] ) ) {

            ret = Sizzle.find( parts.shift(), context, contextXML );
            context = ret.expr ?
                Sizzle.filter( ret.expr, ret.set )[0] :
                ret.set[0];
        }

        if ( context ) {
            ret = seed ?
                { expr: parts.pop(), set: makeArray( seed ) } :
                Sizzle.find( parts.pop(), (parts.length >= 1 && (parts[0] === "~" || parts[0] === "+") && context.parentNode) || context, contextXML );

            set = ret.expr ?
                Sizzle.filter( ret.expr, ret.set ) :
                ret.set;

            if ( parts.length > 0 ) {
                checkSet = makeArray( set );

            } else {
                prune = false;
            }

            while ( parts.length ) {
                cur = parts.pop();
                pop = cur;

                if ( !Expr.relative[ cur ] ) {
                    cur = "";
                } else {
                    pop = parts.pop();
                }

                if ( pop == null ) {
                    pop = context;
                }

                Expr.relative[ cur ]( checkSet, pop, contextXML );
            }

        } else {
            checkSet = parts = [];
        }
    }

    if ( !checkSet ) {
        checkSet = set;
    }

    if ( !checkSet ) {
        Sizzle.error( cur || selector );
    }

    if ( toString.call(checkSet) === "[object Array]" ) {
        if ( !prune ) {
            results.push.apply( results, checkSet );

        } else if ( context && context.nodeType === 1 ) {
            for ( i = 0; checkSet[i] != null; i++ ) {
                if ( checkSet[i] && (checkSet[i] === true || checkSet[i].nodeType === 1 && contains( context, checkSet[i] )) ) {
                    results.push( set[i] );
                }
            }

        } else {
            for ( i = 0; checkSet[i] != null; i++ ) {
                if ( checkSet[i] && checkSet[i].nodeType === 1 ) {
                    results.push( set[i] );
                }
            }
        }

    } else {
        makeArray( checkSet, results );
    }

    if ( extra ) {
        select( extra, origContext, results, seed, contextXML );
        uniqueSort( results );
    }

    return results;
};

var isXML = Sizzle.isXML = function( elem ) {
    // documentElement is verified for cases where it doesn't yet exist
    // (such as loading iframes in IE - #4833)
    var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
    return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Slice is no longer used
// It is not actually faster
// Results is expected to be an array or undefined
// typeof len is checked for if array is a form nodelist containing an element with name "length" (wow)
var makeArray = function( array, results ) {
    results = results || [];
    var i = 0,
        len = array.length;
    if ( typeof len === "number" ) {
        for ( ; i < len; i++ ) {
            results.push( array[i] );
        }
    } else {
        for ( ; array[i]; i++ ) {
            results.push( array[i] );
        }
    }
    return results;
};

var uniqueSort = Sizzle.uniqueSort = function( results ) {
    if ( sortOrder ) {
        hasDuplicate = baseHasDuplicate;
        results.sort( sortOrder );

        if ( hasDuplicate ) {
            for ( var i = 1; i < results.length; i++ ) {
                if ( results[i] === results[ i - 1 ] ) {
                    results.splice( i--, 1 );
                }
            }
        }
    }

    return results;
};

// Element contains another
var contains = Sizzle.contains = docElem.compareDocumentPosition ?
    function( a, b ) {
        return !!(a.compareDocumentPosition( b ) & 16);
    } :
    docElem.contains ?
    function( a, b ) {
        return a !== b && ( a.contains ? a.contains( b ) : false );
    } :
    function( a, b ) {
        while ( (b = b.parentNode) ) {
            if ( b === a ) {
                return true;
            }
        }
        return false;
    };

Sizzle.matches = function( expr, set ) {
    return select( expr, document, [], set, isXML( document ) );
};

Sizzle.matchesSelector = function( node, expr ) {
    return select( expr, document, [], [ node ], isXML( document ) ).length > 0;
};

Sizzle.find = function( expr, context, contextXML ) {
    var set, i, len, match, type, left;

    if ( !expr ) {
        return [];
    }

    for ( i = 0, len = Expr.order.length; i < len; i++ ) {
        type = Expr.order[i];

        if ( (match = leftMatchExpr[ type ].exec( expr )) ) {
            left = match[1];
            match.splice( 1, 1 );

            if ( left.substr( left.length - 1 ) !== "\\" ) {
                match[1] = (match[1] || "").replace( rbackslash, "" );
                set = Expr.find[ type ]( match, context, contextXML );

                if ( set != null ) {
                    expr = expr.replace( matchExpr[ type ], "" );
                    break;
                }
            }
        }
    }

    if ( !set ) {
        set = typeof context.getElementsByTagName !== strundefined ?
            context.getElementsByTagName( "*" ) :
            [];
    }

    return { set: set, expr: expr };
};

Sizzle.filter = function( expr, set, inplace, not ) {
    var match, anyFound,
        type, found, item, filter, left,
        i, pass,
        old = expr,
        result = [],
        curLoop = set,
        isXMLFilter = set && set[0] && isXML( set[0] );

    while ( expr && set.length ) {
        for ( type in Expr.filter ) {
            if ( (match = leftMatchExpr[ type ].exec( expr )) != null && match[2] ) {
                filter = Expr.filter[ type ];
                left = match[1];

                anyFound = false;

                match.splice( 1, 1 );

                if ( left.substr( left.length - 1 ) === "\\" ) {
                    continue;
                }

                if ( curLoop === result ) {
                    result = [];
                }

                if ( Expr.preFilter[ type ] ) {
                    match = Expr.preFilter[ type ]( match, curLoop, inplace, result, not, isXMLFilter );

                    if ( !match ) {
                        anyFound = found = true;

                    } else if ( match === true ) {
                        continue;
                    }
                }

                if ( match ) {
                    for ( i = 0; (item = curLoop[i]) != null; i++ ) {
                        if ( item ) {
                            found = filter( item, match, i, curLoop );
                            pass = not ^ found;

                            if ( inplace && found != null ) {
                                if ( pass ) {
                                    anyFound = true;

                                } else {
                                    curLoop[i] = false;
                                }

                            } else if ( pass ) {
                                result.push( item );
                                anyFound = true;
                            }
                        }
                    }
                }

                if ( found !== undefined ) {
                    if ( !inplace ) {
                        curLoop = result;
                    }

                    expr = expr.replace( matchExpr[ type ], "" );

                    if ( !anyFound ) {
                        return [];
                    }

                    break;
                }
            }
        }

        // Improper expression
        if ( expr === old ) {
            if ( anyFound == null ) {
                Sizzle.error( expr );

            } else {
                break;
            }
        }

        old = expr;
    }

    return curLoop;
};

Sizzle.error = function( msg ) {
    throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Utility function for retreiving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
var getText = Sizzle.getText = function( elem ) {
    var i, node,
        nodeType = elem.nodeType,
        ret = "";

    if ( nodeType ) {
        if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
            // Use textContent for elements
            // innerText usage removed for consistency of new lines (see #11153)
            if ( typeof elem.textContent === "string" ) {
                return elem.textContent;
            } else {
                // Traverse it's children
                for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
                    ret += getText( elem );
                }
            }
        } else if ( nodeType === 3 || nodeType === 4 ) {
            return elem.nodeValue;
        }
    } else {

        // If no nodeType, this is expected to be an array
        for ( i = 0; (node = elem[i]); i++ ) {
            // Do not traverse comment nodes
            if ( node.nodeType !== 8 ) {
                ret += getText( node );
            }
        }
    }
    return ret;
};

var Expr = Sizzle.selectors = {

    match: matchExpr,
    leftMatch: leftMatchExpr,

    order: [ "ID", "NAME", "TAG" ],

    attrMap: {
        "class": "className",
        "for": "htmlFor"
    },

    attrHandle: {
        href: assertHrefNotNormalized ?
            function( elem ) {
                return elem.getAttribute( "href" );
            } :
            function( elem ) {
                return elem.getAttribute( "href", 2 );
            },
        type: function( elem ) {
            return elem.getAttribute( "type" );
        }
    },

    relative: {
        "+": function( checkSet, part ) {
            var isPartStr = typeof part === "string",
                isTag = isPartStr && !rnonWord.test( part ),
                isPartStrNotTag = isPartStr && !isTag;

            if ( isTag ) {
                part = part.toLowerCase();
            }

            for ( var i = 0, l = checkSet.length, elem; i < l; i++ ) {
                if ( (elem = checkSet[i]) ) {
                    while ( (elem = elem.previousSibling) && elem.nodeType !== 1 ) {}

                    checkSet[i] = isPartStrNotTag || elem && elem.nodeName.toLowerCase() === part ?
                        elem || false :
                        elem === part;
                }
            }

            if ( isPartStrNotTag ) {
                Sizzle.filter( part, checkSet, true );
            }
        },

        ">": function( checkSet, part ) {
            var elem,
                isPartStr = typeof part === "string",
                i = 0,
                l = checkSet.length;

            if ( isPartStr && !rnonWord.test( part ) ) {
                part = part.toLowerCase();

                for ( ; i < l; i++ ) {
                    elem = checkSet[i];

                    if ( elem ) {
                        var parent = elem.parentNode;
                        checkSet[i] = parent.nodeName.toLowerCase() === part ? parent : false;
                    }
                }

            } else {
                for ( ; i < l; i++ ) {
                    elem = checkSet[i];

                    if ( elem ) {
                        checkSet[i] = isPartStr ?
                            elem.parentNode :
                            elem.parentNode === part;
                    }
                }

                if ( isPartStr ) {
                    Sizzle.filter( part, checkSet, true );
                }
            }
        },

        "": function( checkSet, part, xml ) {
            dirCheck( "parentNode", checkSet, part, xml );
        },

        "~": function( checkSet, part, xml ) {
            dirCheck( "previousSibling", checkSet, part, xml );
        }
    },

    find: {
        ID: assertGetIdNotName ?
            function( match, context, xml ) {
                if ( typeof context.getElementById !== strundefined && !xml ) {
                    var m = context.getElementById( match[1] );
                    // Check parentNode to catch when Blackberry 4.6 returns
                    // nodes that are no longer in the document #6963
                    return m && m.parentNode ? [m] : [];
                }
            } :
            function( match, context, xml ) {
                if ( typeof context.getElementById !== strundefined && !xml ) {
                    var m = context.getElementById( match[1] );

                    return m ?
                        m.id === match[1] || typeof m.getAttributeNode !== strundefined && m.getAttributeNode("id").nodeValue === match[1] ?
                            [m] :
                            undefined :
                        [];
                }
            },

        NAME: function( match, context ) {
            if ( typeof context.getElementsByName !== strundefined ) {
                var ret = [],
                    results = context.getElementsByName( match[1] ),
                    i = 0,
                    len = results.length;

                for ( ; i < len; i++ ) {
                    if ( results[i].getAttribute("name") === match[1] ) {
                        ret.push( results[i] );
                    }
                }

                return ret.length === 0 ? null : ret;
            }
        },

        TAG: assertTagNameNoComments ?
            function( match, context ) {
                if ( typeof context.getElementsByTagName !== strundefined ) {
                    return context.getElementsByTagName( match[1] );
                }
            } :
            function( match, context ) {
                var results = context.getElementsByTagName( match[1] );

                // Filter out possible comments
                if ( match[1] === "*" ) {
                    var tmp = [],
                        i = 0;

                    for ( ; results[i]; i++ ) {
                        if ( results[i].nodeType === 1 ) {
                            tmp.push( results[i] );
                        }
                    }

                    results = tmp;
                }
                return results;
            }
    },

    preFilter: {
        CLASS: function( match, curLoop, inplace, result, not, xml ) {
            match = " " + match[1].replace( rbackslash, "" ) + " ";

            if ( xml ) {
                return match;
            }

            for ( var i = 0, elem; (elem = curLoop[i]) != null; i++ ) {
                if ( elem ) {
                    if ( not ^ (elem.className && (" " + elem.className + " ").replace( rtnfr, " " ).indexOf( match ) >= 0) ) {
                        if ( !inplace ) {
                            result.push( elem );
                        }

                    } else if ( inplace ) {
                        curLoop[i] = false;
                    }
                }
            }

            return false;
        },

        ID: function( match ) {
            return match[1].replace( rbackslash, "" );
        },

        TAG: function( match, curLoop ) {
            return match[1].replace( rbackslash, "" ).toLowerCase();
        },

        CHILD: function( match ) {
            if ( match[1] === "nth" ) {
                if ( !match[2] ) {
                    Sizzle.error( match[0] );
                }

                match[2] = match[2].replace( radjacent, "" );

                // parse equations like 'even', 'odd', '5', '2n', '3n+2', '4n-1', '-n+6'
                var test = rnth.exec(
                    match[2] === "even" && "2n" || match[2] === "odd" && "2n+1" ||
                    !rnonDigit.test( match[2] ) && "0n+" + match[2] || match[2] );

                // calculate the numbers (first)n+(last) including if they are negative
                match[2] = (test[1] + (test[2] || 1)) - 0;
                match[3] = test[3] - 0;
            } else if ( match[2] ) {
                Sizzle.error( match[0] );
            }

            // TODO: Move to normal caching system
            match[0] = done++;

            return match;
        },

        ATTR: function( match, curLoop, inplace, result, not, xml ) {
            var name = match[1] = match[1].replace( rbackslash, "" );

            if ( !xml && Expr.attrMap[ name ] ) {
                match[1] = Expr.attrMap[ name ];
            }

            // Handle if an un-quoted value was used
            match[4] = ( match[4] || match[5] || "" ).replace( rbackslash, "" );

            if ( match[2] === "~=" ) {
                match[4] = " " + match[4] + " ";
            }

            return match;
        },

        PSEUDO: function( match, curLoop, inplace, result, not, xml ) {
            if ( match[1] === "not" ) {
                // If we're dealing with a complex expression, or a simple one
                if ( ( chunker.exec( match[3] ) || "" ).length > 1 || rstartsWithWord.test( match[3] ) ) {
                    match[3] = select( match[3], document, [], curLoop, xml );

                } else {
                    var ret = Sizzle.filter( match[3], curLoop, inplace, !not );

                    if ( !inplace ) {
                        result.push.apply( result, ret );
                    }

                    return false;
                }

            } else if ( matchExpr.POS.test( match[0] ) || matchExpr.CHILD.test( match[0] ) ) {
                return true;
            }

            return match;
        },

        POS: function( match ) {
            match.unshift( true );

            return match;
        }
    },

    filters: {
        enabled: function( elem ) {
            return elem.disabled === false;
        },

        disabled: function( elem ) {
            return elem.disabled === true;
        },

        checked: function( elem ) {
            // In CSS3, :checked should return both checked and selected elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            var nodeName = elem.nodeName.toLowerCase();
            return (nodeName === "input" && !! elem.checked) || (nodeName === "option" && !!elem.selected);
        },

        selected: function( elem ) {
            // Accessing this property makes selected-by-default
            // options in Safari work properly
            if ( elem.parentNode ) {
                elem.parentNode.selectedIndex;
            }

            return elem.selected === true;
        },

        parent: function( elem ) {
            return !!elem.firstChild;
        },

        empty: function( elem ) {
            return !elem.firstChild;
        },

        has: function( elem, i, match ) {
            return !!Sizzle( match[3], elem ).length;
        },

        header: function( elem ) {
            return rheader.test( elem.nodeName );
        },

        text: function( elem ) {
            var attr = elem.getAttribute( "type" ), type = elem.type;
            // IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
            // use getAttribute instead to test this case
            return elem.nodeName.toLowerCase() === "input" && "text" === type && ( attr === null || attr.toLowerCase() === type );
        },

        radio: function( elem ) {
            return elem.nodeName.toLowerCase() === "input" && "radio" === elem.type;
        },

        checkbox: function( elem ) {
            return elem.nodeName.toLowerCase() === "input" && "checkbox" === elem.type;
        },

        file: function( elem ) {
            return elem.nodeName.toLowerCase() === "input" && "file" === elem.type;
        },

        password: function( elem ) {
            return elem.nodeName.toLowerCase() === "input" && "password" === elem.type;
        },

        submit: function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return (name === "input" || name === "button") && "submit" === elem.type;
        },

        image: function( elem ) {
            return elem.nodeName.toLowerCase() === "input" && "image" === elem.type;
        },

        reset: function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return (name === "input" || name === "button") && "reset" === elem.type;
        },

        button: function( elem ) {
            var name = elem.nodeName.toLowerCase();
            return name === "input" && "button" === elem.type || name === "button";
        },

        input: function( elem ) {
            return rinputs.test( elem.nodeName );
        },

        focus: function( elem ) {
            var doc = elem.ownerDocument;
            return elem === doc.activeElement && (!doc.hasFocus || doc.hasFocus()) && !!(elem.type || elem.href);
        },

        active: function( elem ) {
            return elem === elem.ownerDocument.activeElement;
        },

        contains: function( elem, i, match ) {
            return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( match[3] ) >= 0;
        }
    },

    setFilters: {
        first: function( elem, i ) {
            return i === 0;
        },

        last: function( elem, i, match, array ) {
            return i === array.length - 1;
        },

        even: function( elem, i ) {
            return i % 2 === 0;
        },

        odd: function( elem, i ) {
            return i % 2 === 1;
        },

        lt: function( elem, i, match ) {
            return i < match[3] - 0;
        },

        gt: function( elem, i, match ) {
            return i > match[3] - 0;
        },

        nth: function( elem, i, match ) {
            return match[3] - 0 === i;
        },

        eq: function( elem, i, match ) {
            return match[3] - 0 === i;
        }
    },

    filter: {
        PSEUDO: function( elem, match, i, array ) {
            var name = match[1],
                filter = Expr.filters[ name ];

            if ( filter ) {
                return filter( elem, i, match, array );

            } else if ( name === "not" ) {
                var not = match[3],
                    j = 0,
                    len = not.length;

                for ( ; j < len; j++ ) {
                    if ( not[j] === elem ) {
                        return false;
                    }
                }

                return true;

            } else {
                Sizzle.error( name );
            }
        },

        CHILD: function( elem, match ) {
            var first, last,
                doneName, parent, cache,
                count, diff,
                type = match[1],
                node = elem;

            switch ( type ) {
                case "only":
                case "first":
                    while ( (node = node.previousSibling) ) {
                        if ( node.nodeType === 1 ) {
                            return false;
                        }
                    }

                    if ( type === "first" ) {
                        return true;
                    }

                    node = elem;

                    /* falls through */
                case "last":
                    while ( (node = node.nextSibling) ) {
                        if ( node.nodeType === 1 ) {
                            return false;
                        }
                    }

                    return true;

                case "nth":
                    first = match[2];
                    last = match[3];

                    if ( first === 1 && last === 0 ) {
                        return true;
                    }

                    doneName = match[0];
                    parent = elem.parentNode;

                    if ( parent && (parent[ expando ] !== doneName || !elem.nodeIndex) ) {
                        count = 0;

                        for ( node = parent.firstChild; node; node = node.nextSibling ) {
                            if ( node.nodeType === 1 ) {
                                node.nodeIndex = ++count;
                            }
                        }

                        parent[ expando ] = doneName;
                    }

                    diff = elem.nodeIndex - last;

                    if ( first === 0 ) {
                        return diff === 0;

                    } else {
                        return ( diff % first === 0 && diff / first >= 0 );
                    }
            }
        },

        ID: assertGetIdNotName ?
            function( elem, match ) {
                return elem.nodeType === 1 && elem.getAttribute("id") === match;
            } :
            function( elem, match ) {
                var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
                return elem.nodeType === 1 && node && node.nodeValue === match;
            },

        TAG: function( elem, match ) {
            return ( match === "*" && elem.nodeType === 1 ) || !!elem.nodeName && elem.nodeName.toLowerCase() === match;
        },

        CLASS: function( elem, match ) {
            return ( " " + ( elem.className || elem.getAttribute("class") ) + " " ).indexOf( match ) > -1;
        },

        ATTR: function( elem, match ) {
            var name = match[1],
                result = Sizzle.attr ?
                    Sizzle.attr( elem, name ) :
                    Expr.attrHandle[ name ] ?
                    Expr.attrHandle[ name ]( elem ) :
                    elem[ name ] != null ?
                        elem[ name ] :
                        elem.getAttribute( name ),
                value = result + "",
                type = match[2],
                check = match[4];

            return result == null ?
                type === "!=" :
                !type && Sizzle.attr ?
                result != null :
                type === "=" ?
                value === check :
                type === "*=" ?
                value.indexOf( check ) >= 0 :
                type === "~=" ?
                ( " " + value + " " ).indexOf( check ) >= 0 :
                !check ?
                value && result !== false :
                type === "!=" ?
                value !== check :
                type === "^=" ?
                value.indexOf( check ) === 0 :
                type === "$=" ?
                value.substr( value.length - check.length ) === check :
                type === "|=" ?
                value === check || value.substr( 0, check.length + 1 ) === check + "-" :
                false;
        },

        POS: function( elem, match, i, array ) {
            var name = match[2],
                filter = Expr.setFilters[ name ];

            if ( filter ) {
                return filter( elem, i, match, array );
            }
        }
    }
};

// Add getElementsByClassName if usable
if ( assertUsableClassName ) {
    Expr.order.splice( 1, 0, "CLASS" );
    Expr.find.CLASS = function( match, context, xml ) {
        if ( typeof context.getElementsByClassName !== strundefined && !xml ) {
            return context.getElementsByClassName( match[1] );
        }
    };
}

var sortOrder, siblingCheck;

if ( docElem.compareDocumentPosition ) {
    sortOrder = function( a, b ) {
        if ( a === b ) {
            hasDuplicate = true;
            return 0;
        }

        if ( !a.compareDocumentPosition || !b.compareDocumentPosition ) {
            return a.compareDocumentPosition ? -1 : 1;
        }

        return a.compareDocumentPosition(b) & 4 ? -1 : 1;
    };

} else {
    sortOrder = function( a, b ) {
        // The nodes are identical, we can exit early
        if ( a === b ) {
            hasDuplicate = true;
            return 0;

        // Fallback to using sourceIndex (in IE) if it's available on both nodes
        } else if ( a.sourceIndex && b.sourceIndex ) {
            return a.sourceIndex - b.sourceIndex;
        }

        var al, bl,
            ap = [],
            bp = [],
            aup = a.parentNode,
            bup = b.parentNode,
            cur = aup;

        // If the nodes are siblings (or identical) we can do a quick check
        if ( aup === bup ) {
            return siblingCheck( a, b );

        // If no parents were found then the nodes are disconnected
        } else if ( !aup ) {
            return -1;

        } else if ( !bup ) {
            return 1;
        }

        // Otherwise they're somewhere else in the tree so we need
        // to build up a full list of the parentNodes for comparison
        while ( cur ) {
            ap.unshift( cur );
            cur = cur.parentNode;
        }

        cur = bup;

        while ( cur ) {
            bp.unshift( cur );
            cur = cur.parentNode;
        }

        al = ap.length;
        bl = bp.length;

        // Start walking down the tree looking for a discrepancy
        for ( var i = 0; i < al && i < bl; i++ ) {
            if ( ap[i] !== bp[i] ) {
                return siblingCheck( ap[i], bp[i] );
            }
        }

        // We ended someplace up the tree so do a sibling check
        return i === al ?
            siblingCheck( a, bp[i], -1 ) :
            siblingCheck( ap[i], b, 1 );
    };

    siblingCheck = function( a, b, ret ) {
        if ( a === b ) {
            return ret;
        }

        var cur = a.nextSibling;

        while ( cur ) {
            if ( cur === b ) {
                return -1;
            }

            cur = cur.nextSibling;
        }

        return 1;
    };
}

if ( document.querySelectorAll ) {
    (function(){
        var oldSelect = select,
            id = "__sizzle__",
            rrelativeHierarchy = /^\s*[+~]/,
            rapostrophe = /'/g,
            // Build QSA regex
            // Regex strategy adopted from Diego Perini
            rbuggyQSA = [];

        assert(function( div ) {
            div.innerHTML = "<select><option selected></option></select>";

            // IE8 - Some boolean attributes are not treated correctly
            if ( !div.querySelectorAll("[selected]").length ) {
                rbuggyQSA.push("\\[[\\x20\\t\\n\\r\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");
            }

            // Webkit/Opera - :checked should return selected option elements
            // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
            // IE8 throws error here (do not put tests after this one)
            if ( !div.querySelectorAll(":checked").length ) {
                rbuggyQSA.push(":checked");
            }
        });

        assert(function( div ) {

            // Opera 10/IE - ^= $= *= and empty values
            div.innerHTML = "<p class=''></p>";
            // Should not select anything
            if ( div.querySelectorAll("[class^='']").length ) {
                rbuggyQSA.push("[*^$]=[\\x20\\t\\n\\r\\f]*(?:\"\"|'')");
            }

            // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
            // IE8 throws error here (do not put tests after this one)
            div.innerHTML = "<input type='hidden'>";
            if ( !div.querySelectorAll(":enabled").length ) {
                rbuggyQSA.push(":enabled", ":disabled");
            }
        });

        rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );

        select = function( selector, context, results, seed, contextXML ) {
            // Only use querySelectorAll when not filtering,
            // when this is not xml,
            // and when no QSA bugs apply
            if ( !seed && !contextXML && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
                if ( context.nodeType === 9 ) {
                    try {
                        return makeArray( context.querySelectorAll( selector ), results );
                    } catch(qsaError) {}
                // qSA works strangely on Element-rooted queries
                // We can work around this by specifying an extra ID on the root
                // and working up from there (Thanks to Andrew Dupont for the technique)
                // IE 8 doesn't work on object elements
                } else if ( context.nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
                    var oldContext = context,
                        old = context.getAttribute( "id" ),
                        nid = old || id,
                        parent = context.parentNode,
                        relativeHierarchySelector = rrelativeHierarchy.test( selector );

                    if ( !old ) {
                        context.setAttribute( "id", nid );
                    } else {
                        nid = nid.replace( rapostrophe, "\\$&" );
                    }
                    if ( relativeHierarchySelector && parent ) {
                        context = parent;
                    }

                    try {
                        if ( !relativeHierarchySelector || parent ) {
                            return makeArray( context.querySelectorAll( "[id='" + nid + "'] " + selector ), results );
                        }
                    } catch(qsaError) {
                    } finally {
                        if ( !old ) {
                            oldContext.removeAttribute( "id" );
                        }
                    }
                }
            }

            return oldSelect( selector, context, results, seed, contextXML );
        };
    })();
}

function dirCheck( dir, checkSet, part, xml ) {
    var elem, match, isElem, nodeCheck,
        doneName = done++,
        i = 0,
        len = checkSet.length;

    if ( typeof part === "string" && !rnonWord.test( part ) ) {
        part = part.toLowerCase();
        nodeCheck = part;
    }

    for ( ; i < len; i++ ) {
        elem = checkSet[i];

        if ( elem ) {
            match = false;
            elem = elem[ dir ];

            while ( elem ) {
                if ( elem[ expando ] === doneName ) {
                    match = checkSet[ elem.sizset ];
                    break;
                }

                isElem = elem.nodeType === 1;
                if ( isElem && !xml ) {
                    elem[ expando ] = doneName;
                    elem.sizset = i;
                }

                if ( nodeCheck ) {
                    if ( elem.nodeName.toLowerCase() === part ) {
                        match = elem;
                        break;
                    }
                } else if ( isElem ) {
                    if ( typeof part !== "string" ) {
                        if ( elem === part ) {
                            match = true;
                            break;
                        }

                    } else if ( Sizzle.filter( part, [elem] ).length > 0 ) {
                        match = elem;
                        break;
                    }
                }

                elem = elem[ dir ];
            }

            checkSet[i] = match;
        }
    }
}

var posProcess = function( selector, context, seed, contextXML ) {
    var match,
        tmpSet = [],
        later = "",
        root = context.nodeType ? [ context ] : context,
        i = 0,
        len = root.length;

    // Position selectors must be done after the filter
    // And so must :not(positional) so we move all PSEUDOs to the end
    while ( (match = matchExpr.PSEUDO.exec( selector )) ) {
        later += match[0];
        selector = selector.replace( matchExpr.PSEUDO, "" );
    }

    if ( Expr.relative[ selector ] ) {
        selector += "*";
    }

    for ( ; i < len; i++ ) {
        select( selector, root[i], tmpSet, seed, contextXML );
    }

    return Sizzle.filter( later, tmpSet );
};

// EXPOSE

window.Sizzle = baidu.sizzle = Sizzle;

})( window );

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 对目标字符串进行html解码
 * @function 
 * @name baidu.string().decodeHTML()
 * @grammar baidu.string(str).decodeHTML()
 * @return {String} html解码后的字符串
 */

/**
 * @description 对目标字符串进行html解码
 * @function 
 * @name baidu.string.decodeHTML
 * @grammar baidu.string.decodeHTML(str)
 * @param {String} str 目标字符串
 * @return {String} html解码后的字符串
 */

baidu.string.extend({
    decodeHTML : function () {
        var str = this
                    .replace(/&quot;/g,'"')
                    .replace(/&lt;/g,'<')
                    .replace(/&gt;/g,'>')
                    .replace(/&amp;/g, "&");
        //处理转义的中文和实体字符
        return str.replace(/&#([\d]+);/g, function(_0, _1){
            return String.fromCharCode(parseInt(_1, 10));
        });
    }
});
/*
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 对目标字符串进行html编码
 * @function 
 * @name baidu.string().encodeHTML()
 * @grammar baidu.string(str).encodeHTML()
 * @return {String} html编码后的字符串
 */

/**
 * @description 对目标字符串进行html编码
 * @function 
 * @name baidu.string.encodeHTML
 * @grammar baidu.string.encodeHTML(str)
 * @param {String} str 目标字符串
 * @return {String} html编码后的字符串
 */


baidu.string.extend({
    encodeHTML : function () {
        return this.replace(/&/g,'&amp;')
                    .replace(/</g,'&lt;')
                    .replace(/>/g,'&gt;')
                    .replace(/"/g, "&quot;")
                    .replace(/'/g, "&#39;");
    }
});








/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */





/**
 * @description 对目标字符串进行格式化
 * @function 
 * @name baidu.string().format()
 * @grammar baidu.string(str).format(options)
 * @param {String|Object} options 提供相应数据的对象或多个字符串，参数为object时，替换目标字符串中的#{property name}部分；参数为String时，替换目标字符串中的#{0}、#{1}...部分
 * @return {String} 格式化后的字符串
 */

/**
 * @description 对目标字符串进行格式化
 * @function 
 * @name baidu.string.format
 * @grammar baidu.string.format(str, options)
 * @param {String} str 目标字符串
 * @param {String|Object} options 提供相应数据的对象或多个字符串，参数为object时，替换目标字符串中的#{property name}部分；参数为String时，替换目标字符串中的#{0}、#{1}...部分
 * @return {String} 格式化后的字符串
 */


//format(a,a,d,f,c,d,g,c);
baidu.string.extend({
    format : function (opts) {
        var source = this.valueOf(),
            data = Array.prototype.slice.call(arguments,0), toString = Object.prototype.toString;
        if(data.length){
            data = data.length == 1 ? 
                /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
                (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
                : data;
            return source.replace(/#\{(.+?)\}/g, function (match, key){
                var replacer = data[key];
                // chrome 下 typeof /a/ == 'function'
                if('[object Function]' == toString.call(replacer)){
                    replacer = replacer(key);
                }
                return ('undefined' == typeof replacer ? '' : replacer);
            });
        }
        return source;
    }
});
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 获取目标字符串在gbk编码下的字节长度
 * @function 
 * @name baidu.string().getByteLength()
 * @grammar baidu.string(str).getByteLength()
 * @return {Number} 字节长度
 */

/**
 * @description 获取目标字符串在gbk编码下的字节长度
 * @function 
 * @name baidu.string.getByteLength
 * @grammar baidu.string.getByteLength(str)
 * @param {String} str 目标字符串
 * @return {Number} 字节长度
 */
baidu.string.extend({
    getByteLength : function () {
        return this.replace(/[^\x00-\xff]/g, 'ci').length;
    }
    //获取字符在gbk编码下的字节长度, 实现原理是认为大于127的就一定是双字节。如果字符超出gbk编码范围, 则这个计算不准确
});
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */




/**
 * @description 去掉字符串中的html标签
 * @function 
 * @name baidu.string().stripTags()
 * @grammar baidu.string(str).stripTags()
 * @return {String} 去掉html标签后的字符串
 */
/**
 * @description 去掉字符串中的html标签
 * @function 
 * @name baidu.string.stripTags
 * @grammar baidu.string.stripTags(str)
 * @param {String} str 目标字符串
 * @return {String} 去掉html标签后的字符串
 */

baidu.string.extend({
    stripTags : function() {
        return (this || '').replace(/<[^>]+>/g, '');
    }
}); 

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 对目标字符串按gbk编码截取字节长度
 * @function 
 * @name baidu.string().subByte()
 * @grammar baidu.string(str).subByte(len[, tail])
 * @param {Number} len 需要截取的字节长度
 * @param {String} tail [可选]追加字符串
 * @return {String} 字符串截取结果
 */

/**
 * @description 对目标字符串按gbk编码截取字节长度
 * @function 
 * @name baidu.string.subByte
 * @grammar baidu.string.subByte(str, len[, tail])
 * @param {String} str 目标字符串
 * @param {Number} len 需要截取的字节长度
 * @param {String} tail [可选]追加字符串
 * @return {String} 字符串截取结果
 */
baidu.string.extend({
    subByte : function (len, tail) {
        baidu.check('number(,string)?$', 'baidu.string.subByte');

        if(len < 0 || this.getByteLength() <= len){
            return this.valueOf()/* + tail*/; // 20121109 mz 去掉tail
        }
        //thanks 加宽提供优化方法
        var source = this.substr(0, len)
            .replace(/([^\x00-\xff])/g,"\x241 ")//双字节字符替换成两个
            .substr(0, len)//截取长度
            .replace(/[^\x00-\xff]$/,"")//去掉临界双字节字符
            .replace(/([^\x00-\xff]) /g,"\x241");//还原
        return source + (tail || "");
    }
});

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */




/**
 * @description 将目标字符串中常见全角字符转换成半角字符
 * @function 
 * @name baidu.string().toHalfWidth()
 * @grammar baidu.string(str).toHalfWidth()
 * @return {String} 转换后的字符串
 */

/**
 * @description 将目标字符串中常见全角字符转换成半角字符
 * @function 
 * @name baidu.string.toHalfWidth
 * @grammar baidu.string.toHalfWidth(str)
 * @param {String} str 目标字符串
 * @return {String} 转换后的字符串
 */

/*
将全角的字符转成半角, 将“&amp;#xFF01;”至“&amp;#xFF5E;”范围的全角转成“&amp;#33;”至“&amp;#126;”, 还包括全角空格包括常见的全角数字/空格/字母, 用于需要同时支持全半角的转换, 具体转换列表如下("空格"未列出)：<br><br>

！ => !<br>
＂ => "<br>
＃ => #<br>
＄ => $<br>
％ => %<br>
＆ => &<br>
＇ => '<br>
（ => (<br>
） => )<br>
＊ => *<br>
＋ => +<br>
， => ,<br>
－ => -<br>
． => .<br>
／ => /<br>
０ => 0<br>
１ => 1<br>
２ => 2<br>
３ => 3<br>
４ => 4<br>
５ => 5<br>
６ => 6<br>
７ => 7<br>
８ => 8<br>
９ => 9<br>
： => :<br>
； => ;<br>
＜ => <<br>
＝ => =<br>
＞ => ><br>
？ => ?<br>
＠ => @<br>
Ａ => A<br>
Ｂ => B<br>
Ｃ => C<br>
Ｄ => D<br>
Ｅ => E<br>
Ｆ => F<br>
Ｇ => G<br>
Ｈ => H<br>
Ｉ => I<br>
Ｊ => J<br>
Ｋ => K<br>
Ｌ => L<br>
Ｍ => M<br>
Ｎ => N<br>
Ｏ => O<br>
Ｐ => P<br>
Ｑ => Q<br>
Ｒ => R<br>
Ｓ => S<br>
Ｔ => T<br>
Ｕ => U<br>
Ｖ => V<br>
Ｗ => W<br>
Ｘ => X<br>
Ｙ => Y<br>
Ｚ => Z<br>
［ => [<br>
＼ => \<br>
］ => ]<br>
＾ => ^<br>
＿ => _<br>
｀ => `<br>
ａ => a<br>
ｂ => b<br>
ｃ => c<br>
ｄ => d<br>
ｅ => e<br>
ｆ => f<br>
ｇ => g<br>
ｈ => h<br>
ｉ => i<br>
ｊ => j<br>
ｋ => k<br>
ｌ => l<br>
ｍ => m<br>
ｎ => n<br>
ｏ => o<br>
ｐ => p<br>
ｑ => q<br>
ｒ => r<br>
ｓ => s<br>
ｔ => t<br>
ｕ => u<br>
ｖ => v<br>
ｗ => w<br>
ｘ => x<br>
ｙ => y<br>
ｚ => z<br>
｛ => {<br>
｜ => |<br>
｝ => }<br>
～ => ~<br>
 */
baidu.string.extend({
    toHalfWidth : function () {
        return this.replace(/[\uFF01-\uFF5E]/g,
            function(c){
                return String.fromCharCode(c.charCodeAt(0) - 65248);
            }).replace(/\u3000/g," ");
    }
});

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */



/**
 * @description 为目标字符串添加wbr软换行
 * @function 
 * @name baidu.string().wbr()
 * @grammar baidu.string(str).wbr()
 * @return {String} 添加软换行后的字符串
 */

/**
 * @description 为目标字符串添加wbr软换行
 * @function 
 * @name baidu.string.wbr
 * @grammar baidu.string.wbr(str)
 * @param {String} str 目标字符串
 * @return {String} 添加软换行后的字符串
 */

/*
1.支持html标签、属性以及字符实体。<br>
2.任意字符中间都会插入wbr标签，对于过长的文本，会造成dom节点元素增多，占用浏览器资源。
3.在opera下，浏览器默认css不会为wbr加上样式，导致没有换行效果，可以在css中加上 wbr:after { content: "\00200B" } 解决此问题
*/
baidu.string.extend({
    wbr : function () {
        return this.replace(/(?:<[^>]+>)|(?:&#?[0-9a-z]{2,6};)|(.{1})/gi, '$&<wbr>')
            .replace(/><wbr>/g, '>');
    }
});
/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */


/**
 * @description 操作flash对象的方法，包括创建flash对象、获取flash对象以及判断flash插件的版本号
 * @name baidu.swf
 * @namespace
 */
baidu.swf = baidu.swf || {};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf/version.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */



/**
 * @description 浏览器支持的flash插件版本
 * @function
 * @name baidu.swf.version
 * @grammar baidu.swf.version
 * @return {String} 版本号
 */

baidu.swf.version = (function () {
    var n = navigator;
    if (n.plugins && n.mimeTypes.length) {
        var plugin = n.plugins["Shockwave Flash"];
        if (plugin && plugin.description) {
            return plugin.description
                    .replace(/([a-zA-Z]|\s)+/, "")
                    .replace(/(\s)+r/, ".") + ".0";
        }
    } else if (window.ActiveXObject && !window.opera) {
        for (var i = 12; i >= 2; i--) {
            try {
                var c = new ActiveXObject('ShockwaveFlash.ShockwaveFlash.' + i);
                if (c) {
                    var version = c.GetVariable("$version");
                    return version.replace(/WIN/g,'').replace(/,/g,'.');
                }
            } catch(e) {}
        }
    }
})();

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf/createHTML.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */




/**
 * @description 创建flash对象的html字符串
 * @name baidu.swf.createHTML
 * @function
 * @grammar baidu.swf.createHTML(options)
 * 
 * @param {Object}     options                     创建flash的选项参数
 * @param {string}     options.id                     要创建的flash的标识
 * @param {string}     options.url                 flash文件的url
 * @param {String}     options.errorMessage         未安装flash player或flash player版本号过低时的提示
 * @param {string}     options.ver                 最低需要的flash player版本号
 * @param {string}     options.width                 flash的宽度
 * @param {string}     options.height                 flash的高度
 * @param {string}     options.align                 flash的对齐方式，允许值：middle/left/right/top/bottom
 * @param {string}     options.base                 设置用于解析swf文件中的所有相对路径语句的基本目录或URL
 * @param {string}     options.bgcolor             swf文件的背景色
 * @param {string}     options.salign                 设置缩放的swf文件在由width和height设置定义的区域内的位置。允许值：l/r/t/b/tl/tr/bl/br
 * @param {boolean} options.menu                 是否显示右键菜单，允许值：true/false
 * @param {boolean} options.loop                 播放到最后一帧时是否重新播放，允许值： true/false
 * @param {boolean} options.play                 flash是否在浏览器加载时就开始播放。允许值：true/false
 * @param {string}     options.quality             设置flash播放的画质，允许值：low/medium/high/autolow/autohigh/best
 * @param {string}     options.scale                 设置flash内容如何缩放来适应设置的宽高。允许值：showall/noborder/exactfit
 * @param {string}     options.wmode                 设置flash的显示模式。允许值：window/opaque/transparent
 * @param {string}     options.allowscriptaccess     设置flash与页面的通信权限。允许值：always/never/sameDomain
 * @param {string}     options.allownetworking     设置swf文件中允许使用的网络API。允许值：all/internal/none
 * @param {boolean} options.allowfullscreen     是否允许flash全屏。允许值：true/false
 * @param {boolean} options.seamlesstabbing     允许设置执行无缝跳格，从而使用户能跳出flash应用程序。该参数只能在安装Flash7及更高版本的Windows中使用。允许值：true/false
 * @param {boolean} options.devicefont             设置静态文本对象是否以设备字体呈现。允许值：true/false
 * @param {boolean} options.swliveconnect         第一次加载flash时浏览器是否应启动Java。允许值：true/false
 * @param {Object}     options.vars                 要传递给flash的参数，支持JSON或string类型。
 * 
 * @see baidu.swf.create
 * @meta standard
 * @return {string} flash对象的html字符串
 */
baidu.swf.createHTML = function (options) {
    options = options || {};
    var version = baidu.swf.version, 
        needVersion = options['ver'] || '6.0.0', 
        vUnit1, vUnit2, i, k, len, item, tmpOpt = {},
        encodeHTML = baidu.string.encodeHTML;
    
    // 复制options，避免修改原对象
    for (k in options) {
        tmpOpt[k] = options[k];
    }
    options = tmpOpt;
    
    // 浏览器支持的flash插件版本判断
    if (version) {
        version = version.split('.');
        needVersion = needVersion.split('.');
        for (i = 0; i < 3; i++) {
            vUnit1 = parseInt(version[i], 10);
            vUnit2 = parseInt(needVersion[i], 10);
            if (vUnit2 < vUnit1) {
                break;
            } else if (vUnit2 > vUnit1) {
                return ''; // 需要更高的版本号
            }
        }
    } else {
        return ''; // 未安装flash插件
    }
    
    var vars = options['vars'],
        objProperties = ['classid', 'codebase', 'id', 'width', 'height', 'align'];
    
    // 初始化object标签需要的classid、codebase属性值
    options['align'] = options['align'] || 'middle';
    options['classid'] = 'clsid:d27cdb6e-ae6d-11cf-96b8-444553540000';
    options['codebase'] = 'http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0';
    options['movie'] = options['url'] || '';
    delete options['vars'];
    delete options['url'];
    
    // 初始化flashvars参数的值
    if ('string' == typeof vars) {
        options['flashvars'] = vars;
    } else {
        var fvars = [];
        for (k in vars) {
            item = vars[k];
            fvars.push(k + "=" + encodeURIComponent(item));
        }
        options['flashvars'] = fvars.join('&');
    }
    
    // 构建IE下支持的object字符串，包括属性和参数列表
    var str = ['<object '];
    for (i = 0, len = objProperties.length; i < len; i++) {
        item = objProperties[i];
        str.push(' ', item, '="', encodeHTML(options[item]), '"');
    }
    str.push('>');
    var params = {
        'wmode'             : 1,
        'scale'             : 1,
        'quality'           : 1,
        'play'              : 1,
        'loop'              : 1,
        'menu'              : 1,
        'salign'            : 1,
        'bgcolor'           : 1,
        'base'              : 1,
        'allowscriptaccess' : 1,
        'allownetworking'   : 1,
        'allowfullscreen'   : 1,
        'seamlesstabbing'   : 1,
        'devicefont'        : 1,
        'swliveconnect'     : 1,
        'flashvars'         : 1,
        'movie'             : 1
    };
    
    for (k in options) {
        item = options[k];
        k = k.toLowerCase();
        if (params[k] && (item || item === false || item === 0)) {
            str.push('<param name="' + k + '" value="' + encodeHTML(item) + '" />');
        }
    }
    
    // 使用embed时，flash地址的属性名是src，并且要指定embed的type和pluginspage属性
    options['src']  = options['movie'];
    options['name'] = options['id'];
    delete options['id'];
    delete options['movie'];
    delete options['classid'];
    delete options['codebase'];
    options['type'] = 'application/x-shockwave-flash';
    options['pluginspage'] = 'http://www.macromedia.com/go/getflashplayer';
    
    
    // 构建embed标签的字符串
    str.push('<embed');
    // 在firefox、opera、safari下，salign属性必须在scale属性之后，否则会失效
    // 经过讨论，决定采用BT方法，把scale属性的值先保存下来，最后输出
    var salign;
    for (k in options) {
        item = options[k];
        if (item || item === false || item === 0) {
            if ((new RegExp("^salign\x24", "i")).test(k)) {
                salign = item;
                continue;
            }
            
            str.push(' ', k, '="', encodeHTML(item), '"');
        }
    }
    
    if (salign) {
        str.push(' salign="', encodeHTML(salign), '"');
    }
    str.push('></embed></object>');
    
    return str.join('');
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf/create.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/17
 */




/**
 * @description 在页面中创建一个flash对象
 * @name baidu.swf.create
 * @function
 * @grammar baidu.swf.create(options[, container])
 * 
 * @param {Object}     options                     创建flash的选项参数
 * @param {string}     options.id                     要创建的flash的标识
 * @param {string}     options.url                 flash文件的url
 * @param {String}     options.errorMessage         未安装flash player或flash player版本号过低时的提示
 * @param {string}     options.ver                 最低需要的flash player版本号
 * @param {string}     options.width                 flash的宽度
 * @param {string}     options.height                 flash的高度
 * @param {string}     options.align                 flash的对齐方式，允许值：middle/left/right/top/bottom
 * @param {string}     options.base                 设置用于解析swf文件中的所有相对路径语句的基本目录或URL
 * @param {string}     options.bgcolor             swf文件的背景色
 * @param {string}     options.salign                 设置缩放的swf文件在由width和height设置定义的区域内的位置。允许值：l/r/t/b/tl/tr/bl/br
 * @param {boolean} options.menu                 是否显示右键菜单，允许值：true/false
 * @param {boolean} options.loop                 播放到最后一帧时是否重新播放，允许值： true/false
 * @param {boolean} options.play                 flash是否在浏览器加载时就开始播放。允许值：true/false
 * @param {string}     options.quality             设置flash播放的画质，允许值：low/medium/high/autolow/autohigh/best
 * @param {string}     options.scale                 设置flash内容如何缩放来适应设置的宽高。允许值：showall/noborder/exactfit
 * @param {string}     options.wmode                 设置flash的显示模式。允许值：window/opaque/transparent
 * @param {string}     options.allowscriptaccess     设置flash与页面的通信权限。允许值：always/never/sameDomain
 * @param {string}     options.allownetworking     设置swf文件中允许使用的网络API。允许值：all/internal/none
 * @param {boolean} options.allowfullscreen     是否允许flash全屏。允许值：true/false
 * @param {boolean} options.seamlesstabbing     允许设置执行无缝跳格，从而使用户能跳出flash应用程序。该参数只能在安装Flash7及更高版本的Windows中使用。允许值：true/false
 * @param {boolean} options.devicefont             设置静态文本对象是否以设备字体呈现。允许值：true/false
 * @param {boolean} options.swliveconnect         第一次加载flash时浏览器是否应启动Java。允许值：true/false
 * @param {Object}     options.vars                 要传递给flash的参数，支持JSON或string类型。
 * 
 * @param {HTMLElement|string} [container]         flash对象的父容器元素，不传递该参数时在当前代码位置创建flash对象。
 * @meta standard
 * @see baidu.swf.createHTML,baidu.swf.getMovie
 */
baidu.swf.create = function (options, target) {
    options = options || {};
    var html = baidu.swf.createHTML(options) 
               || options['errorMessage'] 
               || '';
                
    if (target && 'string' == typeof target) {
        target = document.getElementById(target);
    }
    baidu.dom.insertHTML( target || document.body ,'beforeEnd',html );
};

/*
 * Tangram
 * Copyright 2009 Baidu Inc. All rights reserved.
 * 
 * path: baidu/swf/getMovie.js
 * author: erik
 * version: 1.1.0
 * date: 2009/11/16
 */





/**
 * @description 获得flash对象的实例
 * @name baidu.swf.getMovie
 * @function
 * @grammar baidu.swf.getMovie(name)
 * @param {string} name flash对象的名称
 * @see baidu.swf.create
 * @meta standard
 * @return {HTMLElement} flash对象的实例
 */
baidu.swf.getMovie = function (name) {
    //ie9下, Object标签和embed标签嵌套的方式生成flash时,
    //会导致document[name]多返回一个Object元素,而起作用的只有embed标签
    var movie = document[name], ret;
    return baidu.browser.ie == 9 ?
        movie && movie.length ? 
            (ret = baidu.array.remove(baidu.lang.toArray(movie),function(item){
                return item.tagName.toLowerCase() != "embed";
            })).length == 1 ? ret[0] : ret
            : movie
        : movie || window[name];
};

/*
 * Tangram
 * Copyright 2011 Baidu Inc. All rights reserved.
 */






/**
 * @description Js 调用 Flash方法的代理类.
 * @function
 * @name baidu.swf.Proxy
 * @grammar new baidu.swf.Proxy(id, property, [, loadedHandler])
 * @param {string} id Flash的元素id.object标签id, embed标签name.
 * @param {string} property Flash的方法或者属性名称，用来检测Flash是否初始化好了.
 * @param {Function} loadedHandler 初始化之后的回调函数.
 * @remark Flash对应的DOM元素必须已经存在, 否则抛错. 可以使用baidu.swf.create预先创建Flash对应的DOM元素.
 * @author liyubei@baidu.com (leeight)
 */
baidu.swf.Proxy = function(id, property, loadedHandler) {
    /**
     * 页面上的Flash对象
     * @type {HTMLElement}
     */
    var me = this,
        flash = this._flash = baidu.swf.getMovie(id),
        timer;
    if (! property) {
        return this;
    }
    timer = setInterval(function() {
        try {
            /** @preserveTry */
            if (flash[property]) {
                me._initialized = true;
                clearInterval(timer);
                if (loadedHandler) {
                    loadedHandler();
                }
            }
        } catch (e) {
        }
    }, 100);
};
/**
 * 获取flash对象.
 * @return {HTMLElement} Flash对象.
 */
baidu.swf.Proxy.prototype.getFlash = function() {
    return this._flash;
};
/**
 * 判断Flash是否初始化完成,可以与js进行交互.
 */
baidu.swf.Proxy.prototype.isReady = function() {
    return !! this._initialized;
};
/**
 * 调用Flash中的某个方法
 * @param {string} methodName 方法名.
 * @param {...*} var_args 方法的参数.
 */
baidu.swf.Proxy.prototype.call = function(methodName, var_args) {
    try {
        var flash = this.getFlash(),
            args = Array.prototype.slice.call(arguments);

        args.shift();
        if (flash[methodName]) {
            flash[methodName].apply(flash, args);
        }
    } catch (e) {
    }
};








/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */


// 声明快捷


//链头
baidu.array = baidu.array ||{};

//链头
baidu.dom = baidu.dom ||{};

//为目标元素添加className
baidu.addClass = baidu.dom.addClass ||{};

//从文档中获取指定的DOM元素
baidu.g = baidu.G = baidu.dom.g ||{};

//获取目标元素的属性值
baidu.getAttr = baidu.dom.getAttr ||{};

//获取目标元素的样式值
baidu.getStyle = baidu.dom.getStyle ||{};

//隐藏目标元素
baidu.hide = baidu.dom.hide ||{};

//在目标元素的指定位置插入HTML代码
baidu.insertHTML = baidu.dom.insertHTML ||{};

//通过className获取元素
baidu.q = baidu.Q = baidu.dom.q ||{};

//移除目标元素的className
baidu.removeClass = baidu.dom.removeClass ||{};

//设置目标元素的attribute值
baidu.setAttr = baidu.dom.setAttr ||{};

//批量设置目标元素的attribute值
baidu.setAttrs = baidu.dom.setAttrs ||{};

//按照border-box模型设置元素的height值
baidu.dom.setOuterHeight = baidu.dom.setBorderBoxHeight ||{};

//按照border-box模型设置元素的width值
baidu.dom.setOuterWidth = baidu.dom.setBorderBoxWidth ||{};

//设置目标元素的style样式值
baidu.setStyle = baidu.dom.setStyle ||{};

//批量设置目标元素的style样式值
baidu.setStyles = baidu.dom.setStyles ||{};

//显示目标元素，即将目标元素的display属性还原成默认值。默认值可能在stylesheet中定义，或者是继承了浏览器的默认样式值
baidu.show = baidu.dom.show ||{};

//链头
baidu.e = baidu.element = baidu.element ||{};

//链头
baidu.event = baidu.event ||{};

//为目标元素添加事件监听器
baidu.on = baidu.event.on ||{};

//为目标元素移除事件监听器
baidu.un = baidu.event.un ||{};

//链头
baidu.lang = baidu.lang ||{};

//为类型构造器建立继承关系
baidu.inherits = baidu.lang.inherits ||{};

//链头
baidu.object = baidu.object ||{};

//链头
baidu.string = baidu.string ||{};

//对目标字符串进行html解码
baidu.decodeHTML = baidu.string.decodeHTML ||{};

//对目标字符串进行html编码
baidu.encodeHTML = baidu.string.encodeHTML ||{};

//对目标字符串进行格式化
baidu.format = baidu.string.format ||{};

//删除目标字符串两端的空白字符
baidu.trim = baidu.string.trim ||{};
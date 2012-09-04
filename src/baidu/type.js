///import baidu;
///import baidu.lang;
///import baidu.forEach;
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
 * @grammar baidu.type( unknow )
 * @param   {Any}       unknow  任意类型的对象
 * @param   {String}    match   [可选]与对象类型作比较的字符串，这个参数如果赋值则.type()方法的返回值为布尔值，使用此种判断的效率只有 is* 系列的 1/7
 * @return  {String}            对应对象类型的字符串
 */
baidu.type = (function() {
    var objectType = {},
        nodeType = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ],
        str = "Array Boolean Date Error Function Number RegExp String",
        toString = objectType.toString;

    // 给 objectType 集合赋值，建立映射
    baidu.forEach(str.split(" "), function(name) {
        objectType[ "[object " + name + "]" ] = name.toLowerCase();

        baidu[ "is" + name ] = baidu.lang[ "is" + name ] = function ( unknow ) {
            return baidu.type(unknow) == name.toLowerCase();
        }
    });

    // 方法主体
    return function ( unknow ) {
        var s = typeof unknow;

        return s != "object" ? s
            : unknow == null ? "null"
            : unknow._type_
                || objectType[ toString.call( unknow ) ]
                || nodeType[ unknow.nodeType ]
                || ( unknow == unknow.window ? "Window" : "" )
                || "object";
    };
})();

// extend
baidu.isDate = baidu.lang.isDate = function( unknow ) {
    return baidu.type(unknow) == "date" && unknow.toString() != 'Invalid Date' && !isNaN(unknow);
};

baidu.isElement = baidu.lang.isElement = function( unknow ) {
    return baidu.type(unknow) == "HTMLElement";
};

baidu.isEnumerable = function( unknow ){
    return unknow != null
        && typeof unknow == "object"
        &&(typeof unknow.length == "number"
        || typeof unknow[0] != "undefined");
};

baidu.isNumber = baidu.lang.isNumber = function( unknow ) {
    return baidu.type(unknow) == "number" && isFinite( unknow );
};

baidu.isObject = baidu.lang.isObject = function( unknow ) {
    return typeof unknow === "function" || ( typeof unknow === "object" && unknow != null );
};
baidu.isWindow = baidu.lang.isWindow = function(win){
    return !!win && win == win.window;
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
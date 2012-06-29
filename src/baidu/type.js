///import baidu;
///import baidu.each;
///import baidu.lang;
/**
 * @fileoverview
 * @name baidu.type
 * @author meizz
 * @create 2012-05-20
 * @modify 2012.6.29 mz 将baidu.isArray() 类似的接口直接在本文件中实现，并且为兼容老版本处理
 */

/**
 * 判断对象类型，返回值为全小写对象名
 *
 * @param   {Object}    unknow  被判断的对象
 * @return  {String}            对象类型名
 */
baidu.type = (function() {
    var objectType = {},
        nodeType = [, "HTMLElement", "Attribute", "Text", , , , , "Comment", "Document", , "DocumentFragment", ],
        str = "Array Boolean Date Error Function Number RegExp String",
        toString = objectType.toString;

    // 给 objectType 集合赋值，建立映射
    baidu.each(str.split(" "), function(name) {
        objectType[ "[object " + name + "]" ] = name.toLowerCase();
        baidu[ "is" + name ] = baidu.lang[ "is" + name ] = function (unknow) {
            return baidu.type(unknow) == name.toLowerCase();
        }
    });


    // 方法主体
    return function ( unknow ) {
        var s = typeof unknow;

        return s != "object" ? s
            : unknow == null ? "null"
            : unknow._type_
                || objectType[toString.call(unknow)]
                || nodeType[unknow.nodeType]
                || (unknow == unknow.window ? "Window" : "")
                || "object";
    };
})();

baidu.isElement = baidu.lang.isElement = function( unknow ) {
    return baidu.type(unknow) == "HTMLElement";
};

baidu.isObject = baidu.lang.isObject = function( unknow ) {
    return typeof unknow === "object" && unknow != null;
}

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
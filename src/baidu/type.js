/// import baidu;
/// import baidu.each;

/**
 * @fileoverview
 * @name baidu.type
 * @author meizz
 * @create 2012-05-20
 * @modify
 */

/**
 * 判断对象类型，返回值为全小写对象名
 * 
 * @param   {Object}    object  被判断的对象
 * @return  {String}            对象类型名
 */
(function(){
    var objectType = {},
        nodeType = [,"HTMLElement","Attribute","Text",,,,,"Comment","Document",,"DocumentFragment",],
        toString = objectType.toString;

    // 给 objectType 集合赋值，建立映射
    baidu.each("Array Boolean Date Error Function Number RegExp String".split(" "), function(name) {
        objectType[ "[object " + name + "]" ] = name.toLowerCase();
    });

    // 方法主体
    baidu.type = function (object) {
        var s = typeof object;

        return  s != "object" ? s
            :  object == null ? "null"
            :  object._type_
            || objectType[ toString.call(object) ]
            || nodeType[object.nodeType]
            || (object == object.window ? "Window" : "")
            || "object";
    };

})();


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
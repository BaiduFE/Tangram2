///import baidu;
///import baidu.type;
///import baidu._util_;
///import baidu.global;
///import baidu.browser;
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
            ,s_1= baidu.isString( object )
            ,o_1= baidu.isObject( object )
            ,id = o_1 ? object[ key ] : s_1 ? object : "";

        if ( baidu.isString( command ) ) {

            switch ( command ) {
            case "get" :
                return o_1 ? id : maps[id];
            break;
            case "remove" :
            case "delete" :
                if ( e = maps[id] ) {
                    // 20120827 mz IE低版本给 element[key] 赋值时会写入DOM树，因此在移除的时候需要使用remove
                    if (baidu.browser.ie && baidu.isElement(e)) {
                        e.removeAttribute(key);
                    } else {
                        delete e[ key ];
                    }
                    delete maps[ id ];
                }
                return id;
            break;
            case "decontrol" : 
                !(e = maps[id]) && o_1 && ( object[ key ] = id = baidu.id() );
                id && delete maps[ id ];
                return id;
            break;
            default :
                if ( s_1 ) {
                    (e = maps[ id ]) && delete maps[ id ];
                    e && ( maps[ e[ key ] = command ] = e );
                } else if ( o_1 ) {
                    id && delete maps[ id ];
                    maps[ object[ key ] = command ] = object;
                }
                return command;
            }
        }

        if ( o_1 ) {
            !id && (maps[ object[ key ] = id = baidu.id() ] = object);
            return id;
        } else if ( s_1 ) {
            return maps[ object ];
        }

        return "TANGRAM__" + baidu._util_.$global._counter ++;
    };
}();

baidu.id.key = "tangram_guid";

//TODO: mz 20120827 在低版本IE做delete操作时直接 delete e[key] 可能出错，这里需要重新评估，重写
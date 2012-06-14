///import baidu;

/**
 * @fileoverview
 * @name baidu.id
 * @author dron,meizz
 * @create 2012-06-13
 * @modify 
 */

/**
 * 页面级唯一标识的方法
 *
 * @grammer baidu.id([id|object])
 * @param   {Object}        object      Array or ArrayLike or JSON
 * @param   {Function}      fn          function(array[i], i, array)
 * @param   {Object}        context     context.fn()
 * @param   {Object}        new Array()
 */
baidu.id = function(){
    var key = "tangram_guid"
        ,global = window[baidu.guid]
        ,maps = global._maps = global._maps || {};
    global._counter = global._counter || 1;

    return function(object){
        var type = typeof object;

        if (type == "string") {
            return maps[object];
        } else if (type == "object" && object) {
            if (object.nodeType) {
                var guid = object.getAttribute(key);
                
                if (!guid){
                    guid = baidu.id();
                    object.setAttribute(key, guid);
                    maps[guid] = object;
                }
                return guid;
            }
        }

        return "TANGRAM__" + global._counter ++;
    };

}();

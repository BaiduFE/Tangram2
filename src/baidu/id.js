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
baidu.id = function() {
    var key = "tangram_guid",
        global = window[baidu.guid],
        maps = global._maps = global._maps || {};
        
    global._counter = global._counter || 1;

    return function(object, type) {
        var t = typeof object;

        if (t === "string") {
            return maps[object];
        } else if (t === "object" && object) {
            if (object.nodeType) {
                var guid = object[key];

                switch (type) {
                case "remove":
                    if (!guid) return;
                    delete object[key];
                    delete maps[guid];
                    break;
                case "get":
                    return guid;
                default:
                    if (!guid) {
                        guid = baidu.id();
                        object[key] = guid;
                        maps[guid] = object;
                    }
                    return guid;
                }
            }
        }

        return "TANGRAM__" + global._counter++;
    };

}();
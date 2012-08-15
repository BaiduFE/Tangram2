/**
 * @author linlingyu
 */

///baidu.merge;
///baidu.type;

baidu.makeArray = function(array, results){
    var ret = results || [],
        type = baidu.type(array);
    array.length == null || ~'string|function|regexp'.indexOf(baidu.type(array)) ?
        Array.prototype.push.call(ret, array) : baidu.merge(ret, array);
    return ret;
}
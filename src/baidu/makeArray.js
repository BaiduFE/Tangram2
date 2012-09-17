/**
 * @author linlingyu
 */

///import baidu.merge;
///import baidu.type;

baidu.makeArray = function(array, results){
    var ret = results || [];
    if(!array){return ret;}
    array.length == null || ~'string|function|regexp'.indexOf(baidu.type(array)) ?
        Array.prototype.push.call(ret, array) : baidu.merge(ret, array);
    return ret;
}
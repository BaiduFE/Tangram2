/**
 * @author linlingyu
 */

///import baidu.type;
///import baidu.dom;
baidu.dom._g = function(id){
    return baidu.type(id) === 'string' ? document.getElementById(id) : id;
}
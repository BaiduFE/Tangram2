/// Tangram 1.x Code Start
/**
 * @author linlingyu
 */

///import baidu.type;
///import baidu.dom;
baidu.dom._g = function(id){
    return baidu.type(id) === 'string' ? document.getElementById(id) : id;
}
/// Tangram 1.x Code End
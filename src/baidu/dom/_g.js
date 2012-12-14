///import baidu.type;
///import baidu.dom;

/// Tangram 1.x Code Start
/**
 * @author linlingyu
 */
baidu.dom._g = function(id){
    return baidu.type(id) === 'string' ? document.getElementById(id) : id;
};
/// Tangram 1.x Code End

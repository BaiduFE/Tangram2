/**
 * @author linlingyu
 */
///import baidu.dom;
baidu.dom._isWindow = function(element){
    return element && element === element.window;
}
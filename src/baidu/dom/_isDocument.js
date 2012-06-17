/**
 * @author linlingyu
 */
///import baidu.dom;
baidu.dom._isDocument = function(element){
    return element && element.nodeType === 9;
}
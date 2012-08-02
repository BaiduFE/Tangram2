/**
 * @author linlingyu
 */

///import baidu.dom;
baidu.dom.style = function(){
    
    var cssHooks = {},
        cssProps = {};
  
    return function(elem, key, value){
        return 'style hello world~!';
    }
}();

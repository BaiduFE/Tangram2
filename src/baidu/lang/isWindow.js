/// Tangram 1.x Code Start
///import baidu.lang;
///import baidu.type;

//baidu.lang.isWindow = function(win){
//    return !!win && win.window;
//};
baidu.lang.isWindow = function(unknow) {
    return baidu.type(unknow) == "Window";
};
/// Tangram 1.x Code End
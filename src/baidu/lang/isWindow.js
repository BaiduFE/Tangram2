///import baidu.lang;
///import baidu.type;

//baidu.lang.isWindow = function(win){
//    return !!win && win.window;
//};
baidu.lang.isWindow = function(unknow) {
    return baidu.type(unknow) == "Window";
};
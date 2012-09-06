///import baidu.lang;
///import baidu.type;

//baidu.lang.isWindow = function(win){
//    return !!win && win.window;
//};
baidu.lang.isWindow = function(unknow) {
    baidu.type(unknow) == "Window";
};
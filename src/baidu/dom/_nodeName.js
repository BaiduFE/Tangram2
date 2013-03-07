///import baidu.dom;
baidu.dom._nodeName = function(ele, nodeName){
    return ele.nodeName && ele.nodeName.toLowerCase() === nodeName.toLowerCase();
};
///import baidu._util_;
baidu._util_.nodeName = function(ele, nodeName){
    return ele.nodeName && ele.nodeName.toLowerCase() === nodeName.toLowerCase();
};
///import baidu._util_;
///import baidu.id;
///import baidu.dom._eventBase;

baidu._util_.cleanData = function(array){
    var tangId;
    for(var i = 0, ele; ele = array[i]; i++){
        tangId = baidu.id(ele, 'get');
        if(!tangId){continue;}
        baidu._util_.eventBase.removeAll(ele);
        baidu.id(ele, 'remove');
    }
}
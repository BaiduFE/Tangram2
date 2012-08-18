///import baidu.id;
///import baidu.dom._eventBase;

baidu.dom._cleanData = function(array){
    var tangId;
    for(var i = 0, ele; ele = array[i]; i++){
        tangId = baidu.id(ele, 'get');
        if(!tangId){continue;}
        baidu.dom._eventBase.removeAll(ele);
        baidu.id(ele, 'remove');
    }
}
///import baidu.id;
///import baidu._util_.eventBase.queue;

baidu._util_.cleanData = function(array){
    var tangId;
    for(var i = 0, ele; ele = array[i]; i++){
        tangId = baidu.id(ele, 'get');
        if(!tangId){continue;}
        baidu._util_.eventBase.queue.remove(ele);
        baidu.id(ele, 'remove');
    }
};
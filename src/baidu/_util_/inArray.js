///import baidu._util_;
baidu._util_.inArray = function(ele, array, index){
    if(!array){return -1;}
    var indexOf = Array.prototype.indexOf,
        len;
    if(indexOf){return indexOf.call(array, ele, index);}
    len = array.length;
    index = index ? index < 0 ? Math.max(0, len + index) : index : 0;
    for(; index < len; index++){
        if(index in array && array[index] === ele){
            return index;
        }
    }
    return -1;
};
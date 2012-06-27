///import baidu.array;

Array.prototype.some = function(iterator, context){
    var i, n;

    for (i=0, n=this.length; i<n; i++) {
        if (iterator.call(context || this, this[i], i, this)) {
            return true;
        }
    }
    return false;
};

// TODO: delete in tangram 3.0
baidu.array.some = function(array, iterator, context) {
    return array.some(iterator, context);
};
///import baidu.array;
///import baidu.type;

Array.prototype.every = function(iterator, context) {
    var i, n;

    for (i=0, n=this.length; i<n; i++) {
        if (!iterator.call(context || this, this[i], i, this)) {
            return false;
        }
    }
    return true;
};

// TODO: delete in tangram 3.0
baidu.array.every = function(array, iterator, context) {
    return baidu.isArray(array) ? array.every(iterator, context) : array;
};

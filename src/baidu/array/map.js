///import baidu.array;
///import baidu.type.isArray;

Array.prototype.map = function (iterator, context) {
    var i, n,
        array = baidu.array([]);

    for (i=0, n=this.length; i < n; i++) {
        array[i] = iterator.call(context || this, this[i], i, this);
    }
    return array;
};

baidu.array.map = function(array, iterator, context){
    return baidu.type.isArray(array) ? array.map(iterator, context) : array;
};
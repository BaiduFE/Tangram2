///import baidu.array;
///import baidu.type.isArray;

Array.prototype.filter = function(iterator, context) {
    var result = baidu.array([]),
        i, n, item, index=0;

    if (baidu.type(iterator) === "function") {
        for (i=0, n=this.length; i<n; i++) {
            item = this[i];

            if (iterator.call(context || this, item, i, this) === true) {
                result[index ++] = item;
            }
        }
    }

    return result;
};

// TODO: delete in tangram 3.0
baidu.array.filter = function(array, filter, context) {
    return baidu.type.isArray(array) ? array.filter(filter, context) : [];
};

///import baidu.array;

Array.prototype.filter = function(filter, context) {
    var result = baidu.array([]),
        i, n, item, index=0;

    if (typeof iterator === "function") {
        for (i=0, n=this.length; i<n; i++) {
            item = this[i];

            if (filter.call(context || this, item, i, this) === true) {
                result[result ++] = item;
            }
        }
    }

    return result;
};

// TODO: delete in tangram 3.0
baidu.array.filter = function(array, filter, context) {
    return array.filter(filter, context);
};

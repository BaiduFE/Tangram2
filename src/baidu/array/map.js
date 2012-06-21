///import baidu.array;


baidu.array.extend({
    map : function (iterator, context) {
        var array = [],
            len = this.length,
            i = 0;

        for (; i < len; i++) {
            array[i] = iterator.call(context || this, this[i], i, this);
        }
        return baidu.array(array);
    }
});

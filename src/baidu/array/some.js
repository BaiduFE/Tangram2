///import baidu.array;


baidu.array.extend({
    some : function (iterator, context) {
        var i = 0,
            len = this.length;

        for (; i < len; i++) {
            if (i in this && iterator.call(context || this, this[i], i, this)) {
                return true;
            }
        }
        return false;
    }
});

///import baidu.array;

/**
 * 遍历数组中所有元素，将每一个元素应用方法进行合并，并返回合并后的结果。
 *
 */
baidu.array.extend({
    reduce : function (iterator, initializer) {
        var i = 0, 
            n = this.length,
            found = false;

        if (typeof initializer == "undefined") {
            initializer = this[i++];

            if (typeof initializer == "undefined") {
                return ;
            }
        }

        for (; i < n; i++) {
            initializer = iterator(initializer, this[i] , i , this);
        }
        return initializer;
    }
});
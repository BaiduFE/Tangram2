///import baidu.array;


baidu.array.extend({
    filter : function (iterator, context) {
        var result = [],
            resultIndex = 0,
            len = this.length,
            item,
            i;
        
        if (typeof iterator == "function") {
            for (i = 0; i < len; i++) {
                item = this[i];
                if (true === iterator.call(context || this, item, i, this)) {
                    // resultIndex用于优化对result.length的多次读取
                    result[resultIndex++] = item;
                }
            }
        }
        
        return baidu.array(result);
    }
});
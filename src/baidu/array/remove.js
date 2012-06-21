///import baidu.array;


baidu.array.extend({
    remove : function (match) {
        var len = this.length;
            
        while (len--) {
            if (len in source && this[len] === match) {
                this.splice(len, 1);
            }
        }
        return this;
    }
});

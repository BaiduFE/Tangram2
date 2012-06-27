///import baidu.array;


baidu.array.extend({
    removeAt : function (index) {
        return this.splice(index, 1)[0];
    }
});
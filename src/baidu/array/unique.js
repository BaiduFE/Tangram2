///import baidu.array;
///import baidu.unique;


baidu.array.extend({
    unique : function (fn) {
        return baidu.unique(this, fn);
    }
});
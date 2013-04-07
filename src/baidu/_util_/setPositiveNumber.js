///import baidu._util_;
baidu._util_.setPositiveNumber = function(){
    var core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        rnumsplit = new RegExp('^(' + core_pnum + ')(.*)$', 'i');
    return function(ele, val, subtract){
        var mc = rnumsplit.exec(val);
        return mc ?
            Math.max(0, mc[1] - (subtract || 0)) + (mc[2] || 'px') : val;
    };
}();
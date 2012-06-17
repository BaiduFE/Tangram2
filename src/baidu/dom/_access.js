/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.type;
baidu.dom.extend({
    _access: function(key, value, callback){
        var type = baidu.type(key),
            ret, len;
        switch(type){
            case 'string'://高频
                if(value === undefined){
                    return callback.call(this, this[0], key);
                }else{
                    len = this.length;
                    for(var i = 0; i < len; i++){
                        callback.call(this, this[i], key,
                            baidu.type(value) === 'function' ? value.call(this[i], i, callback.call(this, this[i], key)) : value);
                    }
                }
                break;
            case 'object':
                for(var i in key){
                    this._access(i, key[i], callback);
                }
                break;
        }
        return this;
    }
});
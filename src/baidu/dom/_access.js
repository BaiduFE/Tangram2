/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.type;

baidu.dom._access = function(key, value, callback){
    switch(baidu.type(key)){
        case 'string'://高频
            if(value === undefined){
                return callback.call(this, this[0], key);
            }else{
                for(var i = 0, ele; ele = this[i]; i++){
                    callback.call(this, ele, key,
                        baidu.type(value) === 'function' ? value.call(ele, i, callback.call(this, ele, key)) : value);
                }
            }
            break;
        case 'object':
            for(var i in key){
                baidu.dom._access.call(this, i, key[i], callback);
            }
            break;
    }
    return this;
};
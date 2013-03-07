/**
 * @author linlingyu
 */
///import baidu.dom;
///import baidu.query.each;
///import baidu.type;

baidu.dom._access = function(tang, key, value, callback, pass){
    if(tang.size() <= 0){return tang;}
    switch(baidu.type(key)){
        case 'string': //高频
            if(value === undefined){
                return callback.call(tang, tang[0], key);
            }else{
                tang.each(function(index, item){
                    callback.call(tang, item, key,
                        (baidu.type(value) === 'function' ? value.call(item, index, callback.call(tang, item, key)) : value),
                        pass);
                });
            }
            break;
        case 'object':
            for(var i in key){
                baidu.dom._access(tang, i, key[i], callback, value);
            }
            break;
    }
    return tang;
};
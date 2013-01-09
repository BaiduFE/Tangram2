
///import baidu.deferred;
///import baidu.type;
baidu.when = baidu.when || function(subordinate /* , ..., subordinateN */){
    var args = arguments,
        len = arguments.length,
        remaining = len !== 1 || (subordinate && baidu.type(subordinate.promise) === 'function') ? len : 0,
        defer = remaining === 1 ? subordinate : baidu.Deferred(),
        progressVals, progressContexts, resolveContexts;
    function update(index, contexts, vals){
        return function(val){
            contexts[index] = this;
            vals[index] = arguments.length > 1 ? arguments : val;
            if(vals === progressVals){
                defer.notifyWith(contexts, vals);
            }else if(!(--remaining)){
                defer.resolveWith(contexts, vals);
            }
        };
    }
    
    if(len > 1){
        progressVals = new Array(len);
        progressContexts = new Array(len);
        resolveContexts = new Array(len);
        for(var i = 0; i < len; i++){
            if(args[i] && baidu.type(args[i].promise) === 'function'){
                args[i].promise()
                    .done(update(i, resolveContexts, args))
                    .fail(defer.reject)
                    .progress(update(i, progressContexts, progressVals));
            }else{
                --remaining;
            }
        }
        
    }
    !remaining && defer.resolveWith(resolveContexts, args);
    return defer.promise();
}
/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.async;
///import baidu.object.extend;
///import baidu.async._isDeferred;
///import baidu.fn.blank;

/**
 * @description 用于支持异步处理, 使同步异步的调用风格统一.
 * @class
 * @private
 * @name baidu.async.Deferred
 * @grammar baidu.async().Deferred()
 * @remark
 * 示例:
    function someAsync(){
        var deferred = new baidu.async.Deferred();
        setTimeout(function(){
            afterSomeOperation();
            if(someReason){
                deferred.resolve(someValue);
            } else {
                deferred.reject(someError);
            }
        },100);
        return deferred;
    }
    //用类似同步的方式调用异步操作.
    someAsync().then(onSuccess, onFail);
    //onSuccess或onFail可以确保在正确的时间点执行.

 * @author rocy
 */
 
baidu.async.extend({
    Deferred:function(){
        baidu.async.Deferred.apply(this,arguments);
        return this;
    }
});

baidu.async.Deferred = function() {
    var me = this;
    baidu.extend(me, {
        _fired: 0,
        _firing: 0,
        _cancelled: 0,
        _resolveChain: [],
        _rejectChain: [],
        _result: [],
        _isError: 0
    });

    function fire() {
        if (me._cancelled || me._firing) {
            return;
        }
        //如果已有nextDeferred对象,则转移到nextDeferred上.
        if (me._nextDeferred) {
            me._nextDeferred.then(me._resolveChain[0], me._rejectChain[0]);
            return;
        }
        me._firing = 1;
        var chain = me._isError ? me._rejectChain : me._resolveChain,
            result = me._result[me._isError ? 1 : 0];
        // 此处使用while而非for循环,是为了避免firing时插入新函数.
        while (chain[0] && (! me._cancelled)) {
            //所有函数仅调用一次.
            //TODO: 支持传入 this 和 arguments, 而不是仅仅一个值.
            try {
                var chainResult = chain.shift().call(me, result);
                //若方法返回Deferred,则将剩余方法延至Deferred中执行
                if (baidu.async._isDeferred(chainResult)) {
                    me._nextDeferred = chainResult;
                    [].push.apply(chainResult._resolveChain, me._resolveChain);
                    [].push.apply(chainResult._rejectChain, me._rejectChain);
                    chain = me._resolveChain = [];
                    me._rejectChain = [];
                }
            } catch (error) {
                throw error;
            } finally {
                me._fired = 1;
                me._firing = 0;
            }
        }
    }


    /**
     * @description 调用onSuccess链.使用给定的value作为函数参数.
     * @name baidu.async.Deferred.resolve
     * @function
     * @grammar baidu.async().Deferred().resolve(value)
     * @param {*} value 成功结果.
     * @return {baidu.async.Deferred} this.
     */
    me.resolve = me.fireSuccess = function(value) {
        me._result[0] = value;
        fire();
        return me;
    };

    /**
     * @description 调用onFail链. 使用给定的error作为函数参数.
     * @function
     * @name baidu.async.Deferred.reject
     * @grammar baidu.async().Deferred().reject(error)
     * @param {Error} error 失败原因.
     * @return {baidu.async.Deferred} this.
     */
    me.reject = me.fireFail = function(error) {
        me._result[1] = error;
        me._isError = 1;
        fire();
        return me;
    };

    /**
     * @description 添加onSuccess和onFail方法到各自的链上. 如果该deferred已触发,则立即执行.
     * @function
     * @name baidu.async.Deferred.then
     * @grammar baidu.async().Deferred().then(onSuccess, onFail)
     * @param {Function} onSuccess 该deferred成功时的回调函数.第一个形参为成功时结果.
     * @param {Function} onFail 该deferred失败时的回调函数.第一个形参为失败时结果.
     * @return {baidu.async.Deferred} this.
     */
    me.then = function(onSuccess, onFail) {
        me._resolveChain.push(onSuccess);
        me._rejectChain.push(onFail);
        if (me._fired) {
            fire();
        }
        return me;
    };
    
    /**
     * @description 添加方法到onSuccess链上. 如果该deferred已触发,则立即执行.
     * @function
     * @name baidu.async.Deferred.success
     * @grammar baidu.async().Deferred().success(onSuccess)
     * @param {Function} onSuccess 该deferred成功时的回调函数.第一个形参为成功时结果.
     * @return {baidu.async.Deferred} this.
     */
    me.success = function(onSuccess) {
        return me.then(onSuccess, baidu.fn.blank);
    };

    /**
     * @description 添加方法到onFail链上. 如果该deferred已触发,则立即执行.
     * @function
     * @name baidu.async.Deferred.fail
     * @grammar baidu.async().Deferred().fail(onFail)
     * @param {Function} onFail 该deferred失败时的回调函数.第一个形参为失败时结果.
     * @return {baidu.async.Deferred} this.
     */
    me.fail = function(onFail) {
        return me.then(baidu.fn.blank, onFail);
    };
     
    /**
     * @description 中断该deferred, 使其失效.
     * @function
     * @name baidu.async.Deferred.cancel
     * @grammar baidu.async().Deferred().cancel()
     */
    me.cancel = function() {
        me._cancelled = 1;
    };
};

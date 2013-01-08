
///import baidu.createChain;
///import baidu.callbacks;
///import baidu.extend;
///import baidu.forEach;
/**
 * @author wangxiao, linlingyu
 */

/**
 * @description 提供应对延迟事件、异步调用的解决方案
 * @function 
 * @name baidu.Deferred()
 * @grammar baidu.Deferred()
 * @return {Deferred} 返回一个Deferred对象
 */

/**
 * @description 添加一个当延对象是无论成功失败都会被调用函数
 * @function 
 * @name baidu.Deferred().always()
 * @grammar baidu.Deferred().always( alwaysCallbacks )
 * @param {Function|Array} alwaysCallbacks 一个函数，或者函数数组
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 添加一个当延对象成功后会被调用函数
 * @function 
 * @name baidu.Deferred().done()
 * @grammar baidu.Deferred().done( doneCallbacks )
 * @param {Function|Array} doneCallbacks 一个函数，或者函数数组
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 添加一个当延对象失败后会被调用函数
 * @function 
 * @name baidu.Deferred().fail()
 * @grammar baidu.Deferred().fail( failCallbacks )
 * @param {Function|Array} failCallbacks 一个函数，或者函数数组
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 将当前Deferred对象的执行状态从"未完成"改为"已完成"，从而触发done()方法
 * @function 
 * @name baidu.Deferred().resolve()
 * @grammar baidu.Deferred().resolve([args])
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 将当前Deferred对象的执行状态从"未完成"改为"已完成"，从而触发done()方法，并根据给定的上下文和参数调用回调函数
 * @function 
 * @name baidu.Deferred().resolveWith()
 * @grammar baidu.Deferred().resolve(context[,args])
 * @param {Any} context 传递给回调函数的上下文
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 将当前Deferred对象的执行状态从"未完成"改为"已失败"，从而触发fail()方法
 * @function 
 * @name baidu.Deferred().reject()
 * @grammar baidu.Deferred().reject([args])
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 将当前Deferred对象的执行状态从"未完成"改为"已失败"，并根据给定的上下文和参数调用回调函数，从而触发fail()方法
 * @function 
 * @name baidu.Deferred().rejectWith()
 * @grammar baidu.Deferred().rejectWith(context[,args])
 * @param {Any} context 传递给回调函数的上下文
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 确定一个Deferred对象的当前状态
 * @function 
 * @name baidu.Deferred().state()
 * @grammar baidu.Deferred().state()
 * @return {Deferred} 返回当前的Deferred对象的状态，"pending"：未完成，“resolved”：被解决，“rejected”：被拒绝（失败）
 */

/**
 * @description 产生一个Promise对象，该对象为Deferred对象的精简对象，用户无法在外层通过resolve和reject方法改变状态
 * @function 
 * @name baidu.Deferred().promise()
 * @grammar baidu.Deferred().promise()
 * @return {Promise} 返回一个Promise对象
 */

/**
 * @description 传入Deferred对象（通常表示异步事件），提供一种方法来执行一个或多个Deferred对象的回调函数。
 * @function 
 * @name baidu.when()
 * @grammar baidu.when(deferreds)
 * @param {Deferred|Object} deferreds 一个或多个延迟对象，或者普通的Object。
 * @return {Deferred} 返回一个Deferred对象
 */

/**
 * @description 添加Deferred对象延迟成功或者失败时的调用
 * @function 
 * @name baidu.Deferred().then()
 * @grammar baidu.Deferred().then(doneCallbacks, failCallbacks)
 * @param {Function|Array} doneCallbacks 一个函数或函数数组，当延迟解决时调用
 * @param {Function|Array} failCallbacks 一个函数或函数数组，当延迟失败时调用
 * @return {Deferred} 返回一个Deferred对象
 */

/**
 * @description 当Deferred对象时生成进度通知时添加被访问处理程序
 * @function 
 * @name baidu.Deferred().progress()
 * @grammar baidu.Deferred().progress( progressCallbacks )
 * @param {Function|Array} progressCallbacks 一个函数或函数数组，当延迟解决时调用
 * @return {Deferred} 返回一个Deferred对象
 */

/**
 * @description 添加一个Promise对象延迟成功或者失败时的调用
 * @function 
 * @name baidu.Deferred().pipe()
 * @grammar baidu.Deferred().pipe(doneCallbacks, failCallbacks)
 * @param {Function|Array} doneCallbacks 一个函数或函数数组，当延迟解决时调用
 * @param {Function|Array} failCallbacks 一个函数或函数数组，当延迟失败时调用
 * @return {Promise} 返回一个Promise对象
 */

/**
 * @description 用来通知正在进行的延迟对象的回调函数
 * @function 
 * @name baidu.Deferred().notify()
 * @grammar baidu.Deferred().notify([args])
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */

/**
 * @description 用来通知正在进行的延迟对象的回调函数
 * @function 
 * @name baidu.Deferred().notifyWith()
 * @grammar baidu.Deferred().notifyWith(context[,args])
 * @param {Any} context 传递给回调函数的上下文
 * @param {Any} args 可选，传递给回调的参数
 * @return {Deferred} 返回当前的Deferred对象
 */



baidu.createChain('Deferred', function(fn){
    return new baidu.Deferred.$Deferred(fn);
}, function(fn){
    var me = this,
        state = 'pending',
        tuples = [
            ['resolve', 'done', baidu.Callbacks('once memory'), 'resolved'],
            ['reject', 'fail', baidu.Callbacks('once memory'), 'rejected'],
            ['notify', 'progress', baidu.Callbacks('memory')]
        ],
        promise = {
            state: function(){return state;},
            always: function(){
                me.done(arguments).fail(arguments);
                return this;
            },
            then: function(){
                /* fnDone, fnFail, fnProgress */
                var args = arguments;
                return baidu.Deferred(function(defer){
                    baidu.forEach(tuples, function(item, index){
                        var action = item[0],
                            fn = args[index];
                        me[item[1]](baidu.type(fn) === 'function' ? function(){
                            var ret = fn.apply(this, arguments);
                            if(ret && baidu.type(ret.promise) === 'function'){
                                ret.promise()
                                    .done(defer.resolve)
                                    .fail(defer.reject)
                                    .progress(defer.notify);
                            }else{
                                defer[action + 'With'](this === me ? defer : this, [ret]);
                            }
                        } : defer[action]);
                    });
                }).promise();
                
            },
            promise: function(instance){
                return instance != null ? baidu.extend(instance, promise) : promise;
            }
        };
    //
    promise.pipe = promise.then;
    baidu.forEach(tuples, function(item, index){
        var callbacks = item[2],
            stateName = item[3];
        // promise[ done | fail | progress ] = list.add
        promise[item[1]] = callbacks.add;
        stateName && callbacks.add(function(){
            // state = [ resolved | rejected ]
            state = stateName;
            // [ reject_list | resolve_list ].disable; progress_list.lock
        }, tuples[index ^ 1][2].disable, tuples[2][2].lock);
        // deferred[ resolve | reject | notify ] = list.fire
        me[item[0]] = callbacks.fire;
        me[item[0] + 'With'] = callbacks.fireWith;
    });
    promise.promise(me);
    fn && fn.call(me, me);
});
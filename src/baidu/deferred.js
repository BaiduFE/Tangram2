/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.extend;
///import baidu.createChain;
///import baidu.callbacks;
///import baidu.forEach;

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

baidu.createChain("Deferred",
//copy from jquery 1.8.2,thanks for jquery

// 执行方法
function( func ) {
    var core_slice = Array.prototype.slice;
    var tuples = [
            // action, add listener, listener list, final state
            [ "resolve", "done", baidu.Callbacks("once memory"), "resolved" ],
            [ "reject", "fail", baidu.Callbacks("once memory"), "rejected" ],
            [ "notify", "progress", baidu.Callbacks("memory") ]
        ],
        state = "pending",
        promise = {
            state: function() {
                return state;
            },
            always: function() {
                deferred.done( arguments ).fail( arguments );
                return this;
            },
            then: function( /* fnDone, fnFail, fnProgress */ ) {
                var fns = arguments;
                return baidu.Deferred(function( newDefer ) {
                    baidu.forEach( tuples, function( tuple, i ) {
                        var action = tuple[ 0 ],
                            fn = fns[ i ];
                        // deferred[ done | fail | progress ] for forwarding actions to newDefer
                        deferred[ tuple[1] ]( (typeof fn === 'function') ?
                            function() {
                                var returned = fn.apply( this, arguments );
                                if ( returned && ( typeof returned.promise === 'function') ) {
                                    returned.promise()
                                        .done( newDefer.resolve )
                                        .fail( newDefer.reject )
                                        .progress( newDefer.notify );
                                } else {
                                    newDefer[ action + "With" ]( this === deferred ? newDefer : this, [ returned ] );
                                }
                            } :
                            newDefer[ action ]
                        );
                    });
                    fns = null;
                }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function( obj ) {
                return typeof obj === "object" ? baidu.extend( obj, promise ) : promise;
            }
        },
        deferred = {};

    // Keep pipe for back-compat
    promise.pipe = promise.then;

    // Add list-specific methods
    baidu.forEach( tuples, function( tuple,i ) {
        var list = tuple[ 2 ],
            stateString = tuple[ 3 ];

        // promise[ done | fail | progress ] = list.add
        promise[ tuple[1] ] = list.add;

        // Handle state
        if ( stateString ) {
            list.add(function() {
                // state = [ resolved | rejected ]
                state = stateString;

            // [ reject_list | resolve_list ].disable; progress_list.lock
            }, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
        }

        // deferred[ resolve | reject | notify ] = list.fire
        deferred[ tuple[0] ] = list.fire;
        deferred[ tuple[0] + "With" ] = list.fireWith;
    });

    // Make the deferred a promise
    promise.promise( deferred );

    // Call given func if any
    if ( func ) {
        func.call( deferred, deferred );
    }

    baidu.extend(baidu,{
        // Deferred helper
        when: function( subordinate /* , ..., subordinateN */ ) {
            var i = 0,
                resolveValues = core_slice.call( arguments ),
                length = resolveValues.length,

                // the count of uncompleted subordinates
                remaining = length !== 1 || ( subordinate && (typeof subordinate.promise === 'function') ) ? length : 0,

                // the master Deferred. If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : baidu.Deferred(),

                // Update function for both resolve and progress values
                updateFunc = function( i, contexts, values ) {
                    return function( value ) {
                        contexts[ i ] = this;
                        values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
                        if( values === progressValues ) {
                            deferred.notifyWith( contexts, values );
                        } else if ( !( --remaining ) ) {
                            deferred.resolveWith( contexts, values );
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if ( length > 1 ) {
                progressValues = new Array( length );
                progressContexts = new Array( length );
                resolveContexts = new Array( length );
                for ( ; i < length; i++ ) {
                    if ( resolveValues[ i ] && (typeof resolveValues[ i ].promise ==='function') ) {
                        resolveValues[ i ].promise()
                            .done( updateFunc( i, resolveContexts, resolveValues ) )
                            .fail( deferred.reject )
                            .progress( updateFunc( i, progressContexts, progressValues ) );
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if ( !remaining ) {
                deferred.resolveWith( resolveContexts, resolveValues );
            }

            return deferred.promise();
        }    
    });

    // All done!
    return deferred;
},
// constructor
function(){});


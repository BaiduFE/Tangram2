/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu
///import baidu.extend
///import baidu.createChain
///import baidu.callbacks
///

/**
 * deferred功能链头
 *
 * @grammer baidu.deferred()
 * @param   {}
 * @return  
 */

baidu.createChain("deferred",

// 执行方法
function( func ) {
	var core_slice = Array.prototype.slice;
	var tuples = [
			// action, add listener, listener list, final state
			[ "resolve", "done", baidu.callbacks("once memory"), "resolved" ],
			[ "reject", "fail", baidu.callbacks("once memory"), "rejected" ],
			[ "notify", "progress", baidu.callbacks("memory") ]
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
				return baidu.deferred(function( newDefer ) {
					baidu.each( tuples, function( tuple, i ) {
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
	baidu.each( tuples, function( tuple,i ) {
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
				deferred = remaining === 1 ? subordinate : baidu.deferred(),

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


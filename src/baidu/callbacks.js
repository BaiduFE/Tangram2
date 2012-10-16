/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.forEach;
///import baidu.extend;
///import baidu.array.indexOf;

/**
 * @description 一个多用途的回调列表对象，提供了强大的的方式来管理回调函数列表
 * @function 
 * @name baidu.Callbacks()
 * @grammar baidu.Callbacks(flags)
 * @param {String} flags 一个用空格标记分隔的标志可选列表,用来改变回调列表中的行为
 * @return {Callbacks} 返回一个Callbacks对象
 */

/**
 * @description 回调列表中添加一个回调函数或回调函数的集合
 * @function 
 * @name baidu.Callbacks().add()
 * @grammar baidu.Callbacks().add(callbacks)
 * @param {Function|Array} callbacks 一个函数，或者一个函数数组用来添加到回调列表
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 禁用回调列表中的回调
 * @function 
 * @name baidu.Callbacks().disable()
 * @grammar baidu.Callbacks().disable()
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 从列表中删除所有的回调
 * @function 
 * @name baidu.Callbacks().empty()
 * @grammar baidu.Callbacks().empty()
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 用给定的参数调用所有的回调
 * @function 
 * @name baidu.Callbacks().fire()
 * @grammar baidu.Callbacks().fire(arguments)
 * @param {Function|Array|Number|Object|String|Null|Undefined} arguments 这个参数或参数列表传回给回调列表
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 确定如果回调至少已经调用一次
 * @function 
 * @name baidu.Callbacks().fired()
 * @grammar baidu.Callbacks().fired()
 * @param {Function|Array|Number|Object|String|Null|Undefined|Boolean} arguments 这个参数或参数列表传回给回调列表
 * @return {Boolean} 如果被调用过一次，则返回true，没被调用过返回false
 */

/**
 * @description 访问给定的上下文和参数列表中的所有回调
 * @function 
 * @name baidu.Callbacks().firewith()
 * @grammar baidu.Callbacks().firewith([context][,args])
 * @param {Function|Array|Number|Object|String|Null|Undefined} context 该列表中的回调被触发的上下文引用
 * @param {Function|Array|Number|Object|String|Null|Undefined} args 一个参数或参数列表传回给回调列表
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 确定是否含有提供的回调列表
 * @function
 * @name baidu.Callbacks().has()
 * @grammar baidu.Callbacks().has(callback)
 * @param {Function} callback 判断是否含有的回调函数
 * @return {Boolean} 当含有该函数，返回true，不含有返回false
 */

/**
 * @description 锁定在其当前状态的回调列表
 * @function
 * @name baidu.Callbacks().lock()
 * @grammar baidu.Callbacks().lock()
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 判断是否已被锁定的回调列表
 * @function
 * @name baidu.Callbacks().locked()
 * @grammar baidu.Callbacks().locked()
 * @param {Function} callback 判断是否含有的回调函数
 * @return {Boolean} 当前列表已被锁定，返回true，没有锁定返回false
 */

/**
 * @description 删除回调或回调回调列表的集合
 * @function
 * @name baidu.Callbacks().remove()
 * @grammar baidu.Callbacks().remove(callbacks)
 * @param {Function|Array} callbacks 一个函数，或者一个函数数组，会被从回调列表中删除
 * @return {Callbacks} 返回当前的Callbacks对象
 */

baidu.createChain("Callbacks",
//copy from jquery 1.8.2,thanks for jquery

// 执行方法
function(options){

	// String to Object options format cache
	var optionsCache = {};

	// Convert String-formatted options into Object-formatted ones and store in cache
	function createOptions( options ) {
		var object = optionsCache[ options ] = {};
		baidu.forEach( options.split(/\s+/), function( flag, _ ) {
			object[ flag ] = true;
		});
		return object;
	};

	/*
	 * Create a callback list using the following parameters:
	 *
	 *	options: an optional list of space-separated options that will change how
	 *			the callback list behaves or a more traditional option object
	 *
	 * By default a callback list will act like an event callback list and can be
	 * "fired" multiple times.
	 *
	 * Possible options:
	 *
	 *	once:			will ensure the callback list can only be fired once (like a Deferred)
	 *
	 *	memory:			will keep track of previous values and will call any callback added
	 *					after the list has been fired right away with the latest "memorized"
	 *					values (like a Deferred)
	 *
	 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
	 *
	 *	stopOnFalse:	interrupt callings when a callback returns false
	 *
	 */
	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		baidu.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						baidu.forEach( args, function( arg, _) {
							if ( (typeof arg === 'function') && ( !options.unique || !self.has( arg ) ) ) {
								list.push( arg );
							} else if ( arg && arg.length ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					baidu.forEach( arguments, function( arg, _ ) {
						var index;
						while( ( index = baidu.array(list).indexOf(arg,index) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Control if a given callback is in the list
			has: function( fn ) {
				return baidu.array(list).indexOf(fn) > -1;
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				args = args || [];
				args = [ context, args.slice ? args.slice() : args ];
				if ( list && ( !fired || stack ) ) {
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
},
// constructor
function(){});
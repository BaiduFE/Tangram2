
///import baidu.createChain;
///import baidu.array.indexOf;
///import baidu.type;
///import baidu.forEach;
/**
 * @author wangxiao, linlingyu
 */
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
 * @description 判断当前列表是否被禁用
 * @function 
 * @name baidu.Callbacks().disabled()
 * @grammar baidu.Callbacks().disabled()
 * @return {Callbacks} 如果已经被禁用返回true，如果没有返回false。
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
 * @param {Any} arguments 这个参数或参数列表传回给回调列表
 * @return {Callbacks} 返回当前的Callbacks对象
 */

/**
 * @description 确定如果回调至少已经调用一次
 * @function 
 * @name baidu.Callbacks().fired()
 * @grammar baidu.Callbacks().fired()
 * @param {Any|Boolean} arguments 这个参数或参数列表传回给回调列表
 * @return {Boolean} 如果被调用过一次，则返回true，没被调用过返回false
 */

/**
 * @description 访问给定的上下文和参数列表中的所有回调
 * @function 
 * @name baidu.Callbacks().fireWith()
 * @grammar baidu.Callbacks().fireWith([context][,args])
 * @param {Any} context 该列表中的回调被触发的上下文引用
 * @param {Any} args 一个参数或参数列表传回给回调列表
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

baidu.createChain('Callbacks', function(options){
    var opts = options;
    if(baidu.type(options) === 'string'){
        opts = {};
        baidu.forEach(options.split(/\s/), function(item){
            opts[item] = true;
        });
    }
    return new baidu.Callbacks.$Callbacks(opts);
}, function(options){
    var opts = baidu.extend({}, options || {}),
        fnArray = [],
        fireQueue = [],
        fireIndex = 0,
        memory, isLocked, isFired, isFiring,
        fireCore = function(data, index){
            var item, fn;
            if(!fireQueue || !fnArray){return;}
            memory = opts.memory && data;
            isFired = true;
            fireQueue.push(data);
            if(isFiring){return;}
            isFiring = true;
            while(item = fireQueue.shift()){
                for(fireIndex = index || 0; fn = fnArray[fireIndex]; fireIndex++){
                    if(fn.apply(item[0], item[1]) === false
                        && opts.stopOnFalse){
                        memory = false;
                        break;
                    }
                }
            }
            isFiring = false;
            opts.once && (fnArray = []);
        },
        callbacks = {
            add: function(){
                if(!fnArray){return this;}
                var index = fnArray && fnArray.length;
                (function add(args){
                    var len = args.length,
                        type, item;
                    for(var i = 0, item; i < len; i++){
                        if(!(item = args[i])){continue;}
                        type = baidu.type(item);
                        if(type === 'function'){
                            (!opts.unique || !callbacks.has(item)) && fnArray.push(item);
                        }else if(item && item.length && type !== 'string'){
                            add(item);
                        }
                    }
                })(arguments);
                !isFiring && memory && fireCore(memory, index);
                return this;
            },
            
            remove: function(){
                if(!fnArray){return this;}
                var index;
                baidu.forEach(arguments, function(item){
                    while((index = baidu.array(fnArray).indexOf(item)) > -1){
                        fnArray.splice(index, 1);
                        isFiring && index < fireIndex && fireIndex--;
                    }
                });
                return this;
            },
            
            has: function(fn){
                return baidu.array(fnArray).indexOf(fn) > -1;
            },
            
            empty: function(){
                return fnArray = [], this;
            },
            disable: function(){
                return fnArray = fireQueue = memory = undefined, this;
            },
            disabled: function(){
                return !fnArray;
            },
            lock: function(){
                isLocked = true;
                !memory && callbacks.disable();
                return this;
            },
            fired: function(){
                return isFired;
            },
            fireWith: function(context, args){
                if(isFired && opts.once
                    || isLocked){return this;}
                args = args || [];
                args = [context, args.slice ? args.slice() : args];
                fireCore(args);
                return this;
            },
            fire: function(){
                callbacks.fireWith(this, arguments);
                return this;
            }
        };
    return callbacks;
});
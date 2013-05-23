///import baidu.dom.data;
///import baidu.plugin;
///import plugin.fx.queue;
///import baidu.deferred

/**
 * @description 返回一个Promise对象，用来观察所选元素的队列(一般都是动画)是否全部执行了。
 * @function
 * @name baidu.dom().promise()
 * @grammar baidu.dom().promise( [type ] [, target ] )
 * @param    {String}    type    队列名称，默认为fx
 * @param    {Object}    target    参考baidu.deferred.promise方法，promise的api将附加到此对象上.
 * @return {Object} Promise对象
 */
(function( undefined ){
    var data = baidu.dom.data;

    baidu.plugin( "dom", {

        promise: function( type, obj ) {
            var tmp,
                count = 1,
                defer = baidu.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if ( !( --count ) ) {
                        defer.resolveWith( elements, [ elements ] );
                    }
                };

            if ( typeof type !== "string" ) {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while( i-- ) {
                tmp = data( elements[ i ], type + "queueHooks" );
                if ( tmp && tmp.empty ) {
                    count++;
                    tmp.empty.add( resolve );
                }
            }
            resolve();
            return defer.promise( obj );
        }
    });

})();
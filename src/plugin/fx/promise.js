///import baidu.dom.data;
///import baidu.plugin;
///import plugin.fx.queue;
///import baidu.deferred

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
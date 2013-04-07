///import baidu;
///import baidu.plugin;
///import baidu.isFunction;
///import baidu.dom.data;
///import baidu.extend;
///import plugin.fx;
///import plugin.fx.animation;
///import plugin.fx.queue;

(function(){
    var fx = baidu.fx,
        Animation = fx.Animation,
        data = baidu.dom.data,
        speeds = {
            slow: 600,
            fast: 200,
            // Default speed
            _default: 400
        };

    function isEmptyObject( obj ) {
        var name;
        for ( name in obj ) {
            return false;
        }
        return true;
    }

    function parseOpt( speed, easing, fn ) {
        var opt = speed && typeof speed === "object" ? baidu.extend( {}, speed ) : {
            complete: fn || !fn && easing ||
                baidu.isFunction( speed ) && speed,
            duration: speed,
            easing: fn && easing || easing && !baidu.isFunction( easing ) && easing
        };

        opt.duration = fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
            opt.duration in speeds ? speeds[ opt.duration ] : speeds._default;

        // normalize opt.queue - true/undefined/null -> "fx"
        if ( opt.queue == null || opt.queue === true ) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
            if ( baidu.isFunction( opt.old ) ) {
                opt.old.call( this );
            }

            if ( opt.queue ) {
                baidu.dequeue( this, opt.queue );
            }
        };

        return opt;
    };

    baidu.plugin('dom', {
        animate: function( prop, speed, easing, callback ) {
            var empty = isEmptyObject( prop ),
                opt = parseOpt( speed, easing, callback ),
                doAnimation = function() {
                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation( this, baidu.extend( {}, prop ), opt );
                    doAnimation.finish = function() {
                        anim.stop( true );
                    };
                    // Empty animations, or finishing resolves immediately
                    if ( empty || data( this, "finish" ) ) {
                        anim.stop( true );
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || opt.queue === false ?
                this.each( doAnimation ) :
                this.queue( opt.queue, doAnimation );
        }
    });

    //expose
    baidu.extend(fx, {
        speeds: speeds,
        off: false
    })
})();
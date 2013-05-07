/*var baidu = require('tangram:base');*/


(function( undefined ){
    var data = baidu.dom.data,

        //baidu._util_.access中value不能是fn,所以这里重写一个
        wrapper = function(tang, value, fn, setter){
            var tmp;

            if( !tang.size() ) {
                return tang;
            }
//            return setter || value ? ( tang.each(fn), tang ): fn.call( tmp = tang[0], 0, tmp );
            return setter || value ? tang.each(fn) : fn.call( tmp = tang[0], 0, tmp );
        };

    baidu._queueHooks = function(elem, type){
        var key = type + "queueHooks",
            ret;

        return data(elem, key) || (data(elem, key, ret = {
            empty: baidu.Callbacks("once memory").add(function(){
                //清理
                data(elem, type + "queue", null);
                data(elem, key, null);
            })
        }), ret);
    }

    baidu.plugin( "dom", {
        queue: function( type, value, dontstart ){
            var key;

            if ( typeof type !== "string" ) {
                value = type;
                type = undefined;
            }

            type = type || "fx";
            key = type + "queue";

            return wrapper(this, value, function(){
                var queue = data(this, key);
                if(value){
                    if(!queue || baidu.isArray(value)){
                        data( this, key, queue = baidu.makeArray( value ) );
                    } else {
                        queue.push( value );
                    }

                    // 确保queue有hooks, 在promise调用之前必须要有hooks
                    baidu._queueHooks( this, type );

                    if ( !dontstart && type === "fx" && queue[0] !== "inprogress" ) {
                        baidu.dequeue( this, type );
                    }
                }
                return queue || [];
            }, arguments.length > 1 || value);
        },

        dequeue: function( type ){
            type = type || "fx";

            return wrapper(this, true, function(){
                var elem = this,
                    queue = baidu.queue(elem, type),
                    remaining = queue.length,
                    fn = queue.shift(),
                    hooks = baidu._queueHooks(elem, type),
                    next = function(){
                        baidu.dequeue(elem, type);
                    };

                if( fn === "inprogress" ) {
                    fn = queue.shift();
                    remaining--;
                }

                hooks.cur = fn;

                if( fn ) {
                    if( type === "fx" ) {
                        queue.unshift("inprogress");
                    }

                    delete hooks.stop;
                    fn.call(elem, next, hooks);
                }

                !remaining && hooks && hooks.empty.fire();
            });
        }
    });

    //copy queue and dequeue to baidu namespace.
    baidu.queue = baidu.dom.queue;
    baidu.dequeue = baidu.dom.dequeue;

})();

baidu.fx = baidu.fx || {};

 

 

 

 

 

 

(function( undefined ){
    var fx = baidu.fx,

        //当animation frame不支持时有用
        interval = 13,

        //方法池子
        timers = [],

        getStrategy = (function(){
            var strategies = {
                    _default: {
                        next: function( cb ){
                            return setTimeout( cb, interval );
                        },

                        cancel: function( id ){ //不包一层，在id里面报错
                            return clearTimeout( id );
                        }
                    }
                },

                nextFrame = window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    window.oRequestAnimationFrame ||
                    window.msRequestAnimationFrame,

                cancelFrame = window.cancelRequestAnimationFrame ||
                    window.webkitCancelAnimationFrame ||
                    window.webkitCancelRequestAnimationFrame ||
                    window.mozCancelRequestAnimationFrame ||
                    window.oCancelRequestAnimationFrame ||
                    window.msCancelRequestAnimationFrame;

            nextFrame && cancelFrame && (strategies.frame = {
                next: nextFrame,
                cancel: cancelFrame
            });

            return function( stra ){
                return strategies[stra] || strategies._default;
            };
        })(),

        now = function(){
            return ( new Date() ).getTime();
        },

        createFxNow = function(){
            setTimeout(function(){
                fxNow = undefined;
            }, 0);
            return fxNow = now();
        },

        //统一调配
        tick = function(){
            var timer,
                i = 0;

            fxNow = now();//cache 当前时间
            for ( ; i < timers.length; i++ ) {
                timer = timers[ i ];
                // Checks the timer has not already been removed
                if ( !timer() && timers[ i ] === timer ) {
                    timers.splice( i--, 1 );
                }
            }
            if ( !timers.length ) {
                stop();
            } else {
                start( true );
            }
            fxNow = undefined;
        },

        //开始定期执行
        start = function( force ){

            //暴露到fx给测试用例用
            strategy = strategy || ( fx.strategy = getStrategy( fx.useAnimationFrame ? 'frame' : '_default' ) );

            timerId = ( force ? false : timerId ) || strategy.next.call( null, tick );//必须使用call，否则会报错
        },

        //结束定期执行
        stop = function(){
            strategy && strategy.cancel.call( null, timerId );//必须使用call，否则会报错
            timerId = strategy = null;
        },

        //timer ID
        timerId,
        fxNow,
        strategy;

    baidu.extend(fx, {

        //添加方法到池子，如果fn有返回值，此方法将在下个tick再次执行。
        //获取池子
        timer: function( fn ){
            if( fn === undefined ){
                return timers;
            }
            fn() && timers.push( fn ) && start();
        },

        //获取当前时间，有缓存机制
        now: function(){
            return fxNow || createFxNow();
        },

        tick: tick,

        useAnimationFrame: true
    });
})();

baidu.plugin = baidu.plugin || {};
baidu.plugin._util_ = baidu.plugin._util_ || {};

void function () {
    var css = baidu.dom.css,
        cssNumber = baidu._util_.cssNumber;

    baidu.extend(baidu.plugin._util_.fx = {}, {
        cssUnit: function (prop) {
            return cssNumber[prop] ? "" : "px";
        },

        getCss: function (elem, key) {
            var val = css(elem, key),
                num = parseFloat(val);

            return !isNaN(num) && isFinite(num) ? num || 0 : val;
        },

        propExpand: (function () {
            var hooks = {},
                cssExpand = [ "Top", "Right", "Bottom", "Left" ];

            baidu.forEach({
                margin: "",
                padding: "",
                border: "Width"
            }, function (suffix, prefix) {
                hooks[ prefix + suffix ] = {
                    expand: function (value) {
                        var i = 0,
                            expanded = {},

                        // assumes a single number if not a string
                            parts = typeof value === "string" ? value.split(" ") : [ value ];

                        for (; i < 4; i++) {
                            expanded[ prefix + cssExpand[ i ] + suffix ] =
                                parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
                        }

                        return expanded;
                    }
                };
            });

            return function (prop, value) {
                var hook = hooks[ prop ];
                return hook ? hook.expand(value) : null;
            }
        })(),

        getAllData: (function () {
            var guid = baidu.key
                , maps = baidu.global("_maps_HTMLElementData");

            return function (elem) {
                var key = elem[guid];
                return key && maps[key] || [];
            }
        })()
    });

}();

(function( undefined ){

    var fx  = baidu.fx,
        helper = baidu.plugin._util_.fx,
        css = baidu.dom.css,
        cssUnit = helper.cssUnit,
        cssHooks = baidu._util_.cssHooks,
        getCss = helper.getCss,
        easing = {
            linear: function( p ) {
                return p;
            },
            swing: function( p ) {
                return 0.5 - Math.cos( p*Math.PI ) / 2;
            }
        };

    function Tween( elem, options, prop, end, easing ) {
        return new Tween.prototype.init( elem, options, prop, end, easing );
    }

    Tween.prototype = {
        constructor: Tween,
        init: function( elem, options, prop, end, easing, unit ) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || "swing";
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || cssUnit(prop);
        },
        cur: function() {
            var hooks = Tween.propHooks[ this.prop ];

            return hooks && hooks.get ?
                hooks.get( this ) :
                Tween.propHooks._default.get( this );
        },
        run: function( percent ) {
            var eased,
                hooks = Tween.propHooks[ this.prop ];

            if ( this.options.duration ) {
                this.pos = eased = easing[ this.easing ](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = ( this.end - this.start ) * eased + this.start;

            if ( this.options.step ) {
                this.options.step.call( this.elem, this.now, this );
            }

            if ( hooks && hooks.set ) {
                hooks.set( this );
            } else {
                Tween.propHooks._default.set( this );
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function( tween ) {
                var result,
                    elem = tween.elem,
                    style;

                if ( elem[ tween.prop ] != null &&
                    (!( style = elem.style ) || style[ tween.prop ] == null) ) {
                    return elem[ tween.prop ];
                }
                result = getCss( elem, tween.prop );
                return !result || result === "auto" ? 0 : result;
            },

            set: function( tween ) {
                var elem = tween.elem,
                    style = elem.style;

                if ( style && ( style[ tween.prop ] != null || cssHooks[tween.prop] ) ) {
                    css( elem, tween.prop, tween.now + tween.unit );
                } else {
                    elem[ tween.prop ] = tween.now;
                }
            }
        }
    };

    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function( tween ) {
            var elem = tween.elem;
            if ( elem.nodeType && elem.parentNode ) {
                elem[ tween.prop ] = tween.now;
            }
        }
    };

    //expose
    baidu.extend(fx, {
        Tween: Tween,
        easing: easing
    });
})();

///import baidu._util_.isHidden
///import baidu._util_.support.inlineBlockNeedsLayout

(function( undefined ){

    var fx  = baidu.fx,
        helper = baidu.plugin._util_.fx,
        cssUnit = helper.cssUnit,
        css = baidu.dom.css,
        data = baidu.dom.data,
        isHidden = baidu._util_.isHidden,
        getCss = helper.getCss,
        propExpand = helper.propExpand,
        toCamelCase = baidu.string.toCamelCase,
        fxNow = fx.now,
        rfxtypes = /^(?:toggle|show|hide)$/i,
        rfxnum = /^(?:([+-])=|)([+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|))([a-z%]*)$/i,
        animationPrefilters = [ defaultPrefilter ],
        tweeners = {
            "*": [function( prop, value ) {
                var end, unit,
                    tween = this.createTween( prop, value ),
                    elem = tween.elem,
                    parts = rfxnum.exec( value ),
                    target = tween.cur(),
                    start = +target || 0,
                    scale = 1,
                    maxIterations = 20;

                if ( parts ) {
                    end = +parts[2];
                    unit = parts[3] || cssUnit( prop );
                    // 统一单位
                    if ( unit !== "px" && start ) {
                        start = getCss( elem, prop ) || end || 1;
                        do {
                            scale = scale || ".5";
                            start = start / scale;
                            css( elem, prop, start + unit );
                        } while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
                    }

                    tween.unit = unit;
                    tween.start = start;
                    tween.end = parts[1] ? start + ( parts[1] + 1 ) * end : end;
                }
                return tween;
            }]
        };

    function createTweens( animation, props ) {
        baidu.forEach( props, function( value, prop ) {
            var collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
                index = 0,
                length = collection.length;
            for ( ; index < length; index++ ) {
                if ( collection[ index ].call( animation, prop, value ) ) {

                    // we're done with this property
                    return;
                }
            }
        });
    }

    function Animation( elem, properties, options ) {
        var result,
            stopped,
            index = 0,
            length = animationPrefilters.length,
            deferred = baidu.Deferred().always( function() {
                // don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function() {
                if ( stopped ) {
                    return false;
                }
                var currentTime = fxNow(),
                    remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
                // archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for ( ; index < length ; index++ ) {
                    animation.tweens[ index ].run( percent );
                }

                deferred.notifyWith( elem, [ animation, percent, remaining ]);

                if ( percent < 1 && length ) {
                    return remaining;
                } else {
                    deferred.resolveWith( elem, [ animation ] );
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: baidu.extend( {}, properties ),
                opts: baidu.extend( true, { specialEasing: {} }, options ),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function( prop, end ) {
                    var tween = fx.Tween( elem, animation.opts, prop, end,
                        animation.opts.specialEasing[ prop ] || animation.opts.easing );
                    animation.tweens.push( tween );
                    return tween;
                },
                stop: function( gotoEnd ) {
                    var index = 0,
                    // if we are going to the end, we want to run all the tweens
                    // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if ( stopped ) {
                        return this;
                    }
                    stopped = true;
                    for ( ; index < length ; index++ ) {
                        animation.tweens[ index ].run( 1 );
                    }

                    deferred[ gotoEnd ? 'resolveWith' : 'rejectWith' ](elem, [ animation, gotoEnd ]);
                    return this;
                }
            }),
            props = animation.props;

        propFilter( props, animation.opts.specialEasing );

        for ( ; index < length ; index++ ) {
            result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
            if ( result ) {
                return result;
            }
        }

        createTweens( animation, props );

        if ( baidu.isFunction( animation.opts.start ) ) {
            animation.opts.start.call( elem, animation );
        }

        fx.timer(
            baidu.extend( tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        // attach callbacks from options
        return animation.progress( animation.opts.progress )
            .done( animation.opts.done, animation.opts.complete )
            .fail( animation.opts.fail )
            .always( animation.opts.always );
    }

    //驼峰化属性名，扩展特殊属性比如padding, borderWidth...
    function propFilter( props, specialEasing ) {
        var value, name, index, easing, expanded;

        for ( index in props ) {
            name = toCamelCase(index);
            easing = specialEasing[ name ];
            value = props[ index ];
            if ( baidu.isArray( value ) ) {
                easing = value[ 1 ];
                value = props[ index ] = value[ 0 ];
            }

            if ( index !== name ) {
                props[ name ] = value;
                delete props[ index ];
            }

            expanded = propExpand( name , value );
            if( expanded ) {
                value = expanded;
                delete props[ name ];
                for ( index in value ) {
                    if ( !( index in props ) ) {
                        props[ index ] = value[ index ];
                        specialEasing[ index ] = easing;
                    }
                }
            } else {
                specialEasing[ name ] = easing;
            }
        }
    }

    fx.Animation = baidu.extend( Animation, {

        tweener: function( props, callback ) {
            if ( baidu.isFunction( props ) ) {
                callback = props;
                props = [ "*" ];
            } else {
                props = props.split(" ");
            }

            var prop,
                index = 0,
                length = props.length;

            for ( ; index < length ; index++ ) {
                prop = props[ index ];
                tweeners[ prop ] = tweeners[ prop ] || [];
                tweeners[ prop ].unshift( callback );
            }
        },

        prefilter: function( callback, prepend ) {
            if ( prepend ) {
                animationPrefilters.unshift( callback );
            } else {
                animationPrefilters.push( callback );
            }
        }
    });

    function defaultPrefilter( elem, props, opts ) {
        
        var prop, index, length,
            value, dataShow, toggle,
            tween, hooks, oldfire,
            anim = this,
            style = elem.style,
            orig = {},
            handled = [],
            hidden = elem.nodeType && isHidden( elem ),
            support = baidu._util_.support;

        // handle queue: false promises
        if ( !opts.queue ) {
            hooks = baidu._queueHooks( elem, "fx" );
            if ( hooks.unqueued == null ) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if ( !hooks.unqueued ) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function() {
                // doing this makes sure that the complete handler will be called
                // before this completes
                anim.always(function() {
                    hooks.unqueued--;
                    if ( !baidu.queue( elem, "fx" ).length ) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // height/width overflow pass
        if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE does not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            if ( css( elem, "display" ) === "inline" &&
                css( elem, "float" ) === "none" ) {

                style.display = "inline-block";

                // inline-level elements accept inline-block;
                // block-level elements need to be inline with layout
                if ( !support.inlineBlockNeedsLayout  ) {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }

        if ( opts.overflow ) {
            style.overflow = "hidden";
            if ( !support.shrinkWrapBlocks ) {
                anim.always(function() {
                    style.overflow = opts.overflow[ 0 ];
                    style.overflowX = opts.overflow[ 1 ];
                    style.overflowY = opts.overflow[ 2 ];
                });
            }
        }
        // show/hide pass
        for ( index in props ) {
            value = props[ index ];
            if ( rfxtypes.exec( value ) ) {
                delete props[ index ];
                toggle = toggle || value === "toggle";
                if ( value === ( hidden ? "hide" : "show" ) ) {
                    continue;
                }
                handled.push( index );
            }
        }

        length = handled.length;
        if ( length ) {
            dataShow = data( elem, "fxshow" );
            dataShow || data( elem, "fxshow", dataShow = {} );
            if ( "hidden" in dataShow ) {
                hidden = dataShow.hidden;
            }

            // store state if its toggle - enables .stop().toggle() to "reverse"
            if ( toggle ) {
                dataShow.hidden = !hidden;
            }
            if ( hidden ) {
                baidu.dom( elem ).show();
            } else {
                anim.done(function() {
                    baidu.dom( elem ).hide();
                });
            }
            anim.done(function() {
                var prop;
                data( elem, "fxshow", null );
                for ( prop in orig ) {
                    css( elem, prop, orig[ prop ] );
                }
            });
            for ( index = 0 ; index < length ; index++ ) {
                prop = handled[ index ];
                tween = anim.createTween( prop, hidden ? dataShow[ prop ] : 0 );
                orig[ prop ] = dataShow[ prop ] || css( elem, prop );

                if ( !( prop in dataShow ) ) {
                    dataShow[ prop ] = tween.start;
                    if ( hidden ) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }
        }
    }

})();

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

baidu.plugin( "dom", {

    clearQueue: function( type ) {
        return this.queue( type || "fx", [] );
    }
});

baidu.plugin( "dom", {

    delay: function( duration, type ){
        type = type || "fx";
        return this.queue(type, function( next, hooks ){
            var timer = setTimeout(next, duration || 0);
            hooks.stop = function(){
                clearTimeout( timer );
            }
        });
    }
});

(function(){
    var fx = baidu.fx,
        helper = baidu.plugin._util_.fx,
        getAllData = helper.getAllData;

    baidu.plugin( "dom", {
        finish: function( type ) {
            if ( type !== false ) {
                type = type || "fx";
            }
            return this.each( function() {
                var index,
                    data = getAllData( this ),
                    queue = data[ type + "queue" ],
                    hooks = data[ type + "queueHooks" ],
                    timers = fx.timer(),
                    item,
                    length = queue ? queue.length : 0;

                // enable finishing flag on private data
                data.finish = true;

                // empty the queue first
                baidu.queue( this, type, [], true );

                if ( hooks && hooks.cur && hooks.cur.finish ) {
                    hooks.cur.finish.call( this );
                }

                // look for any active animations, and finish them
                for ( index = timers.length; index--; ) {
                    item = timers[ index ];
                    if ( item.elem === this && item.queue === type ) {
                        item.anim.stop( true );
                        timers.splice( index, 1 );
                    }
                }

                // look for any animations in the old queue and finish them
                for ( index = 0; index < length; index++ ) {
                    item = queue[ index ];
                    if ( item && item.finish ) {
                        item.finish.call( this );
                    }
                }

                // turn off finishing flag
                delete data.finish;
            } );
        }
    } );
})();

(function(){
    var isHidden = baidu._util_.isHidden,
        cssExpand = [ "Top", "Right", "Bottom", "Left" ],
        presets = {};

    // Generate parameters to create a standard animation
    function genFx( type, includeWidth ) {
        var which,
            attrs = { height: type },
            i = 0;

        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth? 1 : 0;
        for( ; i < 4 ; i += 2 - includeWidth ) {
            which = cssExpand[ i ];
            attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
        }

        if ( includeWidth ) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    // Generate shortcuts for custom animations
    baidu.forEach({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( props, name ) {
        presets[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    });

    baidu.forEach([ "toggle", "show", "hide" ], function( name, i ) {
        var cssFn = baidu.dom.fn[ name ];
        presets[ name ] = function( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ?
                cssFn ? cssFn.apply( this, arguments ) : this :
                this.animate( genFx( name, true ), speed, easing, callback );
        };
    });

    presets.fadeTo = function( speed, to, easing, callback ) {

        this.filter(function(){
            return isHidden(this);
        }).css( "opacity", 0 ).show();
        return this.animate({ opacity: to }, speed, easing, callback );
    }

    baidu.plugin( "dom", presets );
})();

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

(function(){
    var fx = baidu.fx,
        helper = baidu.plugin._util_.fx,
        rrun = /queueHooks$/,
        getAllData = helper.getAllData;

    baidu.plugin( "dom", {
        stop: function( type, clearQueue, gotoEnd ) {
            var stopQueue = function( hooks ) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop( gotoEnd );
            };

            if ( typeof type !== "string" ) {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if ( clearQueue && type !== false ) {
                this.queue( type || "fx", [] );
            }

            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = fx.timer(),
                    data = getAllData( this );

                if ( index ) {
                    if ( data[ index ] && data[ index ].stop ) {
                        stopQueue( data[ index ] );
                    }
                } else {
                    for ( index in data ) {
                        if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
                            stopQueue( data[ index ] );
                        }
                    }
                }

                for ( index = timers.length; index--; ) {
                    if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
                        timers[ index ].anim.stop( gotoEnd );
                        dequeue = false;
                        timers.splice( index, 1 );
                    }
                }

                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                if ( dequeue || !gotoEnd ) {
                    baidu.dequeue( this, type );
                }
            });
        }
    });
})();

 /*exports = baidu;*/

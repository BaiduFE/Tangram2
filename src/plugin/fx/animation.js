///import plugin.fx;
///import plugin.fx.queue;
///import plugin.fx.timer;
///import plugin.fx.tween;
///import baidu.dom.show;
///import baidu.dom.hide;
///import baidu.dom.css;
///import baidu.dom.contains;
///import baidu.dom.data;
///import baidu.each;
///import baidu.extend;
///import baidu.deferred;
///import baidu.isFunction;
///import baidu.isArray;
///import baidu.string.toCamelCase;
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
        baidu.each( props, function( prop, value ) {
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
        /*jshint validthis:true */
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
                if ( !support.inlineBlockNeedsLayout /*|| css_defaultDisplay( elem.nodeName ) === "inline"*/ ) {
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

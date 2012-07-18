/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    show: function( speed, easing, callback ){

        baidu.speed = function( speed, easing, fn ) {
            var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
                complete: fn || !fn && easing ||
                    jQuery.isFunction( speed ) && speed,
                duration: speed,
                easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
            };

            opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
                opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

            // normalize opt.queue - true/undefined/null -> "fx"
            if ( opt.queue == null || opt.queue === true ) {
                opt.queue = "fx";
            }

            // Queueing
            opt.old = opt.complete;

            opt.complete = function( noUnmark ) {
                if ( jQuery.isFunction( opt.old ) ) {
                    opt.old.call( this );
                }

                if ( opt.queue ) {
                    jQuery.dequeue( this, opt.queue );
                } else if ( noUnmark !== false ) {
                    jQuery._unmark( this );
                }
            };

            return opt;
        };

        var Animation = function( elem, properties, options ) {
            var result,
                index = 0,
                tweenerIndex = 0,
                length = animationPrefilters.length,
                finished = jQuery.Deferred(),
                deferred = jQuery.Deferred().always(function( ended ) {
                    // remove cirular reference
                    delete animation.tick;

                    if ( deferred.state() === "resolved" || ended ) {
                        // fire callbacks
                        finished.resolveWith( this );
                    }
                }),
                animation = deferred.promise({
                    elem: elem,
                    props: jQuery.extend( {}, properties ),
                    opts: jQuery.extend( true, { specialEasing: {} }, options ),
                    originalProperties: properties,
                    originalOptions: options,
                    startTime: fxNow || createFxNow(),
                    duration: options.duration,
                    finish: finished.done,
                    tweens: [],
                    createTween: function( prop, end, easing ) {
                        var tween = jQuery.Tween( elem, animation.opts, prop, end,
                                animation.opts.specialEasing[ prop ] || animation.opts.easing );
                        animation.tweens.push( tween );
                        return tween;
                    },
                    tick: function() {
                        var currentTime = fxNow || createFxNow(),
                            remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
                            percent = 1 - ( remaining / animation.duration || 0 ),
                            index = 0,
                            length = animation.tweens.length;

                        for ( ; index < length ; index++ ) {
                            animation.tweens[ index ].run( percent );
                        }

                        if ( percent < 1 && length ) {
                            return remaining;
                        } else {
                            deferred.resolveWith( elem, [ currentTime ] );
                            return false;
                        }
                    },
                    stop: function( gotoEnd ) {
                        var index = 0,
                            // if we are going to the end, we want to run all the tweens
                            // otherwise we skip this part
                            length = gotoEnd ? animation.tweens.length : 0;

                        for ( ; index < length ; index++ ) {
                            animation.tweens[ index ].run( 1 );
                        }
                        deferred.rejectWith( elem, [ gotoEnd ] );
                        return this;
                    }
                }),
                props = animation.props;

            propFilter( props, animation.opts.specialEasing );

            for ( ; index < length ; index++ ) {
                result = animationPrefilters[ index ].call( animation,
                    elem, props, animation.opts );
                if ( result ) {
                    return result;
                }
            }

            callTweeners( animation, props );

            jQuery.extend( animation.tick, {
                anim: animation,
                queue: animation.opts.queue,
                elem: elem
            });

            jQuery.fx.timer( animation.tick );
            return animation;
        };

        var animate = function( prop, speed, easing, callback ) {
                var optall = baidu.speed( speed, easing, callback ),
                    doAnimation = function() {
                        Animation( this, prop, optall ).finish( optall.complete );
                    };

                if ( jQuery.isEmptyObject( prop ) ) {
                    return this.each( optall.complete, [ false ] );
                }

                // Do not change referenced properties as per-property easing will be lost
                prop = jQuery.extend( {}, prop );

                return optall.queue === false ?
                    this.each( doAnimation ) :
                    this.queue( optall.queue, doAnimation );
        };

        // Generate parameters to create a standard animation
        var genFx = function( type, includeWidth ) {
            var which,
                attrs = { height: type },
                i = 0;

            // if we include width, step value is 1 to do all cssExpand values,
            // if we don't include width, step value is 2 to skip over Left and Right
            for( ; i < 4 ; i += 2 - includeWidth ) {
                which = jQuery.cssExpand[ i ];
                attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
            }

            if ( includeWidth ) {
                attrs.opacity = attrs.width = type;
            }

            return attrs;
        };

        var showHide = function( elements, show ) {
            var elem, display,
                values = [],
                index = 0,
                length = elements.length;

            for ( ; index < length; index++ ) {
                elem = elements[ index ];
                if ( !elem.style ) {
                    continue;
                }
                values[ index ] = jQuery._data( elem, "olddisplay" );
                if ( show ) {
                    // Reset the inline display of this element to learn if it is
                    // being hidden by cascaded rules or not
                    if ( !values[ index ] && elem.style.display === "none" ) {
                        elem.style.display = "";
                    }

                    // Set elements which have been overridden with display: none
                    // in a stylesheet to whatever the default browser style is
                    // for such an element
                    if ( (elem.style.display === "" && jQuery.css( elem, "display" ) === "none") ||
                        !jQuery.contains( elem.ownerDocument.documentElement, elem ) ) {
                        values[ index ] = jQuery._data( elem, "olddisplay", defaultDisplay(elem.nodeName) );
                    }
                } else {
                    display = jQuery.css( elem, "display" );

                    if ( !values[ index ] && display !== "none" ) {
                        jQuery._data( elem, "olddisplay", display );
                    }
                }
            }

            // Set the display of most of the elements in a second loop
            // to avoid the constant reflow
            for ( index = 0; index < length; index++ ) {
                elem = elements[ index ];
                if ( !elem.style ) {
                    continue;
                }
                if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
                    elem.style.display = show ? values[ index ] || "" : "none";
                }
            }

            return elements;
        };

        //show方法本身
        return speed || speed === 0 ?
            this.animate( genFx( "show", true ), speed, easing, callback ) :
            showHide( this, true );
});





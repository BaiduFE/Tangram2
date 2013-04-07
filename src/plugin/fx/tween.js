///import plugin.fx;
///import plugin._util_.fx;
///import baidu.dom.css;
///import baidu.extend;
///import baidu._util_.cssHooks;

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

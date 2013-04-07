///import baidu;
///import baidu.plugin;
///import baidu.each;
///import plugin.fx;
///import plugin.fx.animate;
///import baidu._util_.isHidden

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
    baidu.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
    }, function( name, props ) {
        presets[ name ] = function( speed, easing, callback ) {
            return this.animate( props, speed, easing, callback );
        };
    });

    baidu.each([ "toggle", "show", "hide" ], function( i, name ) {
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
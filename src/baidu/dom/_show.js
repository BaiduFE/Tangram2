/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.dom._showHide;

baidu.dom.extend({
    show:function ( speed, easing, callback ) {
            return speed == null || typeof speed === "boolean" ||
                // special check for .toggle( handler, handler, ... )
                ( (typeof speed === 'function') && (typeof easing === 'function') ) ?
                cssFn.apply( this, arguments ) :
                this.animate( genFx( name, true ), speed, easing, callback );
    };
});

    var cssFn = baidu.dom.show;
    baidu.dom.show = function( speed, easing, callback ) {
        return speed == null || typeof speed === "boolean" ||
            // special check for .toggle( handler, handler, ... )
            ( (typeof speed === 'function') && (typeof easing === 'function') ) ?
            baidu.dom.show.apply( this, arguments ) :
            this.animate( genFx( name, true ), speed, easing, callback );
    };

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.dom._showHide;

baidu.dom.extend({
    show : function( speed, easing, callback ) {
        if(speed == null || typeof speed === 'boolean'){
            baidu.dom._showHide( this, true );
        }else{
            this.animate( genFx( name, true ), speed, easing, callback );
        };
    }
});
/**
 * @author dron
 */

///import baidu.dom._eventBase;

void function( base, listener ){
    if( base.listener )return ;
    
    listener = base.listener = {};
    
    if( window.addEventListener )
        listener.add = function( target, name, fn ){
            target.addEventListener( name, fn, false );
        };
    else if( window.attachEvent )
        listener.add = function( target, name, fn ){
            target.attachEvent( "on" + name, fn );
        };
}( baidu.dom._eventBase );
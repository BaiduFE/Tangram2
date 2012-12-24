/**
 * @author dron
 */

///import baidu._util_.eventBase;

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
}( baidu._util_.eventBase );
/**
 * @author dron
 */

///import baidu.dom;
///import baidu.event;
///import baidu._util_.eventBase.queue;

void function( base, be ){
    if( base.core )return ;

    var queue = base.queue;
    var core = base.core = {};
    var special = be.special = {};
    var push = [].push;

    var findVestedEl = function( target, parents ){
        for( var i = 0, l = parents.length; i < l; i ++ )
            if( parents.get(i).contains( target ) )
                return parents[i];
    };

    core.build = function( target, name, fn, selector, data ){

        var bindElements;

        if( selector )
            bindElements = baidu.dom( selector, target );

        if( ( name in special ) && special[name].pack )
            fn = special[name].pack( fn );

        return function( e ){ // e is instance of baidu.event()
            var t = baidu.dom( e.target ), args = [ e ], bindElement;

            if( data && !e.data ) 
                e.data = data;
            if( e.triggerData )
                push.apply( args, e.triggerData );

            if( !bindElements )
                return e.result = fn.apply( target, args );

            for(var i = 0; i < 2; i ++){
                if( bindElement = findVestedEl( e.target, bindElements ) )
                    return e.result = fn.apply( bindElement, args );
                bindElements = baidu.dom( selector, target );
            }
        };
    };

    core.add = function( target, type, fn, selector, data, one ){
        var pkg = this.build( target, type, fn, selector, data ), attachElements, bindType;
        bindType = type;
        if(type in special)
            attachElements = special[type].attachElements,
            bindType = special[type].bindType || type;

        queue.add( target, type, bindType, { type: type, pkg: pkg, orig: fn, one: one, delegate: selector }, attachElements );
    };

    core.remove = function( target, type, fn, selector ){
        queue.remove( target, type, fn, selector );
    };

}( baidu._util_.eventBase, baidu.event );
/**
 * @author dron
 */

///import baidu.dom.on;
///import baidu.dom.off;

baidu.dom.extend({
	one: function( type, data, fn ){
		var me = this;

		if( typeof data == "function" ){
			fn = data;
			data = undefined;
		}

		if( typeof type == "object" && type ){
		    baidu.each( type, function( fn, type ){
		        this.one( type, data, fn );
		    }, this );
		    return this;
		}

		var newfn = function(){
			me.off( type, newfn );
		    return fn.apply( me, arguments );
		};

		return this.on( type, data, newfn );
	}
});
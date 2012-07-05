module('baidu.dom.scrollLeft');

test("baidu.dom().scrollLeft()", function(){
	var div, textarea, body, iframe;

	div = create( "div", 100, 100 );
	textarea = create( "textarea", 100, 100 );
	body = create( "body", 100, 100 );
	iframe = create( "iframe", 100, 100 );

	equal( div.scrollLeft(), 100, "div scrollLeft" );
	equal( textarea.scrollLeft(), 100, "textarea scrollLeft" );
	equal( body.scrollLeft(), 100, "body scrollLeft" );
	equal( iframe.scrollLeft(), 100, "iframe scrollLeft" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
});

test("baidu.dom().scrollLeft(value)", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
	body = create( "body" );
	iframe = create( "iframe" );

	equal( div.scrollLeft( 100 ).scrollLeft(), 100, "div scrollLeft" );
	equal( textarea.scrollLeft( 100 ).scrollLeft(), 100, "textarea scrollLeft" );
	equal( body.scrollLeft( 100 ).scrollLeft(), 100, "body scrollLeft" );
	equal( iframe.scrollLeft( 100 ).scrollLeft(), 100, "iframe scrollLeft" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
});

test("baidu.dom().scrollLeft( NaN )", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
	body = create( "body" );
	iframe = create( "iframe" );

	equal( div.scrollLeft( NaN ).scrollLeft(), 0, "div scrollLeft" );
	equal( textarea.scrollLeft( NaN ).scrollLeft(), 0, "textarea scrollLeft" );
	equal( body.scrollLeft( NaN ).scrollLeft(), 0, "body scrollLeft" );
	equal( iframe.scrollLeft( NaN ).scrollLeft(), 0, "iframe scrollLeft" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
});

test("baidu.dom().scrollLeft( -n )", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
	body = create( "body" );
	iframe = create( "iframe" );

	equal( div.scrollLeft( -100 ).scrollLeft(), 0, "div scrollLeft" );
	equal( textarea.scrollLeft( -100 ).scrollLeft(), 0, "textarea scrollLeft" );
	equal( body.scrollLeft( 100 ).scrollLeft( -100 ).scrollLeft(), 100, "body scrollLeft" );
	equal( iframe.scrollLeft( -100 ).scrollLeft(), 0, "iframe scrollLeft" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
});

test("baidu.dom().scrollLeft( n.n )", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
	body = create( "body" );
	iframe = create( "iframe" );

	equal( div.scrollLeft( 10.5 ).scrollLeft(), 11, "div scrollLeft" );
	equal( textarea.scrollLeft( 10.5 ).scrollLeft(), 11, "textarea scrollLeft" );
	equal( body.scrollLeft( 10.5 ).scrollLeft(), 11, "body scrollLeft" );
	equal( iframe.scrollLeft( 10.5 ).scrollLeft(), 11, "iframe scrollLeft" );

	baidu.each( [ div, textarea, body, iframe ], function( item ){ item.remove(); } );
});

function create( tag, sleft, stop ){
    var el = document.createElement( tag );

    if( tag == "div" )
    	el.style.overflow = "scroll";

    el.value = el.innerHTML = new Array( 500 ).join( "A B C D E " );

    if( typeof sleft != "undefined" )
        el.scrollLeft = sleft;

    if( typeof stop != "undefined" )
    	el.scrollLeft = stop;

    document.body.appendChild( el );
    var El = baidu.dom( el );
    El.remove = function(){
        document.body.removeChild( el );
    }

    return El;
}
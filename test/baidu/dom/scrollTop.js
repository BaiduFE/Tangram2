module('baidu.dom.scrollTop');

test("baidu.dom().scrollTop()", function(){
	var div, textarea, body, iframe;

	div = create( "div", 100, 100 );
	textarea = create( "textarea", 100, 100 );
//	body = create( "body", 100, 100 );
//	iframe = create( "iframe", 100, 100 );

	equal( div.scrollTop(), 100, "div scrollTop" );
	equal( textarea.scrollTop(), 100, "textarea scrollTop" );
//	equal( body.scrollTop(), 100, "body scrollTop" );
//	equal( iframe.scrollTop(), 100, "iframe scrollTop" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
});

test("baidu.dom().scrollTop(value)", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollTop( 100 ).scrollTop(), 100, "div scrollTop" );
	equal( textarea.scrollTop( 100 ).scrollTop(), 100, "textarea scrollTop" );
//	equal( body.scrollTop( 100 ).scrollTop(), 100, "body scrollTop" );
//	equal( iframe.scrollTop( 100 ).scrollTop(), 100, "iframe scrollTop" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
});

test("baidu.dom().scrollTop( NaN )", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollTop( NaN ).scrollTop(), 0, "div scrollTop" );
	equal( textarea.scrollTop( NaN ).scrollTop(), 0, "textarea scrollTop" );
//	equal( body.scrollTop( NaN ).scrollTop(), 0, "body scrollTop" );
//	equal( iframe.scrollTop( NaN ).scrollTop(), 0, "iframe scrollTop" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
});

test("baidu.dom().scrollTop( -n )", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollTop( -100 ).scrollTop(), 0, "div scrollTop" );
	equal( textarea.scrollTop( -100 ).scrollTop(), 0, "textarea scrollTop" );
//	equal( body.scrollTop( 100 ).scrollTop( -100 ).scrollTop(), 100, "body scrollTop" );
//	equal( iframe.scrollTop( -100 ).scrollTop(), 0, "iframe scrollTop" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
});

test("baidu.dom().scrollTop( n.n )", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollTop( 10.5 ).scrollTop(), 10, "div scrollTop" );
	equal( textarea.scrollTop( 10.5 ).scrollTop(), 10, "textarea scrollTop" );
//	equal( body.scrollTop( 10.5 ).scrollTop(), 11, "body scrollTop" );
//	equal( iframe.scrollTop( 10.5 ).scrollTop(), 11, "iframe scrollTop" );

	baidu.each( [ div, textarea ], function( item ){ item.remove(); } );
});

function create( tag, sLeft, sTop ){
    var el = document.createElement( tag );
    document.body.appendChild( el );
    
    
    if( tag == "div" )
    	el.style.overflow = "scroll";
    
    el[tag === 'textarea' ? 'value' : 'innerHTML'] = new Array(50).join('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz<br/>\n');
    
    el.style.width =
    el.style.height = '100px';

    if( typeof sLeft != "undefined" )
        el.scrollLeft = sLeft;

    if( typeof sTop != "undefined" )
    	el.scrollTop = sTop;

    
    var El = baidu.dom( el );
    El.remove = function(){
        document.body.removeChild( el );
    }

    return El;
}
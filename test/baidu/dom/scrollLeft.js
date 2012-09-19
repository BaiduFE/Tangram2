module('baidu.dom.scrollLeft');

test("baidu.dom().scrollLeft()", function(){
	var div, textarea, body, iframe;

	div = create( "div", 100, 100 );
	textarea = create( "textarea", 100, 100 );
//	body = create( "body", 100, 100 );
//	iframe = create( "iframe", 100, 100 );

	equal( div.scrollLeft(), 100, "div scrollLeft" );
	equal( textarea.scrollLeft(), 0, "textarea scrollLeft" );//textarea没有横向滚动条
//	equal( body.scrollLeft(), 100, "body scrollLeft" );
//	equal( iframe.scrollLeft(), 100, "iframe scrollLeft" );

	$.each( [ div, textarea ], function( index, item ){ item.remove(); } );
});

test("baidu.dom().scrollLeft(value)", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollLeft( 200 ).scrollLeft(), 200, "div scrollLeft" );
	equal( textarea.scrollLeft( 100 ).scrollLeft(), 0, "textarea scrollLeft" );
//	equal( body.scrollLeft( 100 ).scrollLeft(), 100, "body scrollLeft" );
//	equal( iframe.scrollLeft( 100 ).scrollLeft(), 100, "iframe scrollLeft" );

	$.each( [ div, textarea ], function( index, item ){ item.remove(); } );
});

test("baidu.dom().scrollLeft( NaN )", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollLeft( NaN ).scrollLeft(), 0, "div scrollLeft" );
	equal( textarea.scrollLeft( NaN ).scrollLeft(), 0, "textarea scrollLeft" );
//	equal( body.scrollLeft( NaN ).scrollLeft(), 0, "body scrollLeft" );
//	equal( iframe.scrollLeft( NaN ).scrollLeft(), 0, "iframe scrollLeft" );

	$.each( [ div, textarea ], function( index, item ){ item.remove(); } );
});

test("baidu.dom().scrollLeft( -n )", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollLeft( -100 ).scrollLeft(), 0, "div scrollLeft" );
	equal( textarea.scrollLeft( -100 ).scrollLeft(), 0, "textarea scrollLeft" );
//	equal( body.scrollLeft( 100 ).scrollLeft( -100 ).scrollLeft(), 100, "body scrollLeft" );
//	equal( iframe.scrollLeft( -100 ).scrollLeft(), 0, "iframe scrollLeft" );

	$.each( [ div, textarea ], function( index, item ){ item.remove(); } );
});

test("baidu.dom().scrollLeft( n.n )", function(){
	var div, textarea, body, iframe;

	div = create( "div" );
	textarea = create( "textarea" );
//	body = create( "body" );
//	iframe = create( "iframe" );

	equal( div.scrollLeft( 10.5 ).scrollLeft(), 10, "div scrollLeft" );//保持和jq一致
	equal( textarea.scrollLeft( 10.5 ).scrollLeft(), 0, "textarea scrollLeft" );
//	equal( body.scrollLeft( 10.5 ).scrollLeft(), 11, "body scrollLeft" );
//	equal( iframe.scrollLeft( 10.5 ).scrollLeft(), 11, "iframe scrollLeft" );

	$.each( [ div, textarea ], function( index, item ){ item.remove(); } );
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

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").scrollLeft("wangxiao");
    equal(result,0);
});
module('baidu.dom.outerWidth');

test("baidu.dom(el).outerWidth()", function(){
	testGet( "div" );
	testGet( "span" );
	testGet( "body" );
	testGet( "input" );
	testGet( "textarea" );
});

function testGet( tag ){
	var el = create( tag );
    equal( baidu.dom( el ).outerWidth(), 100, "check " + tag + " outerWidth()" );
    equal( baidu.dom( el ).outerWidth( true ), 120, "check " + tag + " outerWidth( true )" );
    el.parentNode.removeChild( el );
}

function create( tag ){
	var layer = document.createElement( tag );

	layer.style.width =
	layer.style.height =
	layer.style.margin =
	layer.style.padding = "20px";
	layer.style.border = "20px solid #fff";

	document.body.appendChild( layer );

	return layer;
}
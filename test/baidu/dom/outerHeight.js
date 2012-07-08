module('baidu.dom.outerHeight');

test("baidu.dom(el).outerHeight()", function(){
	testGet( "div" );
	testGet( "span" );
	testGet( "body" );
	testGet( "input" );
	testGet( "textarea" );
});

function testGet( tag ){
	var el = create( tag );
    equal( baidu.dom( el ).outerHeight(), 100, "check " + tag + " outerHeight()" );
    equal( baidu.dom( el ).outerHeight( true ), 120, "check " + tag + " outerHeight( true )" );
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
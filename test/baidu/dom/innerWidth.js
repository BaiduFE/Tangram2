module('baidu.dom.innerWidth');

test("baidu.dom(el).innerWidth()", function(){
	testGet( "div" );
	testGet( "span" );
	testGet( "body" );
	testGet( "input" );
	testGet( "textarea" );
});

function testGet( tag ){
	var el = create( tag );
    equal( baidu.dom( el ).innerWidth(), 60, "check " + tag + " innerWidth" );
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
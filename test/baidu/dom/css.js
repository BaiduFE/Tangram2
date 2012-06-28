module('baidu.dom.css');

var ie = /msie/i.test( navigator.userAgent );

var div = document.createElement("div");
	div.style.position = "absolute";
	div.style.top = "-10000px";

document.documentElement.appendChild(div);

var appendStyle = function(text){
	var style;

	if( arguments.length > 1 )
		text = [].join.call( arguments, "" );

	if( document.createStyleSheet )
		style = document.createStyleSheet(),
		style.cssText = text;
	else
		style = document.createElement( "style" ),
		style.type = "text/css",
		style.appendChild( document.createTextNode( text ) ),
		document.documentElement.appendChild( style );
};

var getStyle = ie ?
	function( dom, name ){ return dom.currentStyle[ name ]; } :
	function( dom, name ){ return document.defaultView.getComputedStyle( dom, null ).getPropertyValue( name ); };

var css = function( name, value ){ return baidu.dom( div ).css( name, value ); };
var get = function( name ){ return getStyle( div, name ); }

appendStyle(" .a{ color: red; opacity: .5; filter: alpha(opacity=50); display: inline; } ");

ua.importsrc("baidu.dom.styleFixer", function(){

	test("baidu.dom(div).css(name)", function(){
		div.className = "a";

		equal( css("position"), "absolute", "position" );
		ok( css("color") == "red" || css("color") == "rgb(255, 0, 0)" || css("color") == "#f00", "color" );
		equal( css("opacity"), .5, "opacity" );
		equal( css("display"), "inline", "display" );
		equal( css("z-index"), "", "z-index" ); // 抹平？
	});

	test("baidu.dom(div).css(name,value)", function(){
		css("position", "relative");
		css("color", "green");
		css("opacity", .1);

		equal( get("position"), "relative", "position" );
		ok( get("color") == "green" || get("color") == "rgb(0, 128, 0)" || get("color") == "#008000", "color" );
		
		if( ie )
			ok( ~ div.style.filter.indexOf("alpha"), "opacity" );

		css( "z-index", 0 );
		equal( css("z-index"), 0, "z-index" ); // 抹平？

		css( "zIndex", .2 );
		equal( css("z-index"), .2, "zIndex" );
		equal( css("zIndex"), .2, "zIndex" );

		css( "width", 100 );
		equal( css("width"), "100px" );
		equal( get("width"), "100px" );

		css( "width", "200px" );
		equal( css("width"), "200px" );
		equal( get("width"), "200px" );
	});



	start();
});

stop();
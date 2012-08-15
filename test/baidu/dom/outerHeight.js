module('baidu.dom.outerHeight');

test("baidu.dom(el).outerHeight()", function(){
	testGet( "div" );
	testGet( "span" );//如何改
	testGet( "body" );
	testGet( "input" );
	testGet( "textarea" );
});

function testGet( tag ){
	var el = create( tag );
	equal( baidu.dom( el ).outerHeight(), el.offsetHeight, "check " + tag + " outerHeight()" );
	equal( baidu.dom( el ).outerHeight( true ), el.offsetHeight + style(el, 'marginTop') + style(el, 'marginBottom'), "check " + tag + " outerHeight( true )" );
	
	
	
//    equal( baidu.dom( el ).outerHeight(), 100, "check " + tag + " outerHeight()" );
//    equal( baidu.dom( el ).outerHeight( true ), 140, "check " + tag + " outerHeight( true )" );
    el.parentNode.removeChild( el );
}

function create( tag ){
	var layer = document.createElement( tag );
    document.body.appendChild( layer );
	layer.style.width =
	layer.style.height =
	layer.style.margin =
	layer.style.padding = "20px";
	layer.style.border = "20px solid #fff";
    !~'body|input'.indexOf(tag) && (layer.innerHTML = '&nbsp');
	return layer;
}
function style(el, key){
    var result;
    if(document.documentElement.currentStyle){
        result = el.currentStyle[key];
    }else{
        var defaultView = el.ownerDocument.defaultView,
            computedStyle = defaultView && defaultView.getComputedStyle
                && defaultView.getComputedStyle(el, null);
        result = computedStyle.getPropertyValue(key) || computedStyle[key];
    }
    return parseInt(result) || 0;
}
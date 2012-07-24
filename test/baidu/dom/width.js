module('baidu.dom.width');

test("常规测试", function(){
	testGet( "div" );
	testGet( "input" );
	testGet( "body" );
	testGet( "span" );
});

test("window and document", function(){
    var doc = document.documentElement,
        clientVal = doc.clientWidth,
        scrollVal = doc.scrollWidth;
	equal( baidu.dom( window ).width(), clientVal, "window" );
	equal( baidu.dom( document ).width(), Math.max(clientVal, scrollVal), "document" );
});

test("display:none", function(){
	var div = create( "div" );
	div.style.width = "100px";
	div.style.display = "none";
	equal( baidu.dom( div ).width(), 100, "display:none;" );
	div.parentNode.removeChild( div );

	var div = create( "div" );
	div.style.width = "100px";
	div.style.visibility = "hidden";
	equal( baidu.dom( div ).width(), 100, "visibility:hidden;" );
	div.parentNode.removeChild( div );
});

function testGet( el ){
    diff( el, 100 );
    diff( el, 0 );
    diff( el, -100 );
    diff( el, NaN );
}

function diff( el, number ){
    var tagName = el.toLowerCase(),
        prop = tagName === 'input' ? 'value' : 'innerHTML';
	el = create( el );
	el.style.margin = el.style.padding = "10px";
	!~'body'.indexOf(tagName) && (el[prop] = '&nbsp');
	equal( baidu.dom( el ).width( number ).width(),
	   el.offsetWidth - style(el, 'borderLeftWidth') - style(el, 'borderRightWidth') - style(el, 'paddingLeft') - style(el, 'paddingRight'),
	   "针对 " + el.tagName + " 节点设置(" + number + ")和取得 width");
	
	
//    equal( baidu.dom( el ).width( number ).width(), isNaN( number ) ? 0 : Math.max( number, 0 ), "针对 " + el + " 节点设置(" + number + ")和取得 width");

    if( el !== document.body && el !== window && el !== document )
    	el.parentNode.removeChild( el );
}

function create( tag ){
	if( typeof tag == "object" )
	    return tag;

	var el = document.createElement( tag );
	var parent;

	el.style.width = el.style.height = "0";
	el.style.overflow = "hidden";

	if( tag === "body" ){
	    parent = document.documentElement;
	}else{
	    parent = document.body;
	}

	parent.appendChild( el );

	return el;
};
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
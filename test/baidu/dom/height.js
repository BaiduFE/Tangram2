module('baidu.dom.height');

test("常规测试", function(){
	testGet( "div" );
	testGet( "input" );
	testGet( "body" );
	testGet( "span" );
});

test("window and document", function(){
    var doc = document.documentElement,
        clientVal = doc.clientHeight,
        scrollVal = doc.scrollHeight;
	equal( baidu.dom( window ).height(), clientVal, "window" );
	equal( baidu.dom( document ).height(), Math.max(clientVal, scrollVal), "document" );
});

function testGet( el ){
    diff( el, 100 );
    diff( el, 0 );
    diff( el, -100 );
    diff( el, NaN );
}

function diff( el, number ){
	el = create( el );
	el.style.margin = el.style.padding = "10px";
	el[el.tagName.toLowerCase() === 'input' ? 'value' : 'innerHTML'] = '&nbsp';
	
	equal(baidu.dom(el).height(number).height(),
	   el.offsetHeight - style(el, 'borderTopWidth') - style(el, 'borderBottomWidth') - style(el, 'paddingTop') - style(el, 'paddingBottom'),
	   "针对 " + el.tagName + " 节点设置(" + number + ")和取得 height");
	
    if( el !== document.body && el !== window && el !== document )
    	el.parentNode.removeChild( el );
}

function create( tag ){
	if( typeof tag == "object" )
	    return tag;

	var el = document.createElement( tag );
	var parent;

	el.style.height = el.style.height = "0";
	el.style.overflow = "hidden";

	if( tag == "body" ){
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
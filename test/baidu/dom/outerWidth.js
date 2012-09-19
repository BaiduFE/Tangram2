module('baidu.dom.outerWidth');

test("baidu.dom(el).outerWidth()", function(){
	testGet( "div" );
	testGet( "span" );//如何改
	testGet( "body" );
	testGet( "input" );
	testGet( "textarea" );
});

function testGet( tag ){
	var el = create( tag );
	equal( baidu.dom( el ).outerWidth(), el.offsetWidth, "check " + tag + " outerWidth()" );
	equal( baidu.dom( el ).outerWidth( true ), el.offsetWidth + style(el, 'marginLeft') + style(el, 'marginRight'), "check " + tag + " outerWidth( true )" );
//    equal( baidu.dom( el ).outerWidth(), 100, "check " + tag + " outerWidth()" );
//    equal( baidu.dom( el ).outerWidth( true ), 140, "check " + tag + " outerWidth( true )" );
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
test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").outerWidth("wangxiao");
    equal(result,0);
});
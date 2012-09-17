module('baidu.dom.innerWidth');

test("baidu.dom(el).innerWidth()", function(){
	testGet( "div" );
	testGet( "span" );//如何改
	testGet( "body" );
	testGet( "input" );
	testGet( "textarea" );
});

function testGet( tag ){
	var el = create( tag );
	baidu.dom(el).innerWidth();
	equal( baidu.dom( el ).innerWidth(),
	   el.offsetWidth - style(el, 'borderLeftWidth') - style(el, 'borderRightWidth'), "check " + tag + " innerWidth" );
//    equal( baidu.dom( el ).innerWidth(), 60, "check " + tag + " innerWidth" );
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
    var result = baidu("#baidujsxiaozu").innerWidth("wangxiao");
    ok(result);
});
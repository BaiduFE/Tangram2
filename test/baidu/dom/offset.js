module('baidu.dom.offset');

test("relative + absolute", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	el = baidu.dom("#" + id);

	equal( el.offset().left, 20, "relative + absolute, left" );
	equal( el.offset().top, 20, "relative + absolute, top" );

	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );

	div.remove();
});

test("relative + absolute + scroll", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll;'><div id='" + id3 + "' style='height: 200px;'>1212</div></div>";
	get(id2).scrollTop = 100;

	el = baidu.dom("#" + id3);

	equal( el.offset().left, 20, "relative + absolute + scroll, left" );
	equal( el.offset().top, -80, "relative + absolute + scroll, left" );

	el.offset({ left: 400, top: 400 });

	equal( el.offset().left, 400, "relative + absolute, left" );
	equal( el.offset().top, 400, "relative + absolute, top" );

	div.remove();
});

test("relative + absolute + scroll + scroll", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id(), id4 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px;'>hello</div></div></div>";
	get(id2).scrollTop = 100;
	get(id3).scrollTop = 100;

	el = baidu.dom("#" + id4);

	equal( el.offset().left, 20,  "relative + absolute + scroll + scroll, left");
	equal( el.offset().top, -180,  "relative + absolute + scroll + scroll, top");
	
	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );

	div.remove();
});

test("relative + absolute + scroll + scroll + margin", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id(), id4 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px; margin: 10px;'>hello</div></div></div>";
	get(id2).scrollTop = 100;
	get(id3).scrollTop = 100;

	el = baidu.dom("#" + id4);
	
	equal( el.offset().left, 30,  "relative + absolute + scroll + scroll + margin, left");
	equal( el.offset().top, -170,  "relative + absolute + scroll + scroll + margin, top");
	
	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );

	div.remove();
});

test("relative + absolute + scroll + scroll + margin2", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id(), id4 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll; margin: 10px;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px;'>hello</div></div></div>";
	get(id2).scrollTop = 100;
	get(id3).scrollTop = 100;

	el = baidu.dom("#" + id4);
	
	equal( el.offset().left, 30,  "relative + absolute + scroll + scroll + margin, left");
	equal( el.offset().top, -170,  "relative + absolute + scroll + scroll + margin, top");

	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );

	div.remove();
});

test("relative + absolute + scroll + scroll + margin3", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id(), id4 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll; margin: 10px;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px; margin: 10px;'>hello</div></div></div>";
	get(id2).scrollTop = 100;
	get(id3).scrollTop = 100;

	el = baidu.dom("#" + id4);
	
	equal( el.offset().left, 40,  "relative + absolute + scroll + scroll + margin, left");
	equal( el.offset().top, -160,  "relative + absolute + scroll + scroll + margin, top");

	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );	

	div.remove();
});

test("relative + absolute + scroll + scroll + margin3 + padding", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id(), id4 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll; margin: 10px; padding: 10px;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px; margin: 10px;'>hello</div></div></div>";
	get(id2).scrollTop = 100;
	get(id3).scrollTop = 100;

	el = baidu.dom("#" + id4);
	
	equal( el.offset().left, 50,  "relative + absolute + scroll + scroll + margin, left");
	equal( el.offset().top, -150,  "relative + absolute + scroll + scroll + margin, top");

	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );

	div.remove();
});

test("relative + absolute + scroll + scroll + margin3 + padding + float", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id(), id4 = Id();
	var el;
    
    //id4 float:left 如果再加上margin值，在ie6下，左侧会使margin加倍，offset接口可以准备运算，但用例的用例的浏览器兼容性差了，所以去了id4的margin
	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll; margin: 10px; padding: 10px;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px; float: left;'>hello</div></div></div>";
    get(id2).scrollTop = 100;
	get(id3).scrollTop = 100;
    
	el = baidu.dom("#" + id4);
	
	equal( el.offset().left, 40,  "relative + absolute + scroll + scroll + margin, left");
	equal( el.offset().top, -160,  "relative + absolute + scroll + scroll + margin, top");

	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );
	
	div.remove();
});

test("relative + absolute + scroll + scroll + margin3 + padding + inline", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id(), id4 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll; margin: 10px; padding: 10px;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px; margin: 10px; float: inline;'>hello</div></div></div>";
	get(id2).scrollTop = 100;
	get(id3).scrollTop = 100;

	el = baidu.dom("#" + id4);
	
	equal( el.offset().left, 50,  "relative + absolute + scroll + scroll + margin, left");
	equal( el.offset().top, -150,  "relative + absolute + scroll + scroll + margin, top");

	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );	

	div.remove();
});

test("relative + absolute + scroll + scroll + margin3 + padding + inline2", function(){
	var div = layer().absolute();
	var id = Id(), id2 = Id(), id3 = Id(), id4 = Id();
	var el;

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px; display: inline;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll; margin: 10px; padding: 10px;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px; margin: 10px;'>hello</div></div></div>";
	get(id2).scrollTop = 100;
	get(id3).scrollTop = 100;

	el = baidu.dom("#" + id4);
	
	equal( el.offset().left, 50,  "relative + absolute + scroll + scroll + margin, left");
	equal( el.offset().top, -150,  "relative + absolute + scroll + scroll + margin, top");

	el.offset({ left: 30, top: 30 });

	equal( el.offset().left, 30, "relative + absolute, left" );
	equal( el.offset().top, 30, "relative + absolute, top" );
	
	div.remove();
});


//test("fragment", function(){
//	var el = document.createElement("div");
//
//	el = baidu.dom(el);
//
//	try{
//		equal( el.offset().left, 0,  "fragment, left");
//		equal( el.offset().top, 0,  "fragment, top");
//		el.offset({ left: 30, top: 30 });
//		equal( el.offset().left, 30, "relative + absolute, left" );//对于没有插入的元素，即使设置了位置，但实际取得还是0
//		equal( el.offset().top, 30, "relative + absolute, top" );//对于没有插入的元素，即使设置了位置，但实际取得还是0
//
//	}catch(e){
//		ok( false, "报错啦" );
//	}
//});

//不支持textNode
//test("textnode", function(){
//    var textnode = document.createTextNode("hello");
//	el = baidu.dom(textnode);
//	try{
//		equal( el.offset().left, 0,  "textnode, left");
//		equal( el.offset().top, 0,  "textnode, top");
//        
//		el.offset({ left: 30, top: 30 });
//
//		equal( el.offset().left, 30, "relative + absolute, left" );
//		equal( el.offset().top, 30, "relative + absolute, top" );
//	}catch(e){
//		ok( false, "报错啦" );
//	}
//});

function layer(){
    var div = document.createElement("div");
    document.body.appendChild( div );
    div.remove = function(){
        document.body.removeChild( div );
        return div;
    };
    div.absolute = function(){
	    div.style.position = "absolute";
	    div.style.left =
	    div.style.top = "0";
	    return div;
    };
    return div;
}

function Id(){
    return "_" + ( Id.num = ++ Id.num || 1 );
}

function get(id){
    return document.getElementById(id);
}


test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").offset('hello world');
    ok(result);
});

test('document.body的位置', function(){
    var body = document.body,
        c = baidu.dom(body).offset(),
        margin = {
            left: parseInt($(body).css('marginLeft') || 0),
            top: parseInt($(body).css('marginTop') || 0)
        },
        box = {
            left: body.offsetLeft + (ua.browser.ie > 7 ? margin.left : 0),
            top: body.offsetTop + (ua.browser.ie > 7 ? margin.top : 0)
        };
    equal(c.left, box.left, '');
    equal(c.top, box.top, '');
});
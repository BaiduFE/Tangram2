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

	div.innerHTML = "<div style='position: relative; left: 10px; top: 10px;'><div id='" + id + "' style='position: absolute; left: 10px; top: 10px;'>hello</div></div>";
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll; margin: 10px; padding: 10px;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px; margin: 10px; float: left;'>hello</div></div></div>";
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
	get(id).innerHTML = "<div id='" + id2 + "' style='width: 100px; height: 100px; overflow: scroll; margin: 10px; padding: 10px; display: inline;'><div id='" + id3 + "' style='width: 100px; height: 200px; overflow: scroll;'><div id='" + id4 + "' style='height: 400px; margin: 10px; float: inline;'>hello</div></div></div>";
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

test("fragment", function(){
	var el = document.createElement("div");

	el = baidu.dom(el);

	try{
		equal( el.offset().left, 0,  "fragment, left");
		equal( el.offset().top, 0,  "fragment, top");

		el.offset({ left: 30, top: 30 });

		equal( el.offset().left, 30, "relative + absolute, left" );
		equal( el.offset().top, 30, "relative + absolute, top" );

	}catch(e){
		ok( false, "报错啦" );
	}
});

test("textnode", function(){
    var textnode = document.createTextNode("hello");
	el = baidu.dom(textnode);

	try{
		equal( el.offset().left, 0,  "textnode, left");
		equal( el.offset().top, 0,  "textnode, top");

		el.offset({ left: 30, top: 30 });

		equal( el.offset().left, 30, "relative + absolute, left" );
		equal( el.offset().top, 30, "relative + absolute, top" );
	}catch(e){
		ok( false, "报错啦" );
	}
});

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
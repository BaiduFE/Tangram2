module("baidu.dom.appendTo");
stop();

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};

waiting(function(){ return baidu.query; }, function(){

	var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.top = "-1000px";

	document.documentElement.appendChild(div);

	test("appendTo selector", function(){
		div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
		baidu.dom("div.A").appendTo("div.B");
		equal( formatHTML(div.innerHTML), "<div class=b>B<div class=a>A</div><div class=a>A</div></div><div class=b>B<div class=a>A</div><div class=a>A</div></div>", "div.a appendTo div.b" );
	});

	test("appendTo HTMLElement", function(){
	    div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
	    baidu.dom("div.A").appendTo( baidu.dom("div.B")[0] );
		equal( formatHTML(div.innerHTML), "<div class=b>B<div class=a>A</div><div class=a>A</div></div><div class=b>B</div>", "div.a appendTo div.b dom" );
	});

	test("appendTo HTML", function(){
	    div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
	    var a = baidu.dom("div.A").appendTo( "<div class='C'>C</div><div class='D'>D</div>" );
	    equal( a[0].parentNode.className, "C", "div.a appendTo HTML parentNode className" );
		// equal( formatHTML(div.innerHTML), "", "div.a appendTo HTML" );
	});

	test("appendTo TangramDom", function(){
	    div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
	    baidu.dom("div.A").appendTo( baidu.dom("div.B") );
		equal( formatHTML(div.innerHTML), "<div class=b>B<div class=a>A</div><div class=a>A</div></div><div class=b>B<div class=a>A</div><div class=a>A</div></div>", "div.a appendTo div.b dom" );
	});

	start();
})

ua.importsrc("baidu.sizzle"); // 由于加载的资源中不存在 baidu.sizzle 这个对象，所以不能使用 importsrc 自带的 callback
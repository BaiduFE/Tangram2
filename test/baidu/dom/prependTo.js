module("baidu.dom.prependTo");

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};

var div = document.createElement("div");
	div.style.position = "absolute";
	div.style.top = "-1000px";

test("prependTo selector", function(){
	document.body.appendChild(div);
	div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
	baidu.dom("div.A").prependTo("div.B");
	equal( formatHTML(div.innerHTML), "<div class=b><div class=a>A</div><div class=a>A</div>B</div><div class=b><div class=a>A</div><div class=a>A</div>B</div>", "div.a prependTo div.b" );
});

test("prependTo HTMLElement", function(){
    div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
    baidu.dom("div.A").prependTo( baidu.dom("div.B")[0] );
	equal( formatHTML(div.innerHTML), "<div class=b><div class=a>A</div><div class=a>A</div>B</div><div class=b>B</div>", "div.a prependTo div.b dom" );
});

test("prependTo HTML", function(){
    div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
    var a = baidu.dom("div.A").prependTo( "<div class='C'>C</div><div class='D'>D</div>" );
    equal( a[0].parentNode.className, "C", "div.a prependTo HTML parentNode className" );
	// equal( formatHTML(div.innerHTML), "", "div.a prependTo HTML" );
});

test("prependTo TangramDom", function(){
    div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
    baidu.dom("div.A").prependTo( baidu.dom("div.B") );
	equal( formatHTML(div.innerHTML), "<div class=b><div class=a>A</div><div class=a>A</div>B</div><div class=b><div class=a>A</div><div class=a>A</div>B</div>", "div.a prependTo div.b dom" );
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").prependTo("wangxiao");
    ok(result);
});
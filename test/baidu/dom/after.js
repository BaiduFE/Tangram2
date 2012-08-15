module("baidu.dom.after");

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


test("after TangramDom", function(){
	document.body.appendChild(div);
	div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
	baidu.dom("div.B").after( baidu.dom("div.A") );
	equal( formatHTML(div.innerHTML), "<div class=b>B</div><div class=a>A</div><div class=a>A</div><div class=b>B</div><div class=a>A</div><div class=a>A</div>" );
});

test("after HTMLString", function(){
	div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
	baidu.dom("div.B").after( "<div>C</div>" );
	equal( formatHTML(div.innerHTML), "<div class=a>A</div><div class=a>A</div><div class=b>B</div><div>C</div><div class=b>B</div><div>C</div>" );
});

test("after HTMLString", function(){
	div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
	baidu.dom("div.B").after( "<div>C</div><div>D</div>" );
	equal( formatHTML(div.innerHTML), "<div class=a>A</div><div class=a>A</div><div class=b>B</div><div>C</div><div>D</div><div class=b>B</div><div>C</div><div>D</div>" );
});

test("after HTMLElement", function(){
	div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
	baidu.dom("div.B").after( "<div>C</div><div>D</div>" );
	equal( formatHTML(div.innerHTML), "<div class=a>A</div><div class=a>A</div><div class=b>B</div><div>C</div><div>D</div><div class=b>B</div><div>C</div><div>D</div>" );
});

test("after Function", function(){
	div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
	var a = baidu.dom("div.A", div);
	baidu.dom("div.B", div).after(function(index, html){
	    if(index == 0){
	        return a[0];
	    }else if(index == 1){
	    	return "<div>C</div><div>D</div>";
	    }
	});
	equal( formatHTML(div.innerHTML), "<div class=a>A</div><div class=b>B</div><div class=a>A</div><div class=b>B</div><div>C</div><div>D</div>" );
});
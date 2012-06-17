module("baidu.dom.before");
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

	test("before TangramDom", function(){
		div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
		baidu.dom("div.B").before( baidu.dom("div.A") );
		equal( formatHTML(div.innerHTML), "<div class=a>A</div><div class=a>A</div><div class=b>B</div><div class=a>A</div><div class=a>A</div><div class=b>B</div>" );
	});

	test("before HTMLString", function(){
		div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
		baidu.dom("div.B").before( "<div>C</div>" );
		equal( formatHTML(div.innerHTML), "<div class=a>A</div><div class=a>A</div><div>C</div><div class=b>B</div><div>C</div><div class=b>B</div>" );
	});

	test("before HTMLString", function(){
		div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
		baidu.dom("div.B").before( "<div>C</div><div>D</div>" );
		equal( formatHTML(div.innerHTML), "<div class=a>A</div><div class=a>A</div><div>C</div><div>D</div><div class=b>B</div><div>C</div><div>D</div><div class=b>B</div>" );
	});

	test("before HTMLElement", function(){
		div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
		baidu.dom("div.B").before( "<div>C</div><div>D</div>" );
		equal( formatHTML(div.innerHTML), "<div class=a>A</div><div class=a>A</div><div>C</div><div>D</div><div class=b>B</div><div>C</div><div>D</div><div class=b>B</div>" );
	});

	test("before Function", function(){
		div.innerHTML = "<div class='A'>A</div><div class='A'>A</div><div class='B'>B</div><div class='B'>B</div>";
		var a = baidu.dom("div.A", div);
		ok( false, "function(index, html) 中的 html 拿 html() 接口的返回值" );
		baidu.dom("div.B", div).before(function(index, html){
		    if(index == 0){
		        return a[0];
		    }else if(index == 1){
		    	return "<div>C</div><div>D</div>";
		    }
		});
		equal( formatHTML(div.innerHTML), "<div class=a>A</div><div class=a>A</div><div class=b>B</div><div>C</div><div>D</div><div class=b>B</div>" );
	});

	start();
})

ua.importsrc("baidu.sizzle"); // 由于加载的资源中不存在 baidu.sizzle 这个对象，所以不能使用 importsrc 自带的 callback
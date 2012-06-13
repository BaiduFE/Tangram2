module("baidu.dom.append");
stop();

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };

waiting(function(){ return baidu.selector; }, function(){

	var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.top = "-1000px";

	document.documentElement.appendChild(div);

	var html = "<ul class='M'><li>X</li><li>Y</li><li>Z</li></ul><ul class='N'><li>A</li><li>B</li><li>C</li></ul>";

	test("append Dom", function(){
		div.innerHTML = html;
		baidu.dom("ul.M").append( baidu.dom("ul.N li")[1] );
		equal( getWord(div.innerHTML), "XYZBAC", "UL append Dom" );

		div.innerHTML = html;
		baidu.dom("ul").append(baidu.dom("ul.N li")[1]);
		equal( getWord(div.innerHTML), "XYZBACB", "ULs append Dom" );
	});

	test("append HTML", function(){
	    div.innerHTML = html;
	    baidu.dom("ul").append( "<li>ALL</li>" );
	   	equal( getWord(div.innerHTML), "XYZALLABCALL", "ULs append HTML" );

	   	div.innerHTML = "<table></table>";
	   	baidu.dom("table").append("<tr><td>123</td></tr>");
	   	equal( div.innerHTML.toLowerCase(), "<table><tr><td>123</td></tr></table>", "table append tr" );

	   	div.innerHTML = "<ul></ul>";
	   	baidu.dom("ul").append("<li>123</li>");
	   	equal( div.innerHTML.toLowerCase(), "<ul><li>123</li></ul>", "ul append li" );

	   	div.innerHTML = "<ul></ul>";
	   	baidu.dom("ul").append("<li>123</li><li>456</li>");
	   	equal( div.innerHTML.toLowerCase(), "<ul><li>123</li><li>456</li></ul>", "ul append li" );
	});

	test("append TangramDom", function(){
	    div.innerHTML = html;
	    baidu.dom("ul.M").append( baidu.dom( baidu.dom("ul.N li")[1] ) );
	   	equal( getWord(div.innerHTML), "XYZBAC", "ULs append TangramDom" );
	});

	test("append Function", function(){
	    div.innerHTML = "<div class='M'></div><div class='N'></div>";

	    baidu.dom("div", div).append(function(index, html){
	        if(index == 0){
	            equal( baidu.dom(this).get(0).className, "M", "div.M className");
	            return "<span>A</span><span>B</span>";
	        }else if(index == 1){
	        	equal( baidu.dom(this).get(0).className, "N", "div.N className");
	            return "<span>C</span><span>D</span>";
	        }
	    });

	    equal( getWord(div.innerHTML), "ABCD", "div append HTML" );
	});

	test("append Array", function(){
	    div.innerHTML = "<div class='M'>D</div>";

	    baidu.dom("div.M", div).append([
	    	document.createTextNode("A"),
	    	document.createTextNode("B"),
	    	document.createTextNode("C")
	    ]);

	   	equal( getWord(div.innerHTML), "DABC", "div append TextNode Array" );
	});

	start();
})

ua.importsrc("baidu.sizzle"); // 由于加载的资源中不存在 baidu.sizzle 这个对象，所以不能使用 importsrc 自带的 callback
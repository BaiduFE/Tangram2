module("baidu.dom.prepend");
stop();

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };

waiting(function(){ return baidu.selector; }, function(){

	var div = document.createElement("div");
		div.style.position = "absolute";
		div.style.top = "-1000px";

	document.documentElement.appendChild(div);

	var html = "<ul class='M'><li>X</li><li>Y</li><li>Z</li></ul><ul class='N'><li>A</li><li>B</li><li>C</li></ul>";

	test("prepend Dom", function(){
		div.innerHTML = html;
		baidu.dom("ul.M").prepend( baidu.dom("ul.N li")[1] );
		equal( getWord(div.innerHTML), "BXYZAC", "UL prepend Dom" );

		div.innerHTML = html;
		baidu.dom("ul").prepend(baidu.dom("ul.N li")[1]);
		equal( getWord(div.innerHTML), "BXYZBAC", "ULs prepend Dom" );
	});

	test("prepend HTML", function(){
	    div.innerHTML = html;
	    baidu.dom("ul").prepend( "<li>ALL</li>" );
	   	equal( getWord(div.innerHTML), "ALLXYZALLABC", "ULs prepend HTML" );

	   	div.innerHTML = "<table></table>";
	   	baidu.dom("table").prepend("<tr><td>123</td></tr>");
	   	equal( div.innerHTML.toLowerCase(), "<table><tr><td>123</td></tr></table>", "table prepend tr" );

	   	div.innerHTML = "<ul></ul>";
	   	baidu.dom("ul").prepend("<li>123</li>");
	   	equal( div.innerHTML.toLowerCase(), "<ul><li>123</li></ul>", "ul prepend li" );

	   	div.innerHTML = "<ul></ul>";
	   	baidu.dom("ul").prepend("<li>123</li><li>456</li>");
	   	equal( div.innerHTML.toLowerCase(), "<ul><li>123</li><li>456</li></ul>", "ul prepend li" );
	});

	test("prepend TangramDom", function(){
	    div.innerHTML = html;
	    baidu.dom("ul.M").prepend( baidu.dom( baidu.dom("ul.N li")[1] ) );
	   	equal( getWord(div.innerHTML), "BXYZAC", "ULs prepend TangramDom" );
	});

	test("prepend Function", function(){
	    div.innerHTML = "<div class='M'></div><div class='N'></div>";

	    baidu.dom("div", div).prepend(function(index, html){
	        if(index == 0){
	            equal( baidu.dom(this).get(0).className, "M", "div.M className");
	            return "<span>A</span><span>B</span>";
	        }else if(index == 1){
	        	equal( baidu.dom(this).get(0).className, "N", "div.N className");
	            return "<span>C</span><span>D</span>";
	        }
	    });

	    equal( getWord(div.innerHTML), "ABCD", "div prepend HTML" );
	});

	test("prepend Array", function(){
	    div.innerHTML = "<div class='M'>D</div>";

	    baidu.dom("div.M", div).prepend([
	    	document.createTextNode("A"),
	    	document.createTextNode("B"),
	    	document.createTextNode("C")
	    ]);

	   	equal( getWord(div.innerHTML), "ABCD", "div prepend TextNode Array" );
	});

	start();
})

ua.importsrc("baidu.sizzle"); // 由于加载的资源中不存在 baidu.sizzle 这个对象，所以不能使用 importsrc 自带的 callback
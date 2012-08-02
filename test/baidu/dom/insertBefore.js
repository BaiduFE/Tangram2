module("baidu.dom.insertBefore");

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

document.documentElement.appendChild(div);

test("insertBefore selector", function(){
	div.innerHTML = "<div class='A'></div><div class='A'></div><div class='B'></div><div class='B'></div>";
	baidu.dom("div.A").insertBefore("div.B");
	equal( formatHTML(div.innerHTML), "<div class=a></div><div class=a></div><div class=b></div><div class=a></div><div class=a></div><div class=b></div>" );
});

test("insertBefore TangramDom", function(){
	div.innerHTML = "<div class='A'></div><div class='A'></div><div class='B'></div><div class='B'></div>";
	baidu.dom("div.A").insertBefore( baidu.dom("div.B") );
	equal( formatHTML(div.innerHTML), "<div class=a></div><div class=a></div><div class=b></div><div class=a></div><div class=a></div><div class=b></div>" );
});

test("insertBefore HTMLElement", function(){
	div.innerHTML = "<div class='A'></div><div class='A'></div><div class='B'></div><div class='B'></div>";
	baidu.dom("div.A").insertBefore( baidu.dom("div.B")[0] );
	equal( formatHTML(div.innerHTML), "<div class=a></div><div class=a></div><div class=b></div><div class=b></div>" );
});

test("insertBefore HTML", function(){
	div.innerHTML = "<div class='A'></div><div class='A'></div><div class='B'></div><div class='B'></div>";
	var a = baidu.dom("div.A");
	a.insertBefore( "<div>C</div>" );
	ok( !! a[0], "a[0]" );
	equal(a[0].className, 'A', 'the first element is div');
	equal(a[1].className, 'A', 'the second element is div');
	equal(a[2].innerHTML, 'C', 'the third element is div');
});

// 老接口

test("Element",function(){
	expect(4);
	var div = document.createElement('div');
	var a = document.createElement('a');
	var img = document.createElement('img');
	var p = document.createElement('p');
	document.body.appendChild(div);
	div.appendChild(img);
	baidu.dom.insertBefore(a,div);
	equal(div.previousSibling,a,"insert a before div");
	equal(a.nextSibling,div,"insert a before div-2");
	baidu.dom.insertBefore(p,img);
	equal(img.previousSibling,p,"insert p before img");
	equal(p.nextSibling,img,"insert p before img-2");
	document.body.removeChild(div);
	document.body.removeChild(a);
})
test("id",function(){
	expect(4);
	var div = document.createElement('div');
	var a = document.createElement('a');
	var img = document.createElement('img');
	var p = document.createElement('p');
	document.body.appendChild(div);
	div.appendChild(img);
	div.id = 'div_id';
	img.id = 'img_id';
	baidu.dom.insertBefore(a,'div_id');
	equal(div.previousSibling,a,"insert a before div");
	equal(a.nextSibling,div,"insert a before div-2");
	baidu.dom.insertBefore(p,'img_id');
	equal(img.previousSibling,p,"insert p before img");
	equal(p.nextSibling,img,"insert p before img-2");
	document.body.removeChild(div);
	document.body.removeChild(a);
})

test('textNode',function(){
	expect(5);
	var div = document.createElement('div');
	var textNode = document.createTextNode('textnode');
	var textNode2 = document.createTextNode('textnode2');
	var p = document.createElement('p');
	var img = document.createElement('img');
	document.body.appendChild(div);
	div.appendChild(img);
	baidu.dom.insertBefore(textNode,img);//before img
	baidu.dom.insertBefore(textNode2,textNode);//before textNode
	/**  textNode2->textNode->img   **/
	equal(img.previousSibling,textNode,'img previous node is textNode');
	equal(textNode.previousSibling,textNode2,'textNode previous node is textNode2');
	baidu.dom.insertBefore(p,textNode);//before textNode
	/**  textNode2->p->textNode->img  **/
	equal(img.previousSibling,textNode,'img previous node is textNode');
	equal(textNode.previousSibling,p,'textNode previous node is p');
	equal(p.previousSibling,textNode2,'p previous node is textNode2');
	document.body.removeChild(div);
})

test('异常case',function(){
	expect(1);
	var div = document.createElement('div');
	var img = document.createElement('img');
	baidu.dom.insertBefore(div,img);
	equal(img.previousSibling,null,'insert failed');
})
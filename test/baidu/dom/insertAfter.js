module("baidu.dom.insertAfter");

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


test("insertAfter selector", function(){
	document.body.appendChild(div);
	div.innerHTML = "<div class='A'></div><div class='A'></div><div class='B'></div><div class='B'></div>";
	baidu.dom("div.A").insertAfter("div.B");
	equal( formatHTML(div.innerHTML), "<div class=b></div><div class=a></div><div class=a></div><div class=b></div><div class=a></div><div class=a></div>" );
});

test("insertAfter TangramDom", function(){
	div.innerHTML = "<div class='A'></div><div class='A'></div><div class='B'></div><div class='B'></div>";
	baidu.dom("div.A").insertAfter( baidu.dom("div.B") );
	equal( formatHTML(div.innerHTML), "<div class=b></div><div class=a></div><div class=a></div><div class=b></div><div class=a></div><div class=a></div>" );
});

test("insertAfter HTMLElement", function(){
	div.innerHTML = "<div class='A'></div><div class='A'></div><div class='B'></div><div class='B'></div>";
	baidu.dom("div.A").insertAfter( baidu.dom("div.B")[0] );
	equal( formatHTML(div.innerHTML), "<div class=b></div><div class=a></div><div class=a></div><div class=b></div>" );
});

test("insertAfter HTML", function(){
	div.innerHTML = "<div class='A'></div><div class='A'></div><div class='B'></div><div class='B'></div>";
	var a = baidu.dom("div.A");
	a.insertAfter( "<div>C</div>" );
	ok( !! a[0], "a[0]" );
	//
	equal(a[0].innerHTML, 'C', 'the first element is div');
	equal(a[1].className, 'A', 'the second element is div');
	equal(a[2].className, 'A', 'the third element is div');
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
	baidu.dom.insertAfter(a,div);
	equal(div.nextSibling,a,"insert a after div");
	equal(a.previousSibling,div,"insert a after div-2");
	baidu.dom.insertAfter(p,img);
	equal(img.nextSibling,p,"insert p after img");
	equal(p.previousSibling,img,"insert p after img-2");
	document.body.removeChild(div);
	document.body.removeChild(a);
})
test("老接口：id",function(){
	expect(4);
	var div = document.createElement('div');
	var a = document.createElement('a');
	var img = document.createElement('img');
	var p = document.createElement('p');
	document.body.appendChild(div);
	div.appendChild(img);
	div.id = 'div_id';
	img.id = 'img_id';
	baidu.dom.insertAfter(a,'div_id');
	equal(div.nextSibling,a,"insert a after div");
	equal(a.previousSibling,div,"insert a after div-2");
	baidu.dom.insertAfter(p,'#img_id');
	equal(img.nextSibling,p,"insert p after img");
	equal(p.previousSibling,img,"insert p after img-2");
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
	baidu.dom.insertAfter(textNode,img);//after img
	baidu.dom.insertAfter(textNode2,textNode);//after textNode
	/**  img->textNode->textNode2  **/
	equal(img.nextSibling,textNode,'img next node is textNode');
	equal(textNode.nextSibling,textNode2,'textNode next node is textNode2');
	baidu.dom.insertAfter(p,textNode);//before textNode
	/**  img->textNode->p->textNode2  **/
	equal(img.nextSibling,textNode,'img next node is textNode');
	equal(textNode.nextSibling,p,'textNode next node is p');
	equal(p.nextSibling,textNode2,'p next node is textNode2');
	document.body.removeChild(div);
})

test('异常case',function(){
	expect(1);
	var div = document.createElement('div');
	var img = document.createElement('img');
	baidu.dom.insertAfter(div,img);
	equal(img.nextSibling,null,'insert failed');
})

test("Insert Document Fragment", function(){
        expect(1);

        var div = document.createElement('DIV');

        var fragment = document.createDocumentFragment();
        fragment.innerHTML = "<div id='hello-leeight'>CONTENT</div>";

        baidu.dom.insertAfter(fragment, div);

        equal(div.nextSibling, document.getElementById("hello-leeight"), "pass test");
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").insertAfter("wangxiao");
    ok(result);
});
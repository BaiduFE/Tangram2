module("baidu.dom.getDocument");

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};

// var div = document.createElement("div");
// 	div.style.position = "absolute";
// 	div.style.top = "-1000px";

// document.documentElement.appendChild(div);

test("正常用例", function(){
	expect(4);
	var div = document.createElement('div');
	var img = document.createElement('img');
	document.body.appendChild(div);
	div.appendChild(img);
	div.id = 'div_id';

	equal(baidu.dom(div).getDocument(), document, "div get document");
	equal(baidu.dom('#div_id').getDocument(), document, "div get document by id");
	equal(baidu.dom(img).getDocument(), document, "img get document");
	equal(baidu.dom(document).getDocument(), document, "document get document");
	
	document.body.removeChild(div);
});

test("iframe", function(){
	ua.frameExt(function(w){
		equals(w.baidu.dom(w.parent.document.body).getDocument(), w.parent.document);
		equals(w.parent.baidu.dom(w.document.body).getDocument(), w.document);
		this.finish();
	});
});

// 老接口

test("正常用例", function(){
	expect(4);
	var div = document.createElement('div');
	var img = document.createElement('img');
	document.body.appendChild(div);
	div.appendChild(img);
	div.id = 'div_id';
	equal(baidu.dom.getDocument(div),document,"div get document");
	equal(baidu.dom.getDocument('div_id'),document,"div get document by id");
	equal(baidu.dom.getDocument(img),document,"img get document");
	equal(baidu.dom.getDocument(document),document,"document get document");
	document.body.removeChild(div);
});

test("iframe", function(){
	ua.frameExt(function(w){
		var wd = w.baidu.dom.getDocument,
			pwd = w.parent.baidu.dom.getDocument;
		equals(wd(w.parent.document.body), w.parent.document);
		equals(pwd(w.document.body), w.document);
		this.finish();
	});
});


test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").getDocument("wangxiao");
    ok(result);
});

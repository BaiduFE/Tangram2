module("baidu.dom.empty");

var getWord = function(html){ return html.replace(/<[^>]+>|\s/g, ""); };
var formatHTML = function(html){
	html = html.toUpperCase();
	html = html.replace(/[\r\n]/g, "").replace(/<([^>]+)>/g, function(s, a){
	    return "<" + a.replace(/['"]/g, "").toLowerCase() + ">";
	});
	return html;
};
// TODO: 

test('当前页元素window', function() {
	expect(5);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.id = 'div_id';
	equal(baidu.dom(div).getWindow(), window);
	equal(baidu.dom(document).getWindow(), window);// document
	equal(baidu.dom(document.body).getWindow(), window);// body
	equal(baidu.dom(document.documentElement).getWindow(), window);
	equal(baidu.dom('#div_id').getWindow(), window);

	document.body.removeChild(div);
});

test('iframe', function() {
	ua.frameExt(function(w){
		var gw = w.parent.baidu.dom.getWindow;

		w.$(w.document.body).append('<div id="test_div"></div>');

		equals(gw(w.$('div#test_div')[0]), w);
		equals(gw(w.document), w);
		equals(w.baidu.dom.getWindow(w.parent.document), w.parent);
		this.finish();
	});
});

// 老接口

test('当前页元素window', function() {
	expect(5);
	var div = document.createElement('div');
	document.body.appendChild(div);
	div.id = 'div_id';
	equal(baidu.dom.getWindow(div), window);
	equal(baidu.dom.getWindow(document), window);// document
	equal(baidu.dom.getWindow(document.body), window);// body
	equal(baidu.dom.getWindow(document.documentElement), window);
	equal(baidu.dom.getWindow('div_id'), window);

	document.body.removeChild(div);
});

test('iframe', function() {
	ua.frameExt(function(w){
		var gw = w.parent.baidu.dom.getWindow;
		w.$(w.document.body).append('<div id="test_div"></div>');
		equals(gw(w.$('div#test_div')[0]), w);
		equals(gw(w.document), w);
		equals(w.baidu.dom.getWindow(w.parent.document), w.parent);
		this.finish();
	});
});
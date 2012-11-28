module("baidu.dom.getComputedStyle");

var ie ;
test('prepareTest',function(){
  expect(1);
  stop();
  ua.importsrc("baidu.browser", function(){
    start();
    ok(true,'ok');
    ie = baidu.browser.ie;
  }, "baidu.browser", "baidu.dom.css");
});

test("get style from style", function() {
	if (ua.browser.ie) {
		ok(true, "IE not supportted");
		return;
	}
	expect(7);
	var div = document.createElement('div');
	var img = document.createElement('img');
	document.body.appendChild(div);
	div.appendChild(img);
	div.id = 'div_id';
	div.style['cssFloat'] = div.style['float'] = 'left';// opera下cssFloat生效
	div.style.width = '100px';
	div.style.height = '150px';
	div.style.background = "#FFCC80";
	div.style.color = "red";
	img.style.display = 'block';
	img.style.width = '10%';
	img.style.height = '10%';
	equal(baidu.dom(div).getComputedStyle('float'), 'left');
	equal(baidu.dom(div).getComputedStyle('width'), '100px');
	equal(baidu.dom(div).getComputedStyle('height'), '150px');
	var color = baidu.dom(div).getComputedStyle('color').toLowerCase();
	ok(color == '#ff0000' || color == 'red'
			|| (/rgb\(255,\s?0,\s?0\)/.test(color)), 'color red');
	equal(baidu.dom(img).getComputedStyle('display'), 'block');
	equal(baidu.dom(img).getComputedStyle('width'), '10px');
	equal(baidu.dom(img).getComputedStyle('height'), '15px');

	document.body.removeChild(div);
});

/** css加载也需要时间 * */
test("get style from css file", function() {
	if (ua.browser.ie) {
		ok(true, "IE not supportted");
		return;
	}
	expect(9);
	stop();
	var div = document.createElement('div');
	var div1 = document.createElement('div');
	var img = document.createElement('img');
	var p = document.createElement('p');
	var link = document.createElement('link');
	document.body.appendChild(div);
	document.body.appendChild(div1);

	div.appendChild(p);
	div.appendChild(img);
	$(div).prop('className', "content");
	$(div1).prop('className', 'content');
	$(img).prop('className', 'content');
	$(p).prop('className', 'pid');
	ua.loadcss(upath + 'style.css', function() {
		/** IE的float属性叫styleFloat，firefox则是cssFloat * */
		equal(baidu.dom(div).getComputedStyle('float'), 'left');
		equal(baidu.dom(div).getComputedStyle('width'), '200px');
		var color = baidu.dom(div).getComputedStyle('color').toLowerCase();
		ok(color == '#00ff00' || color == 'rgb(0,255,0)'
				|| color == 'rgb(0, 255, 0)', 'color');
		equal(baidu.dom(div).getComputedStyle('position'), 'relative');
		/** IE的float属性叫styleFloat，firefox则是cssFloat */
		equal(baidu.dom(img).getComputedStyle('float'), 'left');
		equal(baidu.dom(img).getComputedStyle('display'), 'block');
		equal(baidu.dom(img).getComputedStyle('left'), '50px');
		equal(baidu.dom(img).getComputedStyle('width'), '200px');
		equal(baidu.dom(p).getComputedStyle('font-size'), '14px');

		document.body.removeChild(div);
		document.body.removeChild(div1);
		start();
	}, "pid", "font-size", "14px");
});

test("get style from fixer", function() {
    if (ua.browser.ie) {
        ok(true, "IE not supportted");
        return;
    }
    var div = document.createElement('div');
    document.body.appendChild(div);
    var img = document.createElement('img');
    div.appendChild(img);
    equal(baidu.dom.getComputedStyle(img, 'opacity'), '1');
    document.body.removeChild(div);
});

test("get empty style in IE", function() {
	if (ie < 9) {
		stop();
		var div = document.createElement('div');
		div.style.width = '100px';
		equal(baidu.dom.getComputedStyle(div, 'width'), '100px','empty style');
		start();
	}
});

//老用例
test("get style from style", function() {
	if (ua.browser.ie) {
		ok(true, "IE not supportted");
		return;
	}
	expect(7);
	var div = document.createElement('div');
	var img = document.createElement('img');
	document.body.appendChild(div);
	div.appendChild(img);
	div.id = 'div_id';
	div.style['cssFloat'] = div.style['float'] = 'left';// opera下cssFloat生效
	div.style.width = '100px';
	div.style.height = '150px';
	div.style.background = "#FFCC80";
	div.style.color = "red";
	img.style.display = 'block';
	img.style.width = '10%';
	img.style.height = '10%';
	equal(baidu.dom.getComputedStyle(div, 'float'), 'left');
	equal(baidu.dom.getComputedStyle(div, 'width'), '100px');
	equal(baidu.dom.getComputedStyle(div, 'height'), '150px');
	var color = baidu.dom.getComputedStyle(div, 'color').toLowerCase();
	ok(color == '#ff0000' || color == 'red'
			|| (/rgb\(255,\s?0,\s?0\)/.test(color)), 'color red');
	equal(baidu.dom.getComputedStyle(img, 'display'), 'block');
	equal(baidu.dom.getComputedStyle(img, 'width'), '10px');
	equal(baidu.dom.getComputedStyle(img, 'height'), '15px');

	document.body.removeChild(div);
});

/** css加载也需要时间 * */
test("get style from css file", function() {
	if (ua.browser.ie) {
		ok(true, "IE not supportted");
		return;
	}
	expect(9);
	stop();
	var div = document.createElement('div');
	var div1 = document.createElement('div');
	var img = document.createElement('img');
	var p = document.createElement('p');
	var link = document.createElement('link');
	document.body.appendChild(div);
	document.body.appendChild(div1);

	div.appendChild(p);
	div.appendChild(img);
	$(div).prop('className', "content");
	$(div1).prop('className', 'content');
	$(img).prop('className', 'content');
	$(p).prop('className', 'pid');
	ua.loadcss(upath + 'style.css', function() {
		/** IE的float属性叫styleFloat，firefox则是cssFloat * */
		equal(baidu.dom.getComputedStyle(div, 'float'), 'left');
		equal(baidu.dom.getComputedStyle(div, 'width'), '200px');
		var color = baidu.dom.getComputedStyle(div, 'color').toLowerCase();
		ok(color == '#00ff00' || color == 'rgb(0,255,0)'
				|| color == 'rgb(0, 255, 0)', 'color');
		equal(baidu.dom.getComputedStyle(div, 'position'), 'relative');
		/** IE的float属性叫styleFloat，firefox则是cssFloat */
		equal(baidu.dom.getComputedStyle(img, 'float'), 'left');
		equal(baidu.dom.getComputedStyle(img, 'display'), 'block');
		equal(baidu.dom.getComputedStyle(img, 'left'), '50px');
		equal(baidu.dom.getComputedStyle(img, 'width'), '200px');
		equal(baidu.dom.getComputedStyle(p, 'font-size'), '14px');

		document.body.removeChild(div);
		document.body.removeChild(div1);
		start();
	}, "pid", "font-size", "14px");
});

test("get style from fixer", function() {
    if (ua.browser.ie) {
        ok(true, "IE not supportted");
        return;
    }
    var div = document.createElement('div');
    document.body.appendChild(div);
    var img = document.createElement('img');
    div.appendChild(img);
    equal(baidu.dom.getComputedStyle(img, 'opacity'), '1');
    document.body.removeChild(div);
});
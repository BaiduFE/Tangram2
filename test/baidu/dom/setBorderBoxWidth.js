module("baidu.dom.setBorderBoxWidth");
//加载快捷方式
test('老接口：prepareTest',function(){
	expect(1);
	stop();

	//加载快捷方式
	ua.importsrc("baidu.short", function(){
		start();
		ok(true,'ok');
	}, "baidu.trim", "baidu.dom.setBorderBoxWidth");
});

test("老接口：base", function() {
	var check = function(styles, expects) {
		if (baidu.browser.isStrict) {
			var div = document.body.appendChild(document.createElement("div"));
			$(div).css("backgroundColor", "red");
			for ( var style in styles) {
				$(div).css(style, styles[style]);
			}
			baidu.dom.setBorderBoxWidth(div, styles["width"]);
			for ( var expect in expects) {
				equals(parseInt(div.style[expect]), expects[expect], "check "
						+ expect);
			}
			$(div).remove();
		}
	};

	check({
		width : 50,
		padding : 0,
		borderWidth : 0
	}, {
		width : 50
	});

	check({
		width : 50,
		padding : 10,
		borderWidth : 10
	}, {
		width : 10
	});

	check({
		width : 50,
		padding : 10,
		borderWidth : 0
	}, {
		width : 30
	});

	check({
		width : 50,
		padding : 0,
		borderWidth : 10
	}, {
		width : 30
	});

	check({
		width : 50,
		paddingLeft : 10,
		borderWidth : 0
	}, {
		width : 40
	});
	
	check({
		width : 50,
		padding : 0,
		borderLeftWidth : 10
	}, {
		width : 40
	});
});

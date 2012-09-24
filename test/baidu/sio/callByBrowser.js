module('baidu.sio.callByBrowser');

var check1 = function() {
	equals(window.fromBrowser, '百度');
	window.fromBrowser = '';
	start();
};

//新接口
test('callback is function', function() {
	stop();
	baidu.sio(upath + "exist.js").callByBrowser(check1);
});

test('charset utf-8', function() {
	stop();
	baidu.sio(upath + "exist-utf.js").callByBrowser(check1, {
		charset : "UTF-8"
	});
});

test('charset gbk', function() {
	/**
	 * opera下无法动态切换
	 */
	if (ua.browser.opera) {
		ok(true, 'not work on opera');
		return;
	}
	stop();
	baidu.sio(upath + "exist-gbk.js").callByBrowser( check1, {
		charset : "GBK"
	});
});

/**
 * 由于不存在网页不会触发回调，设置半秒超时，用例可能会有问题…… FIXME:to QA:用例有啥问题？
 */
test('js not exist', function() {
	stop();
	var h, check1 = function() {
		clearTimeout(h);
		ok($.browser.msie || false, 'call back will not call');
		start();
	};
	baidu.sio("notexist.js").callByBrowser( check1);
	h = setTimeout(function() {
		ok(true, 'call back not call');
		start();
	}, 500);
});

test('page not exist with timeOut', function() {
	if ($.browser.msie)
		// || $.browser.opera) //更新by bell，opera下照样能call到onfailure
		expect(1);
	else
		expect(2);

	stop();
	var h, check1 = function() {
		clearTimeout(h);
		ok($.browser.msie || false, 'call back will not call');
		start();
	};
	baidu.sio("notexist.js").callByBrowser( check1, {
		timeOut : 200,
		onfailure : function() {
			ok(true, 'onfailure will call @ !IE && !opera');
		}
	});
	h = setTimeout(function() {
		ok(true, 'call back not call');
		start();
	}, 500);
});

//老接口
test('callback is function', function() {
	stop();
	baidu.sio.callByBrowser(upath + "exist.js", check1);
});

test('charset utf-8', function() {
	stop();
	baidu.sio.callByBrowser(upath + "exist-utf.js", check1, {
		charset : "UTF-8"
	});
});

test('charset gbk', function() {
	/**
	 * opera下无法动态切换
	 */
	if (ua.browser.opera) {
		ok(true, 'not work on opera');
		return;
	}
	stop();
	baidu.sio.callByBrowser(upath + "exist-gbk.js", check1, {
		charset : "GBK"
	});
});

/**
 * 由于不存在网页不会触发回调，设置半秒超时，用例可能会有问题…… FIXME:to QA:用例有啥问题？
 */
test('js not exist', function() {
	stop();
	var h, check1 = function() {
		clearTimeout(h);
		ok($.browser.msie || false, 'call back will not call');
		start();
	};
	baidu.sio.callByBrowser("notexist.js", check1);
	h = setTimeout(function() {
		ok(true, 'call back not call');
		start();
	}, 500);
});

test('page not exist with timeOut', function() {
	if ($.browser.msie)
		// || $.browser.opera) //更新by bell，opera下照样能call到onfailure
		expect(1);
	else
		expect(2);

	stop();
	var h, check1 = function() {
		clearTimeout(h);
		ok($.browser.msie || false, 'call back will not call');
		start();
	};
	baidu.sio.callByBrowser("notexist.js", check1, {
		timeOut : 200,
		onfailure : function() {
			ok(true, 'onfailure will call @ !IE && !opera');
		}
	});
	h = setTimeout(function() {
		ok(true, 'call back not call');
		start();
	}, 500);
});
//
//test('测试闭包', function() {
//	stop();
//	baidu.sio.callByBrowser(upath + 'tangram.js', function() {
//		equals(window.TT.version, '1.3.0', 'check version in package');
//		//当前版本已经提升至1.3.6，2011-04-17，bell
//		equals(baidu.version, '1.3.6', 'check version normal');
//		start();
//	});
//});
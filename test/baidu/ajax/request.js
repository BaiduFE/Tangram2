module("baidu.ajax.request");
var ajax_request_baseurl = upath + 'request.php';

//新接口
test("default async and get", function() {
	baidu.ajax(ajax_request_baseurl).request( {
		onsuccess : function(xhr) {
			equals(xhr.responseText, "Hello World!", "xhr return");
			start();
		}
	});
	stop();
});

test("async get", function() {
	baidu.ajax(ajax_request_baseurl).request( {
		onsuccess : function(xhr) {
			equals(xhr.responseText, "Hello World!", "xhr return");
			start();
		},
		async : true
	});
	stop();
});

test("sync get", function() {
	baidu.ajax(ajax_request_baseurl).request( {
		method : 'get',
		onsuccess : function(xhr) {
			equals(xhr.responseText, "Hello World!", "xhr return");
		},
		async : false
	});
});

test("async post", function() {
	baidu.ajax(ajax_request_baseurl).request( {
		method : 'post',
		data : "var1=baidu&var2=tangram",
		onsuccess : function successAction(xhr) {
			equals(xhr.responseText, "baidutangram", "xhr return");
			start();
		}
	});
	stop();
});

test("sync post", function() {
	stop();
	baidu.ajax(ajax_request_baseurl).request({
		method : 'post',
		async : false,
		data : "var1=baidu&var2=tangram",
		onsuccess : function successAction(xhr) {
			equals(xhr.responseText, "baidutangram", "xhr return");
			start();
		}
	});
});

test("header async get", function() {
	baidu.ajax(ajax_request_baseurl + "?var1=baidu&var2=tangram").request( {
		header : "Accept: text/html,application/xhtml+"
				+ "xmlapplication/xml;q=0.9,*\/*;q=0.8",
		onsuccess : function(xhr) {
			equals(xhr.responseText, 'baidutangram', 'check response');
			start();
		}
	});
	stop();
});

test("header sync get", function() {
	expect(1);
	baidu.ajax(ajax_request_baseurl + "?var1=baidu&var2=tangram").request( {
		header : "Accept: text/html,application/xhtml+"
				+ "xmlapplication/xml;q=0.9,*\/*;q=0.8",
		onsuccess : function(xhr) {
			equals(xhr.responseText, 'baidutangram', 'check response');
		},
		async : false
	});
});

test("cache async", function() {
	stop();
	baidu.ajax(ajax_request_baseurl + "?type=cache").request( {
		noCache : false,
		onsuccess : function(xhr, text) {
			equals(text, "dog");
			start();
		}
	});
});

test("no cache async", function() {
	stop();
	baidu.ajax(ajax_request_baseurl + "?type=cache").request( {
		noCache : true,
		onsuccess : function(xhr, text) {
			ok(/=1dog/i.test(text), 'match');
			start();
		}
	});
});
test("cache sync", function() {
	stop();
	baidu.ajax(ajax_request_baseurl + "?type=cache").request( {
		method : 'get',
		noCache : false,
		onsuccess : function(xhr, text) {
			equals(text, "dog");
			start();
		},
		async : false
	});
});

test("no cache sync", function() {
	stop();
	baidu.ajax(ajax_request_baseurl + "?type=cache").request( {
		noCache : true,
		onsuccess : function(xhr, text) {
			ok(/=1dog/i.test(text), 'match');
			start();
		},
		async : false
	});
});

test('on', function() {
	var onhandle = function(status) {
		return function() {
			ok(true, 'on' + status);
		};
	};
	// 200
	baidu.ajax(ajax_request_baseurl + "?type=on&status=200").request( {
		onsuccess : function(xhr, text) {
			equals(xhr.status, 200);
		},
		on200 : onhandle(200),
		async : false
	});

	// 320
	baidu.ajax(ajax_request_baseurl + "?type=on&status=320").request( {
		onsuccess : function(xhr, text) {
			equals(xhr.status, 200);
		},
		on200 : onhandle(320),
		async : false
	});

	// 404
	baidu.ajax(ajax_request_baseurl + "?type=on&status=404").request( {
		onfailure : function(xhr, text) {
			equals(xhr.status, 404);
		},
		on404 : onhandle(404),
		async : false
	});

	// 500
	baidu.ajax(ajax_request_baseurl + "?type=on&status=500").request( {
		onfailure : function(xhr, text) {
			equals(xhr.status, 500);
		},
		on500 : onhandle(500),
		async : false
	});
});

test("test beforerequest by user created ", function() {
	baidu.ajax.onbeforerequest = function(xhr, text) {
		ok(true, 'beforerequest handled');
		equals(text, undefined, 'text is undefined before request');
	};
	baidu.ajax(ajax_request_baseurl).request( {
		method : 'get',
		noCache : 123,
		onsuccess : function(xhr) {
			equals(xhr.responseText, "Hello World!", "xhr return");
		},
		onfailure : function() {
			ok(false, '貌似是个404');
		},
		async : false
	});
	delete baidu.ajax.onbeforerequest;
});

/**
 * 之前的校验方式采用超时，更新为使用全局的失败函数，貌似重复注册会有覆盖情况，暂不考虑
 */
test("输入不存在url以及设定onsuccess事件", function() {
	stop();
	var urlstring = upath + "notexsistpage.php";
	var arg = "var1=baidu&var2=tangram";
	// 注册一个全局fail
	baidu.ajax.onfailure = function() {
		// 这是个全局函数，实际上，post本身并不提供这个接口，而，全局返回失败时
		ok(true, '失败时应该调用这个函数');
		delete baidu.ajax.onfailure;
		start();
	};
	var xhr = baidu.ajax(urlstring).request( {
		'onsuccess' : function() {
			failure('调到这个函数就是bug');
		},
		'method' : 'POST',
		'data' : arg
	});
});

test('尝试通过图片获取服务器时间戳', function() {
	stop();
	baidu.ajax(upath + 'img.jpg').request( {
		noCache : true,
		'onsuccess' : function() {
			ok(true, '事件应该被触发');
			start();
		}
	});
});

test("ontimeout", function() {
	stop();
	baidu.ajax(upath + 'sleep.php?time=2').request( {// 由于用例执行有8秒限时，此处调整等待数据
		'timeout' : 1000,
		'ontimeout' : function() {
			ok(true, 'timeout');
			start();
		},
		'onsuccess' : function() {
			ok(false, 'onsuccess should not trigger');
			start();
		}
	});
});

//老接口
test("老接口：default async and get", function() {
	baidu.ajax.request(ajax_request_baseurl, {
		onsuccess : function(xhr) {
			equals(xhr.responseText, "Hello World!", "xhr return");
			start();
		}
	});
	stop();
});

test("老接口：async get", function() {
	baidu.ajax.request(ajax_request_baseurl, {
		onsuccess : function(xhr) {
			equals(xhr.responseText, "Hello World!", "xhr return");
			start();
		},
		async : true
	});
	stop();
});

test("老接口：sync get", function() {
	baidu.ajax.request(ajax_request_baseurl, {
		method : 'get',
		onsuccess : function(xhr) {
			equals(xhr.responseText, "Hello World!", "xhr return");
		},
		async : false
	});
});

test("老接口：async post", function() {
	baidu.ajax.request(ajax_request_baseurl, {
		method : 'post',
		data : "var1=baidu&var2=tangram",
		onsuccess : function successAction(xhr) {
			equals(xhr.responseText, "baidutangram", "xhr return");
			start();
		}
	});
	stop();
});

test("老接口：sync post", function() {
	stop();
	baidu.ajax.request(ajax_request_baseurl, {
		method : 'post',
		async : false,
		data : "var1=baidu&var2=tangram",
		onsuccess : function successAction(xhr) {
			equals(xhr.responseText, "baidutangram", "xhr return");
			start();
		}
	});
});

test("老接口：header async get", function() {
	baidu.ajax.request(ajax_request_baseurl + "?var1=baidu&var2=tangram", {
		header : "Accept: text/html,application/xhtml+"
				+ "xmlapplication/xml;q=0.9,*\/*;q=0.8",
		onsuccess : function(xhr) {
			equals(xhr.responseText, 'baidutangram', 'check response');
			start();
		}
	});
	stop();
});

test("老接口：header sync get", function() {
	expect(1);
	baidu.ajax.request(ajax_request_baseurl + "?var1=baidu&var2=tangram", {
		header : "Accept: text/html,application/xhtml+"
				+ "xmlapplication/xml;q=0.9,*\/*;q=0.8",
		onsuccess : function(xhr) {
			equals(xhr.responseText, 'baidutangram', 'check response');
		},
		async : false
	});
});

test("老接口：cache async", function() {
	stop();
	baidu.ajax.request(ajax_request_baseurl + "?type=cache", {
		noCache : false,
		onsuccess : function(xhr, text) {
			equals(text, "dog");
			start();
		}
	});
});

test("老接口：no cache async", function() {
	stop();
	baidu.ajax.request(ajax_request_baseurl + "?type=cache", {
		noCache : true,
		onsuccess : function(xhr, text) {
			ok(/=1dog/i.test(text), 'match');
			start();
		}
	});
});
test("老接口：cache sync", function() {
	stop();
	baidu.ajax.request(ajax_request_baseurl + "?type=cache", {
		method : 'get',
		noCache : false,
		onsuccess : function(xhr, text) {
			equals(text, "dog");
			start();
		},
		async : false
	});
});

test("老接口：no cache sync", function() {
	stop();
	baidu.ajax.request(ajax_request_baseurl + "?type=cache", {
		noCache : true,
		onsuccess : function(xhr, text) {
			ok(/=1dog/i.test(text), 'match');
			start();
		},
		async : false
	});
});

test('老接口：on', function() {
	var onhandle = function(status) {
		return function() {
			ok(true, 'on' + status);
		};
	};
	// 200
	baidu.ajax.request(ajax_request_baseurl + "?type=on&status=200", {
		onsuccess : function(xhr, text) {
			equals(xhr.status, 200);
		},
		on200 : onhandle(200),
		async : false
	});

	// 320
	baidu.ajax.request(ajax_request_baseurl + "?type=on&status=320", {
		onsuccess : function(xhr, text) {
			equals(xhr.status, 200);
		},
		on200 : onhandle(320),
		async : false
	});

	// 404
	baidu.ajax.request(ajax_request_baseurl + "?type=on&status=404", {
		onfailure : function(xhr, text) {
			equals(xhr.status, 404);
		},
		on404 : onhandle(404),
		async : false
	});

	// 500
	baidu.ajax.request(ajax_request_baseurl + "?type=on&status=500", {
		onfailure : function(xhr, text) {
			equals(xhr.status, 500);
		},
		on500 : onhandle(500),
		async : false
	});
});

test("老接口：test beforerequest by user created ", function() {
	baidu.ajax.onbeforerequest = function(xhr, text) {
		ok(true, 'beforerequest handled');
		equals(text, undefined, 'text is undefined before request');
	};
	baidu.ajax.request(ajax_request_baseurl, {
		method : 'get',
		noCache : 123,
		onsuccess : function(xhr) {
			equals(xhr.responseText, "Hello World!", "xhr return");
		},
		onfailure : function() {
			ok(false, '貌似是个404');
		},
		async : false
	});
	delete baidu.ajax.onbeforerequest;
});

/**
 * 之前的校验方式采用超时，更新为使用全局的失败函数，貌似重复注册会有覆盖情况，暂不考虑
 */
test("老接口：输入不存在url以及设定onsuccess事件", function() {
	stop();
	var urlstring = upath + "notexsistpage.php";
	var arg = "var1=baidu&var2=tangram";
	// 注册一个全局fail
	baidu.ajax.onfailure = function() {
		// 这是个全局函数，实际上，post本身并不提供这个接口，而，全局返回失败时
		ok(true, '失败时应该调用这个函数');
		delete baidu.ajax.onfailure;
		start();
	};
	var xhr = baidu.ajax.request(urlstring, {
		'onsuccess' : function() {
			failure('调到这个函数就是bug');
		},
		'method' : 'POST',
		'data' : arg
	});
});

test('老接口：尝试通过图片获取服务器时间戳', function() {
	stop();
	baidu.ajax.request(upath + 'img.jpg', {
		noCache : true,
		'onsuccess' : function() {
			ok(true, '事件应该被触发');
			start();
		}
	});
});

test("老接口：ontimeout", function() {
	stop();
	baidu.ajax.request(upath + 'sleep.php?time=2', {// 由于用例执行有8秒限时，此处调整等待数据
		'timeout' : 1000,
		'ontimeout' : function() {
			ok(true, 'timeout');
			start();
		},
		'onsuccess' : function() {
			ok(false, 'onsuccess should not trigger');
			start();
		}
	});
});

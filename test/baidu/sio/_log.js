module("baidu.sio.log");

test("onsuccess", function() {
	stop();
	var check = function() {
		var now = new Date();
		var filename = Math.random() + '.txt';
		var arg = "loginfo=test" + "&file=" + filename;
		var urlstring = upath + 'log.php?' + arg;
		//
		baidu.sio.log(urlstring);
		setTimeout(function() {
			var urlstring = upath + "logcheck.php";
			var xhr = baidu.ajax.post(urlstring, arg, successAction);
			function successAction(xhr, text) {
				equals(text, "test", "get log info 'test' true");
				equals(xhr.responseText, "test", "get log info 'test' true");
				start();
			}
		}, 1000);

	};
	ua.importsrc('baidu.ajax.post', check, 'baidu.ajax.post', 'baidu.sio.log');
});

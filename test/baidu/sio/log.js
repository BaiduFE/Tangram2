module("baidu.sio.log");

//新接口
test("onsuccess", function() {
	stop();
	var check = function() {
		var now = new Date();
		var filename = Math.random() + '.txt';
		var arg = "loginfo=test" + "&file=" + filename;
		var urlstring = upath + 'log.php?' + arg;
		//
		baidu.sio(urlstring).log();
		setTimeout(function() {
			var urlstring = upath + "logcheck.php";
			baidu.post(urlstring, arg, function(result){
				equals(result, "test", "get log info 'test' true");
				start();
			});
		}, 1000);

	};
	ua.importsrc('baidu.post', check, 'baidu.post', 'baidu.sio.log');
});
//老接口
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
			baidu.post(urlstring, arg, function(result){
				equals(result, "test", "get log info 'test' true");
				start();
			});
		}, 1000);

	};
	ua.importsrc('baidu.post', check, 'baidu.post', 'baidu.sio.log');
});

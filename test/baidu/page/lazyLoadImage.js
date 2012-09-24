module("baidu.page.lazyLoadImage");

test("老接口：base", function() {
	expect(3);
	var iframe = document.createElement('iframe');
	document.body.appendChild(iframe);
	$(iframe).css('height', 200).css('width', 200);
	stop();
	iframe.src = upath + 'lli.php?time=' + new Date().getTime();
	var h = setInterval(function() {
		if (frames[0] && frames[0].document
				&& frames[0].document.getElementById("test_img")
				&& frames[0].document.getElementById("test_img").src == '') {
			var img = frames[0].document.getElementById("test_img");
			// 标签就位，
			clearInterval(h);
			var step = 0,

			check = function() {
				if (step == 0) {
					ok(img.src.indexOf("test.jpg") == -1, "图片不会显示");
					step = 1;
					setTimeout(function() {// 这地方必须等，safari上不能连续滚
						frames[0].scroll(0, 1000);
					}, 0);
				} else {
					baidu.dom(frames[0]).off('scroll', check);
					setTimeout(function() {
						ok(img.src.indexOf("test.jpg") >= 0, "图片显示链接更新");
						iframe.parentNode.removeChild(iframe);
						start();
					}, 0);
				}
			};

			baidu.dom(frames[0]).on('scroll', check);
			frames[0].scroll(0, 20);
		}
	}, 50);
});
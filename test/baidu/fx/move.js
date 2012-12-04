module('baidu.fx.move');

test('兼容Magic接口：dom', function() {
	expect(3);
	var t = te.dom[0];
	$(t).css('height', '100px');
	$(t).css('color', 'red');
	$(t).css('position', 'absolute');
	$(t).css('top', '20px');
	$(t).css('left', '10px');
	var m = baidu.fx.move(t, {
		x : 100,
		y : 200,
		onbeforestart : function() {
			ok(true, 'onbeforestart is called');
		},
		onafterfinish : function() {
			equal($(t).css('left'), '110px', 'left');
			equal($(t).css('top'), '220px', 'top');
			start();
		}
	});
	stop();
});

test('兼容Magic接口：position static', function() {
	equals(baidu.fx.move(te.dom[0]), null, 'unsupported for position static');
});

test('兼容Magic接口：id', function() {
	var t = te.dom[0];
	$(t).css('height', '100px');
	$(t).css('color', 'red');
	$(t).css('position', 'relative');

	var startTime;
	var m = baidu.fx.move('test_div', {
		x : 100,
		y : 200,
		duration : 400,
		onbeforestart : function() {
			startTime = new Date().getTime();
		},
		onafterupdate : function(percent) {
			var dur = new Date().getTime() - startTime;
			var percent = dur / 400;
			/* 验证每一次update过程中x，y的坐标是不是和render中定义的一样 */
			ok(
					parseInt($(t).css('top')) - 200
							* (1 - Math.pow(1 - percent, 2)) < 0.00001,
					'get every top update');
			ok(parseInt($(t).css('left')) - 100
					* (1 - Math.pow(1 - percent, 2)) < 0.00001,
					'get every left update');
		},
		onafterfinish : function() {
			equal($(t).css('left'), '100px', 'left');
			equal($(t).css('top'), '200px', 'top');
			start();
		}
	});
	stop();

});
module("baidu.fx.fadeOut");
var op = {/* fx效果方法依赖参数 */
	onbeforestart : function() {
		$(te.dom[0]).css('height', 100).css('background-color', 'red');
	},
	onafterupdate : function() {
		if (!this.checked) {
			this.checked = true;
			if (baidu.browser.ie) {
				var re = /opacity\:\d+/;
				var opacity = re.exec($(te.dom[0]).css('filter')).toString()
						.split(':')[1];
				var a = opacity;
			} else {
				var a = $(te.dom[0]).css('opacity') * 100;
			}
			ok(a >= 95, '启动时显示为非透明 : ' + a);
		}
	},
	onafterfinish : function() {
		if (baidu.browser.ie) {
			var re = /opacity\:\d+/;
			var opacity = re.exec($(te.dom[0]).css('filter')).toString().split(
					':')[1];
			var a = opacity / 100;
		} else {
			var a = $(te.dom[0]).css('opacity') * 100;
		}
		equal(a, 0, '校验结束时透明度');
		start();
	}
};
test('校验元素类型为id', function() {
	te.checkfx.create(te.dom[0].id, {
		method : baidu.fx.fadeOut,
		options : op
	}).checkbase();
});

test('校验元素类型为dom', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.fadeOut,
		options : op
	}).checkbase();
});

test('校验事件序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.fadeOut,
		beforestart : function() {/* 初始设置启动高度为100 */
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checkevents({
		onafterfinish : start
	}, 4);
});

test('校验时间序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.fadeOut,
		beforestart : function() {/* 初始设置启动高度为100 */
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	})
			.checktimeline(
					function(point, timelinepoint) {
						return 100 - 100 * point / timelinepoint;// 均匀渐变，时间敏感
					},
					function() {
						if (baidu.browser.ie) {
							var filter = $(te.dom[0]).css('filter');
							return filter ? /opacity\:\d+/.exec(
									$(te.dom[0]).css('filter')).toString()
									.split(':')[1] : 1;
						} else
							return $(te.dom[0]).css('opacity') * 100;/* 为便于校验，放大100 */
					});
});

test('校验cancel', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.fadeOut,
		beforestart : function() {/* 初始设置启动高度为100 */
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checkcancel();
});
module("baidu.fx.fadeIn");

var op = {/* fx效果方法依赖参数 */
	onbeforestart : function() {/* 初始设置启动高度为100 */
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
			ok(a < 5, '启动时显示为透明 : ' + a);

		}
	},
	onafterfinish : function() {
		if (baidu.browser.ie) {
			var re = /opacity\:\d+/;
			var opacity = re.exec($(te.dom[0]).css('filter')).toString().split(
					':')[1];
			var a = opacity / 100;
		} else {
			var a = $(te.dom[0]).css('opacity');
		}
		equal(a, 1, '校验结束时透明度1');
		start();
	}
};

test('老接口：校验元素类型为id', function() {
	te.checkfx.create(te.dom[0].id, {
		method : baidu.fx.fadeIn,
		options : op
	}).checkbase();
});

test('老接口：校验元素类型为dom', function() {
	var notchecked = true;
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.fadeIn,
		options : op
	}).checkbase();
});

test('老接口：校验事件序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.fadeIn,
		beforestart : function() { // 初始设置启动高度为100
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checkevents({
		onafterfinish : start
	}, 4);
});

test('老接口：校验时间序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.fadeIn,
		beforestart : function() { // 初始设置启动高度为100
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checktimeline(
			function(point, timelinepoint) {
				return 100 * point / timelinepoint;// 均匀渐变
			},
			function() {
				if (baidu.browser.ie) {
					return /opacity\:\d+/.exec($(te.dom[0]).css('filter'))
							.toString().split(':')[1];
				} else
					return $(te.dom[0]).css('opacity') * 100; // 为便于校验，放大100
			});
});

test('老接口：校验cancel', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.fadeIn,
		beforestart : function() { // 初始设置启动高度为100
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checkcancel();
});

//
// /**
// * 抽样3个时间点的数据是否满足渐变效果
// */
// test('老接口：events',
// function() {
// var t, f;
// t = te.dom[0];
// $(t).css('height', '100px');
// $(t).css('background-color', 'red');
// f = baidu.fx.fadeIn(t, {
// onbeforestart : function() {
// equals(this._className, 'baidu.fx.opacity', 'check type');
// equal($(t).css('opacity'), 1, 'opacity before start');
// },
// onafterfinish : function() {
// equal($(t).css('opacity'), 1, 'opacity after end');
// }
// });
// var ie = $.browser.msie;
// var cc = function(i, max, info) {
// var o;
// if (ie) {
// o = (/opacity\:\d+/.exec($(t).css('filter')).toString()
// .split(':')[1])
// * max / 100;
// } else
// o = parseFloat(f.element.style.opacity) * max;
// equals(Math.round(o), i, info);
// };
// equals(f._className, 'baidu.fx.fadeIn', 'check type');
// te.obj[0].check(f.duration, 0, 3, 'check point at 抽样点', cc);
// stop();
// });
//
// /* duration testing in Timeline */

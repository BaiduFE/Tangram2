module("baidu.fx.zoomOut");
// zoomOut引用scale，此处仅测试完成时的效果，
test('老接口：check property and hide after finish', function() {
	// 1、hide after finish
	// 2、check to and from as default
	stop();
	baidu.fx.zoomOut(te.dom[1], {
		onafterfinish : function() {
			ok(true, 'test id');
			equals(this.interval, 16, 'interval = ' + this.interval);
			equals(this.duration, 500, 'duration = ' + this.duration);
			equals(this.dynamic, true, 'dynamic = ' + this.dynamic);
			equals(this.percent, 1, 'percent = ' + this.percent);
			equals(this.to, 0.1, 'default: this.to = ' + this.to);
			equals(this.from, 1, 'default: this.from = ' + this.from);
			equals(this.restoreAfterFinish, true,
					'default: this.restoreAfterFinish = '
							+ this.restoreAfterFinish);
			equals(this.transition(2), 0, 'default: this.transition(2) = '
					+ this.transition(2));
			setTimeout(function() {
				equals($(te.dom[1]).css('display'), 'none', 'hide after finish');
				start();
			}, 20);
		}
	});
});

//
// 用例逻辑设置有问题（fx cancel后调用dispose），导致IE下抛异常
// // test id
// test('老接口：test id', function() {
// var c = baidu.fx.zoomOut('img_div', {
// onafterfinish : function() {
// ok(true, 'test id');
// equals(this.interval, 16, 'interval = ' + this.interval);
// equals(this.duration, 500, 'duration = ' + this.duration);
// equals(this.dynamic, true, 'dynamic = ' + this.dynamic);
// equals(this.percent, 1, 'percent = ' + this.percent);
// equals(this.to, 0.1, 'default: this.to = ' + this.to);
// equals(this.from, 1, 'default: this.from = ' + this.from);
// equals(this.restoreAfterFinish, true,
// 'default: this.restoreAfterFinish = '
// + this.restoreAfterFinish);
// equals(this.transition(2), 0, 'default: this.transition(2) = '
// + this.transition(2));
// start();
// }
// });
// stop();
// });
//
// // test dom
// test('老接口：test dom', function() {
// var c = baidu.fx.zoomOut('img_div', {
// onafterfinish : function() {
// ok(true, 'test id');
// equals(this.interval, 16, 'interval = ' + this.interval);
// equals(this.duration, 500, 'duration = ' + this.duration);
// equals(this.dynamic, true, 'dynamic = ' + this.dynamic);
// equals(this.percent, 1, 'percent = ' + this.percent);
// equals(this.to, 0.1, 'default: this.to = ' + this.to);
// equals(this.from, 1, 'default: this.from = ' + this.from);
// equals(this.restoreAfterFinish, true,
// 'default: this.restoreAfterFinish = '
// + this.restoreAfterFinish);
// equals(this.transition(2), 0, 'default: this.transition(2) = '
// + this.transition(2));
// start();
// }
// });
// stop();
// });
//
// // test from
// test('老接口：test from', function() {
// var c, f = 0.5;
// var img = document.getElementById('img_id');
// c = baidu.fx.zoomOut('img_div', {
// from : f,
// onafterfinish : function() {
// equals(img.height * f, 128 * f, 'from img height = ' + img.height
// * f); // img height=128px;
// start();
// }
// });
// stop();
// });
//
// // test to
// test('老接口：test to', function() {
// var c, t = 0.5;
// var img = document.getElementById('img_id');
// c = baidu.fx.zoomOut('img_div', {
// to : t,
// onafterfinish : function() {
// equals(img.width * t, 128 * t, 'to img width = ' + img.width * t); // img
// // width=128px;start();
// start();
// }
// });
// stop();
// });
//
// // test duraton
// test('老接口：test duration', function() {
// var c, stime, dtime;
// c = baidu.fx.zoomOut('img_div', {
// onafterfinish : function() {
// dtime = new Date().getTime() - stime;
// ok(dtime - 800 < 20, 'duration: ' + dtime + 'ms');
// start();
// }
// });
// stime = new Date().getTime();
// stop();
// });
//
// // test interval
// test('老接口：test interval', function() {
// var c, itime;
// c = baidu.fx.zoomOut('img_div', {
// onafterfinish : function() {
// setTimeout(QUnit.start, 50);
// }
// });
// equals(c.interval, 16, 'interval default 16ms');
// stop();
// });
//
// /* Events将在Timeline用例中被测试，此处忽略 */
// // //test transition
// // test('老接口：test transition 时间线', function(){
// // var c, img, timeline;
// // c = baidu.fx.zoomIn('img_div', {
// // onbeforestart: function(){
// // ok(this.transition>0, '');
// // start();
// // }
// // });
// // stop();
// // });
// // test onbeforestart
// test('老接口：test onbeforestart', function() {
// var c, bu = false, au = false; // bool 控制一次
// c = baidu.fx.zoomOut('img_div', {
// onbeforestart : function() {
// ok(true, 'before start');
// },
// onbeforeupdate : function() {
// if (!bu) {
// ok(true, 'before update');
// bu = true;
// }
// },
// onafterupdate : function() {
// if (!au) {
// ok(true, 'after update');
// au = true;
// }
// },
// onafterfinish : function() {
// ok(true, 'after finish');
// this.cancel();
// },
// oncancel : function() {
// ok(true, 'oncancel called');
// // setTimeout(QUnit.start, 200);
// },
// restore : function() {
// ok(true, 'restore called');
// }
// });
// stop();
// // te.checkfx.create(te.dom[1], {
// // method : baidu.fx.zoomOut,
// // beforestart : function() {/* 初始设置启动高度为100 */
// // $(te.dom[1]).css('height', 100).css('background-color', 'red');
// // }
// // }).checkevents({
// // onafterfinish : start
// // }, 4);
// });

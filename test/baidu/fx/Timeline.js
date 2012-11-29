module("baidu.fx.Timeline");

// test default params
test('test default params', function() {
	stop();
	ua.importsrc("baidu.lang.Class.$removeEventListener", function(){
		var option = {};
		var timeline = new baidu.fx.Timeline(option);
		ok(true, 'tes default params');
		equals(timeline.interval, 16, 'interval = ' + timeline.interval);
		equals(timeline.duration, 500, 'duration = ' + timeline.duration);
		equals(timeline.dynamic, true, 'dynamic = ' + timeline.dynamic);
		start();
	}, "baidu.lang.Class.$removeEventListener", "baidu.fx.Timeline");
});

// test options
test('test options', function() {
	var option = {
		interval : 24,
		duration : 200,
		dynamic : false
	};
	var timeline = new baidu.fx.Timeline(option);
	equals(timeline.interval, 24, 'interval = ' + timeline.interval);
	equals(timeline.duration, 200, 'duration = ' + timeline.duration);
	equals(timeline.dynamic, false, 'dynamic = ' + timeline.dynamic);
});

/**
 * 事件校验，onbeforestart，onbeforeupdate，onafterupdate，oncancel，onafterfinish
 */
test('test events', function() {
	stop();
	var timeline = new baidu.fx.Timeline();
	var es = 'onbeforestart,onbeforeupdate,'
			+ 'onafterupdate,oncancel,onafterfinish'.split(',');
	var checkEvent = function(timeline, en, callAfterTrigger) {
		timeline.addEventListener(en, function() {
			setTimeout(function() {
				ok(true, 'event ' + en + ' is triggered');
				if (timeline && !timeline.disposed)
					timeline.removeEventListener(en);// 保障仅触发一次
				callAfterTrigger && callAfterTrigger.call(timeline);
			}, 0);
		});
		// callAfterRegister && callAfterRegister();
	};
	checkEvent(timeline, 'onbeforestart');
	checkEvent(timeline, 'onbeforeupdate');
	checkEvent(timeline, 'onafterupdate', timeline.cancel);
	checkEvent(timeline, 'oncancel', function() {
		// 再次启动并测试onafterfinish
		var timeline = new baidu.fx.Timeline();
		checkEvent(timeline, 'onafterfinish', QUnit.start);
		timeline.launch();
	});
	timeline.launch();
});
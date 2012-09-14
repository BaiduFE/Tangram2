module('baidu.fx.highlight');

var op = {
	beginColor : '#FFFF00',
	endColor : '#FFFFFF',
	finalColor : '#FFFFFF',
	textColor : '#FFFF00',
	onbeforestart : function() {
		$(te.dom[0]).css('val', 'test').css('height', 100);
	},
	onafterfinish : function() {
		var bgc = $(te.dom[0]).css('background-color');
		var cor = $(te.dom[0]).css('color');
		ok(/rgb(255, 255, 255)||#ffffff/i.test(bgc), '校验结束时的颜色 : ' + bgc);
		ok(/rgb(255, 255, 0)||#ffff00/i.test(cor), '校验结束时的颜色 : ' + bgc);
		start();
	}
};

test('校验元素类型为id', function() {
	te.checkfx.create(te.dom[0].id, {
		method : baidu.fx.highlight,
		options : op
	}).checkbase();
});

test('校验元素类型为dom', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.highlight,
		options : op
	}).checkbase();
});

test('校验事件序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.highlight
	}).checkevents( {
		onafterfinish : start
	}, 4);
});

test('校验时间序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.highlight,
		options : {
			onafterfinish : function() {
			}
		}
	}).checktimeline(function(point) {
		return 60 * point;
	}, function() {
		var rgb = $(te.dom[0]).css('background-color');
		if (/rgb\(\d+, \d+, (\d+)\)/i.test(rgb)) {
			return RegExp.$1;
		} else if(/#ffff([0-9a-f]{2})/i.test(rgb))
			return parseInt(RegExp.$1, 16);
		return 0;
	}, 4, 20);
});

test('校验cancel', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.highlight,
		beforestart : function() {/* 初始设置启动高度为100 */
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checkcancel();
});

// test('dom', function() {
// var t, h;
// t = te.dom[0];
// $(t).css('height', '100px');
// $(t).css('background-color', 'red');
// var h = baidu.fx.highlight(t, {
// finalColor : 'blue',
// onbeforestart : function() {
// var bgcolor = $(t).css('background-color').toLowerCase();
// ok(bgcolor == 'red' || bgcolor == 'rgb(255, 0, 0)'
// || bgcolor == '#ff0000', 'before start color');
// },
// onafterfinish : function() {
// var bgcolorafter = $(t).css('background-color').toLowerCase();
// ok(bgcolorafter == 'blue' || bgcolorafter == '#0000ff'
// || bgcolorafter == 'rgb(0, 0, 255)', 'after finish color');
// ok($(t).css('color') == '#000000'
// || $(t).css('color') == 'rgb(0, 0, 0)',
// 'get final text color');
// start();
// }
// });
// stop();
// });
//
// test('id', function() {
// var t, h;
// t = te.dom[0];
// $(t).css('height', '100px');
// $(t).css('background-color', 'red');
// var h = baidu.fx.highlight('test_div', {
// onbeforestart : function() {
// var bgcolor = $(t).css('background-color').toLowerCase();
// ok(bgcolor == 'red' || bgcolor == 'rgb(255, 0, 0)'
// || bgcolor == '#ff0000', 'before start color');
// },
// onafterfinish : function() {
// var color = $(t).css('background-color');
// ok(color == 'rgb(255, 0, 0)' || color == '#ff0000'|| color =='red',
// 'after finish color');
// start();
// }
// });
// stop();
// });
//
// test('duration', function() {
// var t, h;
// t = te.dom[0];
// $(t).css('height', '100px');
// $(t).css('background-color', 'red');
// var startTime = new Date().getTime();
// var h = baidu.fx.highlight('test_div', {
// duration : 400,
// onbeforestart : function() {
// var bgcolor = $(t).css('background-color').toLowerCase();
// ok(bgcolor == 'red' || bgcolor == 'rgb(255, 0, 0)'
// || bgcolor == '#ff0000', 'before start color');
// },
// onafterfinish : function() {
// var dura = new Date().getTime() - startTime;
// ok(dura - 400 < 60, 'duration test');
// start();
// }
// });
// stop();
// });

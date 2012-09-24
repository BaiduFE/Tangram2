module('baidu.fx.moveBy');

test('老接口：dom', function() {
	expect(4);
	var t = te.dom[0];
	$(t).css('height', '100px');
	$(t).css('background-color', 'red');
	/*如果没有给元素设置非static的position属性，则case永远不会走到onafterfinish*/
	$(t).css('position','absolute');
	$(t).css('top','0px');
	$(t).css('left','0px');
	stop();
	var m = baidu.fx.moveBy(t, [ 100, 500 ], {
		onbeforestart : function(){
		equal($(t).css('left'),'0px','check start left position');
		equal($(t).css('top'),'0px','check start top position');
	},
		onafterfinish : function() {
			equal($(t).css('top'), '500px', 'top is moved by 50px');
			equal($(t).css('left'), '100px', 'left is moved by 100px');
			start();
		}
	});

});

test('老接口：id', function() {
	expect(2);
	var t;
	t = te.dom[0];
	stop();
	$(t).css('height', '100px');
	$(t).css('background-color', 'red');
	/*如果没有给元素设置非static的position属性，则case永远不会走到onafterfinish*/
	$(t).css('position','relative');
	$(t).css('top','10px');
	$(t).css('left','20px');
	var m = baidu.fx.moveBy('test_div',{x:100,y:300}, {
		onafterfinish : function() {
			equal($(t).css('top'), '310px', 'top is moved by 300px and is 310px');
			equal($(t).css('left'), '120px', 'left is moved by 100px and is 120px');
			start();
		}
	});
});

test('老接口：duration', function() {
	expect(3);
	var t;
	t = te.dom[0];
	stop();
	$(t).css('height', '100px');
	$(t).css('background-color', 'red');
	/*如果没有给元素设置非static的position属性，则case永远不会走到onafterfinish*/
	$(t).css('position','relative');
	$(t).css('top','30px');
	$(t).css('left','40px');
	var startTime = new Date().getTime();
	var m = baidu.fx.moveBy('test_div',{x:100,y:300}, {
		duration : 400,
		onafterfinish : function() {
		var dura = new Date().getTime()-startTime;
			ok(dura - 400 < 60,'get correct duration');
			equal($(t).css('top'), '330px', 'top is moved by 330px');
			equal($(t).css('left'), '140px', 'left is moved by 140px');
			start();
		}
	});
});


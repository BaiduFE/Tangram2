module('baidu.fx.moveTo');

test('老接口：dom', function() {
	expect(4);
	var t;
	t = te.dom[0];
	
	$(t).css('height', '100px');
	$(t).css('background-color', 'red');
	/*如果没有给元素设置非static的position属性，则case永远不会走到onafterfinish*/
	$(t).css('position','absolute');//position is absolute
	$(t).css('top','0px');
	$(t).css('left','0px');
	stop();
	var m = baidu.fx.moveTo(t, [ 100, 500 ], {
		onbeforestart : function(){
		equal($(t).css('left'),'0px','check start left position');
		equal($(t).css('top'),'0px','check start top position');
	},
		onafterfinish : function() {
			equal($(t).css('top'), '500px', 'top is moved to 50px');
			equal($(t).css('left'), '100px', 'left is moved to 100px');
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
	$(t).css('position','relative');//position is relative
	$(t).css('top','10px');//初始top不0
	$(t).css('left','20px');//初始left不0
	var m = baidu.fx.moveTo('test_div',{x:100,y:300}, {
		onafterfinish : function() {
			equal($(t).css('top'), '300px', 'top is moved to 300px');
			equal($(t).css('left'), '100px', 'left is moved to 100px');
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
	$(t).css('top','40px');
	$(t).css('left','50px');
	var startTime = new Date().getTime();
	var m = baidu.fx.moveTo('test_div',{x:100,y:300}, {
		duration : 400,
		onafterfinish : function() {
		var dura = new Date().getTime()-startTime;
			ok(dura - 400 < 60,'get correct duration');
			equal($(t).css('top'), '300px', 'top is moved to 300px');
			equal($(t).css('left'), '100px', 'left is moved to 100px');
			start();
		}
	});
});


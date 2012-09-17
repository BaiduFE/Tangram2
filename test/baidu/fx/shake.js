module("baidu.fx.shake");
//TODO 太不靠谱了
// test id
test('test id', function(){
	var c;
//	var offset = new Array(1, 1);
	var offset = {x: 2, y: 4};
	stop();
	c = baidu.fx.shake('img_div', offset, {
		onafterfinish: function(){
			equals(this.duration, 500, 'duration = ' + this.duration);
			equals(this.interval, 16, 'interval = ' + this.interval);
			start(100);
		}
	});
});

// test offset
test('test offset', function() {
	var c, offset, left = 100;
	offset = new Object(); // Object
	offset.x = 1;
	offset.y = 1;

	$(te.dom[1]).css('position', 'absolute').css('left', left);
	
	stop();
	offset = new Array(1, 1); // Array
	c = baidu.fx.shake(te.dom[1].id, offset, {
		onbeforeupdate : function() {
			ok(true, 'Array offset is ' + typeof offset);
			start();
		},
		onafterupdate : function(){
			
		}
	});
});

// test duration
test('test duration', function(){
	var c, offset = new Array(1, 1), dtime = 50;
	stop();
	c = baidu.fx.shake('img_div', offset, {
		duration: dtime,
		onbeforestart: function(){
			equals(this.duration, 50, '');
			start();
		}
	});
});

// test events
test('test events', function(){
	var c, offset = Array(2, 2);
	var bu = false, au = false;
	
	stop();
	c = baidu.fx.shake('img_div', offset, {
		onbeforestart: function(){
			ok(true, 'before start');
		},
		onbeforeupdate: function(){
			if(!bu)
			{
				ok(true, 'before update');
				bu = true;
			}
		},
		onafterupdate: function(){
			if(!au)
			{
				ok(true, 'after update');
				au = true;
			}
		},
		onafterfinish: function(){
			ok(true, 'after finish');
			this.cancel();
		},
		oncancel: function(){
			ok(true, 'oncancel called');
			start();
		},
		restore: function(){
			ok(true, 'restore called');
		}
	});
});
module("baidu.fx.scrollTo");
//TODO
//test id
test('兼容Magic接口：test id', function(){
	var op = new Object();
		
	stop();
	var c = baidu.fx.scrollTo('img_div', op, {
		onafterfinish: function(){
			equals(op[0], undefined, 'test op[0] undefined');
			equals(op[1], undefined, 'test op[1] undefined');
			start();
		}
	});
});

//test dom
test('兼容Magic接口：test dom', function(){
	var op = new Object();
	var t = te.dom[1];
		
	stop();
	var c = baidu.fx.scrollTo(t, op, {
		onafterfinish: function(){
			equals(op[0], undefined, 'test op[0] undefined');
			equals(op[1], undefined, 'test op[1] undefined');
			start();
		}
	});
});

//test default params
test('兼容Magic接口：test default params', function() {
	var c, op;
	op = new Array(10, 10);

	stop();
	c = baidu.fx.scrollTo('img_div', op, {
		onafterfinish : function() {
			equals(op[0], 10, 'op[0] = ' + op[0]);
			equals(op[1], 10, 'op[1] = ' + op[1]);
			equals(this.interval, 16, 'interval = ' + this.interval);
			equals(this.duration, 500, 'duration = ' + this.duration);
			equals(this.dynamic, true, 'dynamic = ' + this.dynamic);
			equals(this.percent, 1, 'percent = ' + this.percent);
			start();
		}
	});
});

// test option(Array)
test('兼容Magic接口：test option(Array)', function(){
	var op = new Array(10, 10);
	var t = te.dom[1];
		t.scrollLeft = 0;
		t.scrollTop = 0;
		
	stop();
	var c = baidu.fx.scrollTo(t, op, {
		onafterfinish: function(){
			equals(op[0], 10, 'test op[0]');
			equals(op[1], 10, 'test op[1]');
			start();
		}
	});
});

//test option(JSON)
test('兼容Magic接口：test option(JSON)', function(){
	var op = {x: 10, y: 10};
	var t = te.dom[1];
		t.scrollLeft = 0;
		t.scrollTop = 0;
		
	stop();
	var c = baidu.fx.scrollTo(t, op, {
		onafterfinish: function(){
			equals(op.x, 10, 'test op.x');
			equals(op.y, 10, 'test op.y');
			start();
		}
	});
});
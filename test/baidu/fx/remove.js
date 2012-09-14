module("baidu.fx.remove");

// test id
test('test id', function(){
	stop();
	var c = baidu.fx.remove('img_div', {
		onbeforestart: function(){
			equals(this.duration, 500, 'duration = ' + this.duration);
			equals(this.interval, 16, 'interval = ' + this.interval);
			equals(this.dynamic, true, 'dynamic = ' + this.dynamic);
		},
		onafterfinish : function(){
			equals($('#img_div').length, 0);
			start();
		}
	});
});

//test dom
test('test dom', function(){
	var c, t;
	t = te.dom[1];
	stop();
	c = baidu.fx.remove('img_div', {
		onbeforestart: function(){
			equals(this.duration, 500, 'duration = ' + this.duration);
			equals(this.interval, 16, 'interval = ' + this.interval);
			equals(this.dynamic, true, 'dynamic = ' + this.dynamic);
			start();
		}
	});
});
module("baidu.fx.puff");

// test id
test('老接口：test id', function(){
	var c = baidu.fx.puff(te.dom[1].id, {
		onafterfinish: function(){
			equals(this.to, 1.8, 'to = ' + this.to);
			equals(this.duration, 800, 'duration = ' + this.duration);
			equals(this.transformOrigin, "50% 50%", 'transformOrigin = ' + this.transformOrigin);
			start();
		}
	});
	stop();
});

// test dom
test('老接口：test dom', function() {
	var t, c;
	t = te.dom[1];
	c = baidu.fx.puff(t, {
		onafterfinish : function() {
			equals(this.to, 1.8, 'to = ' + this.to);
			equals(this.duration, 800, 'duration = ' + this.duration);
			equals(this.transformOrigin, "50% 50%", 'transformOrigin = ' + this.transformOrigin);
			start();
		}
	});
	stop();
});

// test to 
test('老接口：test to', function(){
	var t, c;
	t = te.dom[1];
	c = baidu.fx.puff(t, {
		to: 1.5,
		onafterfinish: function(){ 
			equals(this.to, 1.5, 'test to = ' + this.to);
			start();
		}
	});
	stop();
});

// test duration
test('老接口：', function(){
	var c, stime, dtime;
	c = baidu.fx.puff(te.dom[1].id, {
		onafterfinish: function(){
			dtime = new Date().getTime() - stime;
			ok(dtime - 800 < 50, 'duration: ' + dtime + 'ms');
			start();
		}
	});
	stime = new Date().getTime();
	stop();
});

//test transformOrigin(percent)
test('老接口：test transformOrigin(percent)', function(){
	var t, c;
	t = te.dom[1];
	c = baidu.fx.puff(t, {
		transformOrigin: "20% 80%",
		onbeforestart: function(){
			equals(this.transformOrigin, "20% 80%", 'test transformOrigin = ' + this.transformOrigin);
			start();
		}
	});
	stop();
});

//test transformOrigin(pixel)
test('老接口：test transformOrigin(pixel)', function(){
	var t, c;
	t = te.dom[1];
	c = baidu.fx.puff(t, {
		transformOrigin: "200px 800px",
		onbeforestart: function(){
			equals(this.transformOrigin, "200px 800px", 'test transformOrigin = ' + this.transformOrigin);
			start();
		}
	});
	stop();
});
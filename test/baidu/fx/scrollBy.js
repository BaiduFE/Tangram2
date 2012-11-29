module("baidu.fx.scrollBy");
//TODO
//test id
test('test id', function(){
	var dis = new Object();
		
	stop();
	var c = baidu.fx.scrollBy('img_div', dis, {
		onafterfinish: function(){
			equals(dis[0], undefined, 'test dis[0] undefined');
			equals(dis[1], undefined, 'test dis[1] undefined');
			start();
		}
	});
});

//test dom
test('test dom', function(){
	var c, t;
	t = te.dom[1];
	var dis = new Object();
		
	stop();
	c = baidu.fx.scrollBy(t, dis, {
		onafterfinish: function(){
			equals(dis[0], undefined, 'test dis[0] undefined');
			equals(dis[1], undefined, 'test dis[1] undefined');
			start();
		}
	});
});

// test default params
test('test default params', function() {
	var c, dis;
	dis = new Array(100, 100);

	stop();
	c = baidu.fx.scrollBy('img_div', dis, {
		onafterfinish : function() {
			equals(dis[0], 100, 'dis[0] = ' + dis[0]);
			equals(dis[1], 100, 'dis[1] = ' + dis[1]);
			equals(this.interval, 16, 'interval = ' + this.interval);
			equals(this.duration, 500, 'duration = ' + this.duration);
			equals(this.dynamic, true, 'dynamic = ' + this.dynamic);
			equals(this.percent, 1, 'percent = ' + this.percent);
			start();
		}
	});
});

// test distance(Array)
test('test distance(Array)', function(){
	var dis = new Array(100, 100);
	var t = te.dom[1];
		t.scrollLeft = 0;
		t.scrollTop = 0;
		
	stop();
	var c = baidu.fx.scrollBy(t, dis, {
		onafterfinish: function(){
			equals(dis[0], 100, 'test dis[0]');
			equals(dis[1], 100, 'test dis[1]');
			start();
		}
	});
});

//test distance(JSON)
test('test distance(JSON)', function(){
	var dis = {x: 10, y: 10};
	var t = te.dom[1];
		t.scrollLeft = 0;
		t.scrollTop = 0;
		
	stop();
	var c = baidu.fx.scrollBy(t, dis, {
		onafterfinish: function(){
			equals(dis.x, 10, 'test dis.x');
			equals(dis.y, 10, 'test dis.y');
			start();
		}
	});
});

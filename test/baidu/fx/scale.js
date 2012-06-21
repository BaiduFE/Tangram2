module("baidu.fx.scale");

test('test dom, fade = false', function() {
	var c, t;
	stop();
	t = te.dom[1];
	c = baidu.fx.scale(t, {
		onbeforestart : function() {
			ok(true, 'test dom');
		},
		onafterfinish : function() {
			if(baidu.browser.ie){
				equals(te.dom[1].style.filter,"", "The filter is not set");
			}
			else{
				equals(te.dom[1].style.opacity, "", "The opacity is not set");
			}
			start();
		},
		fade : false
	});
});

test('test dom, fade = true', function() {
	var c, t;
	stop();
	t = te.dom[1];
	c = baidu.fx.scale(t, {
		onbeforestart : function() {
			ok(true, 'test dom');
		},
		onafterfinish : function() {
			if(baidu.browser.ie){
				equals(te.dom[1].style.filter,"progid:DXImageTransform.Microsoft.Alpha(opacity:100)", "The filter is not set");
			}
			else{
				equals(te.dom[1].style.opacity, "1", "The opacity is set");
			}
			start();
		},
		fade : true
	});
});

// test id-dom
test('test dom', function() {
	var c, t;
	stop();
	t = te.dom[1];
	c = baidu.fx.scale(t, {
		onbeforestart : function() {
			ok(true, 'test dom');
		},
		onafterfinish : function() {
			ok(true, 'test dom');
			start();
		}
	});
});

// test id-dom
test('test id', function() {
	var c, t;
	stop();
	t = te.dom[1].id;
	c = baidu.fx.scale(t, {
		onbeforestart : function() {
			ok(true, 'test id');
		},
		onafterfinish : function() {
			ok(true, 'test id');
			start();
		}
	});
});

// test default params
test('test default params', function() {
	var c;
	var stime, dtime;

	stime = new Date().getTime();
	stop();
	c = baidu.fx.scale(te.dom[1].id, {
		onafterfinish : function() {
			equals(this.transformOrigin, '0px 0px',
					'transformOrigin = ' + this.transformOrigin);
			equals(this.from, 0.1, 'from = ' + this.from);
			equals(this.to, 1, 'to = ' + this.to);
			equals(this.interval, 16, 'interval = ' + this.interval);
			dtime = new Date().getTime() - stime;
			ok(dtime - 500 < 50, 'dtime = ' + dtime);

			equals(this.percent, 1, 'percent = ' + this.percent);
			equals(this.dynamic, true, 'dynamic = ' + this.dynamic);
			equals(this.overlapping, undefined,
					'overlapping = ' + this.overlapping); // undefined
			equals(this.restoreAfterFinish, undefined,
					'restoreAfterFinish = ' + this.restoreAfterFinish); // undefined
			start();
		}
	});
});

// test transformOrigin
test('test transformOrigin', function() {
	var c, tran;

	stop();

	tran = "10px 10px";
	c = baidu.fx.scale(te.dom[1].id, {
		transformOrigin : tran,
		onbeforestart : function() {
			equals(this.transformOrigin, '10px 10px', '');
			start();
		}
	});
});

// test transformOrigin
test('test transformOrigin', function() {
	var c, tran;

	stop();

	tran = "right bottom";
	c = baidu.fx.scale(te.dom[1].id, {
		transformOrigin : tran,
		onbeforestart : function() {
			equals(this.transformOrigin, 'right bottom', '');
			start();
		}
	});
});

// test from
test('test from', function() {
	var c, f = 0.5;
	var img = document.getElementById('img_id');
	stop();	
	c = baidu.fx.scale(te.dom[1].id, {
		from : f,
		onbeforeupdate : setTimeout(function() {
			if (baidu.browser.ie){
				equals(img.parentNode.style.zoom, f);
			}
			else {
				equals(img.parentNode.style.transform, 'scale('+f+')');
			}
			start();
		},15)
	});
});

/**
 * TODO 没干活这个用例！！需要开问题单
 */
test('test to', function() {
	var c, t = 0.5;
	var img = document.getElementById('img_id');
	stop();
	c = baidu.fx.scale(te.dom[1].id, {
		to : t,
		onafterfinish : function() {
			if (baidu.browser.ie){
				equals(img.parentNode.style.zoom, t);
			}
			else {
				equals(img.parentNode.style.transform, 'scale('+t+')');
			}
			start();
		}
	});
});

// test duration
test('test duration', function() {
	var c, stime, dtime;
	stime = new Date().getTime();

	stop();
	c = baidu.fx.scale(te.dom[1].id, {
		onafterupdate : function() {
			dtime = new Date().getTime() - stime;
			ok(dtime - 500 < 20, "dtime = " + dtime); // dtime is little(0-1)
			start();
		}
	});
});

// test interval
test('test interval', function() {
	var c, inter = 24; // modify from 16 to 24
		stop();
		c = baidu.fx.scale(te.dom[1].id, {
			interval : inter,
			onafterupdate : function() {
				equals(this.interval, 24, '');
				start();
			}
		});
	});

// test events
test('test events', function() {
	var c, bu = false, au = false;
	c = baidu.fx.scale(te.dom[1].id, {
		onbeforestart : function() {
			ok(true, 'before start');
		},
		onbeforeupdate : function() {
			if (!bu) {
				ok(true, 'before update');
				bu = true;
			}
		},
		onafterupdate : function() {
			if (!au) {
				ok(true, 'after update');
				au = true;
			}
		},
		onafterfinish : function() {
			ok(true, 'after finish');
			this.cancel();
		},
		oncancel : function() {
			ok(true, 'oncancel called');
			start();
		},
		restore : function() {
			ok(true, 'restore called');
		}
	})
});


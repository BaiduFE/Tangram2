module("baidu.fx.pulsate");
//
// // test id
// test('老接口：test id', function() {
// var c, loop = 1;
// stop();
// c = baidu.fx.pulsate(te.dom[1].id, loop, { // loop = 1
// onafterfinish : function() {
// equals(this.duration, 500, 'duration = ' + this.duration);
// equals(this.interval, 16, 'interval = ' + this.interval); // interval
// // = 16
// equals(this.percent, 1, 'percent = ' + this.percent); // percent =
// // 1
// equals(this.dynamic, true, 'dynamic = ' + this.dynamic); // dynamic
// // =
// // true
// // equals(this.overlapping, false, ''); // overlapping: undefined
// // equals(this.restoreAfterFinish, false, ''); //
// // restoreAfterFinish: undefined
// start();
// }
// });
// });
//
// // test dom
// test('老接口：test dom', function() {
// var c, t, loop = 1;
// t = te.dom[1];
// stop();
// c = baidu.fx.pulsate(t, loop, { // loop = 1
// onafterfinish : function() {
// equals(this.duration, 500, 'duration = ' + this.duration);
// equals(this.interval, 16, 'interval = ' + this.interval); // interval
// // = 16
// equals(this.percent, 1, 'percent = ' + this.percent); // percent =
// // 1
// equals(this.dynamic, true, 'dynamic = ' + this.dynamic); // dynamic
// // =
// // true
// // equals(this.overlapping, false, ''); // overlapping: undefined
// // equals(this.restoreAfterFinish, false, ''); //
// // restoreAfterFinish: undefined
// start();
// }
// });
// });

// TODO

test('老接口：test loop', function() {
	var c  , loop = 3, count = 0; // loop>0: jump
		stop();
		var duration,st,percent,visibleNum=0,hiddenNum=0;
		c = baidu.fx.pulsate(te.dom[1], loop, {
			onbeforestart : function() {
				var  percent = 0;
				duration = 500;
				st= new Date().getTime();
		    },
			onafterupdate : function() {
			   var now = new Date().getTime();
			   percent = (now - st) / duration;
			   Math.cos(2*Math.PI*percent)>0?equals(te.dom[1].style.visibility,'visible'):equals(te.dom[1].style.visibility,'hidden');
			},
		    onafterfinish : function(){
			   count++;
			}
	   });
		var checkC = function(){
			if(count==loop){
				start();
				equal(count,loop,"pulsate is ");
			}
			else{
				setTimeout(function() {
					checkC();
				}, 800);
			}
		};
		checkC();
	});

// multi instance
/*test('老接口：test loop', function() {
	var c, loop = 3, count = 3; // loop>0: jump
		var af = false; // prevent show again
		stop();
		c = baidu.fx.pulsate(te.dom[1], loop, {
			onafterupdate : function() {
				ok(false);这个地方有问题
			},
			onafterfinish : function() {
				if (!af) {
					equals(loop, 3, 'loop = ' + loop);
					af = true;
			//		start();
				}
			}
		});

	});

// test loop = -1
test('老接口：test loop', function() {
	var c, loop = -1; // loop<0: jump for ever; but loop=0 will not show
		var af = false; // prevent show again
		stop();
		c = baidu.fx.pulsate(te.dom[1], loop, {
			onafterfinish : function() {
				if (!af) {
					equals(loop, -1, 'loop = ' + loop);
					af = true;
					start();
				}
			}
		});
	});*/

// // test duration
// test('老接口：test duration', function() {
// var c, loop = 1;
// var stime, dtime;
// stime = new Date().getTime();
// stop();
// c = baidu.fx.pulsate('img_div', loop, {
// onafterfinish : function() {
// dtime = new Date().getTime() - stime;
// ok(dtime - 500 < 50, 'dtime = ' + dtime); // default: duration =
// // 500
// start();
// }
// });
// });
//
// // test interval
// test('老接口：test interval', function() {
// var c, loop = 1;
// stop();
// c = baidu.fx.pulsate('img_div', loop, {
// onafterfinish : function() {
// equals(this.interval, 16, 'interval = ' + this.interval); // default:
// // interval
// // = 16
// start();
// }
// });
// });
//
// // test events
// test('老接口：test events', function() {
// var c, loop = 1;
// var bu = false, au = false;
// stop();
// c = baidu.fx.pulsate('img_div', loop, {
// onbeforestart : function() {
// ok(true, 'before start');
// },
// onbeforeupdate : function() {
// if (!bu) {
// ok(true, 'before update');
// bu = true;
// }
//
// },
// onafterupdate : function() {
// if (!au) {
// ok(true, 'after update');
// au = true;
// }
// },
// onafterfinish : function() {
// ok(true, 'after finish');
// this.cancel();
// },
// oncancel : function() {
// ok(true, 'oncancel called');
// start();
// },
// restore : function() {
// ok(true, 'restore called');
// }
// });
// });

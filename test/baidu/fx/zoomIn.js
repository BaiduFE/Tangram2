module("baidu.fx.zoomIn");

// scale的一种调用，仅校验参数即可
test('test id', function() {
	stop();
	document.body.appendChild(document.getElementById('img_id'));
	$('#img_id').css('position', 'absolute').css('left', 0).css('top', 0).css('width', 100).css('height', 100);
//	$('img_div').css('position', 'absolute').css('left', 0).css('top', 0);
	setTimeout(function(){//等待图片加载
		var c = baidu.fx.zoomIn('img_id', {
			duration : 2000,
			interval : 50,
			onafterfinish : function() {
				ok(true, 'test id');
				equals(this.interval, 50, 'interval = ' + this.interval);
				equals(this.duration, 2000, 'duration = ' + this.duration);
				equals(this.dynamic, true, 'dynamic = ' + this.dynamic);
				equals(this.percent, 1, 'percent = ' + this.percent);
				equals(this.to, 1, 'default: this.to = ' + this.to);
				equals(this.from, 0.1, 'default: this.from = ' + this.from);
				equals(this.restoreAfterFinish, true,
						'default: this.restoreAfterFinish = '
								+ this.restoreAfterFinish);
				equals(this.transition(2), 4, 'default: this.transition(2) = '
						+ this.transition(2));
				$('#img_id').remove();
				setTimeout(QUnit.start, 200);
			}
		});
	}, 1000);
});

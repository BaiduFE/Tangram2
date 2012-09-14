(function() {
	/**
	 * 校验的对象方法，校验的运行方法 记录起始事件
	 */
	te.checkfx = {
		create : function(element, options) {
			stop();
			var me = this;
			me.element = element;
			me.options = options;
			me.starttime = new Date().getTime();
			return this;
		},
		checkbase : function() {
			var me = this,
			// 启动前方法支持
			beforestart = me.options.beforestart;
			me.options.beforestart && me.options.beforestart();
			me.instance = me.options.method(me.element, me.options.options);
			return me.instance;
		},
		/**
		 * 校验时间点附近的期望值和实际值，时间点采用等分切割方式，取n点，去头尾，校验中间
		 * <li>getexpect : 方法，获取每个时间点期望值
		 * <li>getvalue : 方法，获取每个时间点实际值
		 * <li>timelinepoint : 整形，定制检查的时间点，默认2
		 * <li>threshold : 整形，期望值与实际值之间的运行误差，默认为5
		 */
		checktimeline : function(getexpect, getvalue, timelinepoint, threshold) {
			var me = this,
			// 时间线上的校验点
			timelinepoint = timelinepoint || 4,//调整这个数据来确认2点校验还是3点校验
			// 允许的误差范围
			threshold = threshold === 0 ? 0 : (threshold ? threshold : 5),
			// 记录的真实值列表
			actuallist = [],
			// 启动fx方法
			c = me.checkbase(),
			// 获取时间线持续时间
			duration = c.duration,
			// 时间线校验方法
			fncheck = function() {
				if (new Date().getTime() > me.starttime + duration) {
					// 确认效果结束后启动校验
					clearInterval(h);
					for ( var i = 0; i < actuallist.length - 1; i++) {
						var a = actuallist[i];
						// 第一个抽样点是1而不是0，因为启动的时候，setInterval已经开始跑了
						var e = getexpect(i + 1, timelinepoint);// 启动从1开始
						ok(Math.abs(a - e) < threshold, '检测抽样点数值' + i + ' : e['
								+ e + '] a[' + a + ']');
					}
//					expect(timelinepoint - 2);// 掐头去尾
					// 这个地方经常因为元素被移除了而fx还在继续执行导致问题
					setTimeout(QUnit.start, 200);
				}
				actuallist[actuallist.length] = getvalue();
			},
			// 启动时间线校验方法
			h = setInterval(fncheck, duration / timelinepoint);// 启动从1开始
			me.starttime = new Date().getTime();
		},
		/**
		 * 校验事件序列，默认仅判定是否事件被正确触发，特定事件需要额外校验通过evcallbacks传入
		 */
		checkevents : function(evcallbacks, expectchecked) {
			var me = this;
			var checkedlist = [];
			var checkevent = function(type) {
				return function() {
					/* 貌似显示过多，过滤一下重复的…… */
					if (checkedlist.join(" ").indexOf(type) == -1) {
						checkedlist.push(type);
						ok(true, '事件类型被触发 : ' + type);
					}
					if (evcallbacks && evcallbacks[type])
						evcallbacks[type]();
				};
			};
			var op = me.options.options = me.options.options || {};
			var eventlist = [ 'onbeforestart', 'onbeforeupdate',
					'onafterupdate', 'onafterfinish', 'oncancel' ];
			for ( var i in eventlist) {
				var evtype = eventlist[i];
				op[evtype] = checkevent(evtype);
			}
			if (typeof expectchecked != 'undefine')
				expect(expectchecked);
			me.checkbase();
		},
		/**
		 * 在时间线一半时撤销效果
		 */
		checkcancel : function(aftercancel, nostart) {
			var me = this;
			me.options.options = me.options.options || {};
			me.options.options.oncancel = function() {
				ok(true, 'fx is cancel');
				aftercancel && aftercancel();
				setTimeout(function() {
					ok(c.disposed, 'fx disposed after cancel');
					expect(2);
					!nostart && start();
				}, 1);
			};
			var c = me.checkbase();
			setTimeout(function() {
				c.cancel();
			}, c.duration / 2);
		}
	};

	// create element
	function mySetup() {
		/* div */
		var div = document.createElement('div');
		div.id = 'test_div';
		document.body.appendChild(div);
		te.dom.push(div);

		/* div - img */
		var div2 = document.createElement('div');
		div2.id = 'img_div';
		var img = document.createElement('img');
		img.id = 'img_id';
		img.src = (upath || '') + 'Coffee_Bean.bmp';
		div2.appendChild(img);
		document.body.appendChild(div2);
		$(img).css('position', 'absolute');
		te.dom.push(div2);
	}

	// initial function
	var s = QUnit.testStart;
	QUnit.testStart = function() {
		s.apply(this, arguments);
		mySetup();
	};
})();
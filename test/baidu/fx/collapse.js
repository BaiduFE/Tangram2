module('baidu.fx.collapse');

var op = {/* fx效果方法依赖参数 */
	onbeforestart : function() {/* 初始设置启动高度为100 */
		$(te.dom[0]).css('height', 100).css('background-color', 'red');
	},
	onbeforeupdate : function() {
		if (!this.checked) {
			this.checked = true;
			equals(parseInt($(te.dom[0]).css('height')), 100, '校验对象高度在开始时是否为1');/* 校验对象最后高度是否为100 */
		}
	},
	onafterfinish : function() {
		equals(parseInt($(te.dom[0]).css('height')), 0, '校验对象高度在结束时是否为100');/* 校验对象最后高度是否为0 */
		start();
	}
};

var opV = {/* fx效果方法依赖参数 */
    orientation: 'horizontal',
    onbeforestart : function() {/* 初始设置启动宽度为100 */
        $(te.dom[0]).css('width', 100).css('height', 100).css('background-color', 'red');
    },
    onbeforeupdate : function() {
        if (!this.checked) {
            this.checked = true;
            equals(parseInt($(te.dom[0]).css('width')), 100, '校验对象宽度在开始时是否为1');/* 校验对象最后宽度是否为100 */
        }
    },
    onafterfinish : function() {
        equals(parseInt($(te.dom[0]).css('width')), 0, '校验对象宽度在结束时是否为100');/* 校验对象最后宽度是否为0 */
        start();
    }
};

test('校验元素类型为id', function() {
	te.checkfx.create(te.dom[0].id, {
		method : baidu.fx.collapse,
		options : op
	}).checkbase();
});

test('校验元素类型为dom', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.collapse,
		options : op
	}).checkbase();
});

test('校验orientation 为vertical', function() {
    te.checkfx.create(te.dom[0].id, {
        method : baidu.fx.collapse,
        options : opV
    }).checkbase();
});

test('校验事件序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.collapse,
		beforestart : function() {/* 初始设置启动高度为100 */
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checkevents( {
		onafterfinish : start
	}, 4);
});

test('校验时间序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.collapse,
		options : {
			onbeforestart : function() {
				$(te.dom[0]).css('height', 100).css('background-color', 'red');
			}
		}
	}).checktimeline(function(point, timelinepoint) {
		// 100*(1-per)2
		return Math.round(100 * Math.pow(1 - point / timelinepoint, 2));
	}, function() {
		return parseInt($(te.dom[0]).css('height'));
	});
});

test('校验cancel', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.collapse,
		options : {
			onbeforestart : function() {
				$(te.dom[0]).css('height', 100).css('background-color', 'red');
			}
		}
	}).checkcancel();
});

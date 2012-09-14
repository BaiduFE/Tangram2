module('baidu.fx.expand');

var op = {/* fx效果方法依赖参数 */
	onbeforestart : function() {
		$(te.dom[0]).css('height', 100).css('background-color', 'red');
	},
	onbeforeupdate : function() {
		if (!this.checked) {
			this.checked = true;
			equals(parseInt($(te.dom[0]).css('height')), 1, '校验对象高度在开始时是否为1');/* 校验对象最后高度是否为100 */
		}
	},
	onafterfinish : function() {
		equals(parseInt($(te.dom[0]).css('height')), 100, '校验对象高度在结束时是否为100');/* 校验对象最后高度是否为100 */
		start();
	}
};

var opV = {/* fx效果方法依赖参数 */
    orientation: 'horizontal',
    onbeforestart : function() {
        $(te.dom[0]).css('height', 100).css('width', 100).css('background-color', 'red');
    },
    onbeforeupdate : function() {
        if (!this.checked) {
            this.checked = true;
            equals(parseInt($(te.dom[0]).css('width')), 1, '校验对象宽度在开始时是否为1');/* 校验对象最后宽度是否为100 */
        }
    },
    onafterfinish : function() {
        equals(parseInt($(te.dom[0]).css('width')), 100, '校验对象宽度在结束时是否为100');/* 校验对象最后宽度是否为100 */
        start();
    }
};

test('校验元素类型为id', function() {
	te.checkfx.create(te.dom[0].id, {
		method : baidu.fx.expand,
		options : op
	}).checkbase();
});

test('校验元素类型为dom', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.expand,
		options : op
	}).checkbase();
});

test('校验orientation 为vertical', function() {
    te.checkfx.create(te.dom[0], {
        method : baidu.fx.expand,
        options : opV
    }).checkbase();
});

test('校验事件序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.expand,
		beforestart : function() {/* 初始设置启动高度为100 */
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checkevents( {
		onafterfinish : start
	}, 4);
});

test('校验时间序列', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.expand,
		beforestart : function() {/* 初始设置启动高度为100 */
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checktimeline(function(point, timelinepoint) {/* 获取期望值 */
		return Math.floor(100 * Math.sqrt(point / timelinepoint));//这是个抛物线
	}, function() {/* 获取实际值 */
		return parseInt($(te.dom[0]).css('height'));
	});
});

test('校验cancel', function() {
	te.checkfx.create(te.dom[0], {
		method : baidu.fx.expand,
		beforestart : function() {/* 初始设置启动高度为100 */
			$(te.dom[0]).css('height', 100).css('background-color', 'red');
		}
	}).checkcancel();
});
/**
* 封装ui公共用例
* render
* open
* close
* update
* dispose
* disable
* enable
*/
 
var commonTests = function(testName) {
	var p = window;
	var flag = true;
	for ( var i = 0; i < testName.length; i++) {
		if (typeof (p[testName[i]]) == 'undefined') {
			flag = false;
		}
		if (i == testName.length - 1 && typeof (p[testName[i]]) != 'undefined') {
			if (!window['baidu']['ui'])
				flag = false;
			else {
				if (window['baidu']['ui']['Base'].renderMain != p[testName[i]].prototype.renderMain)
					flag = false;
				else
					UI = p[testName[i]];
			}
		}
		p = p[testName[i]];
	}
	if (flag)
		test('common test', function() {
			var div = document.createElement('div');
			div.id = "div_commontest";
			document.body.appendChild(div);
			te.dom.push(div);
			
			var options = {};
			//baidu.ui.Decorator有些特别，必须传入一个options.ui
			if(testName[2] == 'Decorator'){
				var opui = baidu.ui.createUI(new Function);
				opui.extend({
					uiType : 'testType',
					render : function(target) {
						var me = this;
						me.main = me.renderMain();
						target && me.main.appendChild(target);
						me.body = target;
						me.dispatchEvent('onload');
					}
				});
				options.ui = new opui();
			}
			
			if(testName[2] == 'Tooltip'){
				options.target = te.dom[0] || div;
			}
			
			//创建组件的实例
			var ui = initObject(UI, options);
			var l1 = baidu.event._listeners.length;
			
			//baidu.ui.Decorator有些特别，用ui.ui render
			if(testName[2] == 'Decorator')
				ui = ui.ui;
			
			//测试render
			test_render(ui, te.dom[0] || div);
			
			//测试open
			if(ui.open)
				test_open(ui);
			
			//测试close
			if(ui.close)
				test_close(ui);

			//测试dispose
			test_dispose(ui, l1);
			
		});
};

function initObject(UI, options) {
    var ui = new UI(options);
	return ui;
};

/**
 * 验证onload事件，main对象创建成功
 */
function test_render(ui, target) {
	if (!ui.onload && !ui.load)
		ui.load = function() {
			ok(true, 'load is dispatch');
		};
	ui.render(target);
	ok(ui.getMain() || (ui._calendar && ui._calendar.getMain())//DatePicker有点儿特殊，必须要这样验证
			|| ui.getBody(), 'render: main is render');
};

	 
 /**
	 * 验证onopen事件，验证dom元素是否显示
	 * ui:UI对象，param：open参数，beforeEvent：是否有onbeforeopen事件
	 */
function test_open(ui, param) {
	if (!ui.onopen)
		ui.onopen = function() {
			ok(true, 'open is dispatch!');
		};
	if (!ui.onbeforeopen && !ui.beforeopen)
		ui.onbeforeopen = function() {
			ok(true, 'onbeforeopen is dispatch!');
		};
	if (param)
		ui.open(param);
	else
		ui.open();
	ok($(ui.getMain()).css("display") != 'none', 'open: main is shown!');
};

/**
 * 验证onclose事件，验证dom元素是否隐藏 ui:UI对象，param：close参数，beforeEvent：是否有onbeforeclose事件
 */
function test_close(ui, param) {
	if (!ui.onclose)
		ui.onclose = function() {
			ok(true, 'close is dispatch!');
		};
	if (ui.onbeforeclose && !ui.beforeclose)
		ui.onbeforeclose = function() {
			ok(true, 'ondeforeclose is dispatch!');
		};
	if (param)
		ui.close(param);
	else
		ui.close();
	ok(!isShown(ui.getMain()), 'close: main is hide!');
};

/**
 * 验证options是否全部复制给me,验证onupdate事件
 */
function test_update(ui, options) {
	if (!ui.onupdate)
		ui.onupdate = function() {
			ok(true, 'onupdate is dispatch!');
		};
	if (options)
		ui.update(options);
	for ( var key in options) {
		if (ui.key && ui.key === options.key)
			continue;
		else
			ok(false, key + ' is not updated!');
	}
	;
};

/**
 * dispose验证事件有没被清除，验证main有没被删掉
 */
function test_dispose(ui, l1) {
	ui.dispose();
	equal(baidu.dom.g(ui.getId()), null, 'disposed');
	equals(baidu.event._listeners.length, l1, 'event removed all');
};

/**
 * 验证disabled变量,验证ondisable事件被触发
 */
function test_disable(ui) {
	ui.disable();
	if (!ui.ondisable)
		ui.ondisable = function() {
			ok(true, 'ondisable is dispatch!');
		};
	if (ui.disabled)
		equal(ui.disabled, true, 'check disabled');
	if (ui.statable) {
		var body = ui.getBody();
		if (body.className.match('disabled'))
			ok(true, 'disabled class is add!');
		else if (ui.getMain().className.match('disabled'))
			ok(true, 'disabled class is add!');
		else
			ok(false, 'disabled class is not add!');
	}
};

/**
 * 与disable函数结合使用来测试，验证disabled变量，验证onenable事件
 */
function test_enable() {
	ui.disable();
	ui.enable();
	if (!ui.onenable)
		ui.onenable = function() {
			ok(true, 'onenable is dispatch!');
		};
	if (ui.disabled)
		equal(ui.disabled, false, 'check disabled');
	if (ui.statable) {
		var body = ui.getBody();
		if (!body.className.match('disabled'))
			ok(true, 'disabled class is remove!');
		else if (!ui.getMain().className.match('disabled'))
			ok(true, 'disabled class is remove!');
		else
			ok(false, 'disabled class is not remove!');
	}
};

/**
 * <ul>
 * 不存在的标准
 * <li>元素不存在，元素无父节点
 * <li>元素被隐藏了
 * <li>元素的父节点被隐藏
 * <li>存在的标准 - display = 'block' - display = ''
 * 
 * 参数： jquery object
 */
function isShown(o) {
	if (!o || (!o.parentNode && o != document))
		return false;

	if (o instanceof String || 'string' == typeof o)
		o = document.getElementById(o);
	if (o == document.body || o.tagName == 'BODY')// IFrame中的body判断可能出错，by
		// bell, 2011-03-29
		return true;

	if (o.style && "none" == o.style.display)
		return false;
	if (parseInt(o.style.marginLeft) < -2000 || parseInt(o.style.left) < -2000)
		return false;
	if (parseInt(o.offsetHeight) == 0 || parseInt(o.offsetWidth) == 0)
		return false;
	if (o.parentNode && !isShown(o.parentNode))
		return false;
	return true;
}

var testingElement = {}, te = testingElement;

(function () {
	function mySetup() {
		te.dom = [];
		te.obj = [];
	}

	/**
	 * 添加一个通用接口，用于支持类似dispose等通用方法
	 */
	te.checkUI = {
		eventLength: 0,
		/**
		 * 校验对象的dispose方法，主要是dom和event支持
		 * 
		 * @param ui
		 *            需要调用dispose的ui对象
		 * @param eventLength
		 *            ui启动前在baidu.event._listeners中的事件总数
		 * @param dom
		 *            需要确认dom被干掉了
		 * @param callback
		 *            回调函数，在dispose之后
		 */
		dispose: function (ui, eventLength, dom, callback) {
			if (!ui.dispose || 'function' != typeof ui.dispose) {
				ok(false, 'ui do not have a dispose function');
				return false;
			}
			var m = ui.getMain();
			ui.dispose();
			ok(ui.disposed === true, 'ui.disposed is true');
			ok(!isShown(m), 'main is not shown');
			if (baidu.event && baidu.event._listeners)
				equals(baidu.event._listeners.length, eventLength
						|| this.eventLength,
						'event all should be un after dispose');
			if (dom)
				ok(!isShown(dom), 'dom not shown');
			callback && callback(ui);
		}
	};

	function myTeardown() {
		if (te) {
			if (te.dom && te.dom.length) {
				for (var i = 0; i < te.dom.length; i++)
					if (te.dom[i] && te.dom[i].parentNode)
						te.dom[i].parentNode.removeChild(te.dom[i]);
			}
			if (te.obj && te.obj.length) {
				while (te.obj.length > 0)
					try {
						te.obj.shift().dispose();
					} catch (e) {
					}
			}
		}
	}

	var s = QUnit.testStart, e = QUnit.testDone;
	QUnit.testStart = function () {
		mySetup();
		s.apply(this, arguments);
	};
	QUnit.testDone = function () {
		e.call(this, arguments);
		myTeardown();
	};
})();


void function (global) { // by dron
	global.equalAll = function (api, /* 可选 */scope, conf) {
		var item;

		if (arguments.length == 2) {
			conf = scope;
			scope = null;
		}

		for (var name in conf) {
			if (conf.hasOwnProperty(name)) {
				item = conf[name];
				for (var i = 0, l = item.length; i < l; i += 2) {
					equal(api.apply(scope, item[i]), item[i + 1], name);
				}
			}
		}
	};

	global.valueis = function (value/*, args*/) {
		var arr = [].slice.call(arguments, 1);
		var rs = [];
		for (var i = 0, l = arr.length; i < l; i++)
			rs.push(arr[i], value);
		return rs;
	};

	global.waiting = function (fn1, fn2) {
		var time = setInterval(function () {
			if (fn1()) {
				clearInterval(time);
				fn2();
			}
		});
	};
}(this);

/**
 * 从一个html字符串创建一个TestDom对象
 * @author techird
 * @gramma var testDom = new TestDom(html);
 * @param  {string}  html   用于构建的html代码
 * @return {TestDom}
 */
function TestDom(html) {
	/* prototype initials */
	if (!TestDom._initialized_) {
		/**
         * 释放TestDom使用的资源（从body中移除）
         */
		TestDom.prototype.dispose = function () {
			document.body.removeChild(this._container);
			window["CollectGarbage"] && CollectGarbage();
		};
		/**
         * 从当前TestDom对象获取TangramDom对象
         */
		TestDom.prototype.getTangram = function () {
			return baidu.dom('#' + this._container.id + " > *");
		};

		TestDom.prototype.getWrapper = function () {
			return this._container;
		};
		TestDom._lastId = 0;
		TestDom._initialized_ = true;
	}

	var container = this._container = document.createElement("div");
	container.id = "TestDomContainer" + TestDom._lastId++;
	container.innerHTML = html;
	//container.style.position = "absolute";
	//container.style.left = "-10000px";
	document.body.appendChild(container);
}

/**
 * 将一个html代码变为TangramDom对象用于测试，回调后回收资源
 * @author techird
 * @param {HtmlString}                  html       [可选]指定的html代码
 * @param {Function(TangramDom $dom, HtmlElement wrapper)}   fn         回调的函数，接受一个$dom参数
 */
function useTangramDom(html, fn) {
	if (typeof (html) === 'function') {
		fn = html;
		html = "";
	}
	if (typeof html === 'string' && typeof fn === 'function') {
		var testDom = new TestDom(html),
            $dom = testDom.getTangram(),
			wrapper = testDom.getWrapper();
		try {
			fn($dom, wrapper);
		}
		catch (e) {
			throw e;
		} finally {
			testDom.dispose();
		}
	}
}
(function() {
	if (typeof window.uiut == "undefined")
		window.uiut = {};
	uiut.Utils = function() {
	};
	uiut.Utils.addEventHandler = function(A, _, $) {
		if (A.addEventListener)
			A.addEventListener(_, $, false);
		else if (A.attachEvent)
			A.attachEvent("on" + _, $);
		else
			A["on" + _] = $
	};
	uiut.Utils.removeEventHandler = function(A, _, $) {
		if (A.removeEventListener)
			A.removeEventListener(_, $, false);
		else if (A.detachEvent)
			A.detachEvent("on" + _, $);
		else
			A["on" + _] = null
	};
	uiut.Utils.formatEvent = function($) {
		if (Browser.IsIE) {
			$.charCode = ($.type == "keypress") ? $.keyCode : 0;
			$.eventPhase = 2;
			$.isChar = ($.charCode > 0);
			$.pageX = $.clientX + document.body.scrollLeft;
			$.pageY = $.clientY + document.body.scrollTop;
			$.preventDefault = function() {
				this.returnValue = false
			};
			if ($.type == "mouseout")
				$.relatedTarget = $.toElement;
			else if ($.type == "mouseout")
				$.relatedTarget = $.fromElement;
			$.stopPropagation = function() {
				this.cancelBubble = true
			};
			$.target = $.srcElement;
			$.time = (new Date()).getTime()
		}
		return $
	};
	uiut.Utils.getEvent = function() {
		if (window.event)
			return this.formatEvent(window.event);
		else
			return uiut.Utils.getEvent.caller.arguments[0]
	};
	uiut.Utils.addClass = function(_, $) {
		var A = _.className, B = new RegExp("\\b" + $ + "\\b");
		if (!B.test(A))
			_.className = _.className + " " + $
	};
	uiut.Utils.deleteClass = function($, B) {
		var _ = $.className, A = new RegExp("\\b" + B + "\\b");
		$.className = _.replace(A, "")
	};
	uiut.Utils.hasClass = function($, A) {
		var _ = $.className, B = new RegExp("\\b" + A + "\\b");
		return B.test(_)
	};
	uiut.Utils.jsArr = [];
	uiut.load = function() {
		uiut.Utils.loadJS.apply(uiut.Utils, arguments)
	};
	uiut.Utils.loadJS = function(A) {
		document.write("<scr" + "ipt type='text/javascript' src='" + A
				+ "'></scr" + "ipt>");
		var _ = this.jsArr.length;
		for ( var $ = 0; $ < _; $++)
			if (this.jsArr[$] == A)
				return true;
		this.jsArr.push(A);
		return true
	};
	uiut.Utils._createXMLHTTP = function() {
		if (typeof XMLHttpRequest == "undefined" && window.ActiveXObject) {
			var $ = [ "MSXML2.XMLHTTP.5.0", "MSXML2.XMLHTTP.4.0",
					"MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];
			for ( var _ = 0; _ < $.length; _++) {
				try {
					var B = new ActiveXObject($[_]);
					return B
				} catch (A) {
				}
			}
			throw new Error("MSXML is not installed on your system.")
		} else {
			B = new XMLHttpRequest();
			return B
		}
	};
	uiut.Utils._exe = function($) {
		if (window.attachEvent && !window.opera)
			execScript($);
		else
			window.eval($);
		return true
	};
	uiut.Utils.console = function() {
		if (typeof window.loadFirebugConsole == "function")
			window.loadFirebugConsole();
		if (window.console) {
			for ( var $ = 0; $ < arguments.length; $++)
				window.console.debug(arguments[$])
		}
	};
	uiut.Utils.byId = function($) {
		return document.getElementById($)
	};
	uiut.Utils.searchArgs = {
		cached : false
	};
	uiut.Utils.getURLParams = function($) {
		var _ = $.toLowerCase();
		if (_ != "suitepath" && _ != "autorun" && _ != "uiut_newwindow"
				&& _ != "testspeed")
			return null;
		if (!uiut.Utils.searchArgs.cached)
			uiut.Utils._uiutParseParams(document.location.search);
		var A = uiut.Utils.searchArgs[$];
		if (typeof A != "undefined")
			return A;
		else
			return null
	};
	uiut.Utils.setSuitePath = function($) {
		uiut.Utils.searchArgs.suitepath = $;
		return true
	};
	uiut.Utils._uiutParseParams = function(D) {
		var _ = unescape(D);
		if (!_)
			return uiut.Utils.searchArgs;
		A = _.indexOf("?");
		if (A != -1)
			_ = _.substring(A + 1);
		var C = _.split("&");
		for ( var A = 0; A < C.length; A++) {
			var B = C[A].split("="), $ = B[0].toLowerCase();
			if (B.length > 1)
				uiut.Utils.searchArgs[$] = B[1];
			else
				uiut.Utils.searchArgs[$] = "true"
		}
		uiut.Utils.searchArgs.cached = true;
		return uiut.Utils.searchArgs
	};
	uiut.Utils.mixin = function(_, A) {
		for ( var $ in A)
			_[$] = A[$];
		return _
	}
})();
(function() {
	if (typeof window.uiut == "undefined")
		window.uiut = {};
	uiut.UIUTCore = function() {
	};
	uiut.UIUTCore._instance = null;
	uiut.UIUTCore.getInstance = function() {
		if (!uiut.UIUTCore._instance) {
			var $ = new uiut.UIUTCore();
			uiut.UIUTCore._instance = $;
			return $
		} else
			return uiut.UIUTCore._instance
	};
	uiut._validateParameter = function(_, $) {
		if ($.length != _ && $.length != (_ + 1))
			throw new uiut.UIUTException(
					"Incorrect arguments passed to assert function");
		else if ($.length == (_ + 1))
			if (typeof $[_] != "string")
				throw new uiut.UIUTException(
						"Incorrect arguments passed to assert function");
			else
				return ". The additional information:" + $[_];
		return ""
	};
	uiut._assert = function($, _) {
		if (!$) {
			var A = new uiut.UIUTException(_);
			if (window.parent != window)
				window.parent.uiut._assert($, _);
			else
				throw A
		}
		return A
	};
	uiut.assertTrue = function(_) {
		var $ = uiut._validateParameter(1, arguments);
		uiut._assert(_, "assert true,but was false!" + $)
	};
	uiut.assertFalse = function(_) {
		var $ = uiut._validateParameter(1, arguments);
		uiut._assert(!_, "assert false,but was true" + $)
	};
	uiut.assertEquals = function(A, _) {
		var $ = uiut._validateParameter(2, arguments);
		uiut._assert(A === _, "expect: " + A + ",but was: " + _ + $)
	};
	uiut.assertNotEquals = function(A, _) {
		var $ = uiut._validateParameter(2, arguments);
		uiut._assert(A !== _, "expect not to be :" + A + $)
	};
	uiut.assertNull = function(_) {
		var $ = uiut._validateParameter(1, arguments);
		uiut._assert(_ === null, "expect null,but is : " + _ + $)
	};
	uiut.assertNotNull = function(_) {
		var $ = uiut._validateParameter(1, arguments);
		uiut._assert(_ !== null, "expect not null, but was null" + $)
	};
	uiut.assertUndefined = function(_) {
		var $ = uiut._validateParameter(1, arguments);
		uiut._assert(_ === undefined, "expect was undefined, but real was : "
				+ _ + $)
	};
	uiut.assertNotUndefined = function(_) {
		var $ = uiut._validateParameter(1, arguments);
		uiut._assert(_ !== undefined,
				"expect was not undefined, but real was undefined" + $)
	};
	uiut.assertNaN = function(_) {
		var $ = uiut._validateParameter(1, arguments);
		uiut._assert(isNaN(_), "Expected NaN" + $)
	};
	uiut.assertNotNaN = function(_) {
		var $ = uiut._validateParameter(1, arguments);
		uiut._assert(!isNaN(_), "Expected NaN" + $)
	};
	uiut.assertObjectEquals = function(C, B) {
		var $ = uiut._validateParameter(2, arguments), A = (C === B), D = ((type = uiut
				._trueTypeOf(C)) == uiut._trueTypeOf(B));
		if (D && !A)
			switch (type) {
			case "Null":
			case "String":
			case "Number":
				D = (C == B);
				break;
			case "Boolean":
			case "Date":
				D = (C === B);
				break;
			case "RegExp":
			case "Function":
				D = (C.toString() === B.toString());
				break;
			default:
				var _;
				if (D = (C.length === B.length))
					for (_ in C)
						uiut.assertObjectEquals(C[_], B[_])
			}
		uiut._assert(D, "Expected " + uiut._displayStringForValue(C)
				+ " but was " + uiut._displayStringForValue(B) + $)
	};
	uiut.assertUIUTEquals = function(A, B, $, _) {
	};
	uiut.fail = function($) {
		uiut._assert(false, $)
	};
	uiut._trueTypeOf = function(A) {
		if (A == null)
			return "Null";
		var _ = typeof A;
		try {
			switch (_) {
			case "string":
			case "boolean":
			case "number":
				break;
			case "object":
			case "function":
				switch (A.constructor) {
				case String:
					_ = "String";
					break;
				case Boolean:
					_ = "Boolean";
					break;
				case Number:
					_ = "Number";
					break;
				case Array:
					_ = "Array";
					break;
				case RegExp:
					_ = "RegExp";
					break;
				case Function:
					_ = "Function";
					break;
				default:
					var $ = A.constructor.toString().match(
							/function\s*([^( ]+)\(/);
					if ($)
						_ = $[1];
					else
						break
				}
				break
			}
		} finally {
			_ = _.substr(0, 1).toUpperCase() + _.substr(1);
			return _
		}
	};
	uiut._displayStringForValue = function(_) {
		var $ = "<" + _ + ">";
		$ += " (" + uiut._trueTypeOf(_) + ")";
		return $
	};
	uiut.getFunctionName = function($) {
		var _ = $.toString().match(/function(\s*)(\w*)/);
		if (_ && _.length >= 2 && _[2])
			return _[2];
		return "anonymous "
	};
	uiut._getStackTrace = function() {
		var A = 10, B = 0, _ = new Array();
		for ( var $ = uiut._getStackTrace.caller.caller; $ != null; $ = $.caller) {
			_[_.length] = "> ";
			_[_.length] = uiut.getFunctionName($.arguments.callee)
					+ $.arguments.callee.toString();
			_[_.length] = "<br/>";
			if ($.caller == $) {
				_[_.length] = "*";
				break
			}
			if (B == A) {
				_[_.length] = "...";
				break
			}
			B++
		}
		return _.join("")
	};
	uiut.UIUTException = function($) {
		this.name = "UIUTException";
		this.UIUTMessage = $;
		this.stackTrace = uiut._getStackTrace();
		this.toString = function() {
			var _ = "<div class='assert_error'>" + "Error: " + $ + "<br/> "
					+ "<div class = 'stackInfo'>Stack Infomation :<br/> "
					+ this.stackTrace + "</div>" + "</div>";
			return _
		}
	};
	uiut.UIUTRunTimeException = function($) {
		this.name = "UIUTRunTimeException";
		this.message = $;
		this.stackTrace = uiut._getStackTrace();
		this.DomInfo = function() {
			var _ = "<div class='assert_error'>" + "Error: " + $ + "<br/> "
					+ "Stack Infomation" + this.stackTrace + "</div>";
			return _
		}
	};
	uiut.setTimeout = function($, _) {
		setTimeout(function() {
			try {
				$()
			} catch (_) {
				uiut.UIUTTestManager.getInstance().uiutTests.setFail(_)
			}
		}, _)
	}
})();
(function() {
	if (typeof uiut.MockEvents == "undefined")
		uiut.MockEvents = {};
	uiut.MockEvents._mockMouseEvent = function(E, B, G, $, _, C, A, O, I, D, K,
			N, J, M, H, F) {
		B = B.toLowerCase();
		switch (B) {
		case "mouseover":
		case "mouseout":
		case "mousedown":
		case "mouseup":
		case "click":
		case "dblclick":
		case "mousemove":
			break;
		default:
			throw new Error("simulateMouseEvent(): Event type '" + B
					+ "' not supported.")
		}
		if (typeof G != "boolean")
			G = true;
		if (typeof $ != "boolean")
			$ = (B != "mousemove");
		if (typeof _ != "object")
			_ = window;
		if (typeof C != "number")
			C = 1;
		if (typeof A != "number")
			A = 0;
		if (typeof O != "number")
			O = 0;
		if (typeof I != "number")
			I = 0;
		if (typeof D != "number")
			D = 0;
		if (typeof K != "boolean")
			K = false;
		if (typeof N != "boolean")
			N = false;
		if (typeof J != "boolean")
			J = false;
		if (typeof M != "boolean")
			M = false;
		if (typeof H != "number")
			H = 0;
		var L = null;
		if (typeof document.createEvent == "function") {
			L = document.createEvent("MouseEvents");
			if (L.initMouseEvent)
				L.initMouseEvent(B, G, $, _, C, A, O, I, D, K, N, J, M, H, F);
			else {
				L = document.createEvent("UIEvents");
				L.initEvent(B, G, $);
				L.view = _;
				L.detail = C;
				L.screenX = A;
				L.screenY = O;
				L.clientX = I;
				L.clientY = D;
				L.ctrlKey = K;
				L.altKey = N;
				L.metaKey = M;
				L.shiftKey = J;
				L.button = H;
				L.relatedTarget = F
			}
			E.dispatchEvent(L)
		} else if (typeof document.createEventObject == "object") {
			L = document.createEventObject();
			L.bubbles = G;
			L.cancelable = $;
			L.view = _;
			L.detail = C;
			L.screenX = A;
			L.screenY = O;
			L.clientX = I;
			L.clientY = D;
			L.ctrlKey = K;
			L.altKey = N;
			L.metaKey = M;
			L.shiftKey = J;
			switch (H) {
			case 0:
				L.button = 1;
				break;
			case 1:
				L.button = 4;
				break;
			case 2:
				break;
			default:
				L.button = 0
			}
			L.relatedTarget = F;
			E.fireEvent("on" + B, L)
		}
	};
	uiut.MockEvents._mockKeyEvent = function(B, A, D, $, _, H, K, G, I, E, C) {
		A = A.toLowerCase();
		switch (A) {
		case "keyup":
		case "keydown":
		case "keypress":
			break;
		case "textevent":
			A = "keypress";
			break;
		default:
			throw new Error("simulateKeyEvent(): Event type '" + A
					+ "' not supported.")
		}
		if (typeof D != "boolean")
			D = true;
		if (typeof $ != "boolean")
			$ = true;
		if (typeof _ != "object")
			_ = window;
		if (typeof H != "boolean")
			H = false;
		if (typeof K != "boolean")
			K = false;
		if (typeof G != "boolean")
			G = false;
		if (typeof I != "boolean")
			I = false;
		if (typeof E != "number")
			E = 0;
		if (typeof C != "number")
			C = 0;
		var J = null;
		if (typeof document.createEvent == "function") {
			try {
				J = document.createEvent("KeyEvents");
				J.initKeyEvent(A, D, $, _, H, K, G, I, E, C)
			} catch (F) {
				try {
					J = document.createEvent("Events")
				} catch (L) {
					J = document.createEvent("UIEvents")
				} finally {
					J.initEvent(A, D, $);
					J.view = _;
					J.altKey = K;
					J.ctrlKey = H;
					J.shiftKey = G;
					J.metaKey = I;
					J.keyCode = E;
					J.charCode = C
				}
			}
			B.dispatchEvent(J)
		} else if (typeof document.createEventObject == "object") {
			J = document.createEventObject();
			J.bubbles = D;
			J.cancelable = $;
			J.view = _;
			J.ctrlKey = H;
			J.altKey = K;
			J.shiftKey = G;
			J.metaKey = I;
			J.keyCode = (C > 0) ? C : E;
			B.fireEvent("on" + A, J)
		} else
			throw new Error(
					"simulateKeyEvent(): No event simulation framework present.")
	};
	uiut.MockEvents._mockEvent = function($, E, D, A, G, C, _) {
		D = (typeof (D) == undefined) ? true : D;
		if ($.fireEvent && $.ownerDocument && $.ownerDocument.createEventObject) {
			var B = createEventObject($, A, G, C, _);
			$.fireEvent("on" + E, B)
		} else {
			B = document.createEvent("HTMLEvents");
			try {
				B.shiftKey = C;
				B.metaKey = _;
				B.altKey = G;
				B.ctrlKey = A
			} catch (F) {
				LOG.exception(F)
			}
			B.initEvent(E, D, true);
			$.dispatchEvent(B)
		}
	};
	uiut.MockEvents._fireMouseEvent = function(_, $, A) {
		A = A || {};
		uiut.MockEvents._mockMouseEvent(_, $, A.bubbles, A.cancelable, A.view,
				A.detail, A.screenX, A.screenY, A.clientX, A.clientY,
				A.ctrlKey, A.altKey, A.shiftKey, A.metaKey, A.button,
				A.relatedTarget)
	};
	uiut.MockEvents._getKeyCodeFromKeySequence = function(_) {
		var $ = /^\\(\d{1,3})$/.exec(_);
		if ($ != null)
			return Number($[1]);
		$ = /^.$/.exec(_);
		if ($ != null)
			return Number($[0].charCodeAt(0));
		$ = /^\d{2,3}$/.exec(_);
		if ($ != null)
			return Number($[0]);
		throw new Error("invalid keySequence")
	};
	uiut.MockEvents._fireKeyEvent = function(A, _, $, C) {
		var B = uiut.MockEvents._getKeyCodeFromKeySequence($);
		C = C || {};
		uiut.MockEvents._mockKeyEvent(A, _, C.bubbles, C.cancelable, C.view,
				C.ctrlKey, C.altKey, C.shiftKey, C.metaKey, B, B)
	};
	uiut.MockEvents.click = function($, _) {
		uiut.MockEvents._fireMouseEvent($, "click", _)
	};
	uiut.MockEvents.dblclick = function($, _) {
		uiut.MockEvents._fireMouseEvent($, "dblclick", _)
	};
	uiut.MockEvents.mousedown = function($, _) {
		uiut.MockEvents._fireMouseEvent($, "mousedown", _)
	};
	uiut.MockEvents.mousemove = function($, _) {
		uiut.MockEvents._fireMouseEvent($, "mousemove", _)
	};
	uiut.MockEvents.mouseout = function($, _) {
		uiut.MockEvents._fireMouseEvent($, "mouseout", _)
	};
	uiut.MockEvents.mouseover = function($, _) {
		uiut.MockEvents._fireMouseEvent($, "mouseover", _)
	};
	uiut.MockEvents.mouseup = function($, _) {
		uiut.MockEvents._fireMouseEvent($, "mouseup", _)
	};
	uiut.MockEvents.keypress = function(_, $, A) {
		uiut.MockEvents._fireKeyEvent(_, "keypress", $, A)
	};
	uiut.MockEvents.keydown = function(_, $, A) {
		uiut.MockEvents._fireKeyEvent(_, "keydown", $, A)
	};
	uiut.MockEvents.keyup = function(_, $, A) {
		uiut.MockEvents._fireKeyEvent(_, "keyup", $, A)
	}
})();
(function() {
	window.Mock = function() {
		this.expectedMethodInvocations = [];
		this.attrs = [];
		this.expectedProperties = {};
		this.isEnforceOverride = false;
		var _ = 0;
		for ( var $ in this) {
			this.attrs[_] = $;
			_++
		}
	};
	Mock.appendMockObject = function($) {
		if (typeof $ == "object") {
			var _ = new Mock();
			uiut.Utils.mixin($, _);
			$.setIsEnforceOverride(true);
			return $
		}
	};
	Mock.unload = function(B) {
		var A = [ "setIsEnforceOverride", "expects", "_executeMethod",
				"expectsProperty", "verify" ];
		for ( var _ = 0, $ = A.length; _ < $; _++) {
			var C = B[A[_]];
			if (typeof C == "function")
				C = null
		}
	};
	Mock.prototype.setIsEnforceOverride = function($) {
		if ($ === false || $ === true)
			this.isEnforceOverride = $
	};
	Mock.prototype.expects = function() {
		var functionName = arguments[0], expectedArgs = [];
		for ( var i = 1; i < arguments.length; i++)
			expectedArgs[i - 1] = arguments[i];
		var methodInvocation = new MethodInvocation(functionName, expectedArgs), evalArr = [];
		evalArr[evalArr.length] = "if (!this." + functionName
				+ " || this.isEnforceOverride)";
		evalArr[evalArr.length] = "{ this." + functionName
				+ " = this._executeMethod; }";
		eval(evalArr.join(""));
		this.expectedMethodInvocations.push(methodInvocation);
		this.attrs[this.attrs.length] = "dummy";
		return new Returner(methodInvocation)
	};
	Mock.prototype._executeMethod = function() {
		var B = this.expectedMethodInvocations.shift();
		if (!B) {
			var _ = "No more expected method invocations.";
			uiut.fail(_)
		}
		uiut.assertEquals(B.expectedArgs.length, arguments.length);
		for ( var $ = 0; $ < arguments.length; $++)
			if (typeof B.expectedArgs[$] != "object")
				uiut.assertEquals(B.expectedArgs[$], arguments[$]);
			else
				uiut.assertObjectEquals(B.expectedArgs[$], arguments[$]);
		var A = B.returnValue;
		if (A && A.isMockError)
			throw A;
		return A
	};
	Mock.prototype.expectsProperty = function() {
		var _ = arguments[0];
		if (arguments.length == 2) {
			var $ = arguments[1];
			this.expectedProperties[_] = $;
			this.attrs[this.attrs.length] = "dummy"
		} else
			return new PropertySetter(this, _)
	};
	Mock.prototype.verify = function() {
		for ( var $ = 0; $ < this.expectedMethodInvocations.length; $++) {
			var _ = this.expectedMethodInvocations[$];
			throw new Error("Expected function not called:" + _.functionName)
		}
	};
	var MethodInvocation = function(_, $) {
		this.functionName = _;
		this.expectedArgs = $;
		this.returnValue = undefined
	}, Returner = function($) {
		this.methodInvocation = $
	};
	Returner.prototype.returns = function($) {
		this.methodInvocation.returnValue = $
	};
	Returner.prototype.andThrows = function($) {
		var _ = new Error($);
		_.isMockError = true;
		this.methodInvocation.returnValue = _
	};
	var PropertySetter = function(_, $) {
		this.mock = _;
		this.propertyName = $
	};
	PropertySetter.prototype.returns = function(returnValue) {
		var ref = new Object();
		ref.value = returnValue;
		eval("this.mock." + this.propertyName + "=ref.value")
	}
})();
(function() {
	uiut.ViewController = function() {
		var $ = "TestList", D = "LogList", B = "uiFrame", F = "showLog", E = "showFrame", C = "testurl", A = "runAll", _ = "runOne", G = "pause";
		this.listRoot = uiut.Utils.byId($);
		this.logRoot = uiut.Utils.byId(D);
		this.uiFrame = uiut.Utils.byId(B);
		this.showLog = uiut.Utils.byId(F);
		this.showFrame = uiut.Utils.byId(E);
		this.testURL = uiut.Utils.byId(C);
		this.runAllDiv = uiut.Utils.byId(A);
		this.runOneDiv = uiut.Utils.byId(_);
		this.pauseDiv = uiut.Utils.byId(G);
		this.testsArr = new Array();
		this.ini()
	};
	uiut.ViewController.prototype.ini = function() {
		this.bindEvent();
		this.showTestURL()
	};
	uiut.ViewController.prototype.bindEvent = function() {
		var $ = this;
		uiut.Utils.addEventHandler(this.showLog, "click", function() {
			$.showLogDiv()
		});
		uiut.Utils.addEventHandler(this.showFrame, "click", function() {
			$.showFrameDiv()
		});
		uiut.Utils
				.addEventHandler(
						this.runAllDiv,
						"click",
						function() {
							var _ = uiut.UIUTTestManager.getInstance(), $ = _.uiutTests.viewController;
							if (_.isStop) {
								_.isStop = false;
								_.isStepping = false;
								$.runAllStop();
								_.loadTestPage();
								_.runTests()
							} else {
								_.isStartRunOne = false;
								$.runAllStart();
								_.reset()
							}
						});
		uiut.Utils
				.addEventHandler(
						this.runOneDiv,
						"click",
						function() {
							var _ = uiut.UIUTTestManager.getInstance(), $ = _.uiutTests.viewController;
							if (_.isStartRunOne == true) {
								$.runAllStop();
								_.runTests()
							} else {
								_.isStop = false;
								_.isStartRunOne = true;
								_.isStepping = true;
								_.loadTestPage();
								_.runTests()
							}
						});
		uiut.Utils
				.addEventHandler(
						this.pauseDiv,
						"click",
						function() {
							var _ = uiut.UIUTTestManager.getInstance(), $ = _.uiutTests.viewController;
							if (_.isPause) {
								_.isPause = false;
								_.isStop = false;
								_.isStepping = false;
								$.pause();
								_.runTests()
							} else {
								_.isPause = true;
								$.resume()
							}
						})
	};
	uiut.ViewController.prototype.runAllStart = function() {
		uiut.Utils.addClass(this.runAllDiv, "runAll");
		uiut.Utils.deleteClass(this.runAllDiv, "stop")
	};
	uiut.ViewController.prototype.runAllStop = function() {
		uiut.Utils.addClass(this.runAllDiv, "stop");
		uiut.Utils.deleteClass(this.runAllDiv, "runAll")
	};
	uiut.ViewController.prototype.runOneStart = function() {
		uiut.Utils.addClass(this.runOneDiv, "runOne");
		uiut.Utils.deleteClass(this.runOneDiv, "runOneEnd")
	};
	uiut.ViewController.prototype.runOneEnd = function() {
		uiut.Utils.addClass(this.runOneDiv, "runOneEnd");
		uiut.Utils.deleteClass(this.runOneDiv, "runOne")
	};
	uiut.ViewController.prototype.pause = function() {
		uiut.Utils.addClass(this.pauseDiv, "pause");
		uiut.Utils.deleteClass(this.pauseDiv, "resume")
	};
	uiut.ViewController.prototype.resume = function() {
		uiut.Utils.addClass(this.pauseDiv, "resume");
		uiut.Utils.deleteClass(this.pauseDiv, "pause")
	};
	uiut.ViewController.prototype.showTestURL = function() {
		var $ = uiut.Utils.getURLParams("suitepath");
		if ($ != null)
			this.testURL.innerHTML = "Test URL: " + $
	};
	uiut.ViewController.prototype.addPage = function(_, A) {
		var E = this, D = document.createElement("DIV");
		D.className = "notRun testPage";
		var B = document.createElement("IMG");
		B.className = "plus";
		B.setAttribute("src", "./app/img/plus.JPG");
		uiut.Utils
				.addEventHandler(
						D,
						"click",
						function() {
							var _ = this.getAttribute("pageindex"), B = E.testsArr[_], A = B.tests;
							if (B.expand) {
								for ( var $ in A) {
									uiut.Utils.deleteClass(A[$], "showTests");
									uiut.Utils.addClass(A[$], "hideTests")
								}
								B.expand = false
							} else {
								for ($ in A) {
									uiut.Utils.deleteClass(A[$], "hideTests");
									uiut.Utils.addClass(A[$], "showTests")
								}
								B.expand = true
							}
						});
		D.appendChild(B);
		var $ = document.createElement("DIV");
		$.className = "pageName";
		var C = document.createTextNode(A);
		$.appendChild(C);
		D.appendChild($);
		if (_ == null || _ == this.testsArr.length - 1) {
			this.testsArr[this.testsArr.length] = {
				name : A,
				domNode : D,
				expand : true,
				tests : {}
			};
			this.listRoot.appendChild(D);
			this._setPageIndex();
			return (this.testsArr.length - 1)
		} else if (_ >= 0 && _ < (this.testsArr.length - 1)) {
			this.listRoot.insertBefore(D, this.testsArr[_ + 1].domNode);
			this.testsArr.splice(_ + 1, 0, {
				name : A,
				domNode : D,
				expand : true,
				tests : {}
			});
			this._setPageIndex();
			return _ + 1
		} else
			return (this.testsArr.length - 1)
	};
	uiut.ViewController.prototype._setPageIndex = function() {
		for ( var _ = 0, $ = this.testsArr.length; _ < $; _++) {
			var A = this.testsArr[_].domNode;
			A.setAttribute("pageIndex", _)
		}
	};
	uiut.ViewController.prototype.addTest = function(_, D) {
		if (this.testsArr.length == 0)
			return -1;
		if (_ == null || _ >= this.testsArr.length || _ < 0)
			var _ = this.testsArr.length - 1;
		var $ = document.createElement("DIV");
		$.className = "notRun test";
		var C = document.createTextNode(D);
		$.appendChild(C);
		if (_ == (this.testsArr.length - 1) || _ == null) {
			this.testsArr[this.testsArr.length - 1].tests[D] = $;
			this.listRoot.appendChild($)
		} else if (_ >= 0 && _ < (this.testsArr.length - 1)) {
			this.listRoot.insertBefore($, this.testsArr[_ + 1].domNode);
			this.testsArr[_].tests[D] = $
		}
		var B = 0;
		for ( var A in this.testsArr[_].tests)
			B++;
		return B - 1
	};
	uiut.ViewController.prototype.setSuccess = function($, A) {
		if ($ >= this.testsArr.length || $ < 0)
			return 0;
		var _ = this.testsArr[$].tests[A];
		if (_) {
			uiut.Utils.deleteClass(_, "notRun");
			uiut.Utils.deleteClass(_, "fail");
			uiut.Utils.deleteClass(_, "unRunnable");
			uiut.Utils.addClass(_, "success")
		}
		if (uiut.Utils.hasClass(this.testsArr[$].domNode, "notRun")) {
			uiut.Utils.deleteClass(this.testsArr[$].domNode, "notRun");
			uiut.Utils.deleteClass(this.testsArr[$].domNode, "fail");
			uiut.Utils.deleteClass(this.testsArr[$].domNode, "unRunnable");
			uiut.Utils.addClass(this.testsArr[$].domNode, "success")
		}
	};
	uiut.ViewController.prototype.setFail = function($, A) {
		if ($ >= this.testsArr.length || $ < 0)
			return 0;
		var _ = this.testsArr[$].tests[A];
		if (_) {
			uiut.Utils.deleteClass(_, "notRun");
			uiut.Utils.deleteClass(_, "success");
			uiut.Utils.deleteClass(_, "unRunnable");
			uiut.Utils.addClass(_, "fail")
		}
		uiut.Utils.deleteClass(this.testsArr[$].domNode, "notRun");
		uiut.Utils.deleteClass(this.testsArr[$].domNode, "success");
		uiut.Utils.deleteClass(this.testsArr[$].domNode, "unRunnable");
		uiut.Utils.addClass(this.testsArr[$].domNode, "fail")
	};
	uiut.ViewController.prototype.setUnRunnable = function(_) {
		if (_ >= this.testsArr.length || _ < 0)
			return 0;
		var A = this.testsArr[_].domNode;
		for ( var $ in this.testsArr[_].tests) {
			uiut.Utils.deleteClass(this.testsArr[_].tests[$], "notRun");
			uiut.Utils.deleteClass(this.testsArr[_].tests[$], "success");
			uiut.Utils.deleteClass(this.testsArr[_].tests[$], "fail");
			uiut.Utils.addClass(this.testsArr[_].tests[$], "unRunnable")
		}
		uiut.Utils.deleteClass(this.testsArr[_].domNode, "notRun");
		uiut.Utils.deleteClass(this.testsArr[_].domNode, "success");
		uiut.Utils.deleteClass(this.testsArr[_].domNode, "fail");
		uiut.Utils.addClass(this.testsArr[_].domNode, "unRunnable")
	};
	uiut.ViewController.prototype.reset = function() {
		this.runAllStart();
		this.runOneStart();
		this.pause()
	};
	uiut.ViewController.prototype.clear = function() {
		this.listRoot.innerHTML = "";
		this.logRoot.innerHTML = "";
		this.testsArr = [];
		this.resetUIView()
	};
	uiut.ViewController.prototype.addLog = function(_) {
		var A = "";
		if (_.name == "UIUTException")
			A += _.toString();
		else if (typeof _ == "object") {
			A += "<div class='assert_error'>";
			for ( var $ in _)
				A += $ + " : " + _[$] + " | ";
			A += "</div>"
		} else
			A += _;
		this.logRoot.innerHTML = this.logRoot.innerHTML + A + "<br/>"
	};
	uiut.ViewController.prototype.showUIView = function(B, _) {
		var $ = this.uiFrame, A = this.logRoot;
		this._setUIFrameSrc($, B, _);
		uiut.Utils.deleteClass($, "hideDiv");
		uiut.Utils.addClass(A, "hideDiv");
		this.showFrameDiv()
	};
	uiut.ViewController.prototype.resetUIView = function() {
		var $ = this.uiFrame;
		this._setUIFrameSrc($, "", null)
	};
	uiut.ViewController.prototype.showLogDiv = function() {
		var $ = this.uiFrame, A = this.logRoot;
		uiut.Utils.addClass($, "hideDiv");
		uiut.Utils.deleteClass(A, "hideDiv");
		var _ = this.showLog, B = this.showFrame;
		uiut.Utils.addClass(_, "active");
		uiut.Utils.deleteClass(_, "inactive");
		uiut.Utils.addClass(B, "inactive");
		uiut.Utils.deleteClass(B, "active")
	};
	uiut.ViewController.prototype.showFrameDiv = function() {
		var $ = this.uiFrame, A = this.logRoot;
		uiut.Utils.addClass(A, "hideDiv");
		uiut.Utils.deleteClass($, "hideDiv");
		var _ = this.showLog, B = this.showFrame;
		uiut.Utils.addClass(_, "inactive");
		uiut.Utils.deleteClass(_, "active");
		uiut.Utils.addClass(B, "active");
		uiut.Utils.deleteClass(B, "inactive")
	};
	uiut.ViewController.prototype._setUIFrameSrc = function(_, A, $) {
		if ($)
			uiut.Utils.addEventHandler(_, "load", $);
		_.setAttribute("src", A)
	}
})();
(function() {
	uiut.UIUTTests = function() {
		this.LOAD_HTML_CHECK_TIME = 400;
		this.DEFAULT_RUN_SPEED = 500;
		this.uiutTests = [];
		this.viewController = new uiut.ViewController();
		this.pagePointer = 0;
		this.testPointer = -1;
		this.currentContext = this;
		this.testName = "";
		this.hasCalledSetup = false;
		this.hasCalledTeardown = false;
		this.hasCalledLoadHtml = false
	};
	uiut.UIUTTests._instance = null;
	uiut.UIUTTests.getInstance = function() {
		if (window.parent != window) {
			var $ = window.parent.uiut.UIUTTests.getInstance();
			return $
		}
		if (uiut.UIUTTests._instance == null)
			uiut.UIUTTests._instance = new uiut.UIUTTests();
		return uiut.UIUTTests._instance
	};
	uiut.UIUTTests.prototype.reset = function() {
		this.viewController.reset()
	};
	uiut.UIUTTests.prototype.clear = function() {
		this.uiutTests = [];
		this.pagePointer = 0;
		this.testPointer = -1;
		this.hasCalledSetup = false;
		this.hasCalledTeardown = false;
		this.hasCalledLoadHtml = false;
		this.viewController.clear()
	};
	uiut.UIUTTests.prototype.addPage = function(B) {
		if ((window.parent != window) && window.parent.uiut)
			window.parent.uiut.UIUTTests.getInstance().addPage.apply(this,
					arguments);
		var $ = 0;
		if (typeof B.runnable == "undefined")
			B.runnable = true;
		if (typeof B.type == "undefined")
			B.type = "unit";
		this.uiutTests.push(B);
		var A = this.viewController.addPage(null, B.name);
		for ( var _ in B)
			if (_.toLowerCase().indexOf("test_") == 0) {
				this.viewController.addTest(A, _);
				$++
			}
		B.length = $
	};
	uiut.UIUTTests.prototype.addUIPage = function(B) {
		if ((window.parent != window.parent) && window.parent.uiut)
			window.parent.uiut.UIUTTests.getInstance().addPage.apply(this,
					arguments);
		var $ = 0;
		if (typeof B.runnable == "undefined")
			B.runnable = true;
		if (typeof B.type == "undefined")
			B.type = "unit";
		var A = this.viewController.addPage(this.pagePointer, B.name);
		this.uiutTests.splice(this.pagePointer + 1, 0, B);
		for ( var _ in B)
			if (_.toLowerCase().indexOf("test_") == 0) {
				this.viewController.addTest(A, _);
				$++
			}
		B.length = $
	};
	uiut.UIUTTests.prototype.addHtmlLinkPage = function(_) {
		if ((window.parent != window.parent) && window.parent.uiut)
			window.parent.uiut.UIUTTests.getInstance().addPage.apply(this,
					arguments);
		var $ = 0;
		if (typeof _.runnable == "undefined")
			_.runnable = true;
		this.uiutTests.push(_);
		this.viewController.addPage(null, _.name);
		if (typeof _.type == "undefined")
			_.type = "link";
		_.length = $
	};
	uiut.UIUTTests.prototype.getSetup = function() {
		if (this.hasCalledSetup == true)
			return null;
		else {
			var $ = this.uiutTests[this.pagePointer].setup;
			this.hasCalledSetup = true;
			if (typeof $ == "undefined")
				return null;
			return {
				func : $,
				type : "syn",
				allowLog : false
			}
		}
	};
	uiut.UIUTTests.prototype.getTeardown = function() {
		if (this.hasCalledTeardown == true)
			return null;
		else {
			var $ = this.uiutTests[this.pagePointer].teardown;
			this.hasCalledTeardown = true;
			if (typeof $ == "undefined")
				return null;
			return {
				func : $,
				type : "syn",
				allowLog : false
			}
		}
	};
	uiut.UIUTTests.prototype.getType = function() {
		if (typeof this.uiutTests[this.pagePointer] == "undefined")
			return null;
		return this.uiutTests[this.pagePointer].type
	};
	uiut.UIUTTests.prototype.getNextTest = function() {
		var $ = null, C = null, B = 0, D = true, F = this.getType();
		if (F == "link") {
			B = this.LOAD_HTML_CHECK_TIME;
			C = "asyn";
			var A = this.uiutTests[this.pagePointer].url, G = this;
			if (this.hasCalledLoadHtml == false)
				$ = function() {
					uiut.UIUTTestManager.getInstance().allowNextTest = false;
					G.hasCalledLoadHtml = true;
					G.loadHTMLTest(A, function() {
						uiut.UIUTTestManager.getInstance().allowNextTest = true
					})
				};
			D = false
		} else if (F == "unit") {
			B = this.getTestspeed();
			var _ = this.getSetup(), E = (_ == null) ? (((_ = this.nextTest()) == null) ? (_ = this
					.getTeardown())
					: _)
					: _;
			if (E == null)
				return {
					type : "asyn",
					test : null,
					time : B,
					allowLog : D
				};
			$ = E.func;
			C = E.type;
			D = E.allowLog
		}
		return {
			type : C,
			test : $,
			time : B,
			allowLog : D
		}
	};
	uiut.UIUTTests.prototype.getTestspeed = function() {
		var $ = uiut.Utils.getURLParams("testspeed");
		if ($ == null)
			return this.DEFAULT_RUN_SPEED;
		else
			return $
	};
	uiut.UIUTTests.prototype.nextTest = function() {
		var B = this.uiutTests[this.pagePointer];
		this.currentContext = B;
		if (B.length == (this.testPointer + 1) || this.getType() == "link")
			return null;
		if (!B.runnable) {
			this.setRunnable(this.pagePointer, false, B.name);
			return null
		}
		var $ = 0, A = this.testPointer + 1;
		for ( var _ in B)
			if (_.toLowerCase().indexOf("test_") == 0)
				if ($ == A) {
					this.testPointer++;
					this.testName = _;
					return {
						func : B[_],
						type : "asyn",
						allowLog : true
					}
				} else
					$++
	};
	uiut.UIUTTests.prototype.nextPage = function() {
		if (this.pagePointer == (this.uiutTests.length - 1))
			return false;
		this.pagePointer++;
		this.testPointer = -1;
		this.hasCalledSetup = false;
		this.hasCalledTeardown = false;
		this.hasCalledLoadHtml = false;
		return true
	};
	uiut.UIUTTests.prototype.setRunnable = function($, _, A) {
		this.uiutTests[$].runnable = _;
		if (_ === false) {
			this.viewController.addLog(A + " TestPage is disabled");
			this.viewController.setUnRunnable($)
		}
	};
	uiut.UIUTTests.prototype.setSuccess = function() {
		this.viewController.setSuccess(this.pagePointer, this.testName);
		this.viewController.addLog("Sucessful run the test: " + this.testName)
	};
	uiut.UIUTTests.prototype.setFail = function($) {
		this.viewController.setFail(this.pagePointer, this.testName);
		this.viewController.addLog($)
	};
	uiut.UIUTTests.prototype.resetHTMLTest = function() {
		this.viewController.resetUIView()
	};
	uiut.UIUTTests.prototype.loadHTMLTest = function(_, $) {
		this.viewController.showUIView(_, $)
	}
})();
(function() {
	uiut.UIUTSuite = function() {
	};
	uiut.UIUTSuite.prototype.addTestPage = function($) {
		uiut.Utils.loadJS($)
	};
	uiut.UIUTSuite.prototype.addTestSuite = function($) {
		uiut.Utils.loadJS($)
	}
})();
(function() {
	uiut.UIUTTestManager = function() {
		this.uiutTests = uiut.UIUTTests.getInstance();
		this.allowNextTest = true;
		this.waitTimeNumber = 0;
		this.isStepping = false;
		this.isStop = true;
		this.isPause = false;
		this.isStartRunOne = false;
		this.ASYN_TEST_WAIT_TIME = 500;
		this.ASYN_TEST_MAX_WAIT_TIME = 600000
	};
	uiut.UIUTTestManager.prototype.ini = function() {
		var $ = this.uiutTests.viewController;
		if (uiut.Utils.getURLParams("autorun") == "true"
				&& uiut.Utils.getURLParams("suitepath") != null) {
			this.isStop = false;
			$.runAllStop();
			this.loadTestPage();
			uiut.Utils.addEventHandler(window, "load", this.runTests)
		} else if (uiut.Utils.getURLParams("suitepath") == null)
			alert("This version of JSUnit should add suitepath in the url")
	};
	uiut.UIUTTestManager.prototype.reset = function() {
		this.isStop = true;
		this.isPause = false;
		this.isStepping = false;
		this.uiutTests.reset()
	};
	uiut.UIUTTestManager._instance = null;
	uiut.UIUTTestManager.getInstance = function() {
		if (window.parent != window) {
			var $ = window.parent.uiut.UIUTTestManager.getInstance();
			return $
		}
		if (!uiut.UIUTTestManager._instance)
			uiut.UIUTTestManager._instance = new uiut.UIUTTestManager();
		return uiut.UIUTTestManager._instance
	};
	uiut.UIUTTestManager.prototype.addUnitTest = function() {
		if (arguments)
			for ( var $ = 0; $ < arguments.length; $++) {
				var _ = arguments[$];
				_.type = "unit";
				this.uiutTests.addPage(_)
			}
	};
	uiut.UIUTTestManager.prototype.addHTMLLink = function() {
		if (arguments)
			for ( var $ = 0; $ < arguments.length; $++) {
				var _ = arguments[$];
				this.uiutTests.addHtmlLinkPage(_)
			}
	};
	uiut.UIUTTestManager.prototype.addUITest = function() {
		if (arguments)
			for ( var $ = 0; $ < arguments.length; $++) {
				var _ = arguments[$];
				this.uiutTests.addUIPage(_)
			}
	};
	uiut.UIUTTestManager.prototype.loadTestPage = function() {
		var $ = this.uiutTests.uiutTests;
		if ($.length != 0) {
			this.uiutTests.clear();
			uiut.Utils.jsArr = []
		}
		if (uiut.Utils.getURLParams("suitepath") != null)
			uiut.Utils.loadJS(uiut.Utils.getURLParams("suitepath"))
	};
	uiut.UIUTTestManager.prototype.runTests = function() {
		var H = uiut.UIUTTestManager.getInstance(), _ = H.ASYN_TEST_WAIT_TIME
				* H.waitTimeNumber;
		if (H.allowNextTest == false && (_ < H.ASYN_TEST_MAX_WAIT_TIME)) {
			H.waitTimeNumber++;
			setTimeout(function() {
				H.runTests()
			}, H.ASYN_TEST_WAIT_TIME);
			return
		} else if (_ >= H.ASYN_TEST_MAX_WAIT_TIME) {
			H.uiutTests.setFail("Reach the max waite time:"
					+ H.ASYN_TEST_MAX_WAIT_TIME);
			H.allowNextTest = true;
			H.runTests()
		}
		var $ = H.uiutTests.getNextTest();
		if ($.test == null) {
			var C = H.uiutTests.nextPage();
			if (C == true && !H.isStop && !H.isStepping && !H.isPause)
				setTimeout(function() {
					H.runTests()
				}, $.time);
			else if (C == false) {
				var D = H.uiutTests.viewController;
				H.reset();
				H.isStartRunOne = false;
				D.runAllStart()
			}
			return null
		} else {
			var A = $.type, G = $.test, B = $.time, E = $.allowLog, F = false;
			if (A == "syn")
				H.runOneTest(G, H.uiutTests.uiutTests[H.uiutTests.pagePointer],
						$.allowLog);
			else if (A == "asyn")
				setTimeout(function() {
					H.runOneTest(G,
							H.uiutTests.uiutTests[H.uiutTests.pagePointer],
							$.allowLog)
				}, B)
		}
	};
	uiut.UIUTTestManager.prototype.runOneTest = function($, _, A) {
		var D = this, B = false;
		try {
			$.apply(_)
		} catch (C) {
			B = true;
			D.uiutTests.setFail(C)
		}
		if (A == true && B != true)
			D.uiutTests.setSuccess();
		D.runTests()
	};
	uiut.UIUTTestManager.prototype.notAllowNext = function() {
		this.allowNextTest = false;
		return true
	};
	uiut.UIUTTestManager.prototype.allowNext = function() {
		this.allowNextTest = true;
		return true
	};
	uiut.UIUTTestManager.prototype.asynRunIndex = 0;
	uiut.UIUTTestManager.prototype.asynRunArguments = null;
	uiut.UIUTTestManager.prototype.asynRun = function() {
		var $ = this;
		if (arguments.length > 0)
			this.asynRunArguments = arguments;
		uiut.setTimeout(function() {
			var _ = $.asynRunArguments[$.asynRunIndex];
			try {
				_()
			} catch (A) {
				uiut.UIUTTestManager.getInstance().uiutTests.setFail(A)
			}
			if ($.asynRunIndex < ($.asynRunArguments.length - 1)) {
				$.asynRunIndex++;
				$.asynRun()
			} else
				$.asynRunReset()
		}, this.uiutTests.getTestspeed())
	};
	uiut.UIUTTestManager.prototype.asynRunReset = function() {
		this.asynRunIndex = 0;
		this.asynRunArguments = null
	}
})();
if (typeof window.t == "undefined")
	window.t = {};
t.is = function() {
	if (typeof arguments[0] != "object")
		uiut.assertEquals.apply(uiut, arguments);
	else
		uiut.assertObjectEquals.apply(uiut, arguments)
};
t.t = function() {
	uiut.assertTrue.apply(uiut, arguments)
};
t.f = function() {
	uiut.assertFalse.apply(uiut, arguments)
};
t.click = function() {
	uiut.MockEvents.click.apply(uiut.MockEvents, arguments)
};
t.dblclick = function() {
	uiut.MockEvents.dblclick.apply(uiut.MockEvents, arguments)
};
t.mousedown = function() {
	uiut.MockEvents.mousedown.apply(uiut.MockEvents, arguments)
};
t.mousemove = function() {
	uiut.MockEvents.mousemove.apply(uiut.MockEvents, arguments)
};
t.mouseout = function() {
	uiut.MockEvents.mouseout.apply(uiut.MockEvents, arguments)
};
t.mouseover = function() {
	uiut.MockEvents.mouseover.apply(uiut.MockEvents, arguments)
};
t.mouseup = function() {
	uiut.MockEvents.mouseup.apply(uiut.MockEvents, arguments)
};
t.keypress = function() {
	uiut.MockEvents.keypress.apply(uiut.MockEvents, arguments)
};
t.keydown = function() {
	uiut.MockEvents.keydown.apply(uiut.MockEvents, arguments)
};
t.keyup = function() {
	uiut.MockEvents.keyup.apply(uiut.MockEvents, arguments)
};
t.mock = function() {
	Mock.appendMockObject.apply(Mock, arguments)
};
t.unMock = function($) {
	Mock.unload($)
};
t.log = function($) {
	uiut.UIUTTests.getInstance().viewController.addLog($)
};
if (typeof window.uiut == "undefined")
	window.uiut = {};
uiut.at = uiut.addTest = function() {
	if (window.parent != window && window.parent.uiut) {
		var $ = uiut.UIUTTestManager.getInstance();
		$.addUITest.apply($, arguments)
	} else {
		$ = uiut.UIUTTestManager.getInstance();
		$.addUnitTest.apply($, arguments)
	}
};
uiut.al = uiut.addLink = function() {
	var $ = uiut.UIUTTestManager.getInstance();
	$.addHTMLLink.apply($, arguments)
};
uiut.nan = uiut.notAllowNext = function() {
	var $ = uiut.UIUTTestManager.getInstance();
	$.notAllowNext()
};
uiut.an = uiut.allowNext = function() {
	var $ = uiut.UIUTTestManager.getInstance();
	$.allowNext()
};
uiut.asyn = function() {
	var $ = uiut.UIUTTestManager.getInstance();
	$.asynRun.apply($, arguments)
};
uiut.on = function() {
	uiut.Utils.addEventHandler.apply(uiut.Utils, arguments)
};
uiut.un = function() {
	uiut.Utils.removeEventHandler.apply(uiut.Utils, arguments)
}
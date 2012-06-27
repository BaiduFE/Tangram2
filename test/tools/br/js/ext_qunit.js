/**
 * 重载QUnit部分接口实现批量执行控制功能
 */
(function() {
	if (!QUnit)
		return;
	var ms = QUnit.moduleStart, d = QUnit.done;

	function _d(args /* failures, total */) {
		//默认展开失败用例
		$('li.fail ol').toggle();
		if (parent && parent.brtest) {
			parent.$(parent.brtest).trigger('done', [ new Date().getTime(), {
				failed : args[0],
				passed : args[1]
			}, window._$jscoverage || null ]);
		}
	}
	
	QUnit.moduleStart = function(name,testEnvironment) {
		stop();
		/* 为批量执行等待import.php正确返回 */
		var h = setInterval(function() {
			if (window && window['baidu']) {
				clearInterval(h);
				ms.apply(this, arguments);
				start();
			}
		}, 20);
		
		//田丽丽添加   调用公共用例
//		var testName = name.split('.');
//		commonTests(testName);
	};
	
	QUnit.done = function() {
		_d(arguments);
		d.apply(this, arguments);
	};
})();

void function(global){ // by dron
	global.equalAll = function(api, /* 可选 */scope, conf){
		var item;

		if(arguments.length == 2){
		    conf = scope;
		    scope = null;
		}

	    for(var name in conf){
	        if(conf.hasOwnProperty(name)){
	        	item = conf[name];
	        	for(var i = 0, l = item.length; i < l; i += 2){
	        		equal(api.apply(scope, item[i]), item[i + 1], name);
	        	}
	        }
	    }
	};

	global.valueis = function(value/*, args*/){
	    var arr = [].slice.call(arguments, 1);
	    var rs = [];
	    for(var i = 0, l = arr.length; i < l; i ++)
	    	rs.push(arr[i], value);
	    return rs;
	};

	global.waiting = function(fn1, fn2){
	    var time = setInterval(function(){
	        if(fn1()){
	            clearInterval(time);
	            fn2();
	        }
	    });
	};
}(this);
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
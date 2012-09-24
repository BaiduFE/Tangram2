module("baidu.global.get");

function getObjectSize(obj){
    var size = 0;
    for(var i in obj){
        size ++;
    }
    return size;
}

test("老接口：common",function(){
	expect(4);
	stop();
	ua.importsrc("baidu.global.set", function(){
		baidu.global.set('id', 'value1');
		var a = baidu.global.get('id');
		equals(a, 'value1', 'common');
		baidu.global.set('id', 'value2', true);
		a = baidu.global.get('id');
		equals(a, 'value1', 'protected_=true');
		baidu.global.set('id', 'value3');
		a = baidu.global.get('id');
		equals(a, 'value3', 'protected_=default');
		baidu.global.set('id', 'value4', false);
		a = baidu.global.get('id');
		equals(a, 'value4', 'protected_=false');
		start();
	}, "baidu.global.set", "baidu.global.get");
});

test("老接口：''",function(){
	expect(1);
	baidu.global.set('id1', '');
	var a = baidu.global.get('id1');
	equals(a, '', 'common');
});

test("老接口：iframe",function(){
	expect(3);
	stop();
	ua.frameExt(function(w, f) {
		var me = this;
		ua.importsrc("baidu.global.set,baidu.global.get", function(){
			setTimeout(function(){
				w.baidu.global.set('id2', 'value1');
				var a = w.baidu.global.get('id2');
				equals(a, 'value1', 'iframe');
				a = baidu.global.get('id2');
				equals(getObjectSize(a), 0, 'iframe');
				a = baidu.global.get('id');
				equals(a, 'value4', 'iframe');
				me.finish();
			}, 50);
		}, "baidu.global.get", "", w);
	});
});

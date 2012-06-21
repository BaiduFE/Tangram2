module('baidu.element.extend');

test('封装扩展 - function', function() {
	stop();
	ua.importsrc('baidu.sizzle', function(){
		
		//新接口
		var p = document.body.appendChild(document.createElement('div'));
		p.className = 'berg';
		baidu.element.extend( {
			"myFn" : function(dom,id) {
			    dom.id = id;
			    equals(baidu.lang.isArray(this._dom),true,'check this ');//测试this是否指向的baidu.e()
			}
		});
		baidu.e(baidu.dom(".berg")).myFn("abc");
		equals(baidu.dom('#abc')[0].id, 'abc', 'check function success');

		start();
	},'baidu.element.extend');
});


test('封装扩展 - function', function() {
	stop();
	ua.importsrc('baidu.sizzle', function(){
		
		//老接口
		var p = document.body.appendChild(document.createElement('div'));
		p.className = 'berg';
		baidu.element.extend( {
			"myFn" : function(dom,id) {
			    dom.id = id;
			    equals(baidu.lang.isArray(this._dom),true,'check this ');//测试this是否指向的baidu.e()
			}
		});
		baidu.e(baidu.dom(".berg")).myFn("abc");
		equals(baidu.dom('#abc')[0].id, 'abc', '老接口:check function success');

		start();
	},'baidu.element.extend');
});


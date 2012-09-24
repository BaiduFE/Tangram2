module('baidu.fx.current');

/**
 * 载入两个特效，并通过方法判定是否正确获得特效列表
 */
test('老接口：get fx', function() {
	var t = te.dom[0];
	$(t).css('height', '100px');
	$(t).css('color', 'red');
	$(t).css('position', 'absolute');
	stop();
	var a = baidu.fx.current(t);
	equals(a, null, 'none fx loaded');
	ua.importsrc('baidu.fx.collapse,baidu.fx.fadeIn', function(){
		var c = baidu.fx.collapse(t);
		var f = baidu.fx.fadeIn(t);
		var a = baidu.fx.current(t);

		equals(a.length, 2, 'collapse loaded');
		equals(a[0], c, 'current check');
		equals(a[1],f,'current check');
		start();
	});
});
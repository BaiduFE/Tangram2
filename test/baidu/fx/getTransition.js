module('baidu.fx.getTransition');

test('老接口：retrun value',function(){
	expect(10);
	var getTransition = baidu.fx.getTransition;
	var r = (getTransition('reverse'))(0.1);
	equal(r,0.9,'reverse');
	r = (getTransition('none'))(100);
	equal(r,0,'none');
	r = (getTransition('full'))(200);
	equal(r,1,'full');
	r = (getTransition())(0.6);
	equal(r,0.6,'no name, linear');
	r = (getTransition('linear'))(0.7);
	equal(r,0.7,'linear');
	r = (getTransition('parabola'))(0.5);
//	Math.pow(0.4,2)结果为0.160000000000003
	equal(r,0.25,'parabola');
	r = (getTransition('antiparabola'))(0.4);
	equal(r,0.64,'antiparabola');
	r = (getTransition('sinoidal'))(0.6);
	equal(r,(-Math.cos(0.6 * Math.PI)/2) + 0.5);
	r = (getTransition('wobble'))(0.3);
	equal(r,(-Math.cos(0.3 * Math.PI * (9 * 0.3))/2) + 0.5);
	r = (getTransition('spring'))(0.4);
	equal(r,1 - (Math.cos(0.4 * 4.5 * Math.PI) * Math.exp(-0.4 * 6)));
});
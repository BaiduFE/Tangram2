module('baidu.dom._styleFixer');

test('老接口：float', function() {
	equals(baidu.dom._styleFixer["float"], ua.browser.ie ? "styleFloat"
			: "cssFloat", 'check float');
});
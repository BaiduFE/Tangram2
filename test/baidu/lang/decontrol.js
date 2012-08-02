module("baidu.lang.decontrol");

test('guid', function() {
	var m = window[baidu.guid];
	m._maps['a'] = {};
	baidu.lang.decontrol('a');
	equals(m._maps['a'], undefined, 'obj is deleted');
});
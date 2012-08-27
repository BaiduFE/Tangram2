module("baidu.lang.decontrol");

test('guid', function() {
	var m = window[baidu._private_.guid];
	m._maps_id['a'] = {};
	baidu.lang.decontrol('a');
	equals(m._maps_id['a'], undefined, 'obj is deleted');
});
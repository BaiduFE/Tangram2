module("baidu.lang.decontrol");

test('老接口：guid', function() {
    var maps = baidu.global("_maps_id")
    maps['a'] = {};
	baidu.lang.decontrol('a');
	equals(maps['a'], undefined, 'obj is deleted');
});
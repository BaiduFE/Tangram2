module('baidu.event.once');

test('老接口：once', function(){
	expect(1);
	var div = document.body.appendChild(document.createElement("div"));
	var l = function(){
		ok(true, 'click binded');
	};
	baidu.event.once(div, 'click', l);
	ua.click(div);
	ua.click(div);
});
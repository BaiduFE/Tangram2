/// <reference path="../../tools/br/js/qunit.js" />
/// <reference path="../../tools/br/js/tools.js" />

module("baidu.dom.has");

var html =
	'<div id="e1"></div>' +
	'<div id="e2"><p><span></span></p></div>' +
	'<div id="e3"><span></span></div>' +
	'<div id="e4"><!--Comment--><p></p></div>';

test('逻辑特性测试', function () {
	useTangramDom(html, function ($dom) {
		var target;

		target = $dom.has('a');
		equal(target.length, 0);

		target = $dom.has('p');
		equal(target.length, 2);
		equal(target[0].id, 'e2');
		equal(target[1].id, 'e4');

		target = $dom.has('span');
		equal(target.length, 2);
		equal(target[0].id, 'e2');
		equal(target[1].id, 'e3');
	});
});

test('dom.extend test', function(){
    var array = [];
    baidu.dom.extend({
        a: function(){
            array.push('A');
            return this;
        },
        
        b: function(){
            array.push('B');
            return this;
        }
    });
    baidu.dom('#none').a().b();
    baidu.dom.a();
    baidu.dom.b();
    equal(array.join(''), 'ABAB', 'dom.extend success');
});
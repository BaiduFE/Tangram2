module('baidu.lang.instance');

test('老接口：取出对象', function(){
    stop();
    equal(baidu.lang.instance('tangId'), null, '取不出任何对象');
    ua.importsrc('baidu.lang.Class', function(){
        var c = new baidu.lang.Class();
        ok(baidu.lang.instance(c.guid) === c, 'it is same object');
        start();
    }, 'baidu.lang.Class');
});
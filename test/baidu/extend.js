module('baidu.extend');

test('one arg', function(){
    var c = baidu.extend({});
    ok($.isPlainObject(c), 'is a plain ojbect');
    for(var i in c){
        ok(false, 'object key exists');
    }
});

test('two args', function(){
    var c = baidu.extend({a: 'A', b: 'B'}, {c: 'C'}),
        keys = [], vals = [];
    $.each(c, function(key, val){
        keys.push(key);
        vals.push(val);
    });
    equals(keys.join(''), 'abc', 'object key extend');
    equals(vals.join(''), 'ABC', 'object val extend');
    
    c = baidu.extend({a: 'A', b: 'a'}, {b: 'B'});
    keys = []; vals = []
    $.each(c, function(key, val){
        keys.push(key);
        vals.push(val);
    });
    equals(keys.join(''), 'ab', 'object key b extend');
    equals(vals.join(''), 'AB', 'object val b extend');
});

test('deep extend', function(){
    var src = {
        a: {
            x: '0',
            y: 'Y'
        }
    },
    target = {
        a: {
            x: 'X',
            z: 'Z'
        },
        b: 'hello world'
    },
    c = baidu.extend(true, src, target),
    collect;
    
    function deep(obj){
        var map = {
            keys: [],
            vals: []
        };
        $.each(obj, function(key, val){
            map.keys.push(key);
            map.vals.push(val);
        });
        return map;
    }
    collect = deep(c);
    equals(collect.keys.join(''), 'ab', 'object keys merge');
    collect = deep(c.a);
    equals(collect.keys.join(''), 'xyz', 'object keys merge');
    equals(collect.vals.join(''), 'XYZ', 'object keys merge');
});

test('array extend', function(){
    var c = baidu.extend(true, {a: [1]}, {a: [2, 3]});
    equal(c.a.join(''), '23', 'array extend');
});

test('boolean extend', function(){
    var c = baidu.extend({enable: true}, {enable: false});
    equal(c.enable, false, 'boolean overwrite')
});
module('baidu.merge');

test('array test', function(){
    var ret = baidu.merge(['A', 'B'], ['C', 'D', 'E']);
    ok(ret.join('') === 'ABCDE', '正确合并');
});

test('object test', function(){
    var a = {length: 2},
        b = {},
        array = [],
        ret;
    a[0] = 'A';
    a[1] = 'B';
    b[0] = 'C';
    b[1] = 'D';
    ret = baidu.merge(a, b);
    ok(ret[0]+ret[1]+ret[2]+ret[3] === 'ABCD', '正确合并');
});
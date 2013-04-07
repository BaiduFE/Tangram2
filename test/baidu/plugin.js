module('baidu.plugin');

test('one', function(){
    expect(2);
    baidu.plugin('one').extend({
        go: function(){
            ok(true, 'go invoke');
            return this;
        },
        run: function(){
            ok(true, 'run invoke');
        }
    });
    baidu.one('#none').go().run();
});

test('two', function(){
    expect(1);
    baidu.plugin('two', {
        go: function(){
            ok(true, 'go invoke');
        }
    })
    baidu.two('#none').go();
});

test('three', function(){
    expect(2);
    baidu.plugin('three', function(){
        ok(true, 'fn run');
        return new baidu.three.$Three();
    }, function(){
        ok(true, 'constructor');
    });
    baidu.three('#none');
});

test('four', function(){
    expect(3);
    baidu.plugin('four', {
        run: function(){
            ok(true, 'run invoke');
        }
    }, function(){
        ok(true, 'fn run');
        return new baidu.four.$Four();
    }, function(){
        ok(true, 'constructor');
    });
    baidu.four('#none').run();
});

test('exists', function(){
    expect(2);
    stop();
    ua.importsrc('baidu.dom', function(){
        start();
        var dom = baidu.dom.fn,
            chain = baidu.plugin('dom', {
                run: function(){
                    ok(true, 'run invoke')
                }
            });
        ok(chain.fn === dom, 'the same object');
        baidu.dom('#none').run();
    }, 'baidu.dom', 'baidu.plugin');
});
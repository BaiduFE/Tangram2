module("baidu.base.Class");

//new baidu.base.Class()

test("基类 调用与声明", function(){
    var Class = function(){
        baidu.base.Class.call(this);
        this.name = "mm";
    }
    var b = new Class()

    var a = new baidu.base.Class();
    a.show = function(){
        if (this.fire("onshow")) {
            this.showed = true;
        }
    };
    ok(true, '过程正确');
});

test('事件注册，派发和删除', function(){
    expect(2);
    var instance = new baidu.base.Class();
    instance.on('defaultEvent', function(evt){
        ok(evt.target === instance, 'fire event');
    });
    instance.fire('defaultEvent');
    instance.off('defaultEvent');
    instance.fire('defaultEvent');
    ok(baiduInstance(instance.guid) === instance, 'It is same instance');
    instance.dispose();
});

test('事件删除', function(){
    expect(6);
    var c = new baidu.base.Class(),
        handler = function(evt){
            ok(true, 'fire event: ' + evt.type);
        };
    ok(c.on('defaultEvent') === c, 'return instance');
    c.on('defaultEvent-1', handler);
    c.on('defaultEvent-2', handler);
    c.on('defaultEvent-3', handler);
    c.fire('defaultEvent-1');
    c.fire('defaultEvent-2');
    c.fire('defaultEvent-3');
    c.off('defaultEvent-1', handler);
    c.fire('defaultEvent-1');
    c.fire('defaultEvent-2');
    c.fire('defaultEvent-3');
    c.off();
    c.fire('defaultEvent-1');
    c.fire('defaultEvent-2');
    c.fire('defaultEvent-3');
});

test('调用一次的事件', function(){
    expect(2);
    var c = new baidu.base.Class();
    c.one('oneevent', function(){
        ok(true, 'fire default event');
    });
    c.fire('oneevent');
    c.fire('oneevent');
    c.once('onceevent', function(){
        ok(true, 'fire default event');
    });
    c.fire('onceevent');
    c.fire('onceevent');
});

test('析构', function(){
    var instance = new baidu.base.Class();
    instance.on('defaultEvent', function(){
        ok(false, 'fire event');
    });
    instance.dispose();
    instance.fire('defaultEvent');
    ok(true, 'instance dispose');
});
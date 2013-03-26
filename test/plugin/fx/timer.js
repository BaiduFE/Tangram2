module("baidu.fx.timer");

test("timer方法测试", function(){
    expect(10);
    stop();

    var times = 10;
    baidu.fx.timer(function(){
        ok(true, "ok");
        if( --times ){
            return true;
        } else {
            start();
            return false;
        }
    });
});

test("顺序测试", function(){
    expect(1);
    stop();

    var counter = 0,
        flag = true;
    baidu.fx.timer(function(){
        counter++;
        return flag;
    });

    baidu.fx.timer(function(){
        ok(counter>0, "ok");
        flag = false;
        start();
    });
});

test("数据获取", function(){
    expect(1);
    stop();

    var flag = true;
    baidu.fx.timer(function(){
        return flag;
    });

    baidu.fx.timer(function(){
        return flag;
    });

    baidu.fx.timer(function(){
        setTimeout(function(){
            flag = false;
            start();
        }, 0);
        return flag;
    });

    var timers = baidu.fx.timer();
    equal(timers.length, 3, "ok");
});

test("时间获取是否统一", function(){
    expect(1);
    stop();

    var flag = true,
        time;
    baidu.fx.timer(function(){
        time = baidu.fx.now();
        return flag;
    });

    baidu.fx.timer(function(){
        equal(time, baidu.fx.now(), "ok");
        return flag;
    });

    baidu.fx.timer(function(){
        flag = false;
        start();
    });
});
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
            setTimeout(start, 100);
            return false;
        }
    });
});

test("顺序测试", function(){
    expect(3);
    stop();

    var counter = 0,
        flag = true;
    baidu.fx.timer(function(){
        counter++;
        equal(counter, flag?1:3, "ok");
        return flag;
    });

    baidu.fx.timer(function(){
        counter++;
        equal(counter, 2, "ok");
        flag = false;
        setTimeout(start, 100);
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
        if(!flag){
            setTimeout(start, 100);
        }
        return flag;
    });

    var timers = baidu.fx.timer();
    flag = false;
    equal(timers.length, 3, "ok");
});

test("时间获取是否统一", function(){
    expect(2);
    stop();

    var flag = true,
        time;
    baidu.fx.timer(function(){
        if(flag)return true;
        time = baidu.fx.now();
    });

    baidu.fx.timer(function(){
        if(flag)return true;
        equal(time, baidu.fx.now(), "ok");

        var now = +(new Date());
        while(+(new Date())===now){}
    });

    baidu.fx.timer(function(){
        if(flag)return true;
        equal(time, baidu.fx.now(), "ok");
    });

    baidu.fx.timer(function(){
        if(flag) {
            flag = false;
            return true;
        }
        setTimeout(start, 1000);
    });
});

test("不使用animation frame", function(){
    expect(2);
    stop();

    var flag = true;

    baidu.fx.useAnimationFrame = false;

    baidu.fx.timer(function(){
        if( !flag ) {
            equal( baidu.fx.strategy.cancel, clearTimeout, "此时采用的策略为非animation frame" );
        }
        return flag;
    });

    flag = false;

    baidu.fx.useAnimationFrame = true;

    if( window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ) {

        setTimeout(function(){

            var flag = true;

            baidu.fx.timer(function(){
                if( !flag ) {
                    notEqual( baidu.fx.strategy.cancel, clearTimeout, "此时采用的策略为animation frame" );
                }
                return flag;
            });

            flag = false;

        }, 1000);

    }

    setTimeout(start, 2000);
});
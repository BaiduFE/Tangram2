/**
 * @author wangxiao
 */

//准备工序
var draggable;
function prepareTest(){
    var html = "<div id='test-a' style='background-color:#ff0;position:relative;width:200px;height:200px;'>"+
                    "<div class='item' style='position:absolute;left:10px;top:10px;border:1px solid #00F;width:180px;height:20px;'></div>"+
                    "<div class='item' style='position:absolute;left:10px;bottom:10px;border:1px solid #00F;width:180px;height:20px;'></div>"+
                "</div>";
    jQuery('body').prepend(html);
};

test('prepareTest',function(){
    prepareTest();
    draggable = baidu('#test-a').draggable();
    ok(draggable,'ok');
});

test('正常拖拽', function() {
    stop();
    expect(2);
    var div = baidu('#test-a').offset({left:0,top:0}).get(0);

    ua.mousedown(div, {
        clientX : 20,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x >= 100) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            equal(tang.offset().left, 90, "stop left");
            equal(tang.offset().top, 45, "stop top");
            start();
        } else {
            ua.mousemove(document, {
                clientX : x + 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x + 10, y + 5);
            }, 20);
        }
    };
    move(div, 0, 0);
});

test('第二次正常拖拽', function() {
    stop();
    expect(2);
    var div = baidu('#test-a').get(0);

    ua.mousedown(div, {
        clientX : 20,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x >= 200) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            equal(tang.offset().left, 280, "stop left");
            equal(tang.offset().top, 140, "stop top");
            start();
        } else {
            ua.mousemove(document, {
                clientX : x + 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x + 10, y + 5);
            }, 20);
        }
    };
    move(div, 0, 0);
});

test('cancel方法', function() {
    expect(2);
    var tang = baidu('#test-a');
    draggable.cancel();
    equal(tang.offset().left, 90, "stop left");
    equal(tang.offset().top, 45, "stop top");    
});

test('reset方法', function() {
    expect(2);
    var tang = baidu('#test-a');
    draggable.reset();
    equal(tang.offset().left, 0, "stop left");
    equal(tang.offset().top, 0, "stop top");    
});

test('z-index方法', function() {
    expect(1);
    var tang = baidu('#test-a');
    draggable.zIndex(200);
    equal(tang.css('z-index'), 200, "z-index");
});

test('item方法', function() {
    expect(1);
    var tang = baidu('#test-a');
    var item = draggable.item();
    equal(item.get(0),tang.get(0), "item一致");
});

test('getBack方法', function() {
    expect(1);
    draggable.getBack().css('background-color','#0FF');
    var tang = baidu('#test-a');
    equal(tang.css('background-color'),'rgb(0, 255, 255)', "设置的当前DOM");
});

test('disable方法', function() {
    expect(2);
    draggable.disable();

    var tang = baidu('#test-a');
    var div = tang.get(0);

    stop();

    ua.mousedown(div, {
        clientX : 20,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x >= 200) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            equal(tang.offset().left, 0, "stop left");
            equal(tang.offset().top, 0, "stop top");
            start();
        } else {
            ua.mousemove(document, {
                clientX : x + 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x + 10, y + 5);
            }, 20);
        }
    };
    move(div, 0, 0);
});

test('enable方法', function() {
    expect(2);
    draggable.enable();

    var tang = baidu('#test-a');
    var div = tang.get(0);

    stop();

    ua.mousedown(div, {
        clientX : 20,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x >= 200) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            equal(tang.offset().left, 190, "stop left");
            equal(tang.offset().top, 95, "stop top");
            start();
        } else {
            ua.mousemove(document, {
                clientX : x + 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x + 10, y + 5);
            }, 20);
        }
    };
    move(div, 0, 0);
});

test('range方法', function() {
    stop();
    expect(2);
    var range = jQuery("<div style='width:250px;height:230px;border:2px solid #FFF;'></div>").prepend('body');
    var div = baidu('#test-a').offset({left:0,top:0}).get(0);
    draggable.range(range);

    ua.mousedown(div, {
        clientX : 20,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x >= 100) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            equal(tang.offset().left, 50, "stop left");
            equal(tang.offset().top, 30, "stop top");
            range.remove();
            draggable.range();
            start();
        } else {
            ua.mousemove(document, {
                clientX : x + 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x + 10, y + 5);
            }, 20);
        }
    };
    move(div, 0, 0);
});

test('endOf方法', function() {
    stop();
    expect(2);
    var endOf = jQuery("<div style='width:230px;height:220px;border:2px solid #FFF;'></div>").prepend('body');
    var div = baidu('#test-a').get(0);
    draggable.reset().endOf(endOf);

    ua.mousedown(div, {
        clientX : 20,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x >= 200) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            equal(tang.offset().left, 50, "stop left");
            equal(tang.offset().top, 30, "stop top");
            endOf.remove();
            start();
        } else {
            ua.mousemove(document, {
                clientX : x + 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x + 10, y + 5);
            }, 20);
        }
    };

    move(div, 0, 0);
});

test('析构方法', function() {
    expect(2);
    draggable.dispose();
    ok(draggable.dispose,'析构标示');
    ok(!draggable.range,'实例方法清除')
});

test('事件相关', function() {
    stop();
    expect(3);
    var startNum,draggingNum,endNum;
    startNum = draggingNum = endNum = 0;
    var div = baidu('#test-a').get(0);
    draggable = baidu('#test-a').draggable({
        onstart:function(){startNum++;},
        ondragging:function(){draggingNum++;},
        onend:function(){endNum++;}
    });

    ua.mousedown(div, {
        clientX : 20,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x >= 100) {
            ua.mouseup(ele);
            equal(startNum,1, "start事件");
            equal(draggingNum,10, "dragging事件");
            equal(endNum,1, "end事件");

            jQuery('#test-a').remove();

            start();
        } else {
            ua.mousemove(document, {
                clientX : x + 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x + 10, y + 5);
            }, 20);
        }
    };

    move(div, 0, 0);
});

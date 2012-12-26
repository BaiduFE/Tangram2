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
    expect(2);
    var tang = baidu('#test-a');
    draggable.zIndex(200);
    equal(tang.css('z-index'), 200, "z-index");
    equal(draggable.zIndex(), 200, "z-index");
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
    var result = tang.css('background-color').replace(/rgb\(0, 255, 255\)/g,'#0ff');
    equal(result ,'#0ff', "设置的当前DOM");
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
    expect(3);
    var range = jQuery("<div id='range' style='background-color:#F00;width:350px;height:350px;border:2px solid #0FF;'></div>").prependTo('body');
    var div = baidu('#test-a').offset({left:10,top:10}).get(0);
    draggable.range(range[0]);

    equal(draggable.range().id,'range');
    ua.mousedown(div, {
        clientX : 10,
        clientY : 10
    });

    var move = function(ele, x, y) {
        if (x >= 300) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            ok((tang.offset().left>160 && tang.offset().left<170), "stop left");
            equal(tang.offset().top, 145, "stop top");
            range.remove();
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
    move(div, 20, 20);
});

test('endOf方法：传入htmlElement', function() {
    stop();
    expect(2);
    var endOf = jQuery("<div id='endOf' style='background-color:#F00;width:250px;height:250px;border:2px solid #0FF;'></div>").prependTo('body');
    var div = baidu('#test-a').get(0);
    draggable.reset().endOf(endOf[0]);
    ua.mousedown(div, {
        clientX : 20,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x >= 300) {
            ua.mouseup(ele);
            var offset = baidu(ele).offset();
            equal(offset.left,0, "stop left");
            equal(offset.top,0, "stop top");
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

test('endOf方法：传入object', function() {
    stop();
    expect(2);
    var endOf = jQuery("<div id='endOf' style='background-color:#F00;width:250px;height:250px;border:2px solid #0FF;'></div>").prependTo('body');
    var div = baidu('#test-a').get(0);
    var object = {top:endOf.offset().top,left:endOf.offset().left,right:endOf.offset().left+endOf.outerWidth(),bottom:endOf.offset().top+endOf.outerHeight()};
    draggable.endOf(object);
    ua.mousedown(div, {
        clientX : 20,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x >= 300) {
            ua.mouseup(ele);
            var offset = baidu(ele).offset();
            equal(offset.left,0, "stop left");
            equal(offset.top,0, "stop top");
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
            draggable.dispose();
            //jQuery('#test-a').remove();

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


//传入1个参数
test('1个参数：不移动', function() {
    expect(3);
    stop();
    var startNum,draggingNum,endNum;
    startNum = draggingNum = endNum = 0;
    var div = baidu('#test-a').offset({left:0,top:0}).get(0);

    draggable = baidu('#test-a').draggable('.item');

    ua.mousedown(div, {
        clientX : 5,
        clientY : 5
    });

    var move = function(ele, x, y) {
        if (x >= 100) {
            ua.mouseup(ele);

            //没有点在 .item上面，不会被拖动
            equal(startNum,0, "start事件");
            equal(draggingNum,0, "dragging事件");
            equal(endNum,0, "end事件");
            draggable.dispose();
            //jQuery('#test-a').remove();

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

test('1个参数：移动', function() {
    stop();
    expect(3);
    var range = jQuery("<div id='range' style='background-color:#F00;width:350px;height:350px;border:2px solid #0FF;'></div>").prependTo('body');
    baidu('#test-a').offset({left:10,top:10});
    var div = baidu('#test-a .item').get(0);
    draggable = baidu('#test-a').draggable('.item').range(range[0]);

    equal(draggable.range().id,'range');
    ua.mousedown(div, {
        clientX : 10,
        clientY : 10
    });

    var move = function(ele, x, y) {
        if (x >= 300) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            ok((tang.offset().left>170 && tang.offset().left<180), "stop left");
            equal(tang.offset().top, 155, "stop top");
            range.remove();
            draggable.dispose();
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
    move(div, 20, 20);
});

//传入2个参数
test('事件相关', function() {
    stop();
    expect(3);
    var startNum,draggingNum,endNum;
    startNum = draggingNum = endNum = 0;
    var div = baidu('#test-a .item').get(0);
    draggable = baidu('#test-a').draggable('.item',{
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
            draggable.dispose();

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

test('enter和leave事件相关:enter', function() {
   stop();
    expect(4);
    var startNum,draggingNum,endNum,enterNum,leaveNum;
    startNum = draggingNum = endNum = enterNum = leaveNum = 0;
    var range = jQuery("<div id='focus' style='background-color:#F00;width:350px;height:350px;border:2px solid #0FF;'></div>").prependTo('body').offset({left:250,top:0});
    var div = baidu('#test-a').offset({left:0,top:0}).get(0);
    draggable = baidu('#test-a').draggable({
        onstart:function(){startNum++;},
        ondragging:function(){draggingNum++;},
        onend:function(){endNum++;},
        focus:'#focus',
        onenter:function(){enterNum++},
        onleave:function(){leaveNum++}
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
            equal(enterNum,1, "enter事件");
            draggable.dispose();
            range.remove();
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


test('enter和leave事件相关:leave', function() {
   stop();
    expect(5);
    var startNum,draggingNum,endNum,enterNum,leaveNum;
    startNum = draggingNum = endNum = enterNum = leaveNum = 0;
    var range = jQuery("<div id='focus' style='background-color:#F00;width:350px;height:350px;border:2px solid #0FF;'></div>").prependTo('body').offset({left:250,top:0});
    var div = baidu('#test-a').offset({left:200,top:20}).get(0);
    draggable = baidu('#test-a').draggable({
        onstart:function(){startNum++;},
        ondragging:function(){draggingNum++;},
        onend:function(){endNum++;},
        focus:'#focus',
        onenter:function(){enterNum++;},
        onleave:function(){leaveNum++;}
    });

    ua.mousedown(div, {
        clientX : 200 + 20,
        clientY : 20 + 20
    });

    var move = function(ele, x, y) {
        if (x < 40) {
            ua.mouseup(ele);
            equal(startNum,1, "start事件");
            equal(draggingNum,19, "dragging事件");
            equal(endNum,1, "end事件");
            equal(enterNum,1, "enter事件");
            equal(leaveNum,1, "leave事件");
            draggable.dispose();
            range.remove();
            jQuery('#test-a').remove();
            start();
        } else {
            ua.mousemove(document, {
                clientX : x - 10,
                clientY : y - 5
            });
            setTimeout(function() {
                move(ele, x - 10, y - 5);
            }, 20);
        }
    };

    move(div, 200 + 20, 20 + 20);

});
/**
 * @author wangxiao
 */
 
//准备工序
var sortable;
var startNum,draggingNum,endNum,changeNum;

function prepareTest(){
	var css = "<style type='text/css'>"+
			 "ul.group{list-style-type: none;}"+
	  		  "li.item{width:180px;height:30px;border:1px solid #c00;}"+
			  "</style>";

    var html = "<div id='wrapper'>"+
    			"<ul class='group'>"+
	                "<li class='item'></li>"+
	                "<li id='test-a' class='item' style='background-color:#0F0;'></li>"+
	                "<li class='item'></li>"+
	                "<li id='test-d' class='item'></li>"+
	            "</ul>"+
	            "</div>";

	jQuery('head').append(css);
   	jQuery('body').prepend(html);
};

test('plugin接口：prepareTest',function(){
	prepareTest();
    sortable = baidu('.group').sortable({
        onstart:function(){startNum++;},
        ondragging:function(){draggingNum++;},
        onend:function(){endNum++;},
        onchange:function(){changeNum++;}
    });
    ok(sortable,'ok');
});

test('plugin接口：range方法',function(){
    var range = sortable.range();
    equal(range,undefined,'此时设置的是body');
    sortable.range('body');
    var range = sortable.range();
    equal(range,'body','此时设置的是body');
});

test('plugin接口：事件相关', function() {
    stop();
    expect(4);
    startNum = draggingNum = endNum = changeNum = 0;

    var tang = baidu('#test-a');
    var div = tang.get(0);
    var offset = tang.offset();

    ua.mousedown(div, {
        clientX : offset.left +5,
        clientY : offset.right +5
    });

    var move = function(ele, x, y) {
        if (x >= 100) {
            ua.mouseup(ele);
            equal(startNum,1, "start事件");
            equal(draggingNum,10, "dragging事件");
            equal(endNum,1, "end事件");
            equal(changeNum,1, "change事件");


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

test('plugin接口：正常排序', function() {
    stop();
    expect(2);
    var tang = baidu('#test-a');
    var div = tang.get(0);
    var offset = tang.offset();

    ua.mousedown(div, {
        clientX : offset.left +5,
        clientY : offset.right +5
    });

    var move = function(ele, x, y) {
        if (x >= 100) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            ok((tang.offset().left>45&&tang.offset().left<55), "stop left");
            ok((tang.offset().top>75&&tang.offset().top<90), "stop top");
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

test('plugin接口：第二次排序', function() {
    stop();
    expect(2);
    var tang = baidu('#test-a');
    var div = tang.get(0);
    var offset = tang.offset();

    ua.mousedown(div, {
        clientX : offset.left +5,
        clientY : offset.right +5
    });

    var move = function(ele, x, y) {
        if (x >= 200) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            ok((tang.offset().left>45&&tang.offset().left<55), "stop left");
            ok((tang.offset().top>105&&tang.offset().top<125), "stop top");
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

test('plugin接口：index方法', function() {
    expect(1);
    var index = sortable.index();
    var arr = [0, 2, 3, 1];
    equal(index[2], arr[2], "排序后的索引");    
});

test('plugin接口：cancel方法', function() {
    expect(1);
    var tang = baidu('#test-a');
    var arr = [0,1,2,3];
    var index = sortable.cancel().index();
    equal(index[2], arr[2], "排序后的索引");    
});

test('plugin接口：reset方法', function() {
    expect(2);
    var tang = baidu('#test-a');
    sortable.reset();
    ok((tang.offset().left>-5&&tang.offset().left<5), "stop left");
    ok((tang.offset().top>-5&&tang.offset().top<5), "stop top");    
});

test('plugin接口：item方法', function() {
    expect(1);
    var tang = baidu('#test-a');
    var item = sortable.item();
    equal(item.get(1),tang.get(0), "item一致");
});

test('plugin接口：getBack方法', function() {
    expect(1);
    sortable.getBack().css('background-color','#0FF');
    var tang = baidu('.group');
    var result = tang.css('background-color').replace(/rgb\(0, 255, 255\)/g,'#0ff');
    equal(result,'#0ff', "设置的当前DOM");
});

test('plugin接口：disable方法', function() {
    expect(2);
    sortable.disable();

    //检查disable后，cancel和reset不会改变sortable的排序
    sortable.cancel();
    sortable.reset();

    var tang = baidu('#test-a');
    var div = tang.get(0);
    var offset = tang.offset();

    stop();

    ua.mousedown(div, {
        clientX : offset.left +5,
        clientY : offset.right +5
    });

    var move = function(ele, x, y) {
        if (x >= 200) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            ok((tang.offset().left>45&&tang.offset().left<55), "stop left");
            ok((tang.offset().top>45&&tang.offset().top<60),"stop top");
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

test('plugin接口：enable方法', function() {
    expect(2);
    sortable.enable();

    var tang = baidu('#test-a');
    var div = tang.get(0);
    var offset = tang.offset();
    
    var l = offset.left, t = $("#test-d").offset().top;

    stop();

    ua.mousedown(div, {
        clientX : offset.left +5,
        clientY : offset.right +5
    });

    var move = function(ele, x, y) {
        if (x >= 200) {
            ua.mouseup(ele);
            var tang = baidu(ele);
            ok(l, "stop left");
            ok(t, "stop top");
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

test('plugin接口：析构方法', function() {
    expect(2);
    sortable.reset();
    sortable.dispose();
    ok(sortable.dispose,'析构标示');
    ok(!sortable.cancel,'实例方法清除');
    jQuery('#wrapper').remove();
});
/**
 * @author wangxiao
 */

//准备工序
var selectable;
function prepareTest(){
	var css = "<style type='text/css'>"+
              ".tang-rubberSelect{border: 1px dotted #888;background-color: #FFF;filter:alpha(opacity=80);-moz-opacity:0.8;opacity: 0.8;}"+
              ".tang-selectable-selected{background-color: #0F3;}"+
			  "ul.group{list-style-type: none;}"+
	  		  "li.item{width:180px;height:30px;border:1px solid #c00;}"+
			  "</style>";

    var html = "<div id='wrapper'>"+
    			"<ul class='group'>"+
	                "<li class='item'></li>"+
	                "<li id='test-a' class='item' style='background-color:#F60;'></li>"+
	                "<li class='item'></li>"+
	                "<li class='item'></li>"+
	            "</ul>"+
	            "</div>";

	jQuery('head').append(css);
   	jQuery('body').prepend(html);
};

test('prepareTest',function(){
	prepareTest();
    selectable = baidu('.group').selectable();
    ok(selectable,'ok');
});
/*
test('正常排序', function() {
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
            equal(tang.offset().left, 48, "stop left");
            equal(tang.offset().top, 88, "stop top");
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

test('第二次排序', function() {
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
            equal(tang.offset().left, 48, "stop left");
            equal(tang.offset().top, 120, "stop top");
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

// test('cancel方法', function() {
//     expect(2);
//     var tang = baidu('#test-a');
//     selectable.cancel();
//     equal(tang.offset().left, 48, "stop left");
//     equal(tang.offset().top, 88, "stop top");    
// });

test('reset方法', function() {
    expect(2);
    var tang = baidu('#test-a');
    selectable.reset();
    equal(tang.offset().left, 0, "stop left");
    equal(tang.offset().top, 0, "stop top");    
});

test('item方法', function() {
    expect(1);
    var tang = baidu('#test-a');
    var item = selectable.item();
    equal(item.get(1),tang.get(0), "item一致");
});

test('getBack方法', function() {
    expect(1);
    selectable.getBack().css('background-color','#0FF');
    var tang = baidu('.group');
    equal(tang.css('background-color'),'rgb(0, 255, 255)', "设置的当前DOM");
});

test('disable方法', function() {
    expect(2);
    selectable.disable();

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
            equal(tang.offset().left, 48, "stop left");
            equal(tang.offset().top, 56, "stop top");
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
    selectable.enable();

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
            equal(tang.offset().left, 48, "stop left");
            equal(tang.offset().top, 120, "stop top");
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
    selectable.reset();
    selectable.dispose();
    ok(selectable.dispose,'析构标示');
    ok(!selectable.cancel,'实例方法清除')
});

test('事件相关', function() {
    stop();
    expect(4);
    var startNum,draggingNum,endNum,changeNum;
    startNum = draggingNum = endNum = changeNum = 0;

    var tang = baidu('#test-a');
    var div = tang.get(0);
    var offset = tang.offset();

    selectable = baidu('.group').selectable({
        onstart:function(){startNum++;},
        ondragging:function(){draggingNum++;},
        onend:function(){endNum++;},
        onchange:function(){changeNum++;}
    });

    ua.mousedown(div, {
        clientX : offset.left +5,
        clientY : offset.right +5
    });

    var move = function(ele, x, y) {
        if (x >= 100) {
            ua.mouseup(ele);
            equal(startNum,1, "start事件");
            equal(draggingNum,9, "dragging事件");
            equal(endNum,1, "end事件");
            equal(changeNum,1, "change事件");

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
*/
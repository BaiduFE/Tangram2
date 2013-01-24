/*
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
	                "<li class='item'></li>"+
	                "<li class='item'></li>"+
	                "<li class='item'></li>"+
	            "</ul>"+
	            "</div>";

	jQuery('head').append(css);
   	jQuery('body').prepend(html).css('overflow-y','auto');
};

test('plugin接口：prepareTest',function(){
    stop();
    ua.importsrc('baidu.dom.css', function(){
        prepareTest();
        selectable = baidu('.group').selectable();
        ok(selectable,'ok');
        start();
    }, "baidu.dom.css");
});

test('plugin接口：selected方法', function() {
    stop();
    expect(1);

    ua.mousedown(document, {
        clientX : 300,
        clientY : 20
    });

    var move = function(ele, x, y) {
        if (x <= 150) {
            ua.mouseup(ele);
            equal(selectable.selected().length, 3, "selected");
            start();
        } else {
            ua.mousemove(document, {
                clientX : x - 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x - 10, y + 5);
            }, 20);
        }
    };
    move(document, 300, 20);
});

test("plugin接口：item方法", function() {
    stop();
    expect(2);

    ua.mousedown(document, {
        clientX : 200,
        clientY : 160
    });

    var move = function(ele, x, y) {
        if (y <= 100) {
            ua.mouseup(ele);
            equal(selectable.selected().length, 2, "selected");
            equal(selectable.item().length, 4, "item");
            start();
        } else {
            ua.mousemove(document, {
                clientX : x - 10,
                clientY : y - 10
            });
            setTimeout(function() {
                move(ele, x - 10, y - 10);
            }, 20);
        }
    };
    move(document, 200, 160);
});


test('plugin接口：index方法', function() {
    expect(2);
    var index = selectable.index();
    var arr = [2,3];
    equal(index[1], arr[1], "选择后的索引");  

    var index = selectable.index([0,1,3]);
    equal(selectable.selected().length, 3, "selected");  
});

test('plugin接口：cancel方法', function() {
    expect(1);
    selectable.cancel();
    var index = selectable.index();
    var arr = [0,1,2];
    equal(index[2], arr[2], "选择后的索引");    
});

test('plugin接口：range方法', function() {
    expect(1);
    var range = selectable.range();
    equal(range,undefined, "range未设置");
});

test('plugin接口：reset方法', function() {
    expect(1);
    selectable.reset();
    var index = selectable.index();
    equal(index.length, 0, "选择后的索引");    
});


test('plugin接口：selected和unselected方法', function() {
    expect(4);
    selectable.reset();
    selectable.selected('.item');
    equal(selectable.selected().length, 4, "selected");    
    equal(selectable.unselected().length, 0, "selected");    
    
    selectable.unselected('.item');
    equal(selectable.selected().length, 0, "selected");    
    equal(selectable.unselected().length, 4, "selected");        
});

test('plugin接口：getBack方法', function() {
    expect(1);
    selectable.getBack().css('background-color','#F0F');
    var tang = baidu('.group');
    var result = tang.css('background-color').replace(/rgb\(255, 0, 255\)/g,'#f0f');
    equal(result,'#f0f', "设置的当前DOM");
});

test('plugin接口：disable方法', function() {
    expect(2);

    stop();

    //延时触发，防止前面的方法没有执行完毕
    selectable.disable();

    ua.mousedown(document, {
        clientX : 300,
        clientY : 20
    });
    var move = function(ele, x, y) {
        if (x <= 150) {
            ua.mouseup(ele);
            equal(selectable.selected().length,0, "selected");
            equal(selectable.unselected().length,4,"unselected")
            start();
        } else {
            ua.mousemove(document, {
                clientX : x - 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x - 10, y + 5);
            }, 20);
        }
    };
    move(document, 300, 20);
});

test('plugin接口：enable方法', function() {
    stop();
    expect(2);
    selectable.enable();
    ua.mousedown(document, {
        clientX : 300,
        clientY : 20
    });
    var move = function(ele, x, y) {
        if (x <= 150) {
            ua.mouseup(ele);
            equal(selectable.selected().length,3, "selected");
            equal(selectable.unselected().length,1,"unselected")
            start();
        } else {
            ua.mousemove(document, {
                clientX : x - 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x - 10, y + 5);
            }, 20);
        }
    };
    move(document, 300, 20);
});

test('plugin接口：析构方法', function() {
    expect(2);
    selectable.reset();
    selectable.dispose();
    ok(selectable.dispose,'析构标示');
    ok(!selectable.cancel,'实例方法清除');
});

//检查多实例是否会清除rubberSelect
test('plugin接口：是否会清除rubberSelect', function() {
    expect(1);
    ok(baidu('#tang-rubberSelect'),'析构标示');
});

test('plugin接口：事件相关', function() {
    stop();
    expect(3);
    var startNum,draggingNum,endNum,changeNum;
    startNum = draggingNum = endNum = changeNum = 0;
    var selectable = baidu('.group').selectable({
        onstart:function(){startNum++;},
        ondragging:function(){draggingNum++;},
        onend:function(){endNum++;},
        onchange:function(){changeNum++;}
    });

    ua.mousedown(document, {
        clientX : 300,
        clientY : 20
    });
    
    ua.keydown(document, {
        keyCode:91
    });
    ua.keydown(document, {
        keyCode:90
    });

    var move = function(ele, x, y) {
        if (x <= 100) {
            ua.mouseup(ele);
            equal(startNum,1, "start事件");
            ok((draggingNum > 19 && draggingNum < 22), "dragging事件");
            equal(endNum,1, "end事件");
            //equal(changeNum,3, "change事件");
            selectable.dispose();
            start();
            //jQuery('#wrapper').remove();
        } else {
            ua.mousemove(document, {
                clientX : x - 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x - 10, y + 5);
            }, 20);
        }
    };

    move(document, 300, 20);
});

//传入2个参数
test('plugin接口：事件相关', function() {
    stop();
    expect(3);
    var startNum,draggingNum,endNum,changeNum;
    startNum = draggingNum = endNum = changeNum = 0;
    var selectable = baidu('.group').selectable('.item',{
        range:'body',
        onstart:function(){startNum++;},
        ondragging:function(){draggingNum++;},
        onend:function(){endNum++;},
        onchange:function(){changeNum++;}
    });
    
    ua.mousedown(document, {
        clientX : 300,
        clientY : 20
    });

    var move = function(ele, x, y){
        if (x <= 100) {
            ua.mouseup(ele);
            equal(startNum,1, "start事件");
            ok((draggingNum > 19 && draggingNum < 22), "dragging事件");
            equal(endNum,1, "end事件");
            //equal(changeNum,3, "change事件");
            selectable.disable();
            start();
            jQuery('#wrapper').remove();
        } else {
            ua.mousemove(document, {
                clientX : x - 10,
                clientY : y + 5
            });
            setTimeout(function() {
                move(ele, x - 10, y + 5);
            }, 20);
        }
    };

    move(document, 300, 20);
});

/**
 * @author linlingyu
 */
module('baidu.dom.on');

var keyEvents = ['keydown', 'keypress', 'keyup'],
    mouseEvents = ['mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout', 'mouseenter', 'mouseleave', 'click', 'dblclick'],
    uiEvents = ['blur', 'focus', 'focusin', 'focusout', 'change', 'select', 'submit'],
    htmlEvents = ['load', 'resize', 'unload'],
    etcEvents = ['error', 'scroll', 'contextmenu'];

var ie ;

function Elements(tagName, noInsert){
    var ele = this._ele = document.createElement(tagName || 'div');
    !noInsert && document.body.appendChild(ele);
}
Elements.prototype.get = function(){return this._ele;}
Elements.prototype.dispose = function(){
    var ele = this._ele;
    ele.parentNode && ele.parentNode.removeChild(ele);
    ele = this._ele = null;
}

test('prepareTest',function(){
  expect(1);
  stop();
  ua.importsrc("baidu.browser,baidu.event.shortcut", function(){
    start();
    ok(true,'ok');
    ie = baidu.browser.ie;
  }, "baidu.browser", "baidu.dom.css");
});

test('bind event to div', function(){
    expect( 10 );
    var c = new Elements(),
        array = [];
        
    baidu.dom(c.get()).on('click', function(){
        array.push('A');
        ok(array.join('') === 'A', 'div click trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');//1
    c.dispose();
    
    c = new Elements();
    baidu.dom(c.get()).on('click, mouseover', function(evt){
        array.push('B');
        ok(true, 'div event trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');//2
    ua.fireMouseEvent(c.get(), 'mouseover');//3
    c.dispose();
    
    c = new Elements();
    baidu.dom(c.get()).on('click', {tangId: 'Tangram'}, function(evt){
        array.push('C');
        equal(evt.data.tangId, 'Tangram', 'event bind width data');
    });
    ua.fireMouseEvent(c.get(), 'click');//4
    c.dispose();

    c = new Elements();

    baidu.dom(c.get()).on({
        'click': function(evt){
            equal(evt.data.tangId, 'Tangram', 'div click trigger');
            array.push('E');
        },
        'mouseout': function(evt){
            equal(evt.data.tangId, 'Tangram', 'div mouseout trigger');
            array.push('D');
        }
    }, {tangId: 'Tangram'}, function(){ ok(false, 'exception');});

    ua.fireMouseEvent(c.get(), 'mouseout');//5
    ua.fireMouseEvent(c.get(), 'click');//6
    
    c.dispose();
    
    function handler(){
        array.push('F');
        ok(true, 'div click trigger');
    }
    c = new Elements();
    baidu.dom(c.get()).on('click', handler);
    baidu.dom(c.get()).on('click', handler);
    baidu.dom(c.get()).on('click', handler);
    ua.fireMouseEvent(c.get(), 'click');//7.8.9
    c.dispose();
    equal(array.join(''), 'ABBCDEFFF', 'array is in order');//10
});

test('selector event', function(){
    expect(2);
    var c = new Elements(),
        span = document.createElement('span');
    c.get().appendChild(span);
    baidu.dom(c.get()).on('click', 'span', {tangId: 'Tangram'}, function(evt){
        equal(evt.data.tangId, 'Tangram', 'the match of element\'s event trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(span, 'click');
    c.dispose();
    
    c = new Elements();
    span = document.createElement('span');
    c.get().appendChild(span);
    baidu.dom(c.get()).on('click', 'span', {tangId: 'Tangram'}, function(evt){
        equal(evt.data.tangId, 'Tangram', 'the match of element\'s event trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(span, 'click');
    c.dispose();
});

test('div insert to span', function(){
    expect(1);
    var c = new Elements('div', true),
        span = document.createElement('span');
    document.body.appendChild(span);
    span.appendChild(c.get());
    baidu.dom(span).on('click', 'div', function(e){
        ok(true, 'div event trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');
    document.body.removeChild(span);
});

test('mouseenter, mouseleave', function(){
    expect(6);
    stop();
    ua.importsrc('baidu.dom.trigger', function(){
        // expect(2);
        var div = new Elements('div'),
            span = new Elements('span', true),
            innerDiv = new Elements('div', true);
        div.get().appendChild(span.get());
        span.get().appendChild(innerDiv.get());

        baidu.dom(div.get()).on('mouseenter, mouseleave', function(evt){
            ok(~'mouseenter|mouseleave'.indexOf(evt.type), 'event is: ' + evt.type);
        });

        ua.fireMouseEvent(innerDiv.get(), 'mouseover');
        ua.fireMouseEvent(innerDiv.get(), 'mouseout');
        ua.fireMouseEvent(span.get(), 'mouseover');
        ua.fireMouseEvent(span.get(), 'mouseout');
        ua.fireMouseEvent(div.get(), 'mouseover');
        ua.fireMouseEvent(div.get(), 'mouseout');
        
        innerDiv.dispose();
        span.dispose();
        div.dispose();
        start();
    }, 'baidu.dom.trigger', 'baidu.dom.on');
});

test('focusin, focusout', function(){
    stop();
    ua.importsrc('baidu.dom.trigger', function(){
        expect(4);
        var div = new Elements('div'),
            span = new Elements('span', true),
            input = new Elements('input', true);
        div.get().appendChild(span.get());
        span.get().appendChild(input.get());
        
        baidu.dom(div.get()).on('focusin, focusout', function(evt){
            ok(~'focusin|focusout'.indexOf(evt.type), 'event is: ' + evt.type);
        });
        input.get().focus();
        input.get().blur();
        baidu.dom(div.get()).focusin();
        baidu.dom(div.get()).focusout();
        input.dispose();
        span.dispose();
        div.dispose();
        start();
    }, 'baidu.dom.trigger', 'baidu.dom.on');
});

test('keyEvents', function(){
    expect( keyEvents.length );
    var c = new Elements('input'),
        input = c.get();

    $.each(keyEvents, function(index, item){
        baidu.dom(input)[item](function(evt){
            ok(true, 'event is: ' + evt.type)
        });
        baidu.dom(input)[item]();
    });
    
    c.dispose();
});

test('mouseEvents', function(){
    expect( mouseEvents.length );
    var c = new Elements('input'),
        input = c.get();

    $.each(mouseEvents, function(index, item){
        baidu.dom(input)[item](function(evt){
            ok(true, 'event is: ' + evt.type)
        });
        baidu.dom(input)[item]();
    });
    
    c.dispose();
});

test('uiEvents', function(){
    expect( uiEvents.length );
    var c = new Elements('input'),
        input = c.get();

    var f = new Elements('form'); // submit 事件要对应 form 标签

    $.each(uiEvents, function(index, item){
        var el = item == "submit" ? f.get() : input;
        baidu.dom(el)[item](function(evt){
            ok(true, 'event is: ' + evt.type);
            evt.preventDefault();
        });
        baidu.dom(el)[item]();
    });
    
    c.dispose();
});

test('etcEvents', function(){
    expect( etcEvents.length - ( ( ie < 9 ) ? 2 : 0 ) ); // ie 下 error 和 scroll 事件不知如何触发
    var c = new Elements('input'),
        input = c.get();

    $.each(etcEvents, function(index, item){
        baidu.dom(document)[item](function(evt){
            ok(true, 'event is: ' + evt.type);
        });
        baidu.dom(input)[item]();
    });
    
    c.dispose();
});

test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").on("wangxiao");
    ok(result);
});
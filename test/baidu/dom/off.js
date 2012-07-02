/**
 * @author linlingyu
 */
module('baidu.dom.off');
function Div(noAppend){
    var div = this._div = document.createElement('div');
    !noAppend && document.body.appendChild(div);
}
Div.prototype.get = function(){return this._div;}
Div.prototype.dispose = function(){
    var parentElement = this._div && this._div.parentNode;
    parentElement && parentElement.removeChild(this._div);
    this._div = null;
}

test('remove a event', function(){
    expect(1);
    var c = new Div(),
        div = c.get();
    function handler(){
        ok(true, 'event not remove');
    }
    div.addEventListener && div.addEventListener('click', handler, false);
    div.attachEvent && div.attachEvent('click', handler);
    baidu.dom(div).off('click', handler);
    ua.click(div);
    div = null;
    c.dispose();
});


test('div uninstall event', function(){
    stop();
    ua.importsrc('baidu.dom.on', function(){
        expect(10);
        var c = new Div(),
            div = c.get();
        function handler(){ok(true, 'event bind');}
        baidu.dom(div).on('click', handler);
        ua.click(div);
        baidu.dom(div).off('click', handler);
        ua.click(div);
        div = null;
        c.dispose();
        //
        
        c = new Div();
        div = c.get();
        baidu.dom(div).on('click', function(){
            ok(true, 'first event');
        }).on('click', function(){
            ok(true, 'second event');
        }).on('click', function(){
            ok(true, 'third event');
        });
        ua.click(div);
        baidu.dom(div).off('click');
        ua.click(div);
        div = null;
        c.dispose();
        //
        
        var map = {
            click: function(){ok(true, 'map first event');},
            mouseover: function(){ok(true, 'map second event');},
            mouseout: function(){ok(true, 'map third event');}
        };
        c = new Div();
        div = c.get();
        baidu.dom(div).on(map);
        ua.mouseover(div);
        ua.click(div);
        ua.mouseout(div);
        baidu.dom(div).off(map);
        ua.mouseover(div);
        ua.click(div);
        ua.mouseout(div);
        div = null;
        c.dispose();
        //
        
        c = new Div();
        div = c.get();
        baidu.dom(div).on(map);
        ua.mouseover(div);
        ua.click(div);
        ua.mouseout(div);
        baidu.dom(div).off();
        ua.mouseover(div);
        ua.click(div);
        ua.mouseout(div);
        div = null;
        c.dispose();
        
        start();
    }, 'baidu.dom.on', 'baidu.dom.off');
});

test('span uninstall event', function(){
    expect(4);
    var span = document.createElement('span'),
        c = new Div(true);
    document.body.appendChild(span);
    span.appendChild(c.get());
    function handler(){
        ok(true, 'mouseup event trigger');
    }
    baidu.dom(span).on('mouseup', 'div', handler);
    ua.mouseup(c.get());
    baidu.dom(span).off('mouseup', 'div', handler);
    ua.mouseup(c.get());
    ua.mouseup(span);
    c.dispose();
    document.body.removeChild(span);
    
    //
    var map = {
        mousedown: function(){ok(true, 'mousedown event triger');},
        mousemove: function(){ok(true, 'mousemove event trigger');},
        mouseup: function(){ok(true, 'mouseup event trigger');}
    };
    span = document.createElement('span');
    c = new Div(true);
    document.body.appendChild(span);
    span.appendChild(c.get());
    baidu.dom(span).on(map, 'div', function(){ok(false, 'exception')});
    ua.mousedown(c.get());
    ua.mousemove(c.get());
    ua.mouseup(c.get());
    baidu.dom(span).off(map, 'div');
    ua.mousedown(c.get());
    ua.mousemove(c.get());
    ua.mouseup(c.get());
    c.dispose();
    document.body.removeChild(span);
});
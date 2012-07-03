/**
 * @author linlingyu
 */
module('baidu.dom.one');
function Div(noAppend){
    this._div = document.createElement('div');
    !noAppend && document.body.appendChild(this._div);
}
Div.prototype.get = function(){return this._div;}
Div.prototype.dispose = function(){
    document.body.removeChild(this._div);
    this._div = null;
}

test('div event trigger once', function(){
    expect(5);
    var c = new Div();
    baidu.dom(c.get()).one('click', function(){
        ok(true, 'click event trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(c.get(), 'click');
    c.dispose();
    //
    c = new Div();
    baidu.dom(c.get()).one('keyup', {tangId: 'Tangram'}, function(evt){
        equal(evt.data.tangId, 'Tangram', 'keyup event trigger');
    });
    ua.keyup(c.get());
    ua.keyup(c.get());
    ua.keyup(c.get());
    c.dispose();
    //
    var map = {
        click: function(evt){equal(evt.data.tangId, 'Tangram', 'click event trigger and data received')},
        mouseover: function(evt){equal(evt.data.tangId, 'Tangram', 'mouseover event trigger and data received')},
        mouseout: function(evt){equal(evt.data.tangId, 'Tangram', 'mouseup event trigger and data received')}
    };
    c = new Div();
    baidu.dom(c.get()).one(map, {tangId: 'Tangram'}, function(){ok(false, 'exception');});
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(c.get(), 'mouseover');
    ua.fireMouseEvent(c.get(), 'mouseover');
    ua.fireMouseEvent(c.get(), 'mouseout');
    ua.fireMouseEvent(c.get(), 'mouseout');
    c.dispose();
});


test('span event trigger once', function(){
    expect(5);
    var span = document.createElement('span'),
        c = new Div();
    document.body.appendChild(span);
    span.appendChild(c.get());
    baidu.dom(span).one('click', 'div', function(){ok(true, 'click event trigger')});
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(c.get(), 'click');
    document.body.removeChild(span);
//    
    span = document.createElement('span');
    document.body.appendChild(span);
    c = new Div();
    span.appendChild(c.get());
    baidu.dom(span).one('click', 'div', {tangId: 'Tangram'}, function(evt){
        equla(evt.data.tangId, 'Tangram', 'click event trigger and data received');
    });
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(span, 'click');
    document.body.removeChild(span);
//    
    var map = {
        mousedown: function(){ok(true, 'mousedown event triger');},
        mousemove: function(){ok(true, 'mousemove event trigger');},
        mouseup: function(){ok(true, 'mouseup event trigger');}
    };
    span = document.createElement('span');
    document.body.appendChild(span);
    c = new Div();
    span.appendChild(c.get());
    baidu.dom(span).one(map, 'div', {tangId: 'Tangram'}, function(){ok(false, 'exception')});
    ua.fireMouseEvent(c.get(), 'mousedown');
    ua.fireMouseEvent(c.get(), 'mousemove');
    ua.fireMouseEvent(c.get(), 'mouseup');
    ua.fireMouseEvent(c.get(), 'mousedown');
    ua.fireMouseEvent(c.get(), 'mousemove');
    ua.fireMouseEvent(c.get(), 'mouseup');
    document.body.removeChild(span);
});

test('fragment attach once event', function(){
    expect(3);
    var c = new Div(true);
    baidu.dom(c.get()).one('mousedown', function(){
        ok(true, 'mousedown event trigger');
    });
    ua.fireMouseEvent(c.get(), 'mousedown');
    ua.fireMouseEvent(c.get(), 'mousedown');
    //
    
    c = new Div(true);
    baidu.dom(c.get()).one('click', {tangId: 'Tangram', tangNum: 100}, function(evt){
        equal(evt.data.tangId, 'Tangram', 'tangId');
        equal(evt.data.tangNum, 100, 'tangNum');
    });
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(c.get(), 'click');
});

test('off event', function(){
    expect(1);
    stop();
    ua.importsrc('baidu.dom.off', function(){
        var c = new Div();
        function handler(){
            ok(true, 'click event');
        }
        ok(!!baidu.dom(c.get()).off, 'baidu.dom.off imported');
        baidu.dom(c.get()).one('click', handler);
        baidu.dom(c.get()).off('click', handler);
        ua.fireMouseEvent(c.get(), 'click');
        ua.fireMouseEvent(c.get(), 'click');
        start();
    }, 'baidu.dom.off', 'baidu.dom.one');
});
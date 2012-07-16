/**
 * @author linlingyu
 */
module('baidu.dom.delegate');

function Span(noAppend){
    var span = this._span = document.createElement('span');
    !noAppend && document.body.appendChild(span);
    span.appendChild(document.createElement('div'));
    span.appendChild(document.createElement('div'));
    span.appendChild(document.createElement('div'));
    span.appendChild(document.createElement('span'));
}
Span.prototype.get = function(){return this._span;}
Span.prototype.dispose = function(){
    var parentNode = this._span.parentNode;
    parentNode && parentNode.removeChild(this._span);
    this._span = null;
}



test('test normal delegate', function(){
    expect(3);
    var c = new Span(),
        span = c.get();
    baidu.dom(span).delegate('div', 'click', function(){
        ok(true, 'delegate event trigger');
    });
    $.each(span.getElementsByTagName('*'), function(index, item){
        ua.fireMouseEvent(item, 'click');
    });
    c.dispose();
    sapn = null;
});

test('test data delegate', function(){
    expect(3);
    var c = new Span(),
        span = c.get();
    baidu.dom(span).delegate('div', 'click', {tangId: 'Tangram'}, function(evt){
        equal(evt.data.tangId, 'Tangram', 'tangId is');
    });
    $.each(span.getElementsByTagName('*'), function(index, item){
        ua.fireMouseEvent(item, 'click');
    });
    c.dispose();
    sapn = null;
});

test('test map delegate', function(){
    var c = new Span(),
        span = c.get();
    baidu.dom(span).delegate('div', {
        'mouseover': function(){ok(true, 'mouseover')},
        'click': function(){ok(true, 'click')},
        'mouseout': function(){true, 'mouseout'}
    });
    $.each(span.getElementsByTagName('*'), function(index, item){
        ua.fireMouseEvent(item, 'mouseover');
        ua.fireMouseEvent(item, 'click');
        ua.fireMouseEvent(item, 'mouseout');
    });
    c.dispose();
    sapn = null;
});

test('test', function(){
    expect(1);
    var c = new Span(),
        span = c.get(),
        div = span.getElementsByTagName('div')[0],
        a = document.createElement('A');
    div.appendChild(a);

    a.href = '#';
    a.onclick = function(){
        return false;
    };
    a.innerHTML = 'baidu';
    
    baidu.dom(span).delegate('a', 'click', function(){
        ok(true, 'delegate');
    });
    
    a.click();
    c.dispose();
    span = div = a = null;
});

test('test', function(){
    expect(1);
    var div = document.createElement('div'),
        div_0 = document.createElement('div'),
        div_1 = document.createElement('div'),
        div_2 = document.createElement('div'),
        dispach = document.createElement('div');
    document.body.appendChild(div);
    div.appendChild(div_0);
    div_0.appendChild(div_1);
    div_1.appendChild(div_2);
    div_2.appendChild(dispach);
    
    baidu.dom(div).delegate('div', 'click', function(){
        ok(true, 'delegate');
    });
    ua.fireMouseEvent(dispach, 'click');
    document.body.removeChild(div);
});
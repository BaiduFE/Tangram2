/**
 * @author linlingyu
 */
module('baidu.domon');


function Div(noAppend){
    var div = this._div = document.createElement('div');
    !noAppend && document.body.appendChild(div);
}
Div.prototype.get = function(){return this._div;}
Div.prototype.dispose = function(){document.body.removeChild(this._div);}


test('bind event to div', function(){
    expect( 10 );
    var c = new Div(),
        array = [];
        
    baidu.dom(c.get()).on('click', function(){
        array.push('A');
        ok(array.join('') === 'A', 'div click trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');//1
    c.dispose();
    
    c = new Div();
    baidu.dom(c.get()).on('click, mouseover', function(evt){
        array.push('B');
        ok(true, 'div event trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');//2
    ua.fireMouseEvent(c.get(), 'mouseover');//3
    c.dispose();
    
    c = new Div();
    baidu.dom(c.get()).on('click', {tangId: 'Tangram'}, function(evt){
        array.push('C');
        equal(evt.data.tangId, 'Tangram', 'event bind width data');
    });
    ua.fireMouseEvent(c.get(), 'click');//4
    c.dispose();
    
    c = new Div();
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
    c = new Div();
    baidu.dom(c.get()).on('click', handler);
    baidu.dom(c.get()).on('click', handler);
    baidu.dom(c.get()).on('click', handler);
    ua.fireMouseEvent(c.get(), 'click');//7.8.9
    c.dispose();
    equal(array.join(''), 'ABBCDEFFF', 'array is in order');//10
});

test('selector event', function(){
    expect(2);
    var c = new Div(),
        span = document.createElement('span');
    c.get().appendChild(span);
    baidu.dom(c.get()).on('click', 'span', {tangId: 'Tangram'}, function(evt){
        equal(evt.data.tangId, 'Tangram', 'the match of element\'s event trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');
    ua.fireMouseEvent(span, 'click');
    c.dispose();
    
    c = new Div();
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
    var c = new Div(true),
        span = document.createElement('span');
    document.body.appendChild(span);
    span.appendChild(c.get());
    baidu.dom(span).on('click', 'div', function(){
        ok(true, 'div event trigger');
    });
    ua.fireMouseEvent(c.get(), 'click');
    document.body.removeChild(span);
});
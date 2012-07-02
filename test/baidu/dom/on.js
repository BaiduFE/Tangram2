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
    expect(10);
    var c = new Div(),
        array = [];
        
    baidu.dom(c.get()).on('click', function(){
        array.push('A');
        ok(array.join('') === 'A', 'div click trigger');
    });
    ua.click(c.get());//1
    c.dispose();
    
    c = new Div();
    baidu.dom(c.get()).on('click, mouseover', function(evt){
        array.push('B');
        ok(true, 'div event trigger');
    });
    ua.click(c.get());//2
    ua.mouseover(c.get());//3
    c.dispose();
    
    c = new Div();
    baidu.dom(c.get()).on('click', {tangId: 'Tangram'}, function(evt){
        array.push('C');
        equal(evt.data.tangId, 'Tangram', 'event bind width data');
    });
    ua.click(c.get());//4
    c.dispose();
//    
    c = new Div();
    baidu.dom(c.get()).on({
        click: function(evt){
            array.push('E');
            equal(evt.data.tangId, 'Tangram', 'div click trigger');
        },
        mouseout: function(evt){
            array.push('D');
            equal(evt.data.tangId, 'Tangram', 'div mouseout trigger');
        }
    }, {tangId: 'Tangram'}, function(){ok(false, 'exception');});
    ua.mouseout(c.get());//5
    ua.click(c.get());//6
    c.dispose();
    
    function handler(){
        array.push('F');
        ok(true, 'div click trigger');
    }
    c = new Div();
    baidu.dom(c.get()).on('click', handler);
    baidu.dom(c.get()).on('click', handler);
    baidu.dom(c.get()).on('click', handler);
    ua.click(c.get());//7,8,9
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
    ua.click(c.get());
    ua.click(span);
    c.dispose();
    //
    
    c = new Div();
    span = document.createElement('span');
    c.get().appendChild(span);
    baidu.dom(c.get()).on('click', 'span', {tangId: 'Tangram'}, function(evt){
        equal(evt.data.tangId, 'Tangram', 'the match of element\'s event trigger');
    });
    ua.click(c.get());
    ua.click(span);
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
    ua.click(c.get());
    document.body.removeChild(span);
});
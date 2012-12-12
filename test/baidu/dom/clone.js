module('baidu.dom.clone');
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

test('clone normal dom', function(){
    var div = new Elements('div'),
        node = div.get(),
        tang;
    node.id = 'tangId';
    tang = baidu.dom(div.get()).clone();
    ok(tang.get(0).id === node.id, 'same id');
    ok(tang.get(0) !== node, 'it is a new div');
    div.dispose();
    node = null;
});

test('clone a text node', function(){
    var txt = document.createTextNode('hello world'),
        tang = baidu.dom(txt).clone(true, true);
    ok(tang.get(0).nodeValue === 'hello world', 'hello world');
    ok(tang.get(0) !== txt, 'it is a new text node');
    txt = null;
});

test('event', function(){
    stop();
    ua.importsrc('baidu.dom.on', function(){
        var div = new Elements('div'),
            span = new Elements('span', false),
            span_child = new Elements('span', false),
            tang;
        div.get().appendChild(span.get());
        span.get().appendChild(span_child.get());
        baidu.dom(div.get()).on('click', function(evt){
            ok(true, 'div click event trigger');
        });
        baidu.dom(span.get()).on('mouseover', function(evt){
            ok(false, 'span mouseover event trigger');
        });
        baidu.dom(span_child.get()).on('mouseout', function(evt){
            ok(false, 'span child mouseout event trigger');
        });
        tang = baidu.dom(div.get()).clone(true);
        equal(tang.get(0).firstChild.tagName.toUpperCase(), 'SPAN', 'DIV first child is SPAN');
        equal(tang.get(0).firstChild.firstChild.tagName.toUpperCase(), 'SPAN', 'SPAN first child is SPAN');
        ok(tang.get(0)[baidu.key] !== div.get()[baidu.key], 'it is not same baidu.key');
        ok(tang.get(0).firstChild[baidu.key] === undefined, 'div first child has not baidu.key');
        ok(tang.get(0).firstChild.firstChild[baidu.key] === undefined, 'span first child has not baidu.key');
        ua.fireMouseEvent(tang.get(0), 'click');
        ua.fireMouseEvent(tang.get(0).firstChild, 'mouseover');
        ua.fireMouseEvent(tang.get(0).firstChild.firstChild, 'mouseout');
        div.dispose();
        span.dispose();
        span_child.dispose();
        start();
    }, 'baidu.dom.on', 'baidu.dom.clone');
});

test('clone all', function(){
    expect(6);
    var div = new Elements('div'),
        span = new Elements('span', false),
        span_child = new Elements('span', false),
        tang;
    div.get().appendChild(span.get());
    span.get().appendChild(span_child.get());
    baidu.dom(div.get()).on('click', function(evt){
        ok(true, 'div click event trigger');
    });
    baidu.dom(span.get()).on('mouseover', function(evt){
        ok(true, 'span mouseover event trigger');
    });
    baidu.dom(span_child.get()).on('mouseout', function(evt){
        ok(true, 'span child mouseout event trigger');
    });
    tang = baidu.dom(div.get()).clone(true, true);
    ok(tang.get(0)[baidu.key] !== div.get()[baidu.key], 'it is not same baidu.key');
    ok(tang.get(0).firstChild[baidu.key] !== span.get()[baidu.key], 'it is not same baidu.key');
    ok(tang.get(0).firstChild.firstChild[baidu.key] !== span_child.get()[baidu.key], 'it is not smae baidu.key');
    stop();
    ua.importsrc('baidu.dom.trigger', function(){
        baidu.dom(div.get()).trigger('click');
        baidu.dom(span.get()).trigger('mouseover');
        baidu.dom(span_child.get()).trigger('mouseout');
        
        span_child.dispose();
        span.dispose();
        div.dispose();
        start();
    }, 'baidu.dom.trigger', 'baidu.dom.clone');
//    ua.fireMouseEvent(tang.get(0), 'click');
//    ua.fireMouseEvent(tang.get(0).firstChild, 'mouseover');
//    ua.fireMouseEvent(tang.get(0).firstChild.firstChild, 'mouseout');
});

test('clone object, textarea, radio, option, script', function(){
    $.each('object,textarea,script'.split(','), function(index, item){
        var c = new Elements(item),
            node = c.get();
        node.id = 'tangId-' + item;
        var tang = baidu.dom(node).clone(true, true);
        ok(tang.get(0).id === node.id, 'same id: (' + node.id + ')');
        ok(tang.get(0) !== node, 'it is a new element: (' + item + ')');
        c.dispose();
    });
    
    var c = new Elements('input', true),
        node = c.get(), tang;
    node.id = 'tangId-radio';
    node.type = 'radio';
    node.value = 'defaultValue';
    document.body.appendChild(node);
    tang = baidu.dom(node).clone(true, true);
    ok(tang.get(0).id === node.id, 'same id: (' + node.id + ')');
    ok(tang.get(0) !== node, 'it is a new element: (radio)');
    c.dispose();
    
    c = new Elements('select');
    node = c.get();
    var opt = new Option('hello world', '001');
    node.options.add(opt);
    tang = baidu.dom(opt).clone(true, true);
    //没有办法很好的完全copy option,jq也同样
//    ok(tang.get(0).text === opt.text, 'same text: (option)');
    ok(tang.get(0).value === opt.value, 'same value: (option)');
    ok(tang.get(0) !== opt, 'it is a new element: (option)');
    opt = null;
    c.dispose();
});
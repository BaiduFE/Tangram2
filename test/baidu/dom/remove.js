module('baidu.dom.remove');
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

function noParent(ele){
    return !ele.parentNode || ele.parentNode.nodeType === 11;
}

test('baidu.dom(args).remove()', function(){
    var ele = new Elements('div'),
        span = new Elements('span', true);
    ele.get().appendChild(span.get());
    baidu.dom(ele.get()).remove();
    baidu.dom(span.get()).remove();
    ok(noParent(ele.get()), 'div removed');
    ok(noParent(span.get()), 'span removed');
    span.dispose();
    ele.dispose();
});

test('baidu.dom(args).remove(selector)', function(){
    var container = new Elements('div'),
        span = new Elements('span', true),
        div_0 = new Elements('div', true),
        div_1 = new Elements('div', true),
        div_2 = new Elements('div', true);
    container.get().appendChild(div_0.get());
    container.get().appendChild(span.get());
    container.get().appendChild(div_1.get());
    container.get().appendChild(div_2.get());
    baidu.dom(container.get().getElementsByTagName('*')).remove('div');
    
    ok(noParent(div_0.get()), 'div-0 removed');
    ok(noParent(div_1.get()), 'div-1 removed');
    ok(noParent(div_2.get()), 'div-2 removed');
    ok(!noParent(span.get()), 'span not removed');
    ok(!noParent(container.get()), 'container not removed');
});

test('event', function(){
    stop();
    ua.importsrc('baidu.dom.on', function(){
        var div = new Elements('div'),
            span = new Elements('span', true),
            key = baidu.key;
        div.get().appendChild(span.get());
        
        baidu.dom(span.get()).on('click', function(){
            ok(false, 'span event trigger');
        });
        baidu.dom(div.get()).on('mouseover', function(){
            ok(false, 'div event trigger');
        });
        ok(!!div.get()[key], 'div has baidu.key');
        ok(!!span.get()[key], 'span has baidu.key');
        baidu.dom(div.get()).remove();
        ua.fireMouseEvent(span.get(), 'click');
        ua.fireMouseEvent(div.get(), 'mouseover');
        ok(!div.get()[key], 'div has not baidu.key');
        ok(!span.get()[key], 'span has not baidu.key');
        start();
    }, 'baidu.dom.on', 'baidu.dom.remove');
});
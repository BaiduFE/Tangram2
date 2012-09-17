module('baidu.dom.detach');
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

test('baidu.dom(args).detach()', function(){
    var ele = new Elements('div'),
        span = new Elements('span', true);
    ele.get().appendChild(span.get());
    baidu.dom(ele.get()).detach();
    baidu.dom(span.get()).detach();
    ok(noParent(ele.get()), 'div detach');
    ok(noParent(span.get()), 'span detach');
    span.dispose();
    ele.dispose();
});

test('baidu.dom(args).detach(selector)', function(){
    var container = new Elements('div'),
        span = new Elements('span', true),
        div_0 = new Elements('div', true),
        div_1 = new Elements('div', true),
        div_2 = new Elements('div', true);
    container.get().appendChild(div_0.get());
    container.get().appendChild(span.get());
    container.get().appendChild(div_1.get());
    container.get().appendChild(div_2.get());
    baidu.dom(container.get().getElementsByTagName('*')).detach('div');
    
    ok(noParent(div_0.get()), 'div-0 detach');
    ok(noParent(div_1.get()), 'div-1 detach');
    ok(noParent(div_2.get()), 'div-2 detach');
    ok(!noParent(span.get()), 'span not detach');
    ok(!noParent(container.get()), 'container not detach');
});

test('event', function(){
    expect(2);
    stop();
    ua.importsrc('baidu.dom.on', function(){
        var div = new Elements('div'),
            span = new Elements('span', true),
            key = baidu.key;
        div.get().appendChild(span.get());
        
        baidu.dom(span.get()).on('click', function(){
            ok(true, 'span event trigger');
        });
        baidu.dom(div.get()).on('mouseover', function(){
            ok(true, 'div event trigger');
        });
        baidu.dom(div.get()).detach();
        ua.fireMouseEvent(span.get(), 'click');
        ua.fireMouseEvent(div.get(), 'mouseover');
        start();
    }, 'baidu.dom.on', 'baidu.dom.detach');
});


test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").detach("wangxiao");
    ok(result);
});
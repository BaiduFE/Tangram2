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
            key = baidu._private_.key;
        div.get().appendChild(span.get());
        
        baidu.dom(span.get()).on('click', function(){
            ok(false, 'span event trigger');
        });
        baidu.dom(div.get()).on('mouseover', function(){
            ok(false, 'div event trigger');
        });
        ok(!!div.get()[key], 'div has baidu._private_.key');
        ok(!!span.get()[key], 'span has baidu._private_.key');
        baidu.dom(div.get()).remove();
        ua.fireMouseEvent(span.get(), 'click');
        ua.fireMouseEvent(div.get(), 'mouseover');
        ok(!div.get()[key], 'div has not baidu._private_.key');
        ok(!span.get()[key], 'span has not baidu._private_.key');
        start();
    }, 'baidu.dom.on', 'baidu.dom.remove');
});


//老接口

test(
        "删除所有已有标签的遍历",
        function() {
            ua
                    .frameExt(function(w) {
                        var typeNames = ('p,h1,h2,h3,h4,h5,h6,blockquote,ol,ul,dl,div,form,a' + ',table,fieldset,address,ins,del,em,strong,q,cite,dfn,abbr' + ',acronym,code,samp,kbd,var,img,object,hr' + ',input,button,label,select,iframe')
                                .split(',');
                        for ( var i = 0; i < typeNames.length; i++) {
                            var cnt = w.document.body.childNodes.length;
                            var tag = typeNames[i];
                            var ele = w.document.createElement(tag);
                            ele.id = "test_" + tag;
                            w.document.body.appendChild(ele);
                            w.baidu.dom.remove("test_" + tag);
                            equals(cnt, w.document.body.childNodes.length,
                                    'check if node is removed : ' + tag);
                        }

                        this.finish();
                    });
        });

test('text node', function() {
    var div = document.body.appendChild(document.createElement("div"));
    var node = div.appendChild(document.createTextNode("test"));
    baidu.dom.remove(node);
    equals(div.innerHTML, '', 'text node is removed');
    baidu.dom.remove(div);
});

//2.0已经加入了容错
//test('异常用例', function() {
//    expect(1);
//    var div = document.createElement('div');
//    div.id = 'remove_test_div';
//    // alert(div && div.nodeName && (div.nodeType == 1 || id.nodeType == 9))
//        try {
//            baidu.dom.remove("remove_test_div");
//
//        } catch (e) {
//            ok(true, 'exception catched');
//        }
//    })
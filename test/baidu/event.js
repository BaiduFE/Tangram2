/**
 * @author linlingyu
 */
module('baidu.event');

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

test('test baidu.event properties', function(){
    stop();
    var isGlobalWindow = !!window.event;
    ua.importsrc('baidu.dom.on', function(){
        var c = new Div(),
            span = document.createElement('span');
        c.get().appendChild(span);
        
        baidu.dom(c.get()).on('keyup', { tangId: 'Tangram' }, function(event){
            equal(event.type, 'keyup', 'show type');
            equal(event.target, span, 'this is span');
            ok(event.currentTarget === c.get(), 'this is div');
            equal(event.keyCode, 32, 'keyCode is');
            equal(event.metaKey, true, 'metaKey is');
            equal(event.data.tangId, 'Tangram', 'data value is');
            equal(event.timeStamp, new Date().getTime(), 'time is');
            return 'Tangram';
        });
        //
        baidu.dom(c.get()).on('keyup', function( event ){
            equal(event.result, 'Tangram', 'result is');
        });
        //
        ua.keyup(span, {
            keyCode: 32,
            metaKey: true
            // commandKey: true, // 就算发送了 commandKey 也拿不到，估计是 windows 平台的缘故
        });
        
        baidu.dom(c.get()).on('mouseup', function(event){
            var defaultEvent = event.originalEvent,
                defaultMap = {'0': 1, '1': 2, '2': 3},
                map = defaultEvent.which === undefined
                    && ua.browser.ie < 9 ? {'1': 1, '4': 2, '2': 3}
                        : {'0': 1, '1': 2, '2': 3};
            alert(event.which);
            equal(event.which, map[defaultEvent.button], 'event which is');
        });
        
        $.each([0, 1, 2], function(index, item){
            ua.fireMouseEvent(span, 'mouseup', {
                button: item
            });
        });
        c.dispose();
        start();
    }, 'baidu.dom.on', 'baidu.event');
});

test('event preventDefault', function(){
    var a = document.createElement('A');
    document.body.appendChild(a);
    a.innerHTML = 'baidu';
    a.href = 'http://www.baidu.com';
    baidu.dom(a).on('click', function(event){
        event.preventDefault();
    });
    ua.fireMouseEvent(a, 'click');
    ok(true, 'event preventDefault');
    document.body.removeChild(a);
});

test('event stopPropagation', function(){
    var c = new Div(),
        span = document.createElement('span');
    c.get().appendChild(span);
    baidu.dom(c.get()).on('click', function(){
        ok(false, 'event is trigger');
    });
    baidu.dom(span).on('click', function(event){
        event.stopPropagation();
        equal(event.clientX, 10, 'clientX');
        equal(event.clientY, 15, 'clientY');
    });
    ua.fireMouseEvent(span, 'click', {
        clientX: 10,
        clientY: 15
    });
    ok(true, 'test propagation');
    c.dispose();
});
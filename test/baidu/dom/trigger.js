/**
 * @author linlingyu
 */
module('baidu.dom.trigger');
var isFireFox = /firefox\/(\d+\.\d+)/i.test(navigator.userAgent) ? + RegExp['\x241'] : undefined;
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

function addEvent(ele, evt, handler){
    baidu(ele).on(evt, handler);
    // if(ele.addEventListener){
    //     ele.addEventListener(evt, handler, false);
    // }else if(ele.attachEvent){
    //     ele.attachEvent('on' + evt, handler);
    // }else{
    //     ele['on' + evt] = handler;
    // }
}

test('div trigger event', function(){
    expect(3);
    stop();

    ua.importsrc("baidu.dom.on,baidu.event.shortcut", function(){

        var c = new Div(),
            div = c.get();

        function handler(){
            ok(true, 'click event trigger');
        }
        
        div.onclick = handler;
        baidu.dom(div).trigger('click');
        div.addEventListener && div.addEventListener('mouseup', handler, false);
        div.attachEvent && div.attachEvent('onmouseup', handler);
        baidu.dom(div).trigger('mouseup');
        c.dispose();
        div = null;
        
        //
        c = new Div();
        div = c.get();
        baidu(div).click(function(evt, arg0, arg1, arg2){
            equal(arg0 + arg1 + arg2, 'ABC', 'data pass to event');
        });
        baidu.dom(div).trigger('click', ['A', 'B', 'C']);
        div = null;
        c.dispose();

        start();
    }, "baidu.dom.on", "baidu.dom.trigger");    
    //
    
});

test('custom event', function(){
    stop();
    expect(1);
    ua.importsrc('baidu.dom.bind', function(){
        var c = new Div(),
            div = c.get();

        baidu.dom(div).bind('custom', function(evt, arg0, arg1, arg2){
            equal(arg0 + arg1 + arg2, 'ABC', 'custom event data pass to fn');
        });
        baidu.dom(div).trigger('custom', ['A', 'B', 'C']);
        div = null;
        c.dispose();
        
        start();
    }, "baidu.dom.fn.bind", "baidu.dom.trigger");
});

test('all support event', function(){
    var keysEvents = ['keydown', 'keyup', 'keypress'],
        mousesEvents = ['mousedown', 'mousemove', 'mouseup', 'mouseover', 'mouseout', 'click'],
        htmlEvents = ['load', 'resize'],
        formsEvents = ['change', 'focus', 'blur', 'submit', 'reset'],
        etcEvents = ['DOMAttrModified'];

    expect(keysEvents.concat(mousesEvents).concat(htmlEvents).concat(formsEvents).concat(etcEvents).length);
    
    var input = document.createElement('input');
        input.type = 'text';

    var div = document.createElement("div");
        div.innerHTML = "<form action='' onsubmit='return false;'><input name='a' value='a' type='hidden' /></form>";

    document.body.appendChild(input);
    document.body.appendChild(div);
    var form = div.firstChild;

    $.each(keysEvents, function(index, item){
        addEvent(input, item, function(evt){
            ok(true, evt.type + ' event trigger');
        });
    });
    $.each(keysEvents, function(index, item){
        baidu.dom(input).trigger(item);
    });
    
    $.each(mousesEvents, function(index, item){
        addEvent(input, item, function(evt){
            ok(true, evt.type + ' event trigger');
        });
    });
    $.each(mousesEvents, function(index, item){
        baidu.dom(input).trigger(item);
    });
    

    $.each(formsEvents, function(index, item){
        addEvent( item == "submit" || item == "reset" ? form : input, item, function(){
            ok(true, 'form event trigger');
        });
    });
    
    $.each(formsEvents, function(index, item){
        baidu.dom( item == "submit" || item == "reset" ? form : input ).trigger( item );
    });
    
    $.each(htmlEvents, function(index, item){
        addEvent(document.body, item, function(){
            ok(true, 'html event trigger');
        });
    });
    
    $.each(htmlEvents, function(index, item){
        baidu.dom(document.body).trigger(item);
    });
    
    $.each(etcEvents, function(index, item){
        addEvent(input, item, function(){
            ok(true, 'etc event trigger');
        });
    });
    
    $.each(etcEvents, function(index, item){
        baidu.dom(input).trigger(item);
    });
    
    document.body.removeChild(input);
    document.body.removeChild(div);
});


test("dom为空的情况",function(){
    var result = baidu("#baidujsxiaozu").on("wangxiao");
    ok(result);
    var result = baidu("#baidujsxiaozu").click("wangxiao");
    ok(result);
});

// TODO baidu.dom(div).trigger(baidu.event());
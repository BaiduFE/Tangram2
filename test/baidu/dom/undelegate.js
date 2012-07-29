/**
 * @author linlingyu
 */
module('baidu.dom.undelegate');
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


test('normal test', function(){
    stop();
    ua.importsrc('baidu.dom.delegate', function(){
        var c = new Span(),
            span = c.get(),
            div, eventMap;
        function handler(){
            ok(false, 'span undelegate');
        }
        baidu.dom(span).delegate('div', 'click', handler);
        baidu.dom(span).undelegate('div', 'click', handler);
        ua.fireMouseEvent(span.getElementsByTagName('div')[0], 'click');
        c.dispose();
        span = null;
        
        //
        c = new Span();
        span = c.get();
        div = span.getElementsByTagName('div')[0];
        baidu.dom(span).delegate('div', 'click', function(){ok(false, 'the first event undelegate')});
        baidu.dom(span).delegate('div', 'click', function(){ok(false, 'the second event undelegate')});
        baidu.dom(span).delegate('div', 'mouseover', function(){ok(true, 'the third event undelegate')});
        
        baidu.dom(span).undelegate('div', 'click');
        ua.fireMouseEvent(div, 'click');
        ua.fireMouseEvent(div, 'mouseover');
        c.dispose();
        
        //
        c = new Span();
        span = c.get();
        div = span.getElementsByTagName('div')[0];
        eventMap = {
            mouseover: function(){ok(false, 'mouseover event')},
            click: function(){ok(false, 'click event')},
            mouseout: function(){ok(false, 'mouseout event')}
        };
        baidu.dom(span).delegate('div', eventMap);
        baidu.dom(span).undelegate('div', eventMap);
        
        ua.fireMouseEvent(div, 'mouseover');
        ua.fireMouseEvent(div, 'click');
        ua.fireMouseEvent(div, 'mouseout');
        c.dispose();
        
        //
        c = new Span();
        span = c.get();
        div = span.getElementsByTagName('div')[0];
        baidu.dom(span).delegate('div', eventMap);
        baidu.dom(span).delegate('span', 'mousemove', function(){
            ok(false, 'span mousemove');
        });
        baidu.dom(span).undelegate();
        ua.fireMouseEvent(div, 'mouseover');
        ua.fireMouseEvent(div, 'click');
        ua.fireMouseEvent(div, 'mouseout');
        ua.fireMouseEvent(span.getElementsByTagName('span')[0], 'mousemove');
        
        
        c.dispose();
        c = span = div = null;
        start();
    }, 'baidu.dom.delegate', 'baidu.dom.undelegate');
});
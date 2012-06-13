/**
 * @author linlingyu
 */
///import baidu;
///import baidu.dom.

baidu.support = baidu.support || (function(){
    var div = document.createElement('div'),
        support,
        a;
    
    div.innerHTML = '<a href="/a" style="float:left;opacity:.55">Tangram</a>';
    a = div.getElementsByTagName('A')[0];
    support = {
        opacity: a.style.opacity === '0.55',
        cssFloat: !!a.style.cssFloat
    };
    
    window.onload = function(){
        var body = document.getElementsByTagName('body')[0],
            container = document.createElement('div'),
            div = document.createElement('div'),
            paddingMarginBorder = 'padding:0;margin:0;border:',
            boundString = 'left:0;top:0;width:0px;height:0px;',
            visibleString = boundString + paddingMarginBorder + '0;visibility:hidden;',
            styleString = boundString + paddingMarginBorder + '5px solid #000;position:absolute;',
            outer,
            inner,
            table;
            
        container.style.cssText = 'position:static;' + visibleString;
        body.insertBefore(container, body.firstChild);
        container.appendChild(div);
        div.style.cssText = 'position:absolute;' + visibleString;
        div.innerHTML = '<div style="'+ styleString +'display:bloack;"><div style="'+ paddingMarginBorder +'0;display:block;overflow:hidden;"></div></div><table style="'+ styleString +'" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
        outer = div.firstChild;
        inner = outer.firstChild;
        table = div.getElementsByTagName('table')[0];
        support.hasBorder = inner.offsetTop >= 5;
        support.hasTableCellBorder = table.rows[0].cells[0].offsetTop >= 5;
        inner.style.position = 'fixed';
        inner.style.top = '20px';
        support.fixedPosition = inner.offsetTop === 20 || inner.offsetTop === 15;
//        inner.style.position = inner.style.top = '';
//        outer.style.overflow = 'hidden';
//        outer.style.position = 'relative';
        
        body.removeChild(container);
        container = div = outer = inner = table = null;
    }
    return support;
})();
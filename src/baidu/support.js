/**
 * @author linlingyu
 */
///import baidu;
///import baidu.dom;
///import baidu.dom.ready;

baidu.support = baidu.support || function(){
    var div = document.createElement('div'),
        support,
        a, input;
    
    div.innerHTML = '<a href="/a" style="float: left; opacity: .55">Tangram</a><input type="checkbox">';
    a = div.getElementsByTagName('A')[0];
    input = div.getElementsByTagName('input')[0];
    input.checked = true;
    
    support = {
        opacity: a.style.opacity === '0.55',
        cssFloat: !!a.style.cssFloat,
        noCloneChecked: input.cloneNode(true).checked,
        noCloneEvent: true
    };
    if (!div.addEventListener && div.attachEvent && div.fireEvent){
        div.attachEvent('onclick', function(){support.noCloneEvent = false;});
        div.cloneNode(true).fireEvent('onclick');
    }
    
    baidu(function(){
        var body = document.getElementsByTagName('body')[0],
            container = document.createElement('div'),
            div = document.createElement('div'),
            paddingMarginBorder = 'padding: 0; margin: 0; border: ',
            boundString = 'left: 0; top: 0; width: 0px; height: 0px; ',
            visibleString = boundString + paddingMarginBorder + '0; visibility: hidden;',
            styleString = boundString + paddingMarginBorder + '5px solid #000; position: absolute;',
            outer,
            inner,
            table;
            
        container.style.cssText = 'position: static;' + visibleString;
        body.insertBefore(container, body.firstChild);
        container.appendChild(div);
        div.style.cssText = 'position: absolute;' + visibleString;
        div.innerHTML = '<div style="'+ styleString +'display: bloack;"><div style="'+ paddingMarginBorder +'0; display: block; overflow: hidden;"></div></div><table style="'+ styleString +'" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';
        outer = div.firstChild;
        inner = outer.firstChild;
        table = outer.nextSibling;

        support.hasBorderWidth = inner.offsetTop >= 5;//opera
        support.hasTableCellBorderWidth = table.rows[0].cells[0].offsetTop >= 5;//ie,firefox
        
        inner.style.position = 'fixed';
        inner.style.top = '20px';

        support.fixedPosition = inner.offsetTop === 20 || inner.offsetTop === 15;
//        inner.style.position = inner.style.top = '';
//        outer.style.overflow = 'hidden';
//        outer.style.position = 'relative';
        
        body.removeChild(container);
        container = div = outer = inner = table = null;
    });

    return support;
}();
/**
 * @author linlingyu  wangxiao
 */
///import baidu;
///import baidu.dom;
///import baidu.dom.ready;

baidu.support = baidu.support || function(){
    var div = document.createElement('div'),
        support,
        a, input;
    
    div.innerHTML = '<a href="/a" style="top:1px; float: left; opacity: .55">Tangram</a><input type="checkbox">';
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
            select,
            opt,
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

//author wangxiao start
        support.deleteExpando = true;

        // Test to see if it's possible to delete an expando from an element
        // Fails in Internet Explorer
        try {
            delete div.test;
        } catch( e ) {
            support.deleteExpando = false;
        }
    
        select = document.createElement( "select" );
        opt = select.appendChild( document.createElement("option") );

        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        support.optSelected = opt.selected;

        // Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        var input = div.getElementsByTagName("input")[ 0 ];

        // Make sure that if no value is specified for a checkbox
        // that it defaults to "on".
        // (WebKit defaults to "" instead)
        support.checkOn = ( input.value === "on" );

        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        support.htmlSerialize = !!div.getElementsByTagName("link").length;

        // IE strips leading whitespace when .innerHTML is used
        support.leadingWhitespace = ( div.firstChild.nodeType === 3 );

        support.getSetAttribute = div.className !== "t";
        support.pixelMargin = true;

        // Check box-sizing and margin behavior
        div.innerHTML = "";
        div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

        // NOTE: To any future maintainer, window.getComputedStyle was used here
        // instead of getComputedStyle because it gave a better gzip size.
        // The difference between window.getComputedStyle and getComputedStyle is
        // 7 bytes
        if ( window.getComputedStyle ) {            
            support.pixelMargin = ( window.getComputedStyle( div, null ) || {} ).marginTop !== "1%";
        };
 
        // Check if a radio maintains its value
        // after being appended to the DOM
        var input = document.createElement("input");
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";

        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        support.hrefNormalized = ( a.getAttribute("href") === "/a" );

        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        support.style = /top/.test(a.getAttribute("style"));

        // Tests for enctype support on a form(#6743)
        support.enctype = !!document.createElement("form").enctype; 

//author wangxiao end


//        inner.style.position = inner.style.top = '';
//        outer.style.overflow = 'hidden';
//        outer.style.position = 'relative';
        
        body.removeChild(container);
        container = div = outer = inner = table = null;
    });

    return support;
}();
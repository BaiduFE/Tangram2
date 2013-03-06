///import baidu.dom;
baidu.dom._propFixer = {
    tabindex: 'tabIndex',
    readonly: 'readOnly',
    'for': 'htmlFor',
    'class': 'className',
    'classname': 'className',
    maxlength: 'maxLength',
    cellspacing: 'cellSpacing',
    cellpadding: 'cellPadding',
    rowspan: 'rowSpan',
    colspan: 'colSpan',
    usemap: 'useMap',
    frameborder: 'frameBorder',
    contenteditable: 'contentEditable',
    
    
    //rboolean在baidu.dom._removeAttr 和 baidu.dom._attr中需要被共同使用
    rboolean: /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i
};
// IE6/7 call enctype encoding
!document.createElement('form').enctype
    && (baidu.dom._propFixer.enctype = 'encoding');
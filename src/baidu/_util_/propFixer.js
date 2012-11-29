///import baidu._util_;
baidu._util_.propFixer = {
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
    
    
    //rboolean在baidu._util_.removeAttr 和 baidu._util_.attr中需要被共同使用
    rboolean: /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i
};
// IE6/7 call enctype encoding
!document.createElement('form').enctype
    && (baidu._util_.propFixer.enctype = 'encoding');
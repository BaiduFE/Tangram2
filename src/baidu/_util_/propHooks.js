/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.extend;
///import baidu.support;
///import baidu._util_;

baidu.extend(baidu._util_,{
    rfocusable:/^(?:button|input|object|select|textarea)$/i,
    rclickable:/^a(?:rea)?$/i,
    rboolean:/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    propFix:{
        tabindex: "tabIndex",
        readonly: "readOnly",
        "for": "htmlFor",
        "class": "className",
        maxlength: "maxLength",
        cellspacing: "cellSpacing",
        cellpadding: "cellPadding",
        rowspan: "rowSpan",
        colspan: "colSpan",
        usemap: "useMap",
        frameborder: "frameBorder",
        contenteditable: "contentEditable"
    },
    propHooks: {
        tabIndex:{
            get: function( elem ) {

                var bu = baidu._util_;
                // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                var attributeNode = elem.getAttributeNode("tabindex");

                return attributeNode && attributeNode.specified ?
                    parseInt( attributeNode.value, 10 ) :
                    bu.rfocusable.test( elem.nodeName ) || bu.rclickable.test( elem.nodeName ) && elem.href ?
                        0 :
                        undefined;
            }
        }
    }
});

// IE6/7 call enctype encoding
if ( !baidu.support.enctype ) {
    var bu = baidu._util_;
    bu.propFix.enctype = "encoding";
};

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !baidu.support.optSelected ) {
    var bu = baidu._util_;
    bu.propHooks.selected = baidu.extend( bu.propHooks.selected, {
        get: function( elem ) {
            var parent = elem.parentNode;

            if ( parent ) {
                parent.selectedIndex;

                // Make sure that it also works with optgroups, see #5701
                if ( parent.parentNode ) {
                    parent.parentNode.selectedIndex;
                }
            }
            return null;
        }
    });
};

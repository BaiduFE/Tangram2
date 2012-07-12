/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.extend;
///import baidu.support;
///import baidu.dom;

baidu.dom.rfocusable = /^(?:button|input|object|select|textarea)$/i,
baidu.dom.rclickable = /^a(?:rea)?$/i;
baidu.dom.rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i;

baidu.extend(baidu.dom,{
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
				var bd = baidu.dom;
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				var attributeNode = elem.getAttributeNode("tabindex");

				return attributeNode && attributeNode.specified ?
					parseInt( attributeNode.value, 10 ) :
					bd.rfocusable.test( elem.nodeName ) || bd.rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						undefined;
			}
		}
	}
});

// IE6/7 call enctype encoding
if ( !baidu.support.enctype ) {
	var bd = baidu.dom;
	bd.propFix.enctype = "encoding";
};

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !baidu.support.optSelected ) {
	var bd = baidu.dom;
	bd.propHooks.selected = baidu.extend( bd.propHooks.selected, {
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

/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    prop:function(name,value){
    	
        //异常处理
        if(arguments.length <= 0 || typeof name === 'function'){
            return this;
        };

        var ret, 
            hooks, 
            notxml,
            elem = this[0], 
            nType = elem.nodeType;

        // don't get/set properties on text, comment and attribute nodes
        if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
            return;
        };

        //Sizzle.isXML
        var isXML = function( elem ) {
            // documentElement is verified for cases where it doesn't yet exist
            // (such as loading iframes in IE - #4833)
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };

        var propFix = {
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
        };

        var rfocusable = /^(?:button|input|object|select|textarea)$/i,
            rclickable = /^a(?:rea)?$/i;

        var propHooks = {
            tabIndex: {
                get: function( elem ) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    var attributeNode = elem.getAttributeNode("tabindex");

                    return attributeNode && attributeNode.specified ?
                        parseInt( attributeNode.value, 10 ) :
                        rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                            0 : undefined;
                }
            }
        };

/*
// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
    jQuery.propHooks.selected = jQuery.extend( jQuery.propHooks.selected, {
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
}

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
    jQuery.propFix.enctype = "encoding";
}
*/        
        notxml = nType !== 1 || !isXML( elem );

        if ( notxml ) {
            // Fix name and attach hooks
            name = propFix[ name ] || name;
            hooks = propHooks[ name ];
        };

        switch(typeof name){
            case 'string':
                if( typeof value === 'undefined' ){
                    
                    //get first
                    if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
                        return ret;

                    } else {
                        return elem[ name ];
                    };

                }else if( typeof value === 'function' ){
                    
                    baidu.each(this, function(item,index){
                        var ele = baidu.dom(item);
                        ele.prop( name, value.call(item, index, ele.prop(name)));
                    });

                }else{
                    
                    //set all
                    baidu.each(this, function(item,index){
                        if ( hooks && "set" in hooks && (ret = hooks.set( item, value, name )) !== undefined ) {
                            return ret;

                        } else {
                            item[ name ] = value;
                        };
                    });
                };

            break;
            case 'object':

                //set all
                baidu.each(this, function(item,index){
                    var ele = baidu.dom(item);
                    for(key in name){
                        ele.prop(key,name[key]);
                    };
                });

            break;
            default:
            break;
        };

        return this;
    }
});
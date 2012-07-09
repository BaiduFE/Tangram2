/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.each;
///import baidu.support;

///import baidu.dom.prop;
///import baidu.dom.val;
///import baidu.dom.css;
///import baidu.dom.html;
///import baidu.dom.text;
///import baidu.dom.width;
///import baidu.dom.height;
///import baidu.dom.offset;

///import baidu.dom.removeAttr;

baidu.dom.extend({
    attr:function(name,value){
    	
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

        var attrFn = {
            val: true,
            css: true,
            html: true,
            text: true,
            //data: true,
            width: true,
            height: true,
            offset: true
        };

        if ( name in attrFn ) {
            return baidu.dom( elem )[ name ]( value );
        };

        // Fallback to prop when attributes are not supported
        if ( typeof elem.getAttribute === "undefined" ) {
            return this.prop( name, value );
        };

        //Sizzle.isXML
        var isXML = function( elem ) {
            // documentElement is verified for cases where it doesn't yet exist
            // (such as loading iframes in IE - #4833)
            var documentElement = (elem ? elem.ownerDocument || elem : 0).documentElement;
            return documentElement ? documentElement.nodeName !== "HTML" : false;
        };

        var error = function( msg ) {
            throw new Error( msg );
        };

        var nodeName = function( elem, name ) {
            return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
        };

        notxml = nType !== 1 || !isXML( elem );

        var rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
            rfocusable = /^(?:button|input|object|select|textarea)$/i,
            rtype = /^(?:button|input)$/i,
            rclickable = /^a(?:rea)?$/i,
            getSetAttribute = baidu.support.getSetAttribute,
            nodeHook, boolHook, fixSpecified;

        var attrHooks = {
            type: {
                set: function( elem, value ) {
                    // We can't allow the type property to be changed (since it causes problems in IE)
                    if ( rtype.test( elem.nodeName ) && elem.parentNode ) {
                        error( "type property can't be changed" );
                    } else if ( !baidu.support.radioValue && value === "radio" && nodeName(elem, "input") ) {
                        // Setting the type on a radio button after the value resets the value in IE6-9
                        // Reset value to it's default in case type is set after value
                        // This is for element creation
                        var val = elem.value;
                        elem.setAttribute( "type", value );
                        if ( val ) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            },

            // Use the value property for back compat
            // Use the nodeHook for button elements in IE6/7 (#1954)
            value: {
                get: function( elem, name ) {
                    if ( nodeHook && nodeName( elem, "button" ) ) {
                        return nodeHook.get( elem, name );
                    }
                    return name in elem ?
                        elem.value :
                        null;
                },
                set: function( elem, value, name ) {
                    if ( nodeHook && nodeName( elem, "button" ) ) {
                        return nodeHook.set( elem, value, name );
                    }
                    // Does not return so that setAttribute is also used
                    elem.value = value;
                }
            }
        };

        var propHooks = {
            tabIndex: {
                get: function( elem ) {
                    // elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    var attributeNode = elem.getAttributeNode("tabindex");

                    return attributeNode && attributeNode.specified ?
                        parseInt( attributeNode.value, 10 ) :
                        rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
                            0 :
                            undefined;
                }
            }
        };

        // Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
        attrHooks.tabindex = propHooks.tabIndex;

        // IE6/7 do not support getting/setting some attributes with get/setAttribute
        if ( !baidu.support.getSetAttribute ) {

            fixSpecified = {
                name: true,
                id: true,
                coords: true
            };

            // Use this for any attribute in IE6/7
            // This fixes almost every IE6/7 issue
            nodeHook = {
                get: function( elem, name ) {
                    var ret;
                    ret = elem.getAttributeNode( name );
                    return ret && ( fixSpecified[ name ] ? ret.nodeValue !== "" : ret.specified ) ?
                        ret.nodeValue :
                        undefined;
                },
                set: function( elem, value, name ) {
                    // Set the existing or create a new attribute node
                    var ret = elem.getAttributeNode( name );
                    if ( !ret ) {
                        ret = document.createAttribute( name );
                        elem.setAttributeNode( ret );
                    }
                    return ( ret.nodeValue = value + "" );
                }
            };

            // Set width and height to auto instead of 0 on empty string( Bug #8150 )
            // This is for removals
            baidu.each([ "width", "height" ], function( name,i ) {
                attrHooks[ name ] = baidu.extend( attrHooks[ name ], {
                    set: function( elem, value ) {
                        if ( value === "" ) {
                            elem.setAttribute( name, "auto" );
                            return value;
                        }
                    }
                });
            });

            // Set contenteditable to false on removals(#10429)
            // Setting to empty string throws an error as an invalid value
            attrHooks.contenteditable = {
                get: nodeHook.get,
                set: function( elem, value, name ) {
                    if ( value === "" ) {
                        value = "false";
                    }
                    nodeHook.set( elem, value, name );
                }
            };
        };

        // Some attributes require a special call on IE
        if ( !baidu.support.hrefNormalized ) {
            baidu.each([ "href", "src", "width", "height" ], function( name,i ) {
                attrHooks[ name ] = baidu.extend( attrHooks[ name ], {
                    get: function( elem ) {
                        var ret = elem.getAttribute( name, 2 );
                        return ret === null ? undefined : ret;
                    }
                });
            });
        };

        if ( !baidu.support.style ) {
            attrHooks.style = {
                get: function( elem ) {
                    // Return undefined in the case of empty string
                    // Normalize to lowercase since IE uppercases css property names
                    return elem.style.cssText.toLowerCase() || undefined;
                },
                set: function( elem, value ) {
                    return ( elem.style.cssText = "" + value );
                }
            };
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

        // IE6/7 call enctype encoding
        if ( !baidu.support.enctype ) {
            propFix.enctype = "encoding";
        };

        // Hook for boolean attributes
        var boolHook = {
            get: function( elem, name ) {
                // Align boolean attributes with corresponding properties
                // Fall back to attribute presence where some booleans are not supported
                var attrNode,
                    property = baidu.dom( elem ).prop( name );
                return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
                    name.toLowerCase() :
                    undefined;
            },
            set: function( elem, value, name ) {
                var propName;
                if ( value === false ) {
                    // Remove boolean attributes when set to false
                    baidu.dom(elem).removeAttr( name );
                } else {
                    // value is true since we know at this point it's type boolean and not false
                    // Set boolean attributes to the same name and set the DOM property
                    propName = propFix[ name ] || name;
                    if ( propName in elem ) {
                        // Only set the IDL specifically if it already exists on the element
                        elem[ propName ] = true;
                    }

                    elem.setAttribute( name, name.toLowerCase() );
                }
                return name;
            }
        };

        // All attributes are lowercase
        // Grab necessary hook if one is defined
        if ( notxml ) {
            name = name.toLowerCase();
            hooks = attrHooks[ name ] || ( rboolean.test( name ) ? boolHook : nodeHook );
        };

        switch(typeof name){
            case 'string':
                if( typeof value === 'undefined' ){
                    
                    //get first
                    if ( hooks && "get" in hooks && notxml && (ret = hooks.get( elem, name )) !== null ) {
                        return ret;

                    } else {

                        ret = elem.getAttribute( name );

                        // Non-existent attributes return null, we normalize to undefined
                        return ret === null ? undefined : ret;
                    };

                }else if( typeof value === 'function' ){
                    baidu.each(this, function(item,index){
                        var ele = baidu.dom(item);
                        ele.attr(name,value.call(item, index, ele.attr(name)));
                    });

                }else{
                    
                    //set all
                    baidu.each(this, function(item,index){
                        if ( value === null ) {
                            baidu.dom(item).removeAttr( name );
                            return;

                        } else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( elem, value, name )) !== undefined ) {
                            return ret;

                        } else {
                            elem.setAttribute( name, "" + value );
                            return value;
                        };
                    });
                };

            break;
            case 'object':

                //set all
                baidu.each(this, function(item,index){
                    var ele = baidu.dom(item);
                    for(key in name){
                        ele.attr(key,name[key]);
                    };
                });

            break;
            default:
            break;
        };

        return this;

    }
});
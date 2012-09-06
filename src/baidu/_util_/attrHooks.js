/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.extend;
///import baidu.support;
///import baidu.forEach;
///import baidu._util_.propHooks;

baidu.extend(baidu,{
    _error : function( msg ) {
        throw new Error( msg );
    },
    _nodeName : function( elem, name ) {
        return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
    }    
});

baidu.extend(baidu._util_,{
	rfocusable : /^(?:button|input|object|select|textarea)$/i,
	rtype : /^(?:button|input)$/i,
	rclickable : /^a(?:rea)?$/i,
	nodeHook:{},
	attrHooks: {
		type: {
			set: function( elem, value ) {
				var bu = baidu._util_;
				// We can't allow the type property to be changed (since it causes problems in IE)
				if ( bu.rtype.test( elem.nodeName ) && elem.parentNode ) {
					baidu._error( "type property can't be changed" );
				} else if ( !baidu.support.radioValue && value === "radio" && baidu._nodeName(elem, "input") ) {
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
				var bu = baidu._util_;
				if ( bu.nodeHook && baidu._nodeName( elem, "button" ) ) {
					return bu.nodeHook.get( elem, name );
				}
				return name in elem ?
					elem.value :
					null;
			},
			set: function( elem, value, name ) {
				if ( bu.nodeHook && baidu._nodeName( elem, "button" ) ) {
					return bu.nodeHook.set( elem, value, name );
				}
				// Does not return so that setAttribute is also used
				elem.value = value;
			}
		}
	},
	// Hook for boolean attributes
	boolHook : {
		get: function( elem, name ) {
			// Align boolean attributes with corresponding properties
			// Fall back to attribute presence where some booleans are not supported
			var attrNode,
				property = baidu(elem).prop( name );
			return property === true || typeof property !== "boolean" && ( attrNode = elem.getAttributeNode(name) ) && attrNode.nodeValue !== false ?
				name.toLowerCase() :
				undefined;
		},
		set: function( elem, value, name ) {
			var propName;
			if ( value === false ) {
				// Remove boolean attributes when set to false
				baidu(elem).removeAttr( name );
			} else {
				// value is true since we know at this point it's type boolean and not false
				// Set boolean attributes to the same name and set the DOM property
				propName = baidu._util_.propFix[ name ] || name;
				if ( propName in elem ) {
					// Only set the IDL specifically if it already exists on the element
					elem[ propName ] = true;
				}

				elem.setAttribute( name, name.toLowerCase() );
			}
			return name;
		}
	}
});

// Add the tabIndex propHook to attrHooks for back-compat (different case is intentional)
baidu._util_.attrHooks.tabindex = baidu._util_.propHooks.tabIndex;

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !baidu.support.getSetAttribute ) {

	var bu = baidu._util_,
		fixSpecified = {
			name: true,
			id: true,
			coords: true
		};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	bu.nodeHook = {
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

	// Apply the nodeHook to tabindex
	bu.attrHooks.tabindex.set = bu.nodeHook.set;

    // Set width and height to auto instead of 0 on empty string( Bug #8150 )
    // This is for removals
    baidu.forEach([ "width", "height" ], function( name ) {
        bu.attrHooks[ name ] = baidu.extend( bu.attrHooks[ name ], {
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
	bu.attrHooks.contenteditable = {
		get: bu.nodeHook.get,
		set: function( elem, value, name ) {
			if ( value === "" ) {
				value = "false";
			}
			bu.nodeHook.set( elem, value, name );
		}
	};
};

// Some attributes require a special call on IE
if ( !baidu.support.hrefNormalized ) {
	var bu = baidu._util_;
    baidu.forEach([ "href", "src", "width", "height" ], function( name ) {
        bu.attrHooks[ name ] = baidu.extend( bu.attrHooks[ name ], {
            get: function( elem ) {
                var ret = elem.getAttribute( name, 2 );
                return ret === null ? undefined : ret;
            }
        });
    });
};

if ( !baidu.support.style ) {
	var bu = baidu._util_;
	bu.attrHooks.style = {
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


/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu.forEach;
///import baidu.extend;
///import baidu.support;
///import baidu.makeArray;
///import baidu.dom;
///import baidu.array.indexOf;

baidu.extend(baidu.dom,{

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
	},

	valHooks: {
		option: {
			get: function( elem ) {
				// attributes.value is undefined in Blackberry 4.7 but
				// uses .value. See #6932
				var val = elem.attributes.value;
				return !val || val.specified ? elem.value : elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, i, max, option,
					index = elem.selectedIndex,
					values = [],
					options = elem.options,
					one = elem.type === "select-one";

				// Nothing was selected
				if ( index < 0 ) {
					return null;
				}

				// Loop through all the selected options
				i = one ? index : 0;
				max = one ? index + 1 : options.length;
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Don't return options that are disabled or in a disabled optgroup
					if ( option.selected && (baidu.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null) &&
							(!option.parentNode.disabled || !baidu.dom.nodeName( option.parentNode, "optgroup" )) ) {

						// Get the specific value for the option
						value = baidu.dom( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				// Fixes Bug #2551 -- select.val() broken in IE after form.reset()
				if ( one && !values.length && options.length ) {
					return baidu( options[ index ] ).val();
				}

				return values;
			},

			set: function( elem, value ) {
				var values = baidu.makeArray( value );

				baidu(elem).find("option").each(function() {
					this.selected = baidu.array(values).indexOf( baidu(this).val()) >= 0;
				});

				if ( !values.length ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
//	
});


// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !baidu.support.getSetAttribute ) {

	var fixSpecified = {
		name: true,
		id: true,
		coords: true
	};

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	baidu.dom.valHooks.button = {
		get: function( elem, name ) {
			var ret;
			ret = elem.getAttributeNode( name );
			return ret && ( fixSpecified[ name ] ? ret.value !== "" : ret.specified ) ?
				ret.value :
				undefined;
		},
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				ret = document.createAttribute( name );
				elem.setAttributeNode( ret );
			}
			return ( ret.value = value + "" );
		}
	};
}

// Radios and checkboxes getter/setter
if ( !baidu.support.checkOn ) {
	baidu.forEach([ "radio", "checkbox" ], function() {
		baidu.dom.valHooks[ this ] = {
			get: function( elem ) {
				// Handle the case where in Webkit "" is returned instead of "on" if a value isn't specified
				return elem.getAttribute("value") === null ? "on" : elem.value;
			}
		};
	});
}

baidu.forEach([ "radio", "checkbox" ], function(item) {
	baidu.dom.valHooks[ item ] = baidu.extend( baidu.dom.valHooks[ item ], {
		set: function( elem, value ) {
			if ( baidu.isArray( value ) ) {
				return ( elem.checked = baidu.array(value).indexOf(jQuery(elem).val()) >= 0 );
			}
		}
	});
});

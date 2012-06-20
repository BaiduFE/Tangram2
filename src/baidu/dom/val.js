/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

///import baidu;
///import baidu.dom;
///import baidu.each;

baidu.dom.extend({
    val: function(value){
        var valHooks = {
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
                        if ( option.selected && (!opt.disabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                                (!option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" )) ) {

                            // Get the specific value for the option
                            value = jQuery( option ).val();

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
                        return jQuery( options[ index ] ).val();
                    }

                    return values;
                }
            }
        };
        
        switch(typeof value){
            case 'undefined':
            break;

            case 'string':

            break;

            case 'function':
                baidu.each(this, function(item,index){
                    baidu.dom(item).html(value.call(item, index, html(item)));
                });
            break;

            default:
            break;
        };

        return this;
    }
});

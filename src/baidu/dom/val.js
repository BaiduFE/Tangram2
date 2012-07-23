/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
 /**
 * @description 获取匹配的元素集合中第一个元素的当前值。
 * @function 
 * @name baidu.dom().val()
 * @grammar baidu.dom(args).val()
 * @param {Null} null 不传入任何函数
 * @return {String|Number|Undefined} 获取匹配的元素集合中第一个元素的当前值。
 */
/**
 * @description 设置匹配的元素集合中每个元素的value值。
 * @function 
 * @name baidu.dom().val()
 * @grammar baidu.dom(args).val(value)
 * @param {String} value 一个文本字符串来设定每个匹配元素的值。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 设置匹配的元素集合中每个元素的value值。
 * @function 
 * @name baidu.dom().val()
 * @grammar baidu.dom(args).val(function(index, text))
 * @param {Function} function(index, text) 一个用来返回设置value值的函数。接收元素的索引位置和元素旧的value值作为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */ 
///import baidu;
///import baidu.dom;
///import baidu.each;
///import baidu.support;

baidu.dom.extend({
    val: function(value){
        var hooks, ret,
			elem = this[0];
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
                        if ( option.selected && (!option.disabled ? !option.disabled : option.getAttribute("disabled") === null) &&
                                (!option.parentNode.disabled || 
                                	option.parentNode.nodeName && !(option.parentNode.nodeName.toUpperCase() === 'optgroup'.toUpperCase())) ) {

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

                    if ( one && !values.length && options.length ) {
                        return baidu.dom( options[ index ] ).val();
                    }

                    return values;
                }
            }
        };
     
        if ( !arguments.length ) {
        	if ( elem ) {
        		hooks = valHooks[ elem.type ] || valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(/\r\n/g, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
        	}
        	return;
        }
        
        switch(typeof value){
            case 'function':
                baidu.each(this, function(item,index){
                    baidu.dom(item).val(value.call(item, index, item.value));
                });
            break;

            default:
            	hooks = valHooks[ elem.type ] || valHooks[ elem.nodeName.toLowerCase() ];
				if ( !hooks || !("set" in hooks) || hooks.set( elem, val, "value" ) === undefined ) {
					elem.value = value;
				}
            break;
        };

        return this;
    }
});

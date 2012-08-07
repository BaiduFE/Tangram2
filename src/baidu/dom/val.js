/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */
 /**
 * @description 获取匹配的元素集合中第一个元素的当前值。
 * @function 
 * @name baidu.dom().val()
 * @grammar baidu.dom(args).val()
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
 * @grammar baidu.dom(args).val(fn)
 * @param {Function} fn 一个用来返回设置value值的函数。接收元素的索引位置和元素旧的value值作为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example baidu.dom("<div>").val(function(index, value){});
 */ 
///import baidu;
///import baidu.dom;
///import baidu.each;
///import baidu.type;
///import baidu.dom._valHooks;

baidu.dom.extend({
    val: function(value){
        var bd = baidu.dom,
            me = this,
            isSet = false,
            result;
        
        baidu.each(me,function(elem,index){
            
            var hooks,
                rreturn = /\r/g;

            if(result){
                return;
            };
            
            switch(typeof value){
                case 'undefined':
        
                    //get first
                    if ( elem ) {
                        hooks = bd.valHooks[ elem.type ] || bd.valHooks[ elem.nodeName.toLowerCase() ];
                        if ( hooks && "get" in hooks && (result = hooks.get( elem, "value" )) !== undefined ) {
                            return result;
                        }
                        result = elem.value;

                        return typeof result === "string" ?
                        
                        // handle most common string cases
                        result.replace(rreturn, "") :
                        
                        // handle cases where value is null/undef or number
                        result == null ? "" : result;
                    }
                
                    return result;

                break;

                case 'function':

                    //set all
                    isSet = true;
                    var tangramDom = bd(elem);
                    tangramDom.val(value.call(elem, index, tangramDom.val()));

                break;

                default:

                    //set all
                    isSet = true;

                    if ( elem.nodeType !== 1 ) {
                        return;
                    }

                    // Treat null/undefined as ""; convert numbers to string
                    if ( value == null ) {
                        value = "";
                    } else if ( typeof value === "number" ) {
                        value += "";
                    } else if ( baidu.isArray( value ) ) {
                        value = baidu.each(value,function ( value,index ) {
                            return value == null ? "" : value + "";
                        });
                    }

                    hooks = bd.valHooks[ elem.type ] || bd.valHooks[ elem.nodeName.toLowerCase() ];

                    // If set returns undefined, fall back to normal setting
                    if ( !hooks || !("set" in hooks) || hooks.set( elem, value, "value" ) === undefined ) {
                        elem.value = value;
                    }

                break;
            };
        });

        return isSet?me:result;
    }
});

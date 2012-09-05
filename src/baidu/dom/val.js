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
 * @example
 .val()方法主要用于获取表单元素的值，下拉框（select）和复选框（checkbox），
 你也可以使用:selected和:checked选择器来获取值，举个例子：

 baidu('select.foo option:selected').val();    // 从下拉框中获取值
 baidu('select.foo').val();                    // 从一个或更多的下拉框中获取值
 baidu('input:checkbox:checked').val();        // 从选中的复选框中获取值
 baidu('input:radio[name=bar]:checked').val(); // 从单选选框中获取值

 示例代码：
 //HTML代码片段
 <input type='text' value='baidu'>

 //获取value
 baidu('input').val();

 */
/**
 * @description 设置匹配的元素集合中每个元素的value值。
 * @function 
 * @name baidu.dom().val()
 * @grammar baidu.dom(args).val(value)
 * @param {String} value 一个文本字符串来设定每个匹配元素的值。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 * @example
 这个方法通常是用来设置表单域的值。

 示例代码：
 //HTML代码片段
 <input type='text' value='google'>

 //获取value
 baidu('input').val('baidu');

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
///import baidu.forEach;
///import baidu.type;
///import baidu.dom._valHooks;

baidu.dom.extend({
    val: function(value){
        var bd = baidu.dom,
            me = this,
            isSet = false,
            result;
        
        baidu.forEach(me,function(elem, index){
            
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
                        value = baidu.forEach(value,function ( value, index ) {
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

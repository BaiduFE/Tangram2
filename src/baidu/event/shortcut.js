/**
 * @author dron
 */

///import baidu.event._core;

void function(){
    var arr = ("blur focus focusin focusout load resize scroll unload click dblclick " +
    "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave mousewheel " +
    "change select submit keydown keypress keyup error contextmenu").split(" ");

    var conf = {};
    var create = function( name ){
        conf[ name ] = function( data, fn ){
            if( fn == null )
                fn = data,
                data = null;

            return arguments.length > 0 ?
                this.on( name, null, data, fn ) :
                this.trigger( name );
        }
    };

    for(var i = 0, l = arr.length; i < l; i ++)
        create( arr[i] );

    baidu.query.extend( conf );
}();

/**
 * @description TangramDom集合触发 blur 事件
 * @function
 * @name baidu.dom().blur()
 * @grammar baidu.dom(args).blur()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 blur 事件监听
 * @function
 * @name baidu.dom().blur()
 * @grammar baidu.dom(args).blur([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 change 事件
 * @function
 * @name baidu.dom().change()
 * @grammar baidu.dom(args).change()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 change 事件监听
 * @function
 * @name baidu.dom().change()
 * @grammar baidu.dom(args).change([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 click 事件
 * @function
 * @name baidu.dom().click()
 * @grammar baidu.dom(args).click()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 click 事件监听
 * @function
 * @name baidu.dom().click()
 * @grammar baidu.dom(args).click([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 dblclick 事件
 * @function
 * @name baidu.dom().dblclick()
 * @grammar baidu.dom(args).dblclick()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 dblclick 事件监听
 * @function
 * @name baidu.dom().dblclick()
 * @grammar baidu.dom(args).dblclick([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 error 事件
 * @function
 * @name baidu.dom().error()
 * @grammar baidu.dom(args).error()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 error 事件监听
 * @function
 * @name baidu.dom().error()
 * @grammar baidu.dom(args).error([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 focus 事件
 * @function
 * @name baidu.dom().focus()
 * @grammar baidu.dom(args).focus()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 focus 事件监听
 * @function
 * @name baidu.dom().focus()
 * @grammar baidu.dom(args).focus([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发focusin 事件
 * @function
 * @name baidu.dom().focusin()
 * @grammar baidu.dom(args).focusin()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 focusin 事件监听
 * @function
 * @name baidu.dom().focusin()
 * @grammar baidu.dom(args).focusin([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发focusout事件
 * @function
 * @name baidu.dom().focusout()
 * @grammar baidu.dom(args).focusout()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 focusout 事件监听
 * @function
 * @name baidu.dom().focusout()
 * @grammar baidu.dom(args).focusout([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 keydown 事件
 * @function
 * @name baidu.dom().keydown()
 * @grammar baidu.dom(args).keydown()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 keydown 事件监听
 * @function
 * @name baidu.dom().keydown()
 * @grammar baidu.dom(args).keydown([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发keypress事件
 * @function
 * @name baidu.dom().keypress()
 * @grammar baidu.dom(args).keypress()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 keypress 事件监听
 * @function
 * @name baidu.dom().keypress()
 * @grammar baidu.dom(args).keypress([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 keyup 事件
 * @function
 * @name baidu.dom().keyup()
 * @grammar baidu.dom(args).keyup()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 keyup 事件监听
 * @function
 * @name baidu.dom().keyup()
 * @grammar baidu.dom(args).keyup([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 mousedown 事件
 * @function
 * @name baidu.dom().mousedown()
 * @grammar baidu.dom(args).mousedown()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mousedown 事件监听
 * @function
 * @name baidu.dom().mousedown()
 * @grammar baidu.dom(args).mousedown([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 mouseenter 事件
 * @function
 * @name baidu.dom().mouseenter()
 * @grammar baidu.dom(args).mouseenter()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseenter 事件监听
 * @function
 * @name baidu.dom().mouseenter()
 * @grammar baidu.dom(args).mouseenter([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 mouseleave 事件
 * @function
 * @name baidu.dom().mouseleave()
 * @grammar baidu.dom(args).mouseleave()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseleave 事件监听
 * @function
 * @name baidu.dom().mouseleave()
 * @grammar baidu.dom(args).mouseleave([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 mousemove 事件
 * @function
 * @name baidu.dom().mousemove()
 * @grammar baidu.dom(args).mousemove()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mousemove 事件监听
 * @function
 * @name baidu.dom().mousemove()
 * @grammar baidu.dom(args).mousemove([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 mouseout 事件
 * @function
 * @name baidu.dom().mouseout()
 * @grammar baidu.dom(args).mouseout()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseout 事件监听
 * @function
 * @name baidu.dom().mouseout()
 * @grammar baidu.dom(args).mouseout([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 mouseover 事件
 * @function
 * @name baidu.dom().mouseover()
 * @grammar baidu.dom(args).mouseover()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseover 事件监听
 * @function
 * @name baidu.dom().mouseover()
 * @grammar baidu.dom(args).mouseover([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 mouseup 事件
 * @function
 * @name baidu.dom().mouseup()
 * @grammar baidu.dom(args).mouseup()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mouseup 事件监听
 * @function
 * @name baidu.dom().mouseup()
 * @grammar baidu.dom(args).mouseup([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 resize 事件
 * @function
 * @name baidu.dom().resize()
 * @grammar baidu.dom(args).resize()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 resize 事件监听
 * @function
 * @name baidu.dom().resize()
 * @grammar baidu.dom(args).resize([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 scroll 事件
 * @function
 * @name baidu.dom().scroll()
 * @grammar baidu.dom(args).scroll()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 scroll 事件监听
 * @function
 * @name baidu.dom().scroll()
 * @grammar baidu.dom(args).scroll([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 select 事件
 * @function
 * @name baidu.dom().select()
 * @grammar baidu.dom(args).select()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 select 事件监听
 * @function
 * @name baidu.dom().select()
 * @grammar baidu.dom(args).select([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 submit 事件
 * @function
 * @name baidu.dom().submit()
 * @grammar baidu.dom(args).submit()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 submit 事件监听
 * @function
 * @name baidu.dom().submit()
 * @grammar baidu.dom(args).submit([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 load 事件
 * @function
 * @name baidu.dom().load()
 * @grammar baidu.dom(args).load()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 load 事件监听
 * @function
 * @name baidu.dom().load()
 * @grammar baidu.dom(args).load([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 unload 事件
 * @function
 * @name baidu.dom().unload()
 * @grammar baidu.dom(args).unload()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 unload 事件监听
 * @function
 * @name baidu.dom().unload()
 * @grammar baidu.dom(args).unload([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合触发 contextmenu 事件
 * @function
 * @name baidu.dom().contextmenu()
 * @grammar baidu.dom(args).contextmenu()
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 contextmenu 事件监听
 * @function
 * @name baidu.dom().contextmenu()
 * @grammar baidu.dom(args).contextmenu([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

/**
 * @description TangramDom集合添加 mousewheel 事件监听
 * @function
 * @name baidu.dom().mousewheel()
 * @grammar baidu.dom(args).mousewheel([data,]fn)
 * @param {Object} data 触发事件函数时，携带event.data 上的数据
 * @param {Function} fn 事件函数
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
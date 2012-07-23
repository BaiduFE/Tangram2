/**
 * @author wangxiao
 * @email  1988wangxiao@gmail.com
 */

/**
 * @description 取得第一个匹配元素对应的属性值。
 * @function 
 * @name baidu.dom().attr()
 * @grammar baidu.dom(args).attr(attributeName)
 * @param {String} attributeName 要获取的值的对应属性名
 * @return {String|undefined} 只获取第一个匹配元素的属性值，当属性没有被设置时候，.attr()方法将返回undefined。
 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().attr()
 * @grammar baidu.dom(args).attr(attributeName,value)
 * @param {String} attributeName 要设置值的属性名;
 * @param {String} value 这个属性设置的值;
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
/**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().attr();
 * @grammar baidu.dom(args).attr(object);
 * @param {Object} object 一个配对的属性值的object对象
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */
 /**
 * @description 为指定元素设置一个或多个属性。
 * @function 
 * @name baidu.dom().attr();
 * @grammar baidu.dom(args).attr(attributeName,function(index,attr));
 * @param {String} attributeName 要设置值的属性名.
 * @param {Function} function(index, attr) 这个函数返回用来设置的值，this 是当前的元素，接收元素的索引位置index和元素旧的样属性值attr为参数。
 * @return {TangramDom} 返回之前匹配元素的TangramDom对象
 */

///import baidu;
///import baidu.dom;
///import baidu.each;
///import baidu.support;
///import baidu.dom._isXML;
///import baidu.dom._attrHooks;

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

        //返回结果
        var result,
            me = this,
            isSet = false;

        baidu.each(this, function(item,index){

            if(result){
                return;
            };

            var ret, 
                hooks, 
                notxml,
                bd = baidu.dom,
                nType = item.nodeType;

            // don't get/set properties on text, comment and attribute nodes
            if ( !item || nType === 3 || nType === 8 || nType === 2 ) {
                return;
            };

            // Fallback to prop when attributes are not supported
            if ( typeof item.getAttribute === "undefined" ) {
                result = this.prop( name, value );
            };

            switch(typeof name){
                case 'string':
                    notxml = nType !== 1 || !bd._isXML( item );

                    // All attributes are lowercase
                    // Grab necessary hook if one is defined
                    if ( notxml ) {
                        name = name.toLowerCase();
                        hooks = bd.attrHooks[ name ] || ( bd.rboolean.test( name ) ? bd.boolHook : bd.nodeHook );
                    };

                    if( typeof value === 'undefined' ){
                        
                        //get first
                        if ( hooks && "get" in hooks && notxml && (ret = hooks.get( item, name )) !== null ) {
                            //return ret;
                            result = ret;
                        } else {

                            ret = item.getAttribute( name );

                            // Non-existent attributes return null, we normalize to undefined
                            //return ret === null ? undefined : ret;
                            result = ret === null ? undefined : ret;
                        };

                    }else if( typeof value === 'function' ){

                        isSet = true;
                        var ele = bd(item);
                        ele.attr(name,value.call(item, index, ele.attr(name)));
                    
                    }else{
                        
                        //set all
                        isSet = true;
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
                            result = bd( item )[ name ]( value );
                            return;
                        };

                        if ( value === null ) {
                            bd(item).removeAttr( name );
                            return;

                        } else if ( hooks && "set" in hooks && notxml && (ret = hooks.set( item, value, name )) !== undefined ) {
                            return ret;

                        } else {
                            item.setAttribute( name, "" + value );
                            return value;
                        };
                    };

                break;
                case 'object':

                    //set all
                    isSet = true;
                    var ele = bd(item);
                    for(key in name){
                        ele.attr(key,name[key]);
                    };

                break;
                default:
                    result = me;
                break;
            };
        });
    
        return isSet?this:result;
    }
});